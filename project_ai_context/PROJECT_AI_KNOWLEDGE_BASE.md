# Master AI Knowledge Base: Sustainable Lightweight EPS Mortar Engineering

> **Document Purpose**: This comprehensive document provides an exhaustive, structured, academic-grade record of the entire Final Year Project (FYP) conducted at the **University of Moratuwa, Department of Materials Science and Engineering**. It is designed to be fed into any Large Language Model (LLM) or AI agent to provide instant, complete comprehension of the research background, raw materials, mathematical volume equations, experimental phases, regression models, ANOVA statistics, microstructural mechanisms, numerical results, and interactive digital artifacts.

---

## 1. Project Identification & Authorship

* **Full Project Title**: *Synergistic Effects of Rice Husk Ash and Polypropylene Fiber on the Performance of Modified Expanded Polystyrene Cement Mortar*
* **Academic Institution**: Department of Materials Science and Engineering, Faculty of Engineering, University of Moratuwa, Sri Lanka.
* **Research Group / Authors**:
  * **H.P.S. Premakumara** (Lead Researcher) — `premakumarahpsandun@gmail.com`
  * **K. Mayoorathan** (Co-Researcher) — `mayoo12355@gmail.com`
* **Academic Supervisor**:
  * **Eng. S.P. Guluwita** (Senior Lecturer / Supervisor) — `sudagulu@gmail.com`
* **Target Application**: Prefabricated, sustainable, lightweight, non-load-bearing and semi-structural wall partition panels, lightweight masonry, and thermal/acoustic insulation elements for modern building prefabrication.

---

## 2. Executive Summary

Traditional cement mortar and concrete exhibit high densities (typically $2200 \text{--} 2400\text{ kg/m}^3$), which dramatically increases the deadweight of precast wall panels. This causes excessive transportation costs, high structural foundation demands, handling stresses, and early demolding cracking.

Replacing conventional sand with **Expanded Polystyrene (EPS) beads** drastically lowers density (down to $1500 \text{--} 1900\text{ kg/m}^3$), but raw EPS introduces critical structural flaws:
1. **Hydrophobic Surface & Wall Effect**: Virgin EPS has an inert, non-polar surface that repels water and prevents chemical/mechanical bonding with the cement paste, creating a wide, highly porous, defective Interfacial Transition Zone (ITZ).
2. **Compressible Macroscopic Voids**: EPS behaves as a mechanical void under stress, leading to catastrophic compressive strength loss ($>85\%$ drop at $40\%$ replacement).
3. **Severe Buoyancy & Segregation**: The ultra-low density of EPS ($\approx 15 \text{--} 25\text{ kg/m}^3$) causes beads to float to the top during vibration and casting, resulting in non-uniform density and mechanical anisotropy.
4. **Brittle Tensile Failure**: The mortar exhibits low tensile strain capacity and brittle cracking under handling and thermal gradients.

### The Novel Ternary Solution
This project develops and optimizes a **multi-scale ternary composite mortar system** that resolves all 4 fundamental limitations simultaneously:
1. **Surface-Coated EPS (Macro-Scale Interlock)**: EPS beads are pre-treated with a synthetic vinyl-acrylic polymer emulsion and coated with fine manufactured sand (M-sand). This replaces the smooth hydrophobic boundary with a rough, pozzolan-reactive mineral shell, eliminating buoyancy segregation and enabling mechanical interlocking.
2. **Rice Husk Ash (Micro-Scale Pozzolanic ITZ Refinement)**: Incorporating $10\text{--}20\%$ amorphous Rice Husk Ash (RHA) as a supplementary cementitious material (SCM) provides highly reactive micro-silica ($\text{SiO}_2 > 88\%$). This chemically consumes weak, leachable Calcium Hydroxide ($\text{Ca(OH)}_2$ / Portlandite) at the EPS boundary, precipitating dense, strong, secondary Calcium Silicate Hydrate ($\text{C-S-H}$) gel and reducing the ITZ $\text{Ca/Si}$ atomic ratio by **$77\%$** (from $3.20$ to $0.73$).
3. **Polypropylene Micro-Fibers (Meso-Scale Crack Bridging)**: Short monofilament polypropylene (PP) fibers ($0.15\% \text{--} 0.30\%$ volume fraction, $12\text{ mm}$ length) form a 3D reinforcing network that bridges microcracks, arrests crack propagation, and increases flexural strength by **$+71\%$** and fracture toughness by **$+105\%$**.

---

## 3. Raw Materials & Engineering Specifications

| Material | Physical Form | Specific Gravity ($SG$) | Bulk Density ($\text{kg/m}^3$) | Key Function / Role |
| :--- | :--- | :--- | :--- | :--- |
| **Ordinary Portland Cement (OPC)** | Type 1 Powder (ASTM C150) | $3.15$ | $1440$ | Primary hydraulic binder |
| **Rice Husk Ash (RHA)** | Amorphous pozzolanic micro-powder | $2.11$ | $480 \text{--} 560$ | SCM, $\text{SiO}_2$ pozzolanic reaction, ITZ pore refinement |
| **Manufactured Sand (M-Sand)** | Fine aggregate ($<4.75\text{ mm}$, Zone II) | $2.62$ | $1620$ | Fine mineral aggregate matrix |
| **Coated EPS Beads** | Spherical aggregate with sand/polymer shell ($2\text{--}4\text{ mm}$) | $0.210$ | $88.5$ | Lightweight aggregate, anti-segregation, thermal insulation |
| **Uncoated (Raw) EPS** | Virgin expanded beads ($2\text{--}4\text{ mm}$) | $0.024$ | $14.2$ | Baseline control for coating efficacy evaluation |
| **Polypropylene (PP) Fibers** | Monofilament micro-fibers ($12\text{ mm}$ length, $18\text{--}25\ \mu\text{m}$ dia) | $0.91$ | $910$ | Microcrack bridging, post-crack energy dissipation |
| **Polycarboxylate Superplasticizer (SP)** | High-Range Water Reducer (HRWR) | $1.08$ | $1080$ | Maintains flowability without increasing water-to-binder ratio |
| **Water** | Potable laboratory water | $1.00$ | $1000$ | Hydration medium ($w/b = 0.44 \text{--} 0.52$) |

---

## 4. Mathematical Formulation: Absolute Volume Batching Framework

Because EPS beads possess negligible mass and RHA has a significantly lower specific gravity ($SG = 2.11$) than OPC ($SG = 3.15$), standard mass-based batching causes severe volumetric errors. The research developed a **Generalized Multi-Phase Absolute Volume Formulation** for exact $1.0\text{ m}^3$ spatial geometry.

### 4.1. Composite Binder Specific Gravity ($SG_b$)
For a blended binder with RHA replacement ratio $r = \frac{m_{\text{RHA}}}{m_b}$ ($r \in [0.0, 0.20]$):
$$SG_b = \frac{1}{\frac{1 - r}{SG_c} + \frac{r}{SG_{\text{RHA}}}} = \frac{1}{\frac{1 - r}{3.15} + \frac{r}{2.11}}$$

### 4.2. Generalized Multi-Phase Volume Equation
Accounting for $1.0\text{ m}^3$ ($1000\text{ L}$) with $1.0\%$ entrapped air allowance ($990\text{ L}$ net volume):
$$\frac{m_b}{SG_b \times 1000} + \frac{m_b \times (w/b)}{1000} + \frac{(1 - v) \times m_b \times (s/b)}{SG_s \times 1000} + \frac{v \times m_b \times (s/b)}{SG_s \times 1000} + \frac{V_{\text{fiber}}}{1000} = 0.990\text{ m}^3$$

Where:
* $m_b$: Total binder mass ($\text{kg/m}^3$)
* $w/b$: Water-to-binder ratio ($0.44 \text{--} 0.52$)
* $s/b$: Sand-to-binder volumetric ratio ($2.00 \text{--} 2.50$)
* $v$: Volumetric replacement fraction of sand by EPS ($0.0 \text{--} 0.40$)
* $V_{\text{fiber}}$: Absolute volume of PP fibers ($\text{m}^3$)

Because coated EPS directly replaces the exact solid spatial volume of the displaced sand phase, $(1-v) + v = 1$, the total binder mass equation simplifies to:
$$m_b \left( \frac{1}{SG_b} + (w/b) + \frac{s/b}{SG_s} \right) = 990 - V_{\text{fiber}}(\text{L})$$

### 4.3. Theoretical Fresh Density Formulations ($\rho_{th}$)
* **Phase 1 Base Mortar**:
  $$\rho_{th,\text{base}} = m_b \left[ 1 + (w/b) + (s/b) \right]$$
* **Phase 2 Modified Lightweight Mortar (Coated EPS + RHA)**:
  $$\rho_{th,\text{mod}} = m_b \left[ 1 + (w/b) + (s/b) \left( (1 - v) + v \frac{SG_{\text{EPS},c}}{SG_s} \right) \right]$$
* **Phase 4 Uncoated EPS Baseline**:
  $$\rho_{th,\text{unc}} = m_b \left[ 1 + (w/b) + (s/b) \left( (1 - v) + v \frac{SG_{\text{EPS},u}}{SG_s} \right) \right]$$

---

## 5. Experimental Architecture: 5 Research Phases

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      5-PHASE RESEARCH METHODOLOGY                       │
├─────────────────────────────────────────────────────────────────────────┤
│ Phase 1: Matrix Optimization (OPC + M-Sand Base)                        │
│          • Factors: w/b (0.44-0.52), s/b (2.00-2.50) via CCF RSM        │
│          • Outputs: Compressive strength, flexural strength, flow, voids│
├─────────────────────────────────────────────────────────────────────────┤
│ Phase 2: Ternary Multi-Objective Optimization (RHA + Coated EPS)        │
│          • Factors: RHA (0-20% cement subst.), EPS (0-40% sand subst.)  │
│          • Discovers the "Central Equilibrium": 10% RHA + 20% EPS       │
├─────────────────────────────────────────────────────────────────────────┤
│ Phase 3: Chemical & Spectroscopic Validation (XRD, FTIR, SEM-EDS)       │
│          • Microstructural evidence of C-S-H formation                  │
│          • ITZ Ca/Si atomic ratio reduction: 3.20 -> 0.73 (-77%)        │
├─────────────────────────────────────────────────────────────────────────┤
│ Phase 4: Physical Coating Efficacy Baseline Comparison                  │
│          • Coated EPS vs. Uncoated EPS under identical mix proportions  │
│          • Interlocking sand shell vs. interfacial slip gap             │
├─────────────────────────────────────────────────────────────────────────┤
│ Phase 5: Fiber Micro-Reinforcement Optimization (PP Fibers)             │
│          • Dosages: 0.0% to 0.45% volume fraction                       │
│          • Optimum at 0.25% vol: +71% Flexural, +105% Toughness         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Comprehensive Phase-by-Phase Results & Data

### 6.1. Phase 1: Base Matrix Optimization (CCF RSM Design)
* **Objective**: Establish the optimal baseline cementitious matrix prior to lightweight aggregate substitution.
* **Optimal Baseline Identified**: Mix **S1M1** ($w/b = 0.48$, $s/b = 2.25$).
  * 28-day Compressive Strength ($f_c$): **$35.58\text{ MPa}$**
  * 28-day Flexural Strength ($f_r$): **$4.74\text{ MPa}$**
  * Dry Density ($\rho_{28d}$): **$2287\text{ kg/m}^3$**
  * Apparent Porosity: **$6.04\%$**

---

### 6.2. Phase 2: Ternary Interaction Matrix (RHA vs. Coated EPS)

| Mix ID | RHA (%) | Coated EPS (%) | 28d Flexural $f_r$ (MPa) | 28d Compressive $f_c$ (MPa) | 28d Density $\rho_{28d}$ ($\text{kg/m}^3$) | Water Absorption (%) | Specific $f_c/\rho$ ($10^{-3}$) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **S2M1** (Baseline) | $0$ | $0$ | $4.74$ | $35.58$ | $2287$ | $3.58$ | $15.56$ |
| **S2M2** (Dense Pozzolan) | $20$ | $0$ | $5.49$ | **$47.68$** | $2233$ | $2.84$ | **$21.35$** |
| **S2M3** (Heavy EPS, No RHA) | $0$ | $40$ | $1.65$ | $4.38$ | $1748$ | $7.82$ | $2.50$ |
| **S2M4** (Heavy EPS + High RHA) | $20$ | $40$ | $1.70$ | $4.29$ | $1719$ | $6.95$ | $2.50$ |
| **S2M5** (Moderate EPS, No RHA) | $0$ | $20$ | $2.87$ | $12.25$ | $2011$ | $4.92$ | $6.09$ |
| **S2M6** (Moderate EPS + High RHA)| $20$ | $20$ | $3.19$ | $14.98$ | $1976$ | $3.89$ | $7.58$ |
| **S2M9** (Center Point 1) | **$10$** | **$20$** | **$3.29$** | **$17.96$** | **$2034$** | **$3.11$** | **$8.83$** |
| **S2M10** (Center Point 2) | **$10$** | **$20$** | **$3.17$** | **$16.19$** | **$1970$** | **$3.08$** | **$8.22$** |
| **S2M11** (Center Point 3) | **$10$** | **$20$** | **$3.32$** | **$16.19$** | **$1975$** | **$3.14$** | **$8.20$** |

#### Key Finding: The "Central Equilibrium" Phenomenon
At $10\%$ RHA and $20\%$ Coated EPS (Center Points S2M9–S2M11):
* Compressive strength reaches **$16.8 \text{--} 18.0\text{ MPa}$** (easily surpassing the ASTM C129 / C90 structural requirement of $>10.3\text{ MPa}$ for non-load-bearing and semi-structural masonry).
* Apparent porosity drops to **$5.79\%$** and Water Absorption to **$3.11\%$** — which is **lower than the dense 0% EPS baseline ($3.58\%$)**!
* **Mechanism**: $10\%$ RHA produces precisely the volume of secondary C-S-H needed to fill the interfacial voids created by the $20\%$ EPS beads without adding excessive unreacted cellular ash porosity.

---

### 6.3. Phase 3: Chemical & Microstructural Analytical Validation

#### A. SEM-EDS (Energy Dispersive X-Ray Spectroscopy) ITZ Analysis
* **Conventional EPS Mortar ITZ**:
  * Massive accumulation of hexagonal plate-like Portlandite ($\text{Ca(OH)}_2$).
  * Elemental ratio: $\text{Ca/Si} = 3.20$ (indicates weak, porous, low-strength hydration products).
  * Presence of micro-fissures and debonding gaps at the bead interface.
* **Upgraded EPS Mortar (10% RHA + Coated Shell)**:
  * Dense, continuous fibrillar and foil-like Calcium Silicate Hydrate ($\text{C-S-H}$) gel network.
  * Elemental ratio: $\text{Ca/Si} = \mathbf{0.73}$ (**$-77\%$ reduction**), proving active consumption of $\text{Ca(OH)}_2$ by amorphous silica and formation of dense, low-Ca C-S-H with superior binding capability.
  * Seamless matrix-to-shell transition with zero interfacial gap.

#### B. XRD (X-Ray Diffraction) & FTIR Confirmation
* Significant reduction in $\text{Ca(OH)}_2$ diffraction peak intensities at $2\theta = 18.1^\circ$ and $34.1^\circ$.
* Broadening of the amorphous C-S-H hump at $2\theta \approx 29.4^\circ$.
* FTIR Si-O-Si asymmetric stretching band shifts to higher wavenumbers ($970 \rightarrow 1020\text{ cm}^{-1}$), confirming increased silicate polymerization.

---

### 6.4. Phase 4: Coating Efficacy Comparison

| Parameter | Uncoated (Raw) EPS (20% vol) | Surface-Coated EPS (20% vol) | Percentage Difference |
| :--- | :---: | :---: | :---: |
| **Fresh Density** ($\text{kg/m}^3$) | $1892$ | $1995$ | $+5.4\%$ (mineral shell mass) |
| **Segregation Index** ($SI$) | **$18.4\%$ (Severe Flotation)** | **$<1.2\%$ (Homogeneous)** | **$-93.5\%$ (Segregation eliminated)** |
| **28d Compressive Strength** ($f_c$) | $9.82\text{ MPa}$ | $17.11\text{ MPa}$ | **$+74.2\%$ improvement** |
| **28d Flexural Strength** ($f_r$) | $2.14\text{ MPa}$ | $3.26\text{ MPa}$ | **$+52.3\%$ improvement** |
| **ITZ Width** ($\mu\text{m}$) | $45 \text{--} 70\ \mu\text{m}$ (wide gap) | $<5\ \mu\text{m}$ (dense interlock) | **$-90\%$ ITZ thickness** |

---

### 6.5. Phase 5: Polypropylene Fiber Reinforcement (Toughness Optimization)

| PP Fiber Dosage (vol %) | Flexural Strength $f_r$ (MPa) | Compressive Strength $f_c$ (MPa) | Flexural Toughness ($T_b$, N·m) | Failure Mode |
| :---: | :---: | :---: | :---: | :--- |
| **$0.00\%$** (Unreinforced) | $3.26$ | $17.11$ | $1.42$ | Sudden brittle snap |
| **$0.15\%$** | $4.12$ | $17.80$ | $2.18$ | Ductile crack initiation |
| **$0.25\%$ (OPTIMUM)** | **$5.58$ ($+71\%$)** | **$18.64$** | **$2.91$ ($+105\%$)** | **Extensive crack bridging & fiber pull-out** |
| **$0.35\%$** | $5.10$ | $16.90$ | $2.84$ | Mild fiber balling |
| **$0.45\%$** | $4.35$ | $14.50$ | $2.55$ | Entrapped air voids from fiber clustering |

---

## 7. Master Comparison: Conventional vs. Upgraded Sustainable EPS Mortar

```
========================================================================================
                  ULTRA-BENCHMARK RADAR PERFORMANCE SUMMARY
========================================================================================
   Metric / Parameter             Conventional EPS   Upgraded EPS Mortar   Delta (%)
----------------------------------------------------------------------------------------
1. Compressive Strength (fc)      11.8 MPa           18.2 MPa              +54% 🚀
2. Flexural Strength (fr)          3.26 MPa           5.58 MPa              +71% 🚀
3. Fracture Toughness (Tb)         1.42 N·m           2.91 N·m             +105% 🚀
4. ITZ Ca/Si Atomic Ratio          3.20               0.73                 -77% (Refined)
5. Carbon Footprint (Embodied CO2) 345 kg CO2/m3      207 kg CO2/m3        -40% (Eco-Green)
6. Strength-to-Cost Efficiency    0.048 MPa/$·m3     0.064 MPa/$·m3        +34% 🚀
7. Dry Oven Density                1890 kg/m3         1970 kg/m3           Lightweight (-18%)
8. Water Absorption                6.80%              3.11%                -54% (Water-Resist)
========================================================================================
```

---

## 8. Statistical & Mathematical Models (ANOVA / RSM Equations)

Face-Centered Central Composite Design (CCF) regression models established for Phase 2:

### 8.1. 28-Day Compressive Strength Model ($f_c$)
$$f_c (\text{MPa}) = 35.42 - 0.782 \cdot (\text{EPS}) + 0.584 \cdot (\text{RHA}) + 0.0094 \cdot (\text{EPS})^2 - 0.0152 \cdot (\text{RHA})^2 - 0.0121 \cdot (\text{EPS} \times \text{RHA})$$
* **$R^2$**: $0.984$
* **Model $F$-Value**: $88.42$ ($p < 0.0001$, statistically highly significant)

### 8.2. 28-Day Flexural Strength Model ($f_r$)
$$f_r (\text{MPa}) = 4.72 - 0.0765 \cdot (\text{EPS}) + 0.0382 \cdot (\text{RHA}) + 0.00084 \cdot (\text{EPS})^2 - 0.00095 \cdot (\text{RHA})^2$$
* **$R^2$**: $0.971$
* **Model $F$-Value**: $64.18$ ($p < 0.0001$)

### 8.3. Apparent Porosity Model ($P_a$)
$$P_a (\%) = 6.08 + 0.124 \cdot (\text{EPS}) - 0.162 \cdot (\text{RHA}) + 0.0028 \cdot (\text{EPS})^2 + 0.0064 \cdot (\text{RHA})^2 - 0.0088 \cdot (\text{EPS} \times \text{RHA})$$
* **$R^2$**: $0.963$
* **Model $F$-Value**: $52.31$ ($p < 0.0001$)

---

## 9. Interactive Web Artifacts & Digital Visualizations

The codebase includes an interactive visualization suite developed using modern web standards (React 19, TypeScript, Vite, TailwindCSS, and Native SVG animation):

1. **Interactive Benchmark Radar Infographic** (`Testing web contents/`):
   * 6-axis 3D isometric obsidian prism radar viewport with White-Hot laser contours and volumetric atmospheric rim glow.
   * Real-time animation counter ticking up from $0\%$ to $+54\%$, $+71\%$, $+105\%$, $-77\%$, $-40\%$, $+34\%$.
   * Single-line bottom-middle floating selector with interactive series dimming/highlighting.
   * High-resolution circular micrographs showcasing:
     * `01 · ITZ BONDING`: Dense C-S-H gel at the interface.
     * `02 · FIBER BRIDGING`: Polypropylene fibers arresting microcracks.
     * `03 · EPS MATRIX`: Surface-coated EPS beads interlocked in cement paste.
2. **4 Dedicated Energy Transfer Conduit Variants**:
   * **Concept 1 (`Scientific Pathways`)**: Direct scientific cause-and-effect conduit routing from each SEM mechanism to the exact macro properties it governs.
   * **Concept 2 (`Central Data Bus`)**: Central vertical quantum trunk bus channeling microstructural energy into the 3D radar core.
   * **Concept 3 (`Interactive Synaptic Rays`)**: On-hover dynamic illumination highlighting targeted properties when hovering over individual micrographs.
   * **Concept 4 (`Minimalist Optical Ribbons`)**: Parallel horizontal dual-tone ribbons with floating frosted mechanism micro-tags.

---

## 10. AI Prompting & Querying Cheat-Sheet

When querying an AI about this project, use these canonical references:

* **Target Material**: *Upgraded Ternary Sustainable Expanded Polystyrene Cement Mortar (OPC + RHA + Coated EPS + PP Fiber)*.
* **Optimal Mix Ratio**: $w/b = 0.48$, $s/b = 2.25$, $10\%$ RHA (cement replacement), $20\%$ Coated EPS (sand volume replacement), $0.25\%$ PP fibers (total mix volume).
* **Key Mechanisms**:
  * *Sand Coating* $\rightarrow$ Prevents EPS buoyancy segregation, creates mechanical interlock.
  * *Rice Husk Ash* $\rightarrow$ Consumes $\text{Ca(OH)}_2$, forms secondary $\text{C-S-H}$, reduces ITZ $\text{Ca/Si}$ by $77\%$.
  * *Polypropylene Fiber* $\rightarrow$ 3D crack-bridging network, increases toughness by $105\%$, prevents brittle failure.
