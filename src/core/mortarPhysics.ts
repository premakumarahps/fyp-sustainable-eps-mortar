/**
 * Mortar Physics & Absolute Volume Method Engine
 * Based on Chapter 4 & 5 of the Final Year Project Thesis (University of Moratuwa)
 * Authors: H.P.S. Premakumara (210494D), K. Mayoorathan (210381E)
 */

export interface MixDesignInputs {
  batchVolumeM3: number; // Volume in m3 (e.g. 1.0 m3 or 0.00096 m3 for 3 standard prisms)
  wb: number; // Water-to-binder ratio (0.35 - 0.50)
  sb: number; // Sand-to-binder ratio (1.5 - 3.0)
  rhaPct: number; // RHA mass replacement of cement (0 - 20%)
  epsPct: number; // Coated EPS volume replacement of sand (0 - 40%)
  ppFiberPct: number; // PP micro-fiber dosage by volume (0 - 2.0%)
  spDosagePct?: number; // Superplasticizer dosage % of binder (default 0.8%)
}

export interface MixBatchOutput {
  compositeSG_b: number;
  totalBinderMass: number; // kg
  cementMass: number; // kg
  rhaMass: number; // kg
  sandMass: number; // kg
  epsVolumeLiters: number; // L
  epsMass: number; // kg
  waterMass: number; // kg
  fiberMass: number; // kg
  spMass: number; // kg
  totalMass: number; // kg
  theoreticalDensity: number; // kg/m3
  predictedFc: number; // MPa
  predictedFr: number; // MPa
  predictedToughness: number; // mJ/mm3
  predictedPorosity: number; // %
  co2SavingsKg: number; // kg CO2 saved via clinker replacement
  deadWeightSavingsPct: number; // % weight saved vs 2300 kg/m3 control
}

// Physical constants from Chapter 3 & 4
export const SPECIFIC_GRAVITIES = {
  cement: 3.15,
  rha: 2.12,
  sand: 2.65,
  coatedEPS: 0.150,
  rawEPS: 0.015,
  ppFiber: 0.91,
  superplasticizer: 1.20,
  water: 1.00,
};

/**
 * Calculates batch masses and predicted performance metrics using the Absolute Volume Method
 */
export function calculateAbsoluteVolumeMix(inputs: MixDesignInputs): MixBatchOutput {
  const {
    batchVolumeM3,
    wb,
    sb,
    rhaPct,
    epsPct,
    ppFiberPct,
    spDosagePct = 0.8
  } = inputs;

  const r = rhaPct / 100.0;
  const v = epsPct / 100.0;
  const vFiberFrac = ppFiberPct / 100.0;

  // Composite specific gravity of binder (SG_b) - Eq 4.2.3.1
  const sgC = SPECIFIC_GRAVITIES.cement;
  const sgRHA = SPECIFIC_GRAVITIES.rha;
  const compositeSG_b = 1.0 / (((1.0 - r) / sgC) + (r / sgRHA));

  // Volume available for binder + water + aggregates (99% of total volume, 1% entrapped air)
  // For 1.0 m3, target effective volume = 990 Liters = 0.990 m3
  const targetEffectiveLiters = batchVolumeM3 * 990.0;

  // Fiber volume in liters
  const fiberVolumeLiters = (batchVolumeM3 * 1000.0) * vFiberFrac;

  // Remaining space for (Binder + Water + Sand + EPS)
  // Because EPS directly substitutes Sand volumetrically, (1-v) + v cancels out in the binder mass equation!
  // m_b * [ (1 / SG_b) + (w/b) + (s/b / SG_s) ] = 990 - V_fiber (Liters)
  const volPerKgBinder = (1.0 / compositeSG_b) + wb + (sb / SPECIFIC_GRAVITIES.sand);
  const totalBinderMass = (targetEffectiveLiters - fiberVolumeLiters) / volPerKgBinder;

  // Component Masses
  const cementMass = totalBinderMass * (1.0 - r);
  const rhaMass = totalBinderMass * r;
  const sandMass = totalBinderMass * sb * (1.0 - v);

  // EPS Volume and Mass
  const epsVolumeLiters = (totalBinderMass * sb * v) / SPECIFIC_GRAVITIES.sand;
  const epsMass = (epsVolumeLiters / 1000.0) * (SPECIFIC_GRAVITIES.coatedEPS * 1000.0);

  // Water and Admixtures
  const waterMass = totalBinderMass * wb;
  const fiberMass = (fiberVolumeLiters / 1000.0) * (SPECIFIC_GRAVITIES.ppFiber * 1000.0);
  const spMass = totalBinderMass * (spDosagePct / 100.0);

  // Total Batch Mass and Density
  const totalMass = cementMass + rhaMass + sandMass + epsMass + waterMass + fiberMass + spMass;
  const theoreticalDensity = totalMass / batchVolumeM3;

  // Performance Predictions based on True-Fit Regression Models
  let predictedFc = 0;
  let predictedFr = 0;
  let predictedToughness = 0;
  let predictedPorosity = 0;

  if (v === 0 && r === 0) {
    // Pure Phase 1 plain mortar model
    predictedPorosity = 14.07 - 47.29 * wb - 0.74 * sb + 68.02 * (wb ** 2) + 0.21 * (sb ** 2) + 1.60 * (wb * sb);
    predictedFc = 119.42 - 195.94 * wb - 24.01 * sb + 116.79 * (wb ** 2) + 2.04 * (sb ** 2) + 23.01 * (wb * sb);
    predictedFr = 20.48 - 42.84 * wb - 3.64 * sb + 32.18 * (wb ** 2) + 0.32 * (sb ** 2) + 3.36 * (wb * sb);
    predictedToughness = 137.10 - 304.49 * wb - 15.23 * sb + 246.56 * (wb ** 2) + 0.56 * (sb ** 2) + 15.55 * (wb * sb);
  } else {
    // Phase 2 + Phase 5 composite model
    // Base lightweight predictions from Phase 2 models:
    const rVal = rhaPct;
    const eVal = epsPct;
    let baseFr = 4.74 + 0.12 * rVal - 0.11 * eVal - 0.005 * (rVal ** 2) + 0.001 * (eVal ** 2) - 0.001 * (rVal * eVal);
    let baseFc = 35.58 + 2.05 * rVal - 1.25 * eVal - 0.07 * (rVal ** 2) + 0.01 * (eVal ** 2) - 0.015 * (rVal * eVal);
    let baseT = 35.47 + 0.25 * rVal - 1.10 * eVal - 0.02 * (rVal ** 2) + 0.006 * (eVal ** 2) - 0.004 * (rVal * eVal);
    let baseP = 6.33 - 0.176 * rVal + 0.042 * eVal + 0.0097 * (rVal ** 2) + 0.00011 * (eVal ** 2) - 0.00108 * (rVal * eVal);

    // Apply Phase 5 PP Micro-Fiber adjustments:
    // 0.5% fiber: fr +10.1%, Toughness +24.0%, fc -6.9%
    // 1.0% fiber: fr +22.6%, Toughness +72.8%, fc -15.7%
    // 1.5% fiber: fr +12.0%, Toughness +96.2%, fc -29.4% (balling onset)
    // 2.0% fiber: fr -11.4%, Toughness +114.5%, fc -34.1% (degradation plateau)
    const fVal = ppFiberPct;
    let fiberFcFactor = 1.0;
    let fiberFrFactor = 1.0;
    let fiberTFactor = 1.0;
    let fiberPFactor = 1.0;

    if (fVal > 0) {
      fiberFcFactor = 1.0 - 0.14 * fVal - 0.02 * (fVal ** 2);
      fiberFrFactor = 1.0 + 0.35 * fVal - 0.22 * (fVal ** 2);
      fiberTFactor = 1.0 + 0.55 * fVal + 0.02 * (fVal ** 2);
      fiberPFactor = 1.0 + 0.10 * fVal;
    }

    predictedFc = Math.max(1.0, baseFc * fiberFcFactor);
    predictedFr = Math.max(0.5, baseFr * fiberFrFactor);
    predictedToughness = Math.max(1.0, baseT * fiberTFactor);
    predictedPorosity = Math.max(3.0, baseP * fiberPFactor);
  }

  // Environmental LCA Carbon Offset:
  // ~0.82 kg CO2 avoided per kg OPC clinker replaced by agricultural RHA
  const co2SavingsKg = rhaMass * 0.82;

  // Dead-weight savings vs dense 2300 kg/m3 plain mortar
  const baselineMass = batchVolumeM3 * 2300.0;
  const deadWeightSavingsPct = Math.max(0, ((baselineMass - totalMass) / baselineMass) * 100.0);

  return {
    compositeSG_b: Number(compositeSG_b.toFixed(3)),
    totalBinderMass: Number(totalBinderMass.toFixed(2)),
    cementMass: Number(cementMass.toFixed(2)),
    rhaMass: Number(rhaMass.toFixed(2)),
    sandMass: Number(sandMass.toFixed(2)),
    epsVolumeLiters: Number(epsVolumeLiters.toFixed(2)),
    epsMass: Number(epsMass.toFixed(2)),
    waterMass: Number(waterMass.toFixed(2)),
    fiberMass: Number(fiberMass.toFixed(3)),
    spMass: Number(spMass.toFixed(3)),
    totalMass: Number(totalMass.toFixed(2)),
    theoreticalDensity: Number(theoreticalDensity.toFixed(1)),
    predictedFc: Number(predictedFc.toFixed(2)),
    predictedFr: Number(predictedFr.toFixed(2)),
    predictedToughness: Number(predictedToughness.toFixed(2)),
    predictedPorosity: Number(predictedPorosity.toFixed(2)),
    co2SavingsKg: Number(co2SavingsKg.toFixed(2)),
    deadWeightSavingsPct: Number(deadWeightSavingsPct.toFixed(1))
  };
}
