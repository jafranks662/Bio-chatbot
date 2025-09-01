export interface SubStandard {
  code: string;
  label: string;
}

export const standards: Record<string, SubStandard[]> = {
  "1A": [
    { code: "1A0", label: "Scientific Method and the Origin of Life" },
    { code: "1A1", label: "Characteristics of Life - Living vs Nonliving" },
    { code: "1A2", label: "The Cell Theory - Hooke, Schleiden, Schwann, Virchow" },
    { code: "1A3", label: "Cellular Organization - Cell, Tissue, Organ, Organ System" },
    { code: "1A4", label: "Viruses - Living or Nonliving" }
  ],
  "1B": [
    { code: "1B1", label: "Macromolecules - Carbohydrates, Lipids, Proteins, Nucleic Acids" },
    { code: "1B2", label: "Enzymes - Catalyst" }
  ],
  "1C": [
    { code: "1C1", label: "Cell Parts - Organelles" },
    { code: "1C2", label: "Types of Cells - Prokaryotic, Eukaryotic, Plant, Animal, Fungi Cells" },
    { code: "1C3", label: "Viruses vs Cells - Host Cell Machinery" }
  ],
  "1D": [
    { code: "1D1", label: "Cell Transport - Cell Membrane, Phospholipids, Transport Proteins, Cholesterol" },
    { code: "1D2", label: "Osmosis and Tonicity - Hypotonic, Hypertonic, Isotonic" }
  ],
  "1E": [
    { code: "1E1", label: "Cell Differentiation and Cancer" },
    { code: "1E2", label: "The Cell Cycle - Interphase (G1, S, G2), Mitosis, Cytokinesis" },
    { code: "1E3", label: "Asexual Reproduction - Binary Fission, Budding, Vegetative Propagation, Fragmentation/Regeneration" }
  ],
  "2": [
    { code: "2.1", label: "ATP - Energy in Cells" },
    { code: "2.2", label: "Photosynthesis - Light-Dependent Reactions, Calvin Cycle, Reactants, Products" },
    { code: "2.3", label: "Cellular Respiration - Glycolysis, Krebs Cycle, ETC, Reactants, Products" },
    { code: "2.4", label: "Aerobic and Anaerobic Respiration" }
  ],
  "3A": [
    { code: "3A1", label: "Meiosis and Sexual Reproduction - Spermatogenesis, Oogenesis, Meiosis I & II, Fertilization, Conjugation" },
    { code: "3A2", label: "Mitosis vs Meiosis" },
    { code: "3A3", label: "Chromosome Mutations - Nondisjunction; Down, Klinefelter, Turner Syndromes" }
  ],
  "3B": [
    { code: "3B1", label: "Mendel and Punnett Squares" },
    { code: "3B2", label: "Dihybrid Crosses - 16-square Punnett Squares" },
    { code: "3B3", label: "Non-Mendelian Genetics - Codominance, Incomplete Dominance, Multiple Alleles (Blood Types), Sex-linked Traits (X-linked)" },
    { code: "3B4", label: "Human Genetic Disorders and Pedigrees" }
  ],
  "3C": [
    { code: "3C1", label: "DNA, Genes, Chromosomes Relationship" },
    { code: "3C2", label: "Protein Synthesis - Transcription, Translation, Types of RNA" },
    { code: "3C3", label: "Gene Mutations - Point & Frameshift (Insertion, Deletion, Substitution)" },
    { code: "3C4", label: "DNA Technology - Genetic Engineering, Cloning, DNA Fingerprinting, GMOs" }
  ],
  "4": [
    { code: "4.1", label: "Chemical vs Organic Evolution" },
    { code: "4.2", label: "Evidence of Evolution - Homologous and Analogous Structures" },
    { code: "4.3", label: "Cladograms and Phylogenetic Trees" },
    { code: "4.4", label: "Modes of Selection - Stabilizing, Directional, Disruptive" },
    { code: "4.5", label: "Darwin and Natural Selection" },
    { code: "4.6", label: "Speciation" }
  ],
  "5": [
    { code: "5.1", label: "Ecological Organization - Organism, Population, Community, Ecosystem" },
    { code: "5.2", label: "Biogeochemical Cycles - Water, Carbon, Nitrogen, Phosphorus" },
    { code: "5.3", label: "Greenhouse Gases" },
    { code: "5.4", label: "Energy and Biomass in Ecosystems - Trophic, Energy, Biomass, Numbers Pyramids" },
    { code: "5.5", label: "Ecological Relationships - Herbivory, Predation, Mutualism, Commensalism, Parasitism" },
    { code: "5.6", label: "Populations - Carrying Capacity, Limiting Factors, Exponential and Logistic Growth" },
    { code: "5.7", label: "Ecological Succession - Primary, Secondary" }
  ]
};

export const mainStandardOrder = [
  "1A", "1B", "1C", "1D", "1E",
  "2",
  "3A", "3B", "3C",
  "4",
  "5"
];
