import Image from "next/image";
import { Callout } from "@/components/blog/callout";
import { CodeBlock } from "@/components/blog/code-block";
import { Figure } from "@/components/blog/figure";
import { TaskCard } from "@/components/blog/task-card";

export default function Post() {
  return (
    <>
      <section id="introduction">
        <h2>1. Introduction</h2>
        <p>
          Evaluating frontier models on scientific tasks presents unique challenges. Success often demands a sophisticated blend of domain-specific knowledge, logical reasoning (identifying a sequence of steps from given information and prior knowledge), and multi-step algorithmic execution. Determining the phase of a material from an X-ray diffraction pattern, for instance, requires domain knowledge such as the HKL rules for various crystal structures; reasoning to infer the necessary steps — identifying the highest peak, computing peak ratios — from the given data; and finally execution, the ability to systematically carry out that plan.
        </p>
        <p>
          Existing benchmarks frequently conflate these factors, making it difficult to discern whether a model&apos;s failure stems from a lack of specialized knowledge or an inability to logically apply or execute that knowledge. This &ldquo;knowledge gap&rdquo; often obscures a more fundamental &ldquo;reasoning gap&rdquo;<sup><a href="#ref-1">[1]</a></sup>. A model might fail a scientific reasoning task for want of facts, or — just as often — it might hold the relevant knowledge but be unable to correctly apply a multi-step algorithm or perform accurate intermediate computations. The inherent complexity of the required algorithmic steps is also routinely overlooked: a task demanding five sequential calculations is fundamentally different from one requiring fifty, even when the underlying scientific principle is identical.
        </p>
        <p>
          This project introduces a benchmarking approach aimed at those limitations. The primary motivation is to abstract away domain-specific knowledge as much as possible and focus on the model&apos;s capacity to execute a series of logical and computational steps — an algorithm — once the problem has been conceptually understood. A second motivation is to systematically evaluate how performance degrades as the algorithmic complexity of a task increases. By introducing a <em>scalable variable</em> within each task, we can precisely control the computational burden and observe the resilience limits of different model architectures and prompting strategies.
        </p>
        <p>The methodology involves:</p>
        <ol>
          <li>Designing a diverse set of ten scientific-algorithmic tasks, each with a known solution complexity that can be parametrically varied.</li>
          <li>Evaluating Gemini-2.5-Flash and Gemini-2.5-Pro, with and without a &ldquo;thinking&rdquo; prompting strategy, across varying levels of algorithmic complexity for each task.</li>
          <li>Complementing these evaluations with an analysis of performance when code execution is assumed — i.e., when the model only needs to provide the logic or algorithm that an external interpreter then executes — to further isolate reasoning from direct computation.</li>
        </ol>
        <p>
          The study aims at a more nuanced picture of model capabilities in scientific algorithmic reasoning, with practical implications for building more robust AI systems for scientific applications.
        </p>
      </section>

      <section id="methodology">
        <h2>2. Methodology</h2>
        <p>
          The benchmark framework is a suite of tasks designed around a small set of core principles. These tasks are crafted to rigorously evaluate advanced reasoning while also holding direct implications for a wide spectrum of scientific disciplines — chemistry, physics, materials science, and computer science. Where scientific domain knowledge is necessary, any requisite information (lookup tables, fundamental principles) is provided within the task description. The primary challenge for the model is to infer the correct sequence of steps, or the underlying algorithm, required to address the posed problem.
        </p>
        <p>
          To decouple reasoning from execution, we assess whether the model can articulate the identified steps as executable code, alongside solving the task through a chain-of-thought approach. The successful synthesis of an appropriate algorithm into code serves as a robust, indirect measure of scientific reasoning — one that sidesteps the subjectivity of human or LLM-as-judge evaluations of free-form descriptions. Comparing code-execution accuracy against direct task solution then surfaces the gap between algorithmic inference and precise task execution.
        </p>

        <h3>2.1 Task design principles</h3>
        <p>The framework implements four principles addressing limitations in current evaluation methods:</p>
        <ol>
          <li><strong>Knowledge–Reasoning Separation.</strong> Tasks require minimal domain-specific knowledge while demanding sophisticated algorithmic execution.</li>
          <li><strong>Contamination Resistance.</strong> All tasks generate novel instances through parameterized algorithms, ensuring no specific problem appears in training data. Problem structure remains constant while numerical parameters vary.</li>
          <li><strong>Complexity Tunability.</strong> Each task includes scalable difficulty parameters that enable systematic exploration of performance-degradation patterns. Complexity scaling follows theoretical principles from computational complexity theory.</li>
          <li><strong>Verifiable Execution.</strong> All tasks have algorithmically deterministic solutions with step-by-step verification, eliminating ambiguity in correctness assessment.</li>
        </ol>

        <h3>2.2 An example — the diffusion-pathway task</h3>
        <p>
          Consider the diffusion-pathway task: the model is given a 2D grid representing a crystal surface with both passable sites and impassable defects, along with a start and end coordinate, and asked for the length of the shortest path an atom can take by moving orthogonally across passable sites.
        </p>
        <p>
          The task hits all four design principles. <em>Knowledge–Reasoning Separation</em> — the problem is framed as pure grid-based pathfinding, avoiding specialized materials-science knowledge while demanding robust algorithmic reasoning. <em>Contamination Resistance</em> — parameterized generation produces novel defect configurations for every instance, preventing memorization. <em>Complexity Tunability</em> — the grid size is a tunable parameter, allowing systematic study of degradation as the search space grows. <em>Verifiable Execution</em> — shortest-path algorithms are deterministic, enabling unambiguous assessment against a single algorithmically derivable solution.
        </p>
        <p>
          Scientifically, the task models atomic diffusion and migration in defective crystalline structures — a process that governs phenomena ranging from alloy formation and semiconductor doping to material degradation — providing a simplified yet powerful abstraction for assessing navigation of complex, obstructed landscapes relevant to real-world material behaviour.
        </p>

        <Callout variant="info">
          The design aims to measure algorithmic execution, not domain recall. Any science needed to attempt a task is supplied in the prompt.
        </Callout>

        <h3>2.3 Task summary</h3>
        <p>
          The table below summarises the ten tasks, their algorithmic type, and their complexity scaling. A fuller version including STEM domain, scalable variable, and scientific relevance sits in the expandable section immediately after.
        </p>

        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Algorithm Type</th>
              <th>Complexity</th>
              <th>Key Challenge</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Many Body Energy Computation</td>
              <td>Arithmetic</td>
              <td>O(N²)</td>
              <td>Pairwise interactions scale quadratically</td>
            </tr>
            <tr>
              <td>Peak Identification</td>
              <td>Sequence Processing</td>
              <td>O(N log N)</td>
              <td>Coordinate sorting with overlap detection</td>
            </tr>
            <tr>
              <td>Diffusion Pathway</td>
              <td>Graph Traversal</td>
              <td>O(MN)</td>
              <td>BFS pathfinding with defect constraints</td>
            </tr>
            <tr>
              <td>State Machine Traversal</td>
              <td>Sequence Processing</td>
              <td>O(L)</td>
              <td>Linear state transition tracking</td>
            </tr>
            <tr>
              <td>DNA Transcription</td>
              <td>Sequence Processing</td>
              <td>O(N)</td>
              <td>Codon processing with stop rules</td>
            </tr>
            <tr>
              <td>Resistor Network Simplification</td>
              <td>Arithmetic</td>
              <td>O(N)</td>
              <td>Recursive parsing of nested structures</td>
            </tr>
            <tr>
              <td>Radioactive Decay Chain</td>
              <td>Sequence Processing</td>
              <td>O(L)</td>
              <td>Multi-step decay rule application</td>
            </tr>
            <tr>
              <td>Tree Traversal</td>
              <td>Graph Traversal</td>
              <td>O(N)</td>
              <td>Recursive navigation with order accuracy</td>
            </tr>
            <tr>
              <td>Kinematic Motion</td>
              <td>Arithmetic</td>
              <td>O(N)</td>
              <td>Sequential velocity updates</td>
            </tr>
            <tr>
              <td>Knights and Knaves</td>
              <td>Logical Deduction</td>
              <td>O(2^N)</td>
              <td>Exponential constraint satisfaction</td>
            </tr>
          </tbody>
        </table>

        <details>
          <summary>Full table with scientific relevance</summary>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>STEM Domain</th>
                <th>Algorithm Type</th>
                <th>Variable</th>
                <th>Complexity</th>
                <th>Key Challenge</th>
                <th>Scientific Relevance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Many Body Energy Computation</td>
                <td>Physics</td>
                <td>Arithmetic</td>
                <td>Particles (N)</td>
                <td>O(N²)</td>
                <td>Pairwise interactions scale quadratically</td>
                <td>Molecular interactions, lattice energy</td>
              </tr>
              <tr>
                <td>Peak Identification</td>
                <td>Chemistry / Materials</td>
                <td>Sequence Processing</td>
                <td>Peaks (N)</td>
                <td>O(N log N)</td>
                <td>Coordinate sorting with overlap detection</td>
                <td>Spectroscopy (XRD, NMR) analysis</td>
              </tr>
              <tr>
                <td>Diffusion Pathway</td>
                <td>Materials Science</td>
                <td>Graph Traversal</td>
                <td>Grid (M×N)</td>
                <td>O(MN)</td>
                <td>BFS pathfinding with defect constraints</td>
                <td>Surface diffusion, catalysis</td>
              </tr>
              <tr>
                <td>State Machine Traversal</td>
                <td>Computer Science</td>
                <td>Sequence Processing</td>
                <td>String length (L)</td>
                <td>O(L)</td>
                <td>Linear state transition tracking</td>
                <td>Reaction pathways, phase transitions</td>
              </tr>
              <tr>
                <td>DNA Transcription</td>
                <td>Biology / Chemistry</td>
                <td>Sequence Processing</td>
                <td>DNA length (N)</td>
                <td>O(N)</td>
                <td>Codon processing with stop rules</td>
                <td>Protein synthesis, biomaterials</td>
              </tr>
              <tr>
                <td>Resistor Network Simplification</td>
                <td>Physics / Engineering</td>
                <td>Arithmetic</td>
                <td>Resistors (N)</td>
                <td>O(N)</td>
                <td>Recursive parsing of nested structures</td>
                <td>Conductivity in nanomaterials</td>
              </tr>
              <tr>
                <td>Radioactive Decay Chain</td>
                <td>Physics / Chemistry</td>
                <td>Sequence Processing</td>
                <td>Chain length (L)</td>
                <td>O(L)</td>
                <td>Multi-step decay rule application</td>
                <td>Nuclear chemistry, dating methods</td>
              </tr>
              <tr>
                <td>Tree Traversal</td>
                <td>Computer Science</td>
                <td>Graph Traversal</td>
                <td>Nodes (N)</td>
                <td>O(N)</td>
                <td>Recursive navigation with order accuracy</td>
                <td>Chemical graph structures</td>
              </tr>
              <tr>
                <td>Kinematic Motion</td>
                <td>Physics</td>
                <td>Arithmetic</td>
                <td>Phases (N)</td>
                <td>O(N)</td>
                <td>Sequential velocity updates</td>
                <td>Material particle dynamics</td>
              </tr>
              <tr>
                <td>Knights and Knaves</td>
                <td>Logic</td>
                <td>Logical Deduction</td>
                <td>Islanders (N)</td>
                <td>O(2^N)</td>
                <td>Exponential constraint satisfaction</td>
                <td>Logical hypothesis testing</td>
              </tr>
            </tbody>
          </table>
        </details>
      </section>

      <section id="results">
        <h2>3. Results</h2>
        <p>
          Comparing executable-code solutions against step-by-step language responses illustrates a critical disparity between a model&apos;s reasoning (as inferred from code generation) and its direct problem-solving accuracy via chain-of-thought. Across the tasks, <em>code execution</em> accuracy is consistently and substantially higher than <em>chain-of-thought</em> accuracy — and the contrast is most stark where CoT is near zero while code execution is near perfect.
        </p>

        <Figure caption={"Figure 1 — Performance of Gemini models across tasks comparing executable-code solutions against chain-of-thought language responses."}>
          <Image
            src="/blog/gsoc-2025/images/reasoning.png"
            alt="Bar chart comparing code-execution accuracy vs chain-of-thought accuracy per task for Gemini models"
            width={1600}
            height={900}
            className="mx-auto h-auto w-full"
          />
        </Figure>

        <p>
          The gap suggests that models are often able to identify the correct underlying algorithm — evidenced by their ability to write accurate, executable code — but struggle to flawlessly implement those same steps inside a purely language-based, step-by-step response. The abstract understanding and algorithmic formulation appear robust; the meticulous execution in natural language is where things break. Code execution&apos;s superior performance therefore reads as a strong signal that the foundational reasoning is present, while direct task execution via language output remains a significant area for improvement.
        </p>

        <p>
          Plotting accuracy against the scalable variable also reveals distinct performance curves per model variant. In most tasks, Gemini-2.5-Pro consistently outperforms both vanilla Gemini-2.5-Flash and Gemini-2.5-Flash with an allocated thinking budget. Pro exhibits a higher initial accuracy and maintains performance for longer as complexity grows — especially on the linear-complexity tasks — demonstrating greater robustness in step-by-step chain-of-thought execution.
        </p>

        <Figure caption={"Figure 2 — Performance of Gemini models on each task as the scalable variable (and thus algorithmic complexity) grows."}>
          <Image
            src="/blog/gsoc-2025/images/benchmark_complexity_analysis.jpg"
            alt="Line plots showing accuracy degradation for Gemini models as the scalable variable of each task increases"
            width={1600}
            height={900}
            className="mx-auto h-auto w-full"
          />
        </Figure>

        <p>
          <em>Impact of algorithmic complexity.</em> The consistent trend across almost all tasks is degradation of accuracy as the scalable variable — and thus algorithmic complexity — increases. This confirms the hypothesis that more computational steps, or more data points, challenge the models in a measurable way.
        </p>
        <p>
          <em>Effectiveness of the thinking budget.</em> The explicit thinking process (Gemini-2.5-Flash-Thinking) generally improves on vanilla Gemini-2.5-Flash. For tasks like finite state machine traversal, tree traversal, and diffusion pathway, the thinking variant shows a noticeable uplift, indicating that explicit step-by-step reasoning can mitigate some of the limitations. The improvement is not universal, however, and often doesn&apos;t close the gap to Gemini-2.5-Pro.
        </p>

        <h3>3.1 Slopes of decline</h3>
        <ul>
          <li>Tasks with inherently higher algorithmic complexity (e.g., O(N²) for pairwise interactions, or exponential for Knights &amp; Knaves) show steeper declines for all models — and especially for the Flash variants.</li>
          <li>Tasks requiring linear sequential operations (e.g., finite state machine, kinematic motion) show a more gradual decline for Gemini-2.5-Pro, but still a sharp drop for Flash models beyond a certain threshold.</li>
          <li>The difference in slopes between Gemini-2.5-Pro and the Flash models may suggest that Pro has a greater working-memory capacity for intermediate states and computations, allowing it to sustain accuracy further up the complexity curve before its performance eventually degrades.</li>
        </ul>
      </section>

      <section id="discussion">
        <h2>4. Discussion</h2>
        <p>
          The bottleneck in solving these scientific tasks is often not the knowledge or reasoning capability but the implementation of them, step by step, in a language response. The observed limitations in pure algorithmic execution highlight the continued need for <strong>hybrid AI systems</strong>: LLMs excel at interpreting problems, generating high-level algorithms, or writing code snippets, while dedicated symbolic solvers or traditional programming languages handle the precise, multi-step computations.
        </p>

        <Callout variant="info">
          Knowing the algorithm is not the same as executing it. For many of these tasks the models can describe — or code — a correct procedure, but fail to carry it out faithfully in prose.
        </Callout>

        <p>
          Improving algorithmic reasoning and execution may require moving beyond current token-prediction paradigms. Future models might benefit from integrated &ldquo;thinking engines,&rdquo; symbolic reasoning modules, or more sophisticated internal scratchpads that are less prone to dilution over long reasoning chains. The thinking budget already offers a partial remedy — indicating that explicit articulation of intermediate steps can serve as a form of self-correction, particularly for smaller models like Gemini-2.5-Flash — but the gap to Pro, and to code-executed solutions, persists.
        </p>
        <p>
          To facilitate further research we have released <strong>SciRex</strong>, an open-source Python framework that implements all tasks and evaluation protocols described here. It is designed to support both reproduction of these results and extension to new scientific domains, with built-in multimodal capabilities and systematic complexity scaling. The repository is at <a href="https://github.com/n0w0f/scirex">github.com/n0w0f/scirex</a>.
        </p>
      </section>

      <section id="references">
        <h2>5. References</h2>
        <ol>
          <li id="ref-1">Tie, Guiyao, et al. <em>MMMR: Benchmarking Massive Multi-Modal Reasoning Tasks.</em> arXiv preprint arXiv:2505.16459 (2025).</li>
          <li id="ref-2">Alampara, Nawaf, et al. <em>Probing the limitations of multimodal language models for chemistry and materials research.</em> Nature Computational Science (2025): 1–10.</li>
        </ol>
      </section>

      <section id="codebase">
        <h2>6. Codebase — SciRex</h2>
        <p>
          The full implementation of this benchmarking framework is available as <strong>SciRex</strong>, an open-source Python framework for benchmarking large language models on scientific research tasks. It supports both text-only and multimodal scientific content, with a particular focus on chemistry, physics, and materials-science domains. Source: <a href="https://github.com/n0w0f/scirex">github.com/n0w0f/scirex</a>.
        </p>

        <h3>6.1 Key features</h3>
        <ul>
          <li><strong>Scientific domain specialisation</strong> — tasks designed for STEM domains with algorithmic complexity scaling.</li>
          <li><strong>Multimodal support</strong> — handles text, images, and mixed-modality scientific content.</li>
          <li><strong>Extensible architecture</strong> — simple API for custom datasets, tasks, and model integration.</li>
          <li><strong>Reproducible benchmarks</strong> — standardised evaluation metrics and result-export formats.</li>
        </ul>

        <h3>6.2 Quick start</h3>
        <p>Install SciRex using <code>uv</code> or <code>pip</code>:</p>
        <CodeBlock lang="bash">{`# Using uv (recommended)
curl -LsSf https://astral.sh/uv/install.sh | sh
uv init scirex
uv add git+https://github.com/n0w0f/scirex.git`}</CodeBlock>
        <CodeBlock lang="bash">{`# Using pip
pip install git+https://github.com/n0w0f/scirex.git`}</CodeBlock>

        <h3>6.3 Usage examples</h3>
        <p>Text-only benchmarking:</p>
        <CodeBlock lang="python">{`from scirex import Benchmark, Dataset, GeminiModel, PromptTemplate

# Load dataset and configure model
dataset = Dataset.from_json("path/to/dataset.json")
model = GeminiModel(model_name="gemini-2.5-flash")
prompt = PromptTemplate.from_template("solve_step_by_step")

# Run benchmark
benchmark = Benchmark(dataset, model, prompt)
results = benchmark.run(max_tasks=50, save_results=True)`}</CodeBlock>

        <p>Multimodal benchmarking:</p>
        <CodeBlock lang="python">{`from scirex import Benchmark, Dataset, GeminiModel

# Configure for multimodal tasks
dataset = Dataset.from_json("multimodal_dataset.json")
model = GeminiModel(model_name="gemini-2.5-flash")

# Run with multimodal support
benchmark = Benchmark(dataset, model, test_multimodal=True)
results = benchmark.run(max_tasks=25)`}</CodeBlock>

        <p>Creating a custom task:</p>
        <CodeBlock lang="python">{`from scirex import Task

# Define a custom scientific task
task = Task(
    id="custom_diffusion_001",
    name="Surface Diffusion Analysis",
    description="Analyze atomic diffusion pathways on crystal surfaces",
    answer_type="numeric",
    target_value=42.0,
    keywords=["materials_science", "diffusion", "crystallography"],
    input_template="Given the crystal structure: {structure_image}\\nCalculate the diffusion barrier for path: {text_description}",
    modality_entries={
        "structure_image": "image",
        "text_description": "text"
    }
)`}</CodeBlock>

        <h3>6.4 Configuration</h3>
        <p>Create a <code>.env</code> file for API configuration:</p>
        <CodeBlock lang="bash">{`GEMINI_API_KEY=your_api_key_here`}</CodeBlock>
        <p>
          The framework handles multimodal content detection, input preprocessing, and result aggregation across complexity levels automatically.
        </p>

        <h3>6.5 Framework architecture</h3>
        <p>SciRex implements the design principles described earlier in this post:</p>
        <ul>
          <li><strong>Knowledge–Reasoning Separation</strong> — tasks abstract domain knowledge while focusing on algorithmic execution.</li>
          <li><strong>Contamination Resistance</strong> — parameterised generation prevents training-data overlap.</li>
          <li><strong>Complexity Tunability</strong> — scalable difficulty parameters for systematic performance analysis.</li>
          <li><strong>Verifiable Execution</strong> — deterministic solutions enable objective accuracy assessment.</li>
        </ul>
      </section>

      <section id="tasks">
        <h2>7. Tasks</h2>
        <p>The ten tasks in the benchmark, each with its scalable variable, complexity, and scientific framing.</p>

        <TaskCard
          number={1}
          title="Many Body Energy Computation"
          description="Calculate the total energy of a system with N particles arranged in 2D space. Each particle has an energy of E eV. The pairwise interaction energy between two particles is (distance between particles) times (energy of particle A + energy of particle B), summed only for pairs within 5.0 Å of each other. What is the total energy of the system in eV?"
          scalableVariable="Number of particles (N)"
          complexity="O(N²) — N(N−1)/2 pairwise distance and energy calculations. Simple for N=2 (1 pair), complex for N=50 (1225 pairs) due to quadratic scaling and the 5.0 Å conditional."
          relevance="Models molecular interactions (e.g., Lennard-Jones-like), relevant to chemical systems and material properties such as crystal lattice energy."
          image={{
            src: "/blog/gsoc-2025/images/energy.png",
            alt: "Example particle system with 25 particles for many-body energy calculation",
            caption: "Figure — Example particle system with N=25 particles.",
            width: 800,
            height: 600,
          }}
        />

        <TaskCard
          number={2}
          title="Peak Identification"
          description="Given a list of 2D coordinates representing spectral peaks, in the format [[position_1, intensity_1], [position_2, intensity_2], ...], return the peaks sorted in increasing or decreasing order by the requested axis. The input list is unsorted."
          scalableVariable="Number of peaks (N)"
          complexity="O(N log N) — sorting N 2D coordinates by position or intensity. Simple for N=5, moderate for N=100 due to sorting cost. Overlap detection can push preprocessing toward O(N²)."
          relevance="Core to spectroscopy (e.g., XRD, NMR); used in material characterisation and chemical analysis."
          image={{
            src: "/blog/gsoc-2025/images/sort.png",
            alt: "Spectral data with 25 peaks for identification and sorting task",
            caption: "Figure — Example spectral data with N=25 peaks.",
            width: 800,
            height: 600,
          }}
        />

        <TaskCard
          number={3}
          title="Diffusion Pathway (Shortest Path on a Grid)"
          description="Given a 2D grid representing a crystal surface — a list of lists where 0 is an empty site and 1 is an impassable defect — and a starting and ending coordinate, find the length of the shortest path an atom can take from start to end, moving only up, down, left, or right."
          scalableVariable="Grid size (M×N)"
          complexity="O(MN) — BFS on an M×N grid, avoiding defects. Moderate for 5×5 (25 nodes), complex for 100×100 (10,000 nodes) due to the large search space and defect constraints."
          relevance="Models atomic diffusion on crystal surfaces — key to catalysis and surface-defect studies in materials science."
          image={{
            src: "/blog/gsoc-2025/images/diffusion.png",
            alt: "25x25 grid with defects and pathfinding challenge",
            caption: "Figure — 25×25 grid with defects (dark) and a pathfinding challenge.",
            width: 800,
            height: 600,
          }}
        />

        <TaskCard
          number={4}
          title="Finite State Machine Traversal"
          description="Given the definition of a finite state machine — a set of states, a starting state, an input alphabet, and a transition function (e.g., from state Q1, on input 'a' go to Q2; on 'b' stay at Q1) — and an input string, determine the final state after processing the entire string."
          scalableVariable="Length of input string (L), with 4 states (Q1–Q4) over alphabet {a, b, c}"
          complexity="O(L) — linear tracking of state transitions. Simple for L=5, complex for L=1000. A fixed S=4 keeps the transition table manageable (4×3 = 12 transitions)."
          relevance="Indirectly relevant to modelling chemical reaction pathways or material phase transitions as state machines."
        />

        <TaskCard
          number={5}
          title="DNA Transcription and Translation"
          description="Given a DNA sequence (e.g., 3'-TACGATTACAGC-5') and a standard codon-to-amino-acid lookup table, produce the final polypeptide chain: (1) transcribe the DNA to mRNA (5'-AUGCUAAUGUCG-3'); (2) translate the mRNA codons into a sequence of amino acids (Met-Stop-Met-Ser)."
          scalableVariable="DNA sequence length (N), with 1–2 randomly added stop codons or a single intron"
          complexity="O(N) — N bases transcribed to mRNA, then N/3 codons translated. Simple for N=12, complex for N=1000 with introns and stop codons due to sequence processing and rule application."
          relevance="Protein synthesis — relevant to protein chemistry and biomaterial design (e.g., protein-based materials)."
        />

        <TaskCard
          number={6}
          title="Resistor Network Simplification"
          description="Given a textual description of a resistor circuit (e.g., &ldquo;R1 of 10 Ω is in series with a parallel combination of R2 (20 Ω) and R3 (20 Ω)&rdquo;), calculate the total equivalent resistance of the network. Nesting depths scale with size: up to 10 resistors have 3 levels, up to 20 have 4 levels, and more than 20 go up to 5 levels."
          scalableVariable="Number of resistors (N)"
          complexity="O(N) — combining N resistors via series/parallel rules with recursive parsing of nested structures (up to 5 levels for N>20). Moderate for N=3 (1–2 levels), complex for N=10 (3–5 levels) due to parsing and reciprocal calculations."
          relevance="Relevant to material science through resistor material properties — e.g., conductivity in nanomaterials."
        />

        <TaskCard
          number={7}
          title="Radioactive Decay Chain"
          description="Given a starting isotope (e.g., Uranium-238, Z=92) and a sequence of radioactive decays (e.g., alpha, beta, beta, alpha), identify the final resulting isotope — element name and mass number. Rules: alpha decay reduces Z by 2 and A by 4; beta decay increases Z by 1 and leaves A unchanged."
          scalableVariable="Length of decay chain (L)"
          complexity="O(L) — apply L decay steps (alpha, beta, gamma, theta) tracking Z and A. Moderate for L=3, complex for L=15 with hypothetical decays (e.g., theta: Z−1, A−4) requiring precise arithmetic and rule switching."
          relevance="Nuclear chemistry — relevant to radiometric dating and material stability (e.g., isotopes in materials)."
        />

        <TaskCard
          number={8}
          title="Tree Traversal"
          description="Given a representation of a binary tree (e.g., a nested dictionary like {'value': 10, 'left': {'value': 5}, 'right': {'value': 15}}), return the sequence of node values visited in a specified traversal order — pre-order, in-order, or post-order."
          scalableVariable="Number of nodes in the tree (N)"
          complexity="O(N) — traverses N nodes in a binary tree. Simple for N=5, complex for N=50 due to recursive navigation and order accuracy."
          relevance="Indirectly relevant to chemistry via molecular tree structures (e.g., chemical graphs)."
          image={{
            src: "/blog/gsoc-2025/images/traversal.png",
            alt: "Binary tree traversal example",
            caption: "Figure — Binary tree traversal example.",
            width: 800,
            height: 600,
          }}
        />

        <TaskCard
          number={9}
          title="Kinematic Motion Calculation"
          description="An object starts at rest and undergoes a series of constant accelerations for specified durations (e.g., accelerate at 2 m/s² for 5 s, then at −1 m/s² for 8 s). Calculate the final velocity of the object."
          scalableVariable="Number of distinct acceleration phases (N)"
          complexity="O(N) — apply v = u + at for N phases. Simple for N=2, moderate for N=10 due to sequential velocity updates, but remains linear."
          relevance="Limited direct connection to chemistry/material science, though applicable to material dynamics (e.g., particle motion)."
        />

        <TaskCard
          number={10}
          title="Knights and Knaves Puzzle"
          description="On an island inhabited by Knights (who always tell the truth) and Knaves (who always lie), statements are given from islanders (e.g., &ldquo;A says: B is a Knave. B says: A and I are of opposite types.&rdquo;). Deduce the identity — Knight or Knave — of each person."
          scalableVariable="Number of islanders and statements (N)"
          complexity="O(2^N) — a constraint satisfaction problem over N islanders, testing truth/lie consistency. Complex even for N=2; N=5 is highly challenging due to exponential possibilities."
          relevance="Minimal direct connection to chemistry/material science, but useful for logical hypothesis testing."
        />
      </section>
    </>
  );
}
