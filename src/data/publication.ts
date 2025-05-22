export interface Publication {
  year: string;
  conference: string;
  title: string;
  authors: string;
  paperUrl?: string;
  codeUrl?: string;
  bibtex?: string;
  tldr?: string;
  imageUrl?: string;
  leaderboardUrl?: string;
  award?: string;
}

export const publicationData: Publication[] = [
  {
    year: "2024",
    conference: "AI4Mat-Vienna 2024",
    title: "MatText: Do Language Models Need More than Text & Scale for Materials Modeling?",
    authors: "Nawaf Alampara, Santiago Miret, Kevin Maik Jablonka",
    paperUrl: "https://arxiv.org/abs/2406.17295v2",
    codeUrl: "https://github.com/lamalab-org/MatText",
    imageUrl: "https://github.com/lamalab-org/mattext/raw/main/docs/static/logo.png",
    award: "⭐ spotlight (oral)",
    tldr: "Revealing Transformer models' (IFT and trained from scratch) limitations in capturing 3D geometric information crucial for materials modeling.",
  },
  {
    year: "2024",
    conference: "Nature Chemistry",
    title: "A framework for evaluating the chemical knowledge and reasoning abilities of large language models against the expertise of chemists",
    authors: "Adrian Mirza, Nawaf Alampara, ..,Kevin Maik Jablonka",
    paperUrl: "hhttps://www.nature.com/articles/s41557-025-01815-x",
    codeUrl: "https://github.com/lamalab-org/chem-bench",
    imageUrl: "/static/cb_logo.png",
    leaderboardUrl: "https://huggingface.co/spaces/jablonkagroup/ChemBench-Leaderboard",
    tldr: "First comprehensive benchmark for chemistry-specific AI capabilities, evaluating chemical knowledge, intuition, and reasoning of LLMs against human chemists.",
  },
  {
    year: "2024",
    conference: "AI4Mat-NeurIPS 2024",
    title: "Probing the limitations of multimodal language models for chemistry and materials research",
    authors: "Nawaf Alampara, et al.",
    paperUrl: "https://arxiv.org/pdf/2411.16955",
    imageUrl: "/static/mb_logo.png",
    leaderboardUrl: "https://huggingface.co/spaces/jablonkagroup/MaCBench-Leaderboard",
    tldr: "Multimodal benchmark for chemistry/materials science for AI with ablations to interpret the limitations",
    award: "⭐ spotlight (oral)",
  },
  {
    year: "2025",
    paperUrl: "https://arxiv.org/abs/2505.12534",
    title: "ChemPile: A 250GB Diverse and Curated Dataset for Chemical Foundation Models",
    authors: "Adrian Mirza, Nawaf Alampara, Martiño Ríos-García,.., Michael Pieler, Kevin Maik Jablonka",
    tldr: "Thoughts on evaluating ML systems in materials science",
    conference: ""
  },
  {
    year: "2025",
    paperUrl: "https://arxiv.org/abs/2503.10837",
    title: "Lessons from the trenches on evaluating machine-learning systems in materials science",
    authors: "Nawaf Alampara, Mara Schilling-Wilhelmi, Kevin Maik Jablonka",
    tldr: "Thoughts on evaluating ML systems in materials science",
    conference: ""
  },
  {
    year: "2024",
    conference: "Journal of Physics D: Applied Physics",
    title: "Formation of an extended defect cluster in cuprous oxide",
    authors: "G Aggarwal, S Chawla, AJ Singh, Nawaf Alampara, et al.",
    paperUrl: "https://iopscience.iop.org/article/10.1088/1361-6463/ad4a82/meta",
    tldr: "Characterization of intrinsic defects and dopants in Cu₂O, leading to discovery and experimental validation of new defect formation.",
  },

];

// export const publicationData: Publication[] = [
//   // If you don't want to show publications, just make the array empty.
//   {
//     year: "2024",
//     conference: "NeurIPS",
//     title: "Scalable Causal Discovery in High-Dimensional Time Series",
//     authors: "Jane Smith, Sarah Johnson, Yue Zhang",
//     paperUrl: "https://arxiv.org/abs/2409.15476",
//     codeUrl: "https://github.com/jsmith/scalable-causal-discovery",
//     //bibtex: "https://arxiv.org/abs/2409.15476.bib",
//     tldr: "Using causal discovery to find the causal structure of high-dimensional time series data.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1561622539-dffbfc2008fd?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     award: "🏆 Best Paper Award",
//     // if you have an image in public/images, you can use it like this:
//     // imageUrl: "/images/publication-image.jpg"
//   },
//   {
//     year: "2023",
//     conference: "ICML",
//     title: "Robust Causal Discovery Under Distribution Shift",
//     authors: "Jane Smith, Xue Chen, Sarah Johnson",
//     paperUrl: "https://arxiv.org/abs/2302.13095",
//     codeUrl: "https://github.com/jsmith/robust-causal-discovery",
//   },
// ];
