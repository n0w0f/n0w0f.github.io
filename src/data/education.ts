export interface Education {
  year: string;
  institution: string;
  degree: string;
  advisor?: string;
  thesis?: string;
  thesisUrl?: string;
}

export const educationData: Education[] = [
  {
    year: "2023—2026",
    institution: "Friedrich-Schiller-Universität Jena, Germany",
    degree: "PhD Machine Learning for Science",
    advisor: "Dr. Kevin Maik Jablonka",
  },
  {
    year: "2018—2020",
    institution: "Indian Institute of Technology Bombay, India",
    degree: "MSc Energy Science",
    advisor: "Prof. K R Balasubramaniam",
    thesis: "Defects and Dopants in Cu₂O - DFT study",
  },
  {
    year: "2015—2018",
    institution: "Birla Institute of Technology Mesra, India",
    degree: "BSc Physics",
  },
];