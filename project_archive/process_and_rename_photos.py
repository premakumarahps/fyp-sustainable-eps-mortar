import os
import glob
import json
import shutil
from PIL import Image

raw_dir = r"d:\1.Antigravity Projects\14_Final_Year_Project\project_archive\laboratory_photos\raw"
renamed_archive_dir = r"d:\1.Antigravity Projects\14_Final_Year_Project\project_archive\laboratory_photos\renamed"
web_img_dir = r"d:\1.Antigravity Projects\14_Final_Year_Project\public\images\lab"

os.makedirs(renamed_archive_dir, exist_ok=True)
os.makedirs(web_img_dir, exist_ok=True)

# Complete technical mapping for all 83 images
photo_metadata = {
    # Sheet 1
    "IMG-20260927-WA0046.jpg": {
        "slug": "eps_beads_bulk_density_graduated_cylinder",
        "category": "Raw Materials",
        "title": "EPS Beads Bulk Volume & Packing Density Measurement",
        "subtitle": "ASTM C29 / ASTM D692 Cylindrical Graduate Volumetric Characterization",
        "description": "Graduated 1000 mL cylindrical glass measure loaded with ultra-lightweight virgin expanded polystyrene (EPS) spherical beads to determine loose bulk packing density and granular void volume fractions.",
        "tags": ["EPS Beads", "Bulk Density", "Aggregate Characterization", "ASTM C29"]
    },
    "IMG-20260927-WA0048.jpg": {
        "slug": "rha_powder_sieve_pan_electronic_scale_tare",
        "category": "Raw Materials",
        "title": "Rice Husk Ash (RHA) Sieve Pan Tare Weight",
        "subtitle": "Laboratory Sieve Stack Batching on Precision Electronic Scale",
        "description": "Precision electronic top-loading balance reading 999.7 g tare weight with stainless steel 75-micron sieve pan containing ground pozzolanic rice husk ash for fineness analysis.",
        "tags": ["Rice Husk Ash", "Sieve Analysis", "Electronic Balance", "ASTM C618"]
    },
    "IMG-20260927-WA0049.jpg": {
        "slug": "sem_microstructure_binary_pore_segmentation",
        "category": "Microstructure & SEM",
        "title": "SEM Backscattered Microstructure & Pore Network Analysis",
        "subtitle": "Digital Image Processing & Porosity Segmentation",
        "description": "Scanning electron microscope (SEM) workstation monitor displaying high-contrast thresholded backscattered electron (BSE) image for automated areal porosity and pore throat quantification.",
        "tags": ["SEM", "BSE Imaging", "Porosity Analysis", "ImageJ Segmentation"]
    },
    "IMG-20260927-WA0051.jpg": {
        "slug": "sem_edx_spectral_overlay_chemical_mapping",
        "category": "Microstructure & SEM",
        "title": "SEM-EDX In-Situ Microchemical Point Spectrum Overlay",
        "subtitle": "Energy-Dispersive X-Ray Spectroscopy at Interfacial Matrix",
        "description": "Real-time energy-dispersive X-ray (EDX) spectrum overlaid atop SEM cementitious paste micrograph, verifying silica (Si) enrichment from amorphous rice husk ash reaction products.",
        "tags": ["EDX Spectrum", "SEM", "C-S-H Gel", "Chemical Microanalysis"]
    },
    "IMG-20260927-WA0053.jpg": {
        "slug": "edx_spectroscopy_elemental_peaks_si_o_al_ca",
        "category": "Microstructure & SEM",
        "title": "High-Resolution EDX Elemental Fluorescence Spectrum",
        "subtitle": "Quantitative Microanalysis of Pozzolanic Reaction Products",
        "description": "Calibrated EDX spectral peak readout highlighting prominent Silicon (Kα 1.74 keV), Oxygen (Kα 0.52 keV), Aluminum (Kα 1.49 keV), and Calcium peaks corresponding to calcium silicate hydrate (C-S-H).",
        "tags": ["EDX", "Elemental Analysis", "Silicon Peak", "Pozzolanic Reaction"]
    },
    "IMG-20260927-WA0055.jpg": {
        "slug": "materials_engineer_sem_edax_workstation",
        "category": "Microstructure & SEM",
        "title": "SEM-EDAX Analytical Suite Operating Environment",
        "subtitle": "Materials Characterization Laboratory Instrumentation",
        "description": "Materials engineering research scholar operating the scanning electron microscope dual-console workstation, tuning electron beam astigmatism, accelerating voltage (15 kV), and focus.",
        "tags": ["SEM Workstation", "Laboratory Research", "Electron Microscopy", "UoM Facility"]
    },
    "IMG-20260927-WA0057.jpg": {
        "slug": "sem_live_interface_specimen_scanning",
        "category": "Microstructure & SEM",
        "title": "Live SEM Chamber Scanning & Microstructure Acquisition",
        "subtitle": "Real-Time Interfacial Transition Zone (ITZ) Inspection",
        "description": "Microscope software control interface showing real-time specimen rastering across mortar matrix cross-sections, examining micro-crack propagation and pore wall morphology.",
        "tags": ["SEM Interface", "ITZ Morphology", "Raster Scanning", "Materials Science"]
    },
    "IMG-20260927-WA0061.jpg": {
        "slug": "optical_microscope_circular_rha_dispersion",
        "category": "Microstructure & SEM",
        "title": "Transmitted Light Optical Micrograph of Ash Dispersion",
        "subtitle": "Petrographic Particle Morphology & Aggregation Assessment",
        "description": "Circular optical field of view under 100x magnification illustrating pozzolanic micro-particle dispersion, angular morphology, and absence of agglomeration in prepared test suspensions.",
        "tags": ["Optical Microscopy", "Particle Dispersion", "Microstructure", "Petrography"]
    },
    "IMG-20260927-WA0093.jpg": {
        "slug": "sem_bse_porous_matrix_cellular_architecture",
        "category": "Microstructure & SEM",
        "title": "SEM Cellular Matrix Pore Architecture & Boundary Walls",
        "subtitle": "Pore Distribution within Lightweight Ferrocement Matrix",
        "description": "Backscattered electron micrograph highlighting the intricate cellular pore walls, micro-capillary channels, and dense cementitious matrix reinforced with pozzolanic RHA binder.",
        "tags": ["SEM", "Cellular Porosity", "BSE", "Ferrocement Matrix"]
    },
    "IMG-20260927-WA0116.jpg": {
        "slug": "eps_beads_hydrophobic_floating_surface_tension",
        "category": "Raw Materials",
        "title": "EPS Beads Water Immersion & Hydrophobicity Evaluation",
        "subtitle": "Surface Wetting Resistance in Aqueous Meniscus Test",
        "description": "Expanded polystyrene beads resting atop an aqueous meniscus in a shallow glass dish, demonstrating robust intrinsic hydrophobicity and minimal water absorption prior to surface treatment.",
        "tags": ["EPS Beads", "Hydrophobicity", "Surface Tension", "Water Absorption"]
    },
    "IMG-20260927-WA0118.jpg": {
        "slug": "eps_spherical_beads_macro_texture_petri_dish",
        "category": "Raw Materials",
        "title": "Virgin EPS Bead Spherical Morphology & Texture",
        "subtitle": "Monodisperse Granulometric Visual Quality Inspection",
        "description": "Macro photographic detail of spherical closed-cell expanded polystyrene beads (1.5 - 2.5 mm diameter) exhibiting consistent sphericity and closed cellular exterior skin.",
        "tags": ["EPS Beads", "Macro Photography", "Aggregate Texture", "Granulometry"]
    },
    "IMG-20260927-WA0119.jpg": {
        "slug": "eps_beads_sieve_funnel_mechanical_shaker",
        "category": "Raw Materials",
        "title": "EPS Granular Fractionation via Mechanical Sieve Stack",
        "subtitle": "ASTM C136 Standard Sieve Classification of Lightweight Aggregate",
        "description": "Funneling virgin EPS beads into brass woven-wire testing sieves mounted on a mechanical shaker stack for grain size distribution and fineness modulus determination.",
        "tags": ["Sieve Shaker", "EPS Fractionation", "ASTM C136", "Gradation"]
    },
    "IMG-20260927-WA0205.jpg": {
        "slug": "mortar_fresh_cast_triple_steel_prism_mold",
        "category": "Casting & Curing",
        "title": "Fresh Mortar Casting in Three-Gang Steel Prism Mold",
        "subtitle": "EN 196-1 / ASTM C348 40x40x160mm Test Specimen Casting",
        "description": "Triple-gang heavy-duty steel mold filled with freshly consolidated lightweight ferrocement mortar paste, clamped with precision end-plates awaiting initial setting in humidity chamber.",
        "tags": ["Prism Mold", "EN 196-1", "Mortar Casting", "Specimen Fabrication"]
    },
    "IMG-20260927-WA0254.jpg": {
        "slug": "sem_workstation_dual_screen_operator_console",
        "category": "Microstructure & SEM",
        "title": "SEM Specimen Analysis Console & Dual Monitor Setup",
        "subtitle": "Advanced Electron Optical Characterization in Progress",
        "description": "Detailed perspective of the researcher operating the electron microscope manual rotary stage controls and secondary electron image acquisition software simultaneously.",
        "tags": ["SEM Console", "Laboratory Research", "Instrumentation", "Microscopy"]
    },
    "IMG-20260927-WA0263.jpg": {
        "slug": "electronic_scale_sieve_pan_batching_perspective",
        "category": "Raw Materials",
        "title": "Precision Electronic Balance Batching for Sieve Analysis",
        "subtitle": "Gravimetric Quality Control of Ash & Aggregates",
        "description": "Overhead bench perspective of digital balance displaying 999.7 g, surrounded by standardized sieve pans and aggregate staging trays during binder batching procedures.",
        "tags": ["Gravimetric Batching", "Electronic Scale", "Raw Materials", "Quality Control"]
    },
    "IMG-20260927-WA0264.jpg": {
        "slug": "analytical_micro_balance_crucible_logbook",
        "category": "Raw Materials",
        "title": "High-Precision Analytical Balance (0.1 mg) & Lab Logbook",
        "subtitle": "Loss on Ignition (LOI) & Micro-Batching Record",
        "description": "Precision analytical laboratory balance with glass draft shield weighing ceramic test crucibles, accompanied by official university experimental research logbook entries.",
        "tags": ["Analytical Balance", "LOI Testing", "Laboratory Logbook", "ASTM C114"]
    },
    # Sheet 2
    "IMG-20260927-WA0271.jpg": {
        "slug": "mineral_powder_specimen_filter_paper",
        "category": "Raw Materials",
        "title": "Calcined Mineral Pozzolan on Analytical Filter Paper",
        "subtitle": "Colorimetric & Particle Homogeneity Visual Check",
        "description": "Evenly dispersed specimen of calcined rice husk ash on ashless analytical filter paper, showing consistent light-grey coloration indicating high silica amorphous purity and low unburned carbon.",
        "tags": ["Pozzolan Powder", "RHA Quality", "Calcination", "Filter Paper"]
    },
    "IMG-20260927-WA0272.jpg": {
        "slug": "research_scholars_collaborative_sem_session",
        "category": "Microstructure & SEM",
        "title": "Collaborative Microstructure Analysis at SEM Console",
        "subtitle": "Interfacial Transition Zone Assessment by Thesis Team",
        "description": "University of Moratuwa researchers actively evaluating live SEM high-magnification micrographs of the EPS-paste interface to verify mechanical keying and bond integrity.",
        "tags": ["Research Team", "SEM Collaboration", "ITZ Analysis", "University of Moratuwa"]
    },
    "IMG-20260927-WA0273.jpg": {
        "slug": "fresh_mortar_mini_slump_cone_lifting",
        "category": "Fresh Properties & Mixing",
        "title": "Mini-Slump Cone Test Demolding on Flow Board",
        "subtitle": "Rheological Workability Assessment of Fresh Lightweight Mortar",
        "description": "Action shot of lifting the standardized brass mini-slump cone from the green flow board, initiating the unconfined gravitational spread of the freshly mixed lightweight mortar.",
        "tags": ["Mini-Slump Test", "Workability", "Rheology", "Fresh Concrete"]
    },
    "IMG-20260927-WA0275.jpg": {
        "slug": "manual_mortar_batch_mixing_trowel_scoop",
        "category": "Fresh Properties & Mixing",
        "title": "Intensive Hand Mixing of Binder and Sand Aggregates",
        "subtitle": "ASTM C305 Homogenization in Heavy-Duty Batch Tray",
        "description": "Research engineers performing rigorous manual blending with trowel and scoop to achieve uniform dispersion of Portland cement, fine silica sand, and pozzolanic RHA.",
        "tags": ["Hand Mixing", "Homogenization", "ASTM C305", "Fresh Mortar"]
    },
    "IMG-20260927-WA0276.jpg": {
        "slug": "aggregate_sand_batching_electronic_scale",
        "category": "Raw Materials",
        "title": "Silica Sand Aggregate Weighing on Digital Bench Scale",
        "subtitle": "Accurate Mix Proportioning for Mortar Matrix Phase",
        "description": "Digital bench scale displaying gravimetric batching of graded river sand aggregate in a transparent glass container, adhering strictly to EN 196-1 aggregate ratios.",
        "tags": ["Aggregate Batching", "Silica Sand", "Digital Scale", "Mix Proportions"]
    },
    "IMG-20260927-WA0277.jpg": {
        "slug": "dry_mortar_constituents_trowel_mixing_tray",
        "category": "Fresh Properties & Mixing",
        "title": "Dry Constituents Blending in Mortar Batching Tray",
        "subtitle": "Pre-Hydration Homogenization of Cement, RHA, and Sand",
        "description": "Heavy-duty poly mixing tray containing accurately proportioned dry cementitious binder and fine aggregate with pointed steel trowel prior to water and admixture dosing.",
        "tags": ["Dry Blending", "Batching Tray", "Cementitious Matrix", "Preparation"]
    },
    "IMG-20260927-WA0278.jpg": {
        "slug": "fresh_wet_mortar_paste_consolidation_tray",
        "category": "Fresh Properties & Mixing",
        "title": "Hydrated Lightweight Mortar Paste in Mixing Vessel",
        "subtitle": "Fresh Plastic Consistency and Cohesiveness Verification",
        "description": "Freshly hydrated mortar paste displaying excellent cohesive consistency, zero segregation of EPS lightweight spheres, and uniform paste lubrication across all particles.",
        "tags": ["Wet Mortar", "Plastic Consistency", "Cohesiveness", "Non-Segregating"]
    },
    "IMG-20260927-WA0279.jpg": {
        "slug": "pulverized_rha_funnel_sample_container",
        "category": "Raw Materials",
        "title": "Fine Ash Sample Transfer into Airtight Storage Vial",
        "subtitle": "Moisture Protection for Specific Surface Area Testing",
        "description": "Funneling ultra-fine pulverized rice husk ash from glazed paper into a sealed laboratory container to prevent ambient humidity absorption prior to Blaine fineness testing.",
        "tags": ["Ash Transfer", "Sample Preservation", "Specific Surface", "Laboratory Prep"]
    },
    "IMG-20260927-WA0280.jpg": {
        "slug": "eps_beads_gravimetric_weighing_steel_bowl",
        "category": "Raw Materials",
        "title": "Gravimetric Weighing of EPS Lightweight Beads",
        "subtitle": "Electronic Scale Batching for Volumetric Replacement Ratio",
        "description": "Stainless steel weighing bowl on digital scale reading 11.3 g of monodisperse EPS beads, accurately calibrated for 30% aggregate volumetric replacement mix designs.",
        "tags": ["EPS Weighing", "Volumetric Replacement", "Batching", "Lightweight Concrete"]
    },
    "IMG-20260927-WA0282.jpg": {
        "slug": "laboratory_ball_mill_pulverizing_machine",
        "category": "Raw Materials",
        "title": "Laboratory Ball Mill Roller System for Pozzolan Grinding",
        "subtitle": "Mechanical Activation & Particle Size Reduction of RHA",
        "description": "Heavy-duty multi-roller ball mill processing machine with steel chassis and drive motor used to pulverize raw combusted rice husk ash to sub-45 micron reactive pozzolan.",
        "tags": ["Ball Mill", "Mechanical Activation", "Grinding", "Particle Size Reduction"]
    },
    "IMG-20260927-WA0287.jpg": {
        "slug": "mortar_mixing_slump_testing_workstation",
        "category": "Fresh Properties & Mixing",
        "title": "Complete Fresh Testing Workstation Layout",
        "subtitle": "Batching Tray, Mini-Slump Board, and Water Tempering Bath",
        "description": "Comprehensive panoramic view of the outdoor experimental testing bay, showcasing mixing tray, blue water bath, leveling board, and flow measurement table.",
        "tags": ["Testing Bay", "Workstation Layout", "Slump Table", "Field Lab"]
    },
    "IMG-20260927-WA0288.jpg": {
        "slug": "sem_edx_spectrum_display_close_up",
        "category": "Microstructure & SEM",
        "title": "SEM Screen Close-Up of EDX Compositional Analysis",
        "subtitle": "Confirmation of Reactive Pozzolanic Microstructure",
        "description": "Direct display capture of the EDX acquisition window demonstrating sharp Silicon K-alpha peak dominance, verifying silica-rich pozzolanic binder formation.",
        "tags": ["EDX Close-Up", "Silicon Dominance", "Microanalysis", "SEM Software"]
    },
    "IMG-20260927-WA0289.jpg": {
        "slug": "dry_powder_batch_homogenization_trowel",
        "category": "Fresh Properties & Mixing",
        "title": "Uniform Dry Powder Spreading and Blending",
        "subtitle": "Ensuring Homogeneous Ash Distribution in Cement Matrix",
        "description": "Stepwise trowel turning of dry cement and rice husk ash blend to eliminate localized agglomerations before introducing water and superplasticizer.",
        "tags": ["Dry Homogenization", "Binder Blending", "Trowel Work", "Matrix Quality"]
    },
    "IMG-20260927-WA0290.jpg": {
        "slug": "ball_mill_ceramic_grinding_media_roller",
        "category": "Raw Materials",
        "title": "Ball Mill Machine with Ceramic Grinding Media & Cylinder",
        "subtitle": "High-Alumina Grinding Balls for Pozzolan Pulverization",
        "description": "Laboratory ball mill unit with high-density alumina ceramic grinding spheres in blue container, used to mill pozzolanic ash without introducing iron contamination.",
        "tags": ["Ceramic Media", "Ball Mill", "Pozzolan Processing", "Grinding Balls"]
    },
    # Sheet 3
    "IMG-20260927-WA0291.jpg": {
        "slug": "mini_slump_cylinder_consolidation_tamping",
        "category": "Fresh Properties & Mixing",
        "title": "Mortar Compaction into Mini-Slump Cylinder",
        "subtitle": "Two-Layer Tamping Consolidation on Flow Table",
        "description": "Technician using a mini-tamping rod to consolidate fresh lightweight mortar in standardized mini-slump cone, removing trapped entrapped air voids before lift.",
        "tags": ["Mini-Slump", "Tamping Consolidation", "ASTM C1437", "Fresh Properties"]
    },
    "IMG-20260927-WA0292.jpg": {
        "slug": "sem_dual_display_microstructure_and_segmentation",
        "category": "Microstructure & SEM",
        "title": "SEM Dual Screen Micrograph & Pore Segmentation Display",
        "subtitle": "Simultaneous Secondary Electron & Quantitative Binary Analysis",
        "description": "Twin laboratory displays showcasing secondary electron high-resolution imaging on left monitor and real-time morphological porosity segmentation on right monitor.",
        "tags": ["Dual Display", "SEM Analysis", "Pore Segmentation", "Microstructure"]
    },
    "IMG-20260927-WA0293.jpg": {
        "slug": "demolded_mini_slump_cone_intact_pat",
        "category": "Fresh Properties & Mixing",
        "title": "Demolded Mini-Slump Specimen Prior to Shock Jolts",
        "subtitle": "Zero-Segregation Slump Pat on Standardized Flow Board",
        "description": "Demolded cylindrical mortar pat standing unsupported on green flow board, demonstrating excellent yield stress, zero bleeding, and stable aggregate suspension.",
        "tags": ["Slump Pat", "Yield Stress", "Zero Bleeding", "Flow Board"]
    },
    "IMG-20260927-WA0294.jpg": {
        "slug": "slump_pat_edge_slump_flow_inspection",
        "category": "Fresh Properties & Mixing",
        "title": "Inspection of Slump Pat Spread & Paste Periphery",
        "subtitle": "Assessing Matrix Viscosity & Particle Separation",
        "description": "Visual quality verification of the outer spread boundary of the mortar pat, validating continuous paste coating of all EPS lightweight particles with no phase separation.",
        "tags": ["Slump Spread", "Viscosity", "Matrix Continuity", "Fresh Properties"]
    },
    "IMG-20260927-WA0295.jpg": {
        "slug": "cementitious_coated_eps_beads_container",
        "category": "Raw Materials",
        "title": "Engineered Surface-Coated EPS Aggregate Beads",
        "subtitle": "Pozzolanic Slurry Pre-Coating for Enhanced ITZ Bond",
        "description": "Glass dish filled with mineral-slurry coated EPS beads exhibiting textured grey cementitious skin designed to dramatically enhance chemical bonding with surrounding mortar matrix.",
        "tags": ["Coated EPS", "Surface Treatment", "ITZ Enhancement", "Lightweight Aggregate"]
    },
    "IMG-20260927-WA0298.jpg": {
        "slug": "research_team_sem_fine_focus_adjustment",
        "category": "Microstructure & SEM",
        "title": "Fine Focus Adjustment on Scanning Electron Microscope",
        "subtitle": "Investigating Interfacial Transition Zone at 5000x Magnification",
        "description": "Research scholars meticulously adjusting probe current and condenser lens settings to capture crisp micrographs of the EPS-cement interfacial transition zone.",
        "tags": ["Fine Focus", "SEM Operation", "5000x Magnification", "Research Team"]
    },
    "IMG-20260927-WA0301.jpg": {
        "slug": "coated_eps_beads_water_immersion_testing",
        "category": "Raw Materials",
        "title": "Coated EPS Beads Water Flotation & Stability Test",
        "subtitle": "Evaluating Wetting Mechanics & Particle Buoyancy Forces",
        "description": "Surface-treated EPS beads partially immersed in clear water within a glass vessel, examining buoyancy behavior, surface tension adhesion, and coating durability.",
        "tags": ["Coated EPS", "Water Immersion", "Buoyancy", "Adhesion Test"]
    },
    "IMG-20260927-WA0304.jpg": {
        "slug": "mortar_prisms_triple_steel_mold_screeded",
        "category": "Casting & Curing",
        "title": "Screeded Mortar Prisms in Triple-Gang Mold with End Clamp",
        "subtitle": "EN 196-1 Standard 40x40x160mm Prism Specimen Finish",
        "description": "Heavy steel prism mold filled with fresh mortar, screeded flush with steel straightedge, clamped with heavy-duty thumbscrew clamp ready for initial curing.",
        "tags": ["Triple Mold", "Screeded Surface", "EN 196-1", "Specimen Fabrication"]
    },
    "IMG-20260927-WA0308.jpg": {
        "slug": "sem_edx_dual_screen_panoramic_laboratory",
        "category": "Microstructure & SEM",
        "title": "Panoramic Overview of SEM-EDX Diagnostic Console",
        "subtitle": "High-Tech Materials Characterization Instrumentation Suite",
        "description": "Wide view of electron microscope analysis terminal displaying live secondary electron and backscattered electron channels alongside EDX chemical mapping modules.",
        "tags": ["SEM Console", "Instrumentation", "Microscopy Lab", "Characterization"]
    },
    "IMG-20260927-WA0309.jpg": {
        "slug": "manual_trowel_folding_cement_sand_blend",
        "category": "Fresh Properties & Mixing",
        "title": "Systematic Trowel Folding of Binder and Aggregates",
        "subtitle": "Dry Batch Homogenization in Specimen Preparation Bay",
        "description": "Trowel flipping and folding the dry mortar constituents to guarantee complete intermixing of rice husk ash pozzolan and standard grade cement particles.",
        "tags": ["Trowel Folding", "Dry Batching", "Homogenization", "Mortar Mixing"]
    },
    "IMG-20260927-WA0310.jpg": {
        "slug": "eps_beads_addition_into_mortar_batch_tray",
        "category": "Fresh Properties & Mixing",
        "title": "Dosing EPS Lightweight Aggregate into Mortar Batch",
        "subtitle": "Careful Addition of Weighed Beads from Dosing Scoop",
        "description": "Transferring weighed batch of expanded polystyrene beads from blue dispensing scoop directly into the dry cementitious matrix in the mixing tray.",
        "tags": ["EPS Dosing", "Aggregate Addition", "Batching", "Mortar Fabrication"]
    },
    "IMG-20260927-WA0311.jpg": {
        "slug": "sieve_stack_fine_sand_fraction_separation",
        "category": "Raw Materials",
        "title": "Sieve Fractionation of Graded River Sand Aggregates",
        "subtitle": "ASTM C136 Granulometric Particle Size Separation",
        "description": "Standardized brass test sieves stacked with receiver pan containing sieved fine silica sand, ensuring adherence to standard sieve size fractions.",
        "tags": ["Sieve Stack", "Sand Fractionation", "ASTM C136", "Aggregate Quality"]
    },
    "IMG-20260927-WA0312.jpg": {
        "slug": "researcher_conducting_mini_slump_flow_test",
        "category": "Fresh Properties & Mixing",
        "title": "Researcher Performing Mini-Slump Flow Workability Test",
        "subtitle": "Quality Control of Fresh Mortar Mix Consistency",
        "description": "Materials researcher in protective gear executing mini-slump cone placement and compaction adjacent to the active mixing tray in the testing station.",
        "tags": ["Mini-Slump", "Researcher Action", "Quality Control", "Workability"]
    },
    "IMG-20260927-WA0313.jpg": {
        "slug": "mortar_batch_kneading_and_plastic_consolidation",
        "category": "Fresh Properties & Mixing",
        "title": "Vigorous Hand Kneading & Mortar Consolidation",
        "subtitle": "Ensuring Complete Shear Breakdown of Cement Flocs",
        "description": "Intensive manual kneading of the mortar paste using trowel shear actions, ensuring superplasticizer activation and uniform fluidization.",
        "tags": ["Hand Kneading", "Shear Action", "Superplasticizer", "Fresh Mortar"]
    },
    "IMG-20260927-WA0314.jpg": {
        "slug": "mini_slump_cone_tamping_rod_compaction_action",
        "category": "Fresh Properties & Mixing",
        "title": "Tamping Rod Penetration in Mini-Slump Cone",
        "subtitle": "Standard 25-Stroke Compaction for Entrained Air Release",
        "description": "Executing controlled tamping rod strokes through the depth of the mini-slump cone to achieve uniform density across the fresh mortar sample.",
        "tags": ["Tamping Rod", "ASTM C1437", "Compaction", "Fresh Properties"]
    },
    # Sheet 4
    "IMG-20260928-WA0003.jpg": {
        "slug": "slump_flow_circular_pat_measurement_board",
        "category": "Fresh Properties & Mixing",
        "title": "Symmetric Circular Slump Flow Pat on Measurement Board",
        "subtitle": "Evaluating Yield Stress & Self-Leveling Spread Capacity",
        "description": "Symmetrical circular spread of fresh lightweight mortar on green calibration board after 15 standard jolts, showing zero aggregate halo or perimeter segregation.",
        "tags": ["Slump Flow Pat", "Self-Leveling", "Flow Board", "Rheology"]
    },
    "IMG-20260928-WA0004.jpg": {
        "slug": "slump_flow_diameter_measurement_clear_ruler",
        "category": "Fresh Properties & Mixing",
        "title": "Precise Flow Spread Diameter Measurement via Rule",
        "subtitle": "ASTM C1437 Two-Directional Flow Diameter Measurement",
        "description": "Direct millimeter measurement of the mortar spread diameter using transparent technical rule, confirming flow values within specified high-workability target envelope.",
        "tags": ["Flow Measurement", "Clear Ruler", "ASTM C1437", "Workability"]
    },
    "IMG-20260928-WA0006.jpg": {
        "slug": "dry_constituents_scoop_blending_mortar_tray",
        "category": "Fresh Properties & Mixing",
        "title": "Scoop Blending of Cement and Sifted Aggregates",
        "subtitle": "Preliminary Dry Mixing in Polyethylene Mortar Vessel",
        "description": "Technician using broad scoop to systematically lift and blend dry cement, RHA pozzolan, and sand constituents into a uniform composite powder.",
        "tags": ["Scoop Blending", "Dry Mixing", "Poly Tray", "Fresh Properties"]
    },
    "IMG-20260928-WA0008.jpg": {
        "slug": "slump_flow_diameter_orthogonal_axis_measurement",
        "category": "Fresh Properties & Mixing",
        "title": "Orthogonal Axis Flow Spread Diameter Measurement",
        "subtitle": "ASTM C1437 90-Degree Flow Diameter Cross-Verification",
        "description": "Measuring the perpendicular 90-degree diameter across the mortar spread pat to calculate true mean slump flow diameter (D = (d1 + d2)/2).",
        "tags": ["Orthogonal Measurement", "Flow Diameter", "ASTM C1437", "Slump Flow"]
    },
    "IMG-20260928-WA0009.jpg": {
        "slug": "trowel_turning_mortar_dry_mix_tray",
        "category": "Fresh Properties & Mixing",
        "title": "Precision Trowel Turning of Dry Batch Constituents",
        "subtitle": "Ensuring Homogeneous Particle Distribution Throughout",
        "description": "Trowel slicing and turning through dry mortar mix, verifying absence of unmixed pockets of fine ash prior to gauging with water.",
        "tags": ["Trowel Turning", "Batch Homogeneity", "Dry Mix", "Quality Control"]
    },
    "IMG-20260928-WA0010.jpg": {
        "slug": "cured_mortar_prisms_s1_m1_to_m5_demolded",
        "category": "Casting & Curing",
        "title": "Demolded Cured Mortar Prisms (Series 1: M1 to M5)",
        "subtitle": "EN 196-1 Standard 40x40x160mm Prisms for Flexure & Compression",
        "description": "Complete experimental series of 5 demolded cured mortar prisms marked S1 M1, S1 M2, S1 M3, S1 M4, and S1 M5, showing smooth compacted cast surfaces.",
        "tags": ["Mortar Prisms", "Series 1 M1-M5", "EN 196-1", "Mechanical Specimens"]
    },
    "IMG-20260928-WA0011.jpg": {
        "slug": "trowel_mixing_dry_matrix_field_station",
        "category": "Fresh Properties & Mixing",
        "title": "Manual Mortar Matrix Dry Batching Execution",
        "subtitle": "Continuous Trowel Agitation for Fine Particle Dispersal",
        "description": "Stepwise blending in the outdoor testing bay, ensuring complete incorporation of pozzolanic micro-silica derived from agricultural rice husk ash.",
        "tags": ["Manual Mixing", "Dry Matrix", "Pozzolan Dispersal", "Field Station"]
    },
    "IMG-20260928-WA0012.jpg": {
        "slug": "calcined_rha_powder_dish_laboratory_oven",
        "category": "Raw Materials",
        "title": "Calcined Rice Husk Ash (RHA) in Dish next to Drying Oven",
        "subtitle": "Thermal Conditioning & Moisture Removal at 105°C",
        "description": "White ceramic dish containing finely milled, thermally activated rice husk ash positioned beside standard laboratory drying oven after thermal treatment.",
        "tags": ["RHA Powder", "Drying Oven", "Thermal Activation", "Pozzolan"]
    },
    "IMG-20260928-WA0015.jpg": {
        "slug": "specific_gravity_flask_funnel_rha_dosing",
        "category": "Raw Materials",
        "title": "Specific Gravity Le Chatelier Flask Funnel Dosing",
        "subtitle": "ASTM C188 Density Determination of Pozzolanic Ash",
        "description": "Close-up of glass funnel guiding pulverized rice husk ash powder into calibrated 250 mL volumetric Le Chatelier flask for specific gravity measurement.",
        "tags": ["Specific Gravity", "Le Chatelier Flask", "ASTM C188", "Density Testing"]
    },
    "IMG-20260928-WA0016.jpg": {
        "slug": "researcher_specific_gravity_pycnometer_filling",
        "category": "Raw Materials",
        "title": "Researcher Dosing Powder into Specific Gravity Flask",
        "subtitle": "Precision Gravimetric Volumetric Displacement Method",
        "description": "Laboratory researcher carefully tapping pozzolanic powder through analytical funnel into specific gravity flask seated upon digital electronic scale.",
        "tags": ["Pycnometer Filling", "Specific Gravity", "ASTM C188", "Lab Technique"]
    },
    "IMG-20260928-WA0017.jpg": {
        "slug": "analytical_balance_crucible_tare_weight",
        "category": "Raw Materials",
        "title": "Porcelain Crucible Tare Weighing on Analytical Balance",
        "subtitle": "Loss on Ignition (LOI) & Carbon Content Evaluation",
        "description": "Precision electronic top-loading analytical balance with black porcelain crucible, verifying tare mass before high-temperature muffle furnace ignition.",
        "tags": ["Analytical Balance", "Crucible Weighing", "LOI Test", "ASTM C114"]
    },
    "IMG-20260928-WA0019.jpg": {
        "slug": "pycnometer_flask_fluid_level_digital_balance",
        "category": "Raw Materials",
        "title": "Specific Gravity Flask Liquid Displacement on Scale",
        "subtitle": "Displacement Liquid Weighing (268.3 g Readout)",
        "description": "Volumetric displacement flask containing standard kerosene displacement fluid on digital scale (268.3 g) for density determination of porous ash particles.",
        "tags": ["Pycnometer Displacement", "Liquid Weighing", "ASTM C188", "Density"]
    },
    "IMG-20260928-WA0020.jpg": {
        "slug": "ball_mill_pulverizer_drive_roller_chassis",
        "category": "Raw Materials",
        "title": "Ball Mill Roller Chassis & Grinding Media Staging",
        "subtitle": "Mechanical Attrition Setup for Micro-Silica Refinement",
        "description": "View of the laboratory mechanical ball mill roller assembly featuring rubberized drive rollers, control box, and container of ceramic grinding media.",
        "tags": ["Ball Mill", "Drive Rollers", "Mechanical Attrition", "Equipment"]
    },
    "IMG-20260928-WA0021.jpg": {
        "slug": "chemical_titration_vial_colorimetric_indicator",
        "category": "Microstructure & SEM",
        "title": "Chemical Colorimetric Indicator Reaction in Test Vial",
        "subtitle": "Phenolphthalein / Pozzolanic Reactivity Calcium Hydroxide Test",
        "description": "Gloved hands holding glass vial containing vibrant purple indicator solution during chemical titration testing to assess calcium hydroxide [Ca(OH)2] consumption.",
        "tags": ["Chemical Titration", "Colorimetric Test", "Calcium Hydroxide", "Reactivity"]
    },
    "IMG-20260928-WA0023.jpg": {
        "slug": "wet_chemistry_bench_analytical_balance_titration",
        "category": "Microstructure & SEM",
        "title": "Wet Chemistry Analytical Bench Setup",
        "subtitle": "Comprehensive Chemical Reagent & Gravimetric Testing Station",
        "description": "Benchtop analytical laboratory setup complete with magnetic stirrers, analytical balances, reagent beakers, test tube racks, and titration flasks.",
        "tags": ["Wet Chemistry Bench", "Titration Setup", "Analytical Lab", "Reagents"]
    },
    # Sheet 5
    "IMG-20260928-WA0027.jpg": {
        "slug": "optical_microscope_ash_particle_microstructure",
        "category": "Microstructure & SEM",
        "title": "Optical Micrograph of Ground RHA Particulate Microstructure",
        "subtitle": "High-Magnification Transmitted Light Morphology",
        "description": "Circular optical microscope view under transmitted illumination highlighting irregular cellular morphology, angular fragments, and microporous texture of ground RHA.",
        "tags": ["Optical Micrograph", "Ash Morphology", "Microporous Texture", "Petrography"]
    },
    "IMG-20260928-WA0030.jpg": {
        "slug": "rha_powder_funnel_flask_transfer_close_up",
        "category": "Raw Materials",
        "title": "Powder Funneling into Specific Gravity Flask Close-Up",
        "subtitle": "Air-Free Powder Addition for Precision Pycnometry",
        "description": "High-magnification close-up of glazed paper funnel directing fine mineral pozzolan powder into narrow-neck calibrated volumetric flask without dusting.",
        "tags": ["Powder Transfer", "Specific Gravity", "Volumetric Flask", "Lab Technique"]
    },
    "IMG-20260928-WA0031.jpg": {
        "slug": "triple_steel_prism_mold_oiled_prepared_casting",
        "category": "Casting & Curing",
        "title": "Three-Gang Steel Prism Mold Cleaned and Oiled for Casting",
        "subtitle": "EN 196-1 Standard Three-Compartment 40x40x160mm Mold",
        "description": "Cleaned, demolding-oil treated triple compartment steel prism mold assembly securely bolted to baseplate, prepared for mortar placement and compaction.",
        "tags": ["Steel Mold", "Oiled Compartments", "EN 196-1", "Specimen Prep"]
    },
    "IMG-20260928-WA0034.jpg": {
        "slug": "fine_ground_rha_powder_dish_macro",
        "category": "Raw Materials",
        "title": "Macro Detail of Fine-Ground Rice Husk Ash Powder",
        "subtitle": "Homogeneous Particle Texture after Mechanical Ball Milling",
        "description": "Macro photograph of finely pulverized RHA pozzolan in ceramic dish exhibiting uniform velvet texture and consistent ash-grey tone indicative of high amorphous content.",
        "tags": ["Ground RHA", "Macro Detail", "Pozzolan Powder", "Amorphous Silica"]
    },
    "IMG-20260928-WA0035.jpg": {
        "slug": "mini_slump_cone_filled_compacted_on_plate",
        "category": "Fresh Properties & Mixing",
        "title": "Compacted Mortar in Mini-Slump Cone on Flow Plate",
        "subtitle": "Ready for Vertical Cone Demolding & Gravity Spread",
        "description": "Standardized conical brass mini-slump cone completely filled with compacted lightweight mortar, screeded flush at top rim, centered upon green flow table.",
        "tags": ["Mini-Slump Cone", "Compacted Mortar", "Flow Table", "Workability"]
    },
    "IMG-20260928-WA0036.jpg": {
        "slug": "trowel_casting_mortar_into_triple_steel_mold",
        "category": "Casting & Curing",
        "title": "Placing Fresh Mortar into Steel Prism Mold with Trowel",
        "subtitle": "Careful Specimen Layering to Prevent Trapped Air Voids",
        "description": "Hand placement of freshly mixed lightweight mortar into the individual compartments of the triple-gang steel mold using pointed trowel edge.",
        "tags": ["Mortar Placement", "Trowel Casting", "Prism Mold", "Fabrication"]
    },
    "IMG-20260928-WA0039.jpg": {
        "slug": "screeded_mortar_prisms_labeled_m1_m2_m3",
        "category": "Casting & Curing",
        "title": "Fresh Mortar Prisms Labeled M1, M2, M3 in Steel Mold",
        "subtitle": "Mix Identification Inscribed on Mold Base with Lab Notebook",
        "description": "Top view of screeded mortar prisms inside triple steel mold with hand-written mix identifiers M3, M1, M2 on mold rim and research logbook in background.",
        "tags": ["Labeled Prisms", "Mix Identification", "Screeded Mortar", "Research Log"]
    },
    "IMG-20260928-WA0040.jpg": {
        "slug": "porcelain_crucible_electronic_balance_weighing",
        "category": "Raw Materials",
        "title": "Porcelain Ignition Crucible on Electronic Balance",
        "subtitle": "Gravimetric Pre-Weighing for High-Temperature Calcination",
        "description": "Dark porcelain ignition crucible positioned on top-loading electronic balance pan during loss-on-ignition gravimetric testing protocols.",
        "tags": ["Crucible", "Electronic Balance", "Gravimetric Analysis", "LOI Testing"]
    },
    "IMG-20260928-WA0041.jpg": {
        "slug": "high_slump_mortar_spread_pat_flow_table",
        "category": "Fresh Properties & Mixing",
        "title": "High-Flow Mortar Pat Spreading on Flow Table",
        "subtitle": "Evaluating High-Fluidity Self-Compacting Mix Design",
        "description": "Wide unconfined spread of self-leveling lightweight ferrocement mortar across green flow plate, showcasing fluid mobility without segregation.",
        "tags": ["High Flow", "Self-Compacting", "Flow Table", "Fluidity"]
    },
    "IMG-20260928-WA0046.jpg": {
        "slug": "optical_microscope_warm_field_particle_dispersion",
        "category": "Microstructure & SEM",
        "title": "Optical Micrograph of Mineral Particles (Warm Field)",
        "subtitle": "Transmission Illumination Particle Contrast Examination",
        "description": "Circular field of view under transmitted illumination showing particle boundaries, dispersion quality, and refractive contrast of mineral powder particles.",
        "tags": ["Optical Microscopy", "Warm Field", "Particle Contrast", "Petrography"]
    },
    "IMG-20260928-WA0049.jpg": {
        "slug": "optical_microscope_sharp_particulate_field",
        "category": "Microstructure & SEM",
        "title": "High-Definition Optical Micrograph of Ash Particles",
        "subtitle": "Sub-Micron Particulate Distribution & Grain Geometry",
        "description": "High-definition optical petrographic view revealing angular micro-fragments and sub-micron particulate distribution of mechanically ground rice husk ash.",
        "tags": ["HD Optical Micrograph", "Grain Geometry", "Ash Particles", "Petrography"]
    },
    "IMG-20260928-WA0054.jpg": {
        "slug": "chemical_test_sink_indicator_vials",
        "category": "Microstructure & SEM",
        "title": "Chemical Colorimetric Testing & Reagent Neutralization",
        "subtitle": "Safety Washing & Reagent Titration in Laboratory Sink",
        "description": "Researcher in chemical protective nitrile gloves rinsing glassware and monitoring purple indicator color shift during calcium ion titration analysis.",
        "tags": ["Chemical Test", "Indicator Vials", "Lab Safety", "Titration"]
    },
    "IMG-20260928-WA0062.jpg": {
        "slug": "optical_microscope_dark_field_particle_clusters",
        "category": "Microstructure & SEM",
        "title": "Optical Micrograph of Mineral Particle Clustering",
        "subtitle": "Agglomeration Tendency Evaluation under Contrast Illumination",
        "description": "High-magnification circular optical view examining cluster formation and electrostatic flocculation tendencies of sub-sieve pozzolanic micro-powders.",
        "tags": ["Particle Clustering", "Agglomeration", "Optical Microscopy", "Flocculation"]
    },
    "IMG-20260928-WA0064.jpg": {
        "slug": "researcher_mold_preparation_protective_gloves",
        "category": "Casting & Curing",
        "title": "Technician Preparing Steel Mold Cavities for Casting",
        "subtitle": "Applying Release Agent & Aligning Mold Dividers",
        "description": "Laboratory researcher wearing protective gloves applying form release oil to steel prism mold cavities to ensure clean demolding of cured specimens.",
        "tags": ["Mold Preparation", "Release Agent", "Lab Technique", "Casting Prep"]
    },
    "IMG-20260928-WA0080.jpg": {
        "slug": "optical_microscope_macro_particle_matrix",
        "category": "Microstructure & SEM",
        "title": "Optical Micrograph of Particle Matrix Packing",
        "subtitle": "Micro-Packing Density of Cement-Pozzolan Blended System",
        "description": "Microscopic view under transmitted light illustrating particle packing arrangement and void distribution in dry blended cementitious systems.",
        "tags": ["Particle Packing", "Micro-Packing", "Optical Microscopy", "Matrix Structure"]
    },
    "IMG-20260928-WA0081.jpg": {
        "slug": "mini_slump_cone_aligned_on_flow_board",
        "category": "Fresh Properties & Mixing",
        "title": "Mini-Slump Cone Accurately Centered on Green Flow Table",
        "subtitle": "Preparation for Rheological Slump Flow Standard Test",
        "description": "Overhead view of brass mini-slump cone precisely positioned on concentric alignment circles of green flow plate prior to filling and consolidation.",
        "tags": ["Slump Cone", "Flow Table", "Rheology Prep", "Fresh Mortar"]
    },
    # Sheet 6
    "IMG-20260928-WA0097.jpg": {
        "slug": "petri_dish_powder_mass_balance_readout_198g",
        "category": "Raw Materials",
        "title": "Petri Dish Sample Mass Verification (198.07 g)",
        "subtitle": "Precision Gravimetric Calibration on Digital Balance",
        "description": "Digital electronic balance displaying 198.07 g containing mineral powder sample in glass petri dish for moisture content and density calibration.",
        "tags": ["Mass Verification", "Digital Balance", "Petri Dish", "Quality Control"]
    },
    "IMG-20260928-WA0101.jpg": {
        "slug": "fresh_mortar_slump_cone_compacted_overview",
        "category": "Fresh Properties & Mixing",
        "title": "Overview of Compacted Mortar Cylinder on Flow Plate",
        "subtitle": "High-Angle Perspective of Mini-Slump Workability Station",
        "description": "High-angle view of the mini-slump testing setup showing the freshly struck-off mortar cylinder in its brass mold, ready for lifting and measurement.",
        "tags": ["Slump Setup", "Overview", "Fresh Mortar", "Workability"]
    },
    "IMG-20260928-WA0103.jpg": {
        "slug": "slump_cone_initial_spread_and_paste_bleed_test",
        "category": "Fresh Properties & Mixing",
        "title": "Slump Cone Initial Demolding & Flow Spread Assessment",
        "subtitle": "Monitoring Paste Retention & Bleeding Water Dynamics",
        "description": "Demolding the brass cylinder from the fresh mortar, displaying homogeneous paste flow without excess free bleed water, proving robust mixture stability.",
        "tags": ["Slump Demolding", "Bleed Resistance", "Mixture Stability", "Fresh Properties"]
    },
    "IMG-20260928-WA0104.jpg": {
        "slug": "slump_pat_spread_final_resting_profile",
        "category": "Fresh Properties & Mixing",
        "title": "Final Resting Profile of Deformed Mortar Slump Pat",
        "subtitle": "Post-Jolt Flow Diameter Evaluation for Self-Leveling Mix",
        "description": "Circular spread pat of mortar after completing standardized flow table jolts, demonstrating excellent cohesion, uniform thickness, and edge stability.",
        "tags": ["Spread Pat", "Flow Table Jolts", "Cohesion", "Self-Leveling"]
    },
    "IMG-20260928-WA0105.jpg": {
        "slug": "demolded_prisms_s1_m1_to_m5_angled_view",
        "category": "Casting & Curing",
        "title": "Demolded Cured Prisms (S1 M1 to S1 M5) Top-Down Perspective",
        "subtitle": "Surface Texture and Compaction Quality Evaluation",
        "description": "Top-down view of 5 demolded test prisms (S1 M1 through S1 M5) displaying sharp clean edges, absence of honeycombing, and smooth cast surfaces.",
        "tags": ["Prisms Top View", "Series 1", "Surface Quality", "EN 196-1"]
    },
    "IMG-20260928-WA0106.jpg": {
        "slug": "hand_trowel_charging_steel_prism_mold",
        "category": "Casting & Curing",
        "title": "Charging Steel Prism Mold Cavities with Mortar Batch",
        "subtitle": "Manual Placement and Initial Consolidation of Mortar Paste",
        "description": "Research engineer spooning fresh lightweight mortar paste from the black mixing pan directly into the open compartments of the steel prism mold.",
        "tags": ["Mold Charging", "Trowel Placement", "Casting", "Specimen Prep"]
    },
    "IMG-20260928-WA0107.jpg": {
        "slug": "clear_ruler_spread_diameter_verification_measurement",
        "category": "Fresh Properties & Mixing",
        "title": "Clear Technical Ruler Spread Diameter Verification",
        "subtitle": "Accurate Flow Measurement Across Deformed Mortar Pat",
        "description": "Close alignment of transparent engineering ruler across maximum spread diameter of mortar pat, recording flow diameter to nearest millimeter.",
        "tags": ["Spread Verification", "Clear Ruler", "Flow Diameter", "ASTM C1437"]
    }
}

print(f"Total mapped files: {len(photo_metadata)}")

# Process each file:
# 1. Rename and copy pristine original to renamed archive
# 2. Generate web-optimized WebP (max 1600px, quality 85)
# 3. Generate web-optimized JPG (max 1600px, quality 85)
manifest_entries = []

for orig_name, meta in photo_metadata.items():
    src_path = os.path.join(raw_dir, orig_name)
    if not os.path.exists(src_path):
        print(f"WARNING: {orig_name} not found in raw dir!")
        continue
    
    slug = meta["slug"]
    category = meta["category"]
    renamed_filename = f"{slug}.jpg"
    dst_archive_path = os.path.join(renamed_archive_dir, renamed_filename)
    
    # Copy full-resolution original
    shutil.copy2(src_path, dst_archive_path)
    
    # Open image with PIL for web optimization
    with Image.open(src_path) as img:
        # Convert RGBA/P to RGB if needed
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
            
        orig_w, orig_h = img.size
        
        # Calculate resize keeping aspect ratio max 1600px
        max_dim = 1600
        if max(orig_w, orig_h) > max_dim:
            if orig_w > orig_h:
                new_w = max_dim
                new_h = int(orig_h * (max_dim / orig_w))
            else:
                new_h = max_dim
                new_w = int(orig_w * (max_dim / orig_h))
            web_img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        else:
            new_w, new_h = orig_w, orig_h
            web_img = img.copy()
            
        # Save WebP and JPG
        webp_name = f"{slug}.webp"
        jpg_name = f"{slug}.jpg"
        
        webp_path = os.path.join(web_img_dir, webp_name)
        jpg_path = os.path.join(web_img_dir, jpg_name)
        
        web_img.save(webp_path, "WEBP", quality=85, method=6)
        web_img.save(jpg_path, "JPEG", quality=85, optimize=True)
        
        webp_size_kb = os.path.getsize(webp_path) // 1024
        
        manifest_entries.append({
            "id": slug,
            "filename": jpg_name,
            "webpFilename": webp_name,
            "originalFilename": orig_name,
            "category": category,
            "title": meta["title"],
            "subtitle": meta["subtitle"],
            "description": meta["description"],
            "tags": meta["tags"],
            "width": new_w,
            "height": new_h,
            "sizeKb": webp_size_kb,
            "webPath": f"/images/lab/{webp_name}",
            "fallbackPath": f"/images/lab/{jpg_name}"
        })

print(f"Successfully processed {len(manifest_entries)} images!")

# Write JSON manifest
json_out_path = r"d:\1.Antigravity Projects\14_Final_Year_Project\src\core\laboratoryPhotosData.json"
with open(json_out_path, "w", encoding="utf-8") as jf:
    json.dump(manifest_entries, jf, indent=2)
print(f"Saved JSON data to {json_out_path}")

# Write TypeScript module
ts_out_path = r"d:\1.Antigravity Projects\14_Final_Year_Project\src\core\laboratoryPhotosData.ts"
with open(ts_out_path, "w", encoding="utf-8") as tf:
    tf.write("""export interface LabPhoto {
  id: string;
  filename: string;
  webpFilename: string;
  originalFilename: string;
  category: 'Raw Materials' | 'Fresh Properties & Mixing' | 'Casting & Curing' | 'Microstructure & SEM';
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  width: number;
  height: number;
  sizeKb: number;
  webPath: string;
  fallbackPath: string;
}

export const LABORATORY_PHOTOS: LabPhoto[] = """)
    json.dump(manifest_entries, tf, indent=2)
    tf.write(";\n")

print(f"Saved TypeScript data to {ts_out_path}")
