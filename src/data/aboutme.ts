export interface AboutMe {
  name: string;
  title: string;
  institution: string;
  description: string;
  email: string;
  imageUrl?: string;
  blogUrl?: string;
  cvUrl?: string;
  googleScholarUrl?: string;
  twitterUsername?: string;
  githubUsername?: string;
  linkedinUsername?: string;
  funDescription?: string; // Gets placed in the left sidebar
  secretDescription?: string; // Gets placed in the bottom
  altName?: string;
  institutionUrl?: string;
}


export const aboutMe: AboutMe = {
  name: "Nawaf Alampara",
  title: "Doctoral Researcher",
  institution: "Friedrich-Schiller-Universität Jena",
  // Note that links work in the description
  description:
    `I am second-year PhD student, working with <a href='https://kjablonka.com/'>Dr. Kevin Maik Jablonka</a>.
     I'm building machine learning systems to speed up scientific research, and I love projects that involve both research and building the tooling that enables and accelerates that research.
     Lately, I’ve been analyzing general-purpose AI models/systems to understand their limitations in scientific applications—where they fail—and interpreting them to uncover why they fail.
     My goal is to use these insights to design AI systems that aren’t just impressive on benchmarks but truly impactful for advancing science and research.`,
  email: "pvt.nawaf@gmail.com",
  imageUrl:
    "https://lamalab.org/images/team/nawaf.png",
  googleScholarUrl: "https://scholar.google.com/citations?user=R7K3xFIAAAAJ&hl=en",
  githubUsername: "n0w0f",
  linkedinUsername: "n0w0f",
  twitterUsername: "Iam_Nawaf_",
  blogUrl: "https://n0w0f.github.io/gsoc2025",
  cvUrl: "https://n0w0f.github.io/cv/index.html",
  institutionUrl: "https://www.uni-jena.de/en",
  // altName: "",
  // secretDescription: "I like dogs.",
};
