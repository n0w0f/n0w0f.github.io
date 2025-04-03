export interface Portfolio {
  title: string;
  description: string;
  technologies?: string[];
  imageUrl?: string;
  projectUrl?: string;
  codeUrl?: string;
}

// export const portfolioData: Portfolio[] = [
//   // Example entry
//   {
//     title: "Causal Discovery Framework",
//     description:
//       "A framework for discovering causal relationships in high-dimensional time series data using state-of-the-art machine learning techniques.",
//     technologies: ["Python", "PyTorch", "React"],
//     projectUrl: "https://project-demo.com",
//     imageUrl:
//       "https://images.unsplash.com/photo-1561622539-dffbfc2008fd?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     codeUrl: "https://github.com/username/project",
//   },
// ];
export const portfolioData: Portfolio[] = [
  // {
  //   title: "QpiVoltaET",
  //   description: "Cloud-based platform to accelerate materials discovery using neural network models as alternatives to first principle simulations, with uncertainty-aware, physics-informed GNN workflows.",
  //   technologies: ["Python", "PyTorch", "PyG", "FastAPI", "Docker", "flyte"],
  // },
  {
    title: "EnergyNet",
    description: "Graph neural network framework for predicting structure property relationships of periodic crystals and molecules. Ranked within top 7 models in NeurIPs OC20 Competition.",
    technologies: ["Python", "PyTorch", "PyG"],
    projectUrl: "https://opencatalystproject.org/challenge.html",
  },
];