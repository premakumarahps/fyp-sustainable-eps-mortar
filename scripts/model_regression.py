"""
Mortar Mix Regression Analysis
===============================
Compares Black-Box (full second-order polynomial) models against
physics-informed Grey-Box models for three mortar properties:
  1. Flowability (Flow_percent)
  2. Compressive Strength (fc28_MPa)
  3. Flexural Strength (fr28_MPa)

Author : Research Project Script
Date   : 2026-03
"""

import os
import sys
import numpy as np
import pandas as pd
from scipy.optimize import curve_fit
import statsmodels.api as sm
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import PolynomialFeatures
import matplotlib
matplotlib.use("Agg")          # non-interactive backend for saving PNGs
import matplotlib.pyplot as plt

# ── paths ────────────────────────────────────────────────────────────────────
ROOT_DIR   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH  = os.path.join(ROOT_DIR, "data", "data.csv")
OUTPUT_DIR = os.path.join(ROOT_DIR, "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ── load data ────────────────────────────────────────────────────────────────
if not os.path.isfile(DATA_PATH):
    sys.exit(f"[ERROR] Dataset not found at:\n  {DATA_PATH}\n"
             "Place your data.csv in the 'data' folder and re-run.")

df = pd.read_csv(DATA_PATH)
print(f"[INFO] Loaded {len(df)} rows from data.csv\n")

# Verify required columns
REQUIRED = ["w_c", "s_c", "SP_percent", "C_sp", "WFT",
            "Flow_percent", "fc28_MPa", "fr28_MPa"]
missing = [c for c in REQUIRED if c not in df.columns]
if missing:
    sys.exit(f"[ERROR] Missing columns: {missing}")


# ══════════════════════════════════════════════════════════════════════════════
#  HELPER FUNCTIONS
# ══════════════════════════════════════════════════════════════════════════════

def build_full_quadratic(X_df):
    """Return design matrix for full second-order polynomial (with intercept)."""
    poly = PolynomialFeatures(degree=2, include_bias=True)
    X_poly = poly.fit_transform(X_df)
    feature_names = poly.get_feature_names_out(X_df.columns)
    return X_poly, feature_names


def fit_ols(X_poly, y, n_features_original):
    """Fit OLS via statsmodels (design matrix already includes intercept)."""
    model = sm.OLS(y, X_poly).fit()
    y_pred = model.predict(X_poly)
    n = len(y)
    p = n_features_original   # number of original input features
    r2 = r2_score(y, y_pred)
    adj_r2 = 1 - (1 - r2) * (n - 1) / (n - p - 1)
    rmse = np.sqrt(mean_squared_error(y, y_pred))
    return model, y_pred, r2, adj_r2, rmse


def calc_metrics(y_true, y_pred, n_params):
    """R², Adjusted-R², RMSE for a curve-fit model."""
    n = len(y_true)
    r2 = r2_score(y_true, y_pred)
    adj_r2 = 1 - (1 - r2) * (n - 1) / (n - n_params - 1)
    rmse = np.sqrt(mean_squared_error(y_true, y_pred))
    return r2, adj_r2, rmse


def parity_plot(y_true, y_pred_bb, y_pred_gb, target_name, filename):
    """Overlay Black-Box and Grey-Box predictions on a single parity plot."""
    fig, ax = plt.subplots(figsize=(7, 6))

    # data
    ax.scatter(y_true, y_pred_bb, c="steelblue", alpha=0.55, s=80,
               edgecolors="navy", marker="o", label="Black-Box (Polynomial)")
    ax.scatter(y_true, y_pred_gb, c="crimson", alpha=0.85, s=70,
               edgecolors="darkred", marker="s", label="Grey-Box (Physics)")

    # Y = X reference line
    lo = min(y_true.min(), y_pred_bb.min(), y_pred_gb.min()) * 0.95
    hi = max(y_true.max(), y_pred_bb.max(), y_pred_gb.max()) * 1.05
    ax.plot([lo, hi], [lo, hi], "k--", linewidth=1.2, label="Y = X")

    ax.set_xlabel("Actual", fontsize=12)
    ax.set_ylabel("Predicted", fontsize=12)
    ax.set_title(f"Actual vs Predicted — {target_name}", fontsize=13,
                 fontweight="bold")
    ax.legend(loc="upper left", fontsize=10)
    ax.set_xlim(lo, hi)
    ax.set_ylim(lo, hi)
    ax.set_aspect("equal", adjustable="box")
    plt.tight_layout()

    save_path = os.path.join(OUTPUT_DIR, filename)
    fig.savefig(save_path, dpi=300)
    plt.close(fig)
    print(f"  ✓ Saved plot → {save_path}")


# ══════════════════════════════════════════════════════════════════════════════
#  GREY-BOX MODEL DEFINITIONS
# ══════════════════════════════════════════════════════════════════════════════

# --- Target 1: Flowability ---------------------------------------------------
def flow_greybox(X, alpha0, alpha1, gamma0, gamma1, lam0, lam1):
    """
    Flow_percent = (α₀ + α₁·C_sp) · (WFT − (γ₀ + γ₁·C_sp))^(λ₀ + λ₁·s_c)
    X columns: [C_sp, WFT, s_c]
    """
    C_sp, WFT, s_c = X[0], X[1], X[2]
    base = WFT - (gamma0 + gamma1 * C_sp)
    base = np.clip(base, 1e-6, None)          # avoid negative base → complex
    exponent = lam0 + lam1 * s_c
    return (alpha0 + alpha1 * C_sp) * np.power(base, exponent)


# --- Target 2: Compressive Strength ------------------------------------------
def fc28_greybox(X, alpha0, alpha1, alpha2, gamma0, gamma1, gamma2):
    """
    fc28 = (α₀ + α₁·s_c + α₂·C_sp) · (1/w_c − (γ₀ + γ₁·s_c + γ₂·C_sp))
    X columns: [s_c, C_sp, w_c]
    """
    s_c, C_sp, w_c = X[0], X[1], X[2]
    return (alpha0 + alpha1 * s_c + alpha2 * C_sp) * \
           (1.0 / w_c - (gamma0 + gamma1 * s_c + gamma2 * C_sp))


# --- Target 3: Flexural Strength ---------------------------------------------
def fr28_greybox(X, lam0, lam1, lam2, lam3, gamma0, gamma1, gamma2, gamma3):
    """
    fr28 = (λ₀ + λ₁·w_c + λ₂·s_c + λ₃·C_sp) · fc28^(γ₀ + γ₁·w_c + γ₂·s_c + γ₃·C_sp)
    X columns: [w_c, s_c, C_sp, fc28_MPa]
    """
    w_c, s_c, C_sp, fc28 = X[0], X[1], X[2], X[3]
    fc28_safe = np.clip(fc28, 1e-6, None)
    exponent = gamma0 + gamma1 * w_c + gamma2 * s_c + gamma3 * C_sp
    return (lam0 + lam1 * w_c + lam2 * s_c + lam3 * C_sp) * \
           np.power(fc28_safe, exponent)


# ══════════════════════════════════════════════════════════════════════════════
#  COLLECT RESULTS
# ══════════════════════════════════════════════════════════════════════════════
results_rows = []       # for the summary CSV
greybox_params = {}     # for saving fitted coefficients

# ── Black-Box inputs (same for all three targets) ────────────────────────────
X_bb_df = df[["w_c", "s_c", "SP_percent"]]
X_bb_poly, feat_names = build_full_quadratic(X_bb_df)


# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║  TARGET 1 : FLOWABILITY (Flow_percent)                                     ║
# ╚══════════════════════════════════════════════════════════════════════════════╝
print("=" * 60)
print(" TARGET 1 : Flowability (Flow_percent)")
print("=" * 60)

y_flow = df["Flow_percent"].values

# Black-Box
ols_flow, y_flow_bb, r2_bb, adj_bb, rmse_bb = fit_ols(
    X_bb_poly, y_flow, n_features_original=3)
print(f"  [BB] R²={r2_bb:.4f}  Adj-R²={adj_bb:.4f}  RMSE={rmse_bb:.4f}")

# Grey-Box
X_flow_gb = np.vstack([df["C_sp"].values, df["WFT"].values, df["s_c"].values])
p0_flow = [100.0, 1.0, 0.01, 0.001, 0.5, 0.01]
lb_flow = [-np.inf, -np.inf, -np.inf, -np.inf, 0.01, -np.inf]
ub_flow = [np.inf,  np.inf,  np.inf,  np.inf,  5.0,   np.inf]

popt_flow, pcov_flow = curve_fit(
    flow_greybox, X_flow_gb, y_flow,
    p0=p0_flow, bounds=(lb_flow, ub_flow), maxfev=50000)
y_flow_gb = flow_greybox(X_flow_gb, *popt_flow)
r2_gb, adj_gb, rmse_gb = calc_metrics(y_flow, y_flow_gb, len(popt_flow))
print(f"  [GB] R²={r2_gb:.4f}  Adj-R²={adj_gb:.4f}  RMSE={rmse_gb:.4f}")

results_rows.append(["Flow_percent", "Black-Box", r2_bb, adj_bb, rmse_bb])
results_rows.append(["Flow_percent", "Grey-Box",  r2_gb, adj_gb, rmse_gb])
greybox_params["Flow_percent"] = dict(
    zip(["alpha_0", "alpha_1", "gamma_0", "gamma_1", "lambda_0", "lambda_1"],
        popt_flow))

parity_plot(y_flow, y_flow_bb, y_flow_gb,
            "Flowability (Flow %)", "parity_Flow_percent.png")
print()

# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║  TARGET 2 : COMPRESSIVE STRENGTH (fc28_MPa)                               ║
# ╚══════════════════════════════════════════════════════════════════════════════╝
print("=" * 60)
print(" TARGET 2 : Compressive Strength (fc28_MPa)")
print("=" * 60)

y_fc = df["fc28_MPa"].values

# Black-Box
ols_fc, y_fc_bb, r2_bb, adj_bb, rmse_bb = fit_ols(
    X_bb_poly, y_fc, n_features_original=3)
print(f"  [BB] R²={r2_bb:.4f}  Adj-R²={adj_bb:.4f}  RMSE={rmse_bb:.4f}")

# Grey-Box
X_fc_gb = np.vstack([df["s_c"].values, df["C_sp"].values, df["w_c"].values])
p0_fc = [50.0, 1.0, 0.1, 0.5, 0.01, 0.001]

popt_fc, pcov_fc = curve_fit(
    fc28_greybox, X_fc_gb, y_fc,
    p0=p0_fc, maxfev=50000)
y_fc_gb = fc28_greybox(X_fc_gb, *popt_fc)
r2_gb, adj_gb, rmse_gb = calc_metrics(y_fc, y_fc_gb, len(popt_fc))
print(f"  [GB] R²={r2_gb:.4f}  Adj-R²={adj_gb:.4f}  RMSE={rmse_gb:.4f}")

results_rows.append(["fc28_MPa", "Black-Box", r2_bb, adj_bb, rmse_bb])
results_rows.append(["fc28_MPa", "Grey-Box",  r2_gb, adj_gb, rmse_gb])
greybox_params["fc28_MPa"] = dict(
    zip(["alpha_0", "alpha_1", "alpha_2", "gamma_0", "gamma_1", "gamma_2"],
        popt_fc))

parity_plot(y_fc, y_fc_bb, y_fc_gb,
            "Compressive Strength (fc28 MPa)", "parity_fc28_MPa.png")
print()

# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║  TARGET 3 : FLEXURAL STRENGTH (fr28_MPa)                                  ║
# ╚══════════════════════════════════════════════════════════════════════════════╝
print("=" * 60)
print(" TARGET 3 : Flexural Strength (fr28_MPa)")
print("=" * 60)

y_fr = df["fr28_MPa"].values

# Black-Box
ols_fr, y_fr_bb, r2_bb, adj_bb, rmse_bb = fit_ols(
    X_bb_poly, y_fr, n_features_original=3)
print(f"  [BB] R²={r2_bb:.4f}  Adj-R²={adj_bb:.4f}  RMSE={rmse_bb:.4f}")

# Grey-Box
X_fr_gb = np.vstack([df["w_c"].values, df["s_c"].values,
                      df["C_sp"].values, df["fc28_MPa"].values])
p0_fr = [1.0, 0.1, 0.1, 0.01, 0.5, 0.01, 0.01, 0.001]
lb_fr = [-np.inf]*4 + [0.01] + [-np.inf]*3
ub_fr = [ np.inf]*4 + [3.0]  + [ np.inf]*3

popt_fr, pcov_fr = curve_fit(
    fr28_greybox, X_fr_gb, y_fr,
    p0=p0_fr, bounds=(lb_fr, ub_fr), maxfev=50000)
y_fr_gb = fr28_greybox(X_fr_gb, *popt_fr)
r2_gb, adj_gb, rmse_gb = calc_metrics(y_fr, y_fr_gb, len(popt_fr))
print(f"  [GB] R²={r2_gb:.4f}  Adj-R²={adj_gb:.4f}  RMSE={rmse_gb:.4f}")

results_rows.append(["fr28_MPa", "Black-Box", r2_bb, adj_bb, rmse_bb])
results_rows.append(["fr28_MPa", "Grey-Box",  r2_gb, adj_gb, rmse_gb])
greybox_params["fr28_MPa"] = dict(
    zip(["lambda_0", "lambda_1", "lambda_2", "lambda_3",
         "gamma_0",  "gamma_1",  "gamma_2",  "gamma_3"], popt_fr))

parity_plot(y_fr, y_fr_bb, y_fr_gb,
            "Flexural Strength (fr28 MPa)", "parity_fr28_MPa.png")
print()


# ══════════════════════════════════════════════════════════════════════════════
#  SAVE RESULTS
# ══════════════════════════════════════════════════════════════════════════════

# 1. Summary metrics CSV
summary_df = pd.DataFrame(results_rows,
                          columns=["Target", "Model", "R2", "Adj_R2", "RMSE"])
summary_path = os.path.join(OUTPUT_DIR, "model_summary_metrics.csv")
summary_df.to_csv(summary_path, index=False)
print(f"\n[INFO] Summary metrics saved → {summary_path}")
print(summary_df.to_string(index=False))

# 2. Grey-Box fitted parameters CSV
param_rows = []
for target, params in greybox_params.items():
    for pname, pval in params.items():
        param_rows.append([target, pname, pval])
params_df = pd.DataFrame(param_rows,
                          columns=["Target", "Parameter", "Value"])
params_path = os.path.join(OUTPUT_DIR, "greybox_parameters.csv")
params_df.to_csv(params_path, index=False)
print(f"\n[INFO] Grey-Box parameters saved → {params_path}")
print(params_df.to_string(index=False))

# 3. Black-Box coefficients CSV
bb_rows = []
for tname, model, fnames in [
        ("Flow_percent", ols_flow, feat_names),
        ("fc28_MPa",     ols_fc,   feat_names),
        ("fr28_MPa",     ols_fr,   feat_names)]:
    for fname, coef in zip(fnames, model.params):
        bb_rows.append([tname, fname, coef])
bb_df = pd.DataFrame(bb_rows, columns=["Target", "Feature", "Coefficient"])
bb_path = os.path.join(OUTPUT_DIR, "blackbox_coefficients.csv")
bb_df.to_csv(bb_path, index=False)
print(f"\n[INFO] Black-Box coefficients saved → {bb_path}")
print(bb_df.to_string(index=False))

print("\n" + "=" * 60)
print(" ALL DONE — check the 'output' folder for results.")
print("=" * 60)
