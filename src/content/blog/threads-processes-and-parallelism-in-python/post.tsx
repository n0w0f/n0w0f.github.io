import { Callout } from "@/components/blog/callout";
import { CodeBlock } from "@/components/blog/code-block";
import { InterpreterFlow } from "./diagrams/InterpreterFlow";
import { ProcessVsThreadMemory } from "./diagrams/ProcessVsThreadMemory";
import { GilSwitching } from "./diagrams/GilSwitching";

export default function Post() {
  return (
    <>
      <section id="interpreter">
        <h2>1. What is an interpreter?</h2>
        <p>
          When you run <code>python foo.py</code>, your operating system launches the <strong>Python interpreter</strong>. It reads your source file, compiles it to <strong>bytecode</strong> — low-level instructions like &ldquo;load name x&rdquo;, &ldquo;call function&rdquo;, &ldquo;add two numbers&rdquo; — and executes that bytecode one instruction at a time on a stack machine it maintains in memory.
        </p>
        <p>
          Python the language is a specification. An interpreter is a piece of software that implements that specification. The most common one is CPython, written in C, and the reference implementation.
        </p>

        <InterpreterFlow />

        <h3>1.1 CPython, briefly</h3>
        <p>
          CPython is the interpreter you get when you install Python from python.org or your system package manager. Other implementations exist — PyPy (JIT-compiled), Jython (runs on the JVM), IronPython (on .NET) — but CPython is what almost everyone means when they say &ldquo;Python.&rdquo; Crucially, <em>the GIL is a CPython implementation detail</em>, not a language feature. It&apos;s why the rest of this post matters.
        </p>
      </section>

      <section id="gil">
        <h2>2. The GIL</h2>
        <p>
          The <strong>Global Interpreter Lock</strong> is a mutex inside CPython that guarantees only one thread executes Python bytecode at a time within a single interpreter. It exists because CPython&apos;s memory management — reference counting, garbage collection, object state — is not thread-safe without it. The GIL makes the interpreter safe at the cost of true in-process parallelism for Python code.
        </p>

        <GilSwitching />

        <p>
          Every so often (every few milliseconds, by default), the interpreter releases the GIL to give other threads a chance. When Python code calls into C — like NumPy array operations, or blocking I/O — the C code can release the GIL explicitly while it works. This is why NumPy-heavy or I/O-heavy multithreaded Python can still gain parallelism: the heavy work happens outside the lock.
        </p>

        <Callout variant="info">
          The GIL serializes <em>Python bytecode</em>, not all work. Threads that spend most of their time in C extensions or waiting on I/O can run effectively in parallel.
        </Callout>

        <h3>2.1 What the GIL means in practice</h3>
        <ul>
          <li><strong>CPU-bound pure Python</strong> — threads give you <em>no</em> parallelism. Two threads doing arithmetic will together take roughly as long as one.</li>
          <li><strong>I/O-bound work</strong> — threads work fine. A thread blocked on a socket or a file releases the GIL, and others run.</li>
          <li><strong>Numeric / C-extension work</strong> — threads often work. NumPy, Torch, and many scientific libraries release the GIL for their heavy kernels.</li>
        </ul>
      </section>

      <section id="processes-vs-threads">
        <h2>3. Processes vs threads</h2>
        <p>
          A <strong>process</strong> is an isolated unit from the operating system&apos;s point of view: its own memory, its own file descriptors, its own interpreter if it&apos;s running Python. A <strong>thread</strong> is a unit of execution inside a process — it shares memory and the interpreter with its siblings.
        </p>

        <ProcessVsThreadMemory />

        <p>
          Threads are cheap to create and share memory by default, which makes communication trivial but synchronization tricky. Processes are more expensive and don&apos;t share memory by default, so you pay for communication (pickling, pipes, shared memory segments) but get isolation for free — including freedom from the GIL, because each process has its own GIL.
        </p>

        <h3>3.1 Fork, spawn, and starting methods</h3>
        <p>
          On Linux, Python&apos;s default <code>multiprocessing</code> start method historically was <strong>fork</strong>: the child inherits the parent&apos;s memory via copy-on-write. Fast, but unsafe if the parent holds locks, threads, or native resources. <strong>Spawn</strong> (the default on macOS since Python 3.8, and on Windows always) launches a fresh interpreter and pickles the target function and arguments across. Slower to start, much safer.
        </p>

        <Callout variant="warn">
          Mixing threads and <code>fork()</code> is a known foot-gun. If the parent has threads running, the child only inherits the thread that called fork — any locks those other threads held stay locked in the child. If you need multiprocessing in a threaded program, use <code>spawn</code>.
        </Callout>
      </section>

      <section id="sequential-vs-parallel">
        <h2>4. Sequential vs parallel execution</h2>
        <p>
          Two ways to run N units of work:
        </p>
        <ul>
          <li><strong>Sequentially</strong> — one at a time, in order. Predictable, trivial to debug, no coordination overhead. Total time ≈ sum of each unit&apos;s time.</li>
          <li><strong>In parallel</strong> — several at once, across threads or processes. Faster in wall-clock terms when the work is big enough to outweigh coordination cost.</li>
        </ul>

        <p>
          The choice isn&apos;t always obvious. Parallelism has overhead: spawning workers, serializing arguments and results, coordinating completion. If each unit is short (milliseconds), the overhead can swamp the benefit — you&apos;ll finish <em>slower</em> in parallel than sequentially. This is usually called the &ldquo;fan-out cost&rdquo; crossover.
        </p>

        <h3>4.1 Sequential — the baseline</h3>
        <CodeBlock lang="python">{`results = []
for item in items:
    results.append(do_work(item))`}</CodeBlock>

        <p>
          Boring, correct, and often the right answer. Use this first. Only reach for parallelism when you have evidence it helps.
        </p>

        <h3>4.2 Parallel with threads</h3>
        <CodeBlock lang="python">{`from concurrent.futures import ThreadPoolExecutor

with ThreadPoolExecutor(max_workers=8) as pool:
    results = list(pool.map(do_work, items))`}</CodeBlock>

        <p>
          Good when <code>do_work</code> is I/O-bound (HTTP calls, file reads, database queries) or calls into a C extension that releases the GIL. No memory copying. Shared state needs locks.
        </p>

        <h3>4.3 Parallel with processes</h3>
        <CodeBlock lang="python">{`from concurrent.futures import ProcessPoolExecutor

if __name__ == "__main__":
    with ProcessPoolExecutor(max_workers=8) as pool:
        results = list(pool.map(do_work, items))`}</CodeBlock>

        <p>
          Good when <code>do_work</code> is CPU-bound pure Python. Each worker gets its own interpreter and its own GIL. Arguments and return values are pickled across process boundaries — keep them small. The <code>if __name__ == &quot;__main__&quot;</code> guard is not optional on <code>spawn</code> systems; without it, the child re-imports your module and tries to spin up more children, ad infinitum.
        </p>
      </section>

      <section id="pitfalls">
        <h2>5. Known pitfalls</h2>

        <h3>5.1 &ldquo;Threads don&apos;t speed up my code&rdquo;</h3>
        <p>
          If the work is CPU-bound pure Python, it won&apos;t — the GIL serializes it. Switch to processes, or move the hot path into a C extension.
        </p>

        <h3>5.2 &ldquo;Processes are hanging on startup&rdquo;</h3>
        <p>
          Usually one of: (a) missing <code>if __name__ == &quot;__main__&quot;</code> guard, (b) the target function isn&apos;t picklable (closures, lambdas, local functions), (c) CUDA or other native state was initialized in the parent before spawning — many libraries forbid forking after that.
        </p>

        <h3>5.3 &ldquo;My parallel code is slower than sequential&rdquo;</h3>
        <p>
          Each unit is probably too small relative to coordination overhead. Batch the work (process N items per task), or use a lower-overhead mechanism — threads instead of processes, or the main thread with asyncio for I/O.
        </p>

        <h3>5.4 &ldquo;The shared dict got corrupted&rdquo;</h3>
        <p>
          Even under the GIL, a sequence of bytecode instructions is not atomic — the interpreter can release the GIL between them. Use <code>threading.Lock</code>, <code>queue.Queue</code>, or thread-local storage. Don&apos;t assume &ldquo;the GIL will protect me&rdquo;; it protects the interpreter from itself, not your data structures from you.
        </p>
      </section>

      <section id="when-to-pick">
        <h2>6. When to pick what</h2>
        <p>
          A short decision tree:
        </p>
        <ul>
          <li><strong>One machine, I/O-bound</strong> — threads, or asyncio if the library supports it.</li>
          <li><strong>One machine, CPU-bound pure Python</strong> — processes.</li>
          <li><strong>One machine, CPU-bound via NumPy/Torch/etc.</strong> — threads often work, because the heavy lifting happens outside the GIL. Measure first.</li>
          <li><strong>One machine, tiny units of work</strong> — sequential. Seriously. Benchmark before reaching for parallelism.</li>
          <li><strong>Many machines</strong> — a distributed framework. Out of scope here, but the single-machine decisions still matter inside each node.</li>
        </ul>

        <p>
          The boring path is usually right: start sequential, measure, then pick the smallest jump (threads or processes) that buys you what you need. Parallelism is a cost you pay for throughput; pay it deliberately.
        </p>
      </section>
    </>
  );
}
