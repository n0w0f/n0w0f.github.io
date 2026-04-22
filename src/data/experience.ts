export interface Experience {
  date: string;
  title: string;
  company: string;
  description?: string;
  advisor?: string;
  manager?: string;
  companyUrl?: string;
}

export const experienceData: Experience[] = [
  {
    date: "Feb 2026 - Present",
    title: "AI Resident (Intern)",
    company: "Lila Sciences",
    description:
      "AI agents | Test time strategies | Long context scientific agent environments",
    companyUrl: "https://www.lila.ai",
  },
  {
    date: "Nov 2023 - Present",
    title: "PhD Researcher",
    company: "Friedrich-Schiller-Universität Jena",
    // description:
    //   "Developing benchmarking tools and datasets to finetune and evaluate LLMs' performance in material science. Building evaluation frameworks to assess LLMs' chemical reasoning, intuition, and knowledge against human experts. Creating multi-modal AI benchmarks for scientific data extraction, visual comprehension, and laboratory safety assessment.",
    advisor: "Dr. Kevin Maik Jablonka",
    companyUrl: "https://www.uni-jena.de/en",
  },
  {
    date: "Nov 2023 - Apr 2024",
    title: "AI Research Contractor (Part-time)",
    company: "Stability AI",
    description:
      "Dataset curation | Benchmarking",
    companyUrl: "https://stability.ai",
  },
  {
    date: "Jun 2022 - Sept 2023",
    title: "Principal Engineer",
    company: "QpiVolta Technologies",
    description:
      "Material simulation using geometric deep learning models | Software development",
    companyUrl: "https://qpivolta.tech",
  },
  {
    date: "Jun 2021 - Jun 2022",
    title: "Research Engineer",
    company: "QpiAI Technologies",
    description:
      "Real-time video analytics | Computer vision",
    companyUrl: "https://qpiai.tech",
  },
  // {
  //   date: "Jun 2022 - Sept 2023",
  //   title: "Principal Engineer",
  //   company: "QpiVolta Technologies",
  //   description:
  //     "Led the development of a cloud-based platform for material simulation using geometric deep learning models. Built uncertainty-aware, physics-informed GNN workflows for high-throughput solid-state electrolyte screening.",
  //   companyUrl: "https://qpivolta.tech",
  // },
  // {
  //   date: "Jun 2021 - Jun 2022",
  //   title: "Research Engineer",
  //   company: "QpiAI Technologies",
  //   description:
  //     "Developed DeepStream containers and C++ GStreamer plugins for real-time video analytics. Integrated monocular depth estimation models into safety violation detection pipelines. Implemented object detection micro-services for video analytics platforms.",
  //   companyUrl: "https://qpiai.tech",
  // },
];

