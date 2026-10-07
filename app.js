/* ==========================================================================
   Smpolish.pl - Interactive Engine & Agent Simulator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCanvasBackground();
  initSimulator();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Navbar scroll & mobile menu
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   2. Canvas Particle Background
   -------------------------------------------------------------------------- */
function initCanvasBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const count = Math.min(Math.floor((width * height) / 18000), 75);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.8,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.strokeStyle = `rgba(245, 158, 11, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw dots
    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  draw();
}

/* --------------------------------------------------------------------------
   3. Interactive Agent Execution Simulator
   -------------------------------------------------------------------------- */
const SCENARIOS = {
  auth: {
    title: 'Auth & Rate-Limiter Microservice',
    steps: [
      {
        pill: 'pill-plan',
        state: 'Phase 1/5: Architecture Decomposition & Dependency Mapping',
        code: `[Claude 3.7 Agent SDK] Initializing task context...
<thought>
Goal: Synthesize secure authentication microservice with sliding-window Redis rate limiter.
Constraint: Zero external dependencies beyond Redis & crypto; Strict TypeScript types.
Plan:
 1. Generate token verification middleware with Ed25519 asymmetric signatures.
 2. Implement Redis atomic EVAL script for sliding-window rate limiting.
 3. Synthesize unit and integration test suite with synthetic load test.
</thought>
✔ Architectural graph resolved: 3 modules, 2 interfaces identified.`
      },
      {
        pill: 'pill-write',
        state: 'Phase 2/5: Synthesizing Production Code',
        code: `[Claude Coder] Writing src/auth/rate_limiter.ts...
<code>
export class SlidingWindowLimiter {
  constructor(private redis: RedisClient, private windowMs = 60000, private maxHits = 100) {}

  async isAllowed(ip: string): Promise<{ allowed: boolean; remaining: number }> {
    const now = Date.now();
    const clearBefore = now - this.windowMs;
    const key = \`rate_limit:\${ip}\`;

    const multi = this.redis.multi();
    multi.zremrangebyscore(key, 0, clearBefore);
    multi.zadd(key, now, now.toString());
    multi.zcard(key);
    multi.pexpire(key, this.windowMs);
    const [, , [count]] = await multi.exec();

    return { allowed: count <= this.maxHits, remaining: Math.max(0, this.maxHits - count) };
  }
}
</code>
✔ Code written: 142 lines across 2 files.`
      },
      {
        pill: 'pill-test',
        state: 'Phase 3/5: Running Test Suite in Docker Sandbox',
        code: `[Sandbox] Spawning test container (Debian 12 / Node 20.x)...
$ vitest run --coverage

 FAIL  tests/rate_limiter.test.ts > sliding-window concurrency
AssertionError: expected allowed to be false after 100 parallel requests
  - Expected: false
  + Received: true (Race condition on sub-millisecond timestamps)

Tests:       1 failed, 8 passed, 9 total
Coverage:    94.2% lines`
      },
      {
        pill: 'pill-debug',
        state: 'Phase 4/5: Self-Healing & Reflection Loop Active',
        code: `[Claude Reflection Loop] Root cause isolated:
Timestamp collision occurred because multiple requests arrived within identical millisecond!
Patch: Append cryptographically random 16-bit entropy nonce to Redis Sorted Set member.

[Claude Coder] Applying patch to src/auth/rate_limiter.ts:
- multi.zadd(key, now, now.toString());
+ const member = \`\${now}-\${crypto.randomBytes(4).toString('hex')}\`;
+ multi.zadd(key, now, member);

$ vitest run
 PASS  tests/rate_limiter.test.ts (9/9 passed - 100%)
✔ Self-healing complete. All edge-cases covered.`
      },
      {
        pill: 'pill-deploy',
        state: 'Phase 5/5: PR Generated & Staging Deployment Live',
        code: `[Claude Agent] Finalizing release package...
✔ Git commit: "feat(auth): add sliding-window rate limiter with sub-ms concurrency safety"
✔ Linting: 0 errors, 0 warnings
✔ Docker build: sha256:7f49a81... (Verified 0 CVE vulnerabilities)
✔ Staging preview deployed: https://staging.smpolish.internal/auth-v1
✔ Pull Request created: #142 ready for human-in-the-loop merge.
Execution status: SUCCESS (Total agent elapsed time: 42.4s)`
      }
    ]
  },

  worker: {
    title: 'Distributed Webhook Pipeline',
    steps: [
      {
        pill: 'pill-plan',
        state: 'Phase 1/5: Pipeline Mapping & Backpressure Strategy',
        code: `[Claude 3.7 Agent SDK] Inspecting webhook queue specification...
<thought>
Goal: High-throughput webhook ingestion worker with exponential backoff and dead-letter queue.
Throughput requirement: 10,000 req/sec peak.
Strategy:
 1. Memory-efficient buffered worker using Go channels and worker pools.
 2. HMAC-SHA256 signature verification filter before payload deserialization.
 3. Automated retry mechanism with jitter.
</thought>
✔ Blueprint verified against architecture specifications.`
      },
      {
        pill: 'pill-write',
        state: 'Phase 2/5: Synthesizing Go High-Performance Worker',
        code: `[Claude Coder] Writing internal/pipeline/dispatcher.go...
<code>
type WebhookWorker struct {
    Queue   chan WebhookPayload
    Client  *http.Client
    DLQ     *DeadLetterQueue
}

func (w *WebhookWorker) Process(ctx context.Context, payload WebhookPayload) error {
    if !w.VerifyHMAC(payload) {
        return ErrInvalidSignature
    }
    return w.DispatchWithBackoff(ctx, payload, 5)
}
</code>
✔ Pipeline code compiled with zero warnings.`
      },
      {
        pill: 'pill-test',
        state: 'Phase 3/5: Synthetic Chaos Load Testing',
        code: `[Sandbox] Executing mock webhook load benchmark (10,000 events)...
$ go test -bench=. -race ./...
 PASS: TestWebhookIngestionRate (10,420 events/sec)
 PASS: TestHMACValidation (100% valid signatures accepted)
 PASS: TestDeadLetterFallback`
      },
      {
        pill: 'pill-debug',
        state: 'Phase 4/5: Static Analysis & Memory Profiling',
        code: `[Claude Reflection Loop] Profiling memory allocations:
Goroutine count steady at 64 workers; zero memory leaks detected.
Alloc/op: 240 bytes (Under 500-byte budget).
✔ Self-verification passed without remedial refactoring.`
      },
      {
        pill: 'pill-deploy',
        state: 'Phase 5/5: Production Helm Chart & Staging Rollout',
        code: `[Claude Agent] Generating deployment artifacts...
✔ Kubernetes manifest: deploy/worker-deployment.yaml
✔ Auto-scaling HPA configured (Min: 3, Max: 25 pods)
✔ Staging rollout verified healthy.
Execution status: SUCCESS (Total agent elapsed time: 38.1s)`
      }
    ]
  },

  migration: {
    title: 'Zero-Downtime DB Migration',
    steps: [
      {
        pill: 'pill-plan',
        state: 'Phase 1/5: Safe Schema Evolution Planning',
        code: `[Claude 3.7 Agent SDK] Reading PostgreSQL schema (users table: 4.8M rows)...
<thought>
Goal: Rename column 'full_name' to 'first_name', 'last_name' without table locks.
Requirement: 0 milliseconds of write downtime on live production database.
Method: Expand-Contract pattern with trigger-based dual writing.
</thought>
✔ Migration sequence generated with safety rollback script.`
      },
      {
        pill: 'pill-write',
        state: 'Phase 2/5: Writing Safe Migration Scripts',
        code: `[Claude Coder] Writing migrations/20261007_user_split.sql...
<code>
-- Step 1: Add new nullable columns
ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name VARCHAR(128);
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name VARCHAR(128);

-- Step 2: Dual-write trigger function
CREATE OR REPLACE FUNCTION sync_user_names() RETURNS TRIGGER AS $$
BEGIN
  NEW.first_name := split_part(NEW.full_name, ' ', 1);
  NEW.last_name := substr(NEW.full_name, length(NEW.first_name) + 2);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
</code>
✔ Safe backward-compatible script generated.`
      },
      {
        pill: 'pill-test',
        state: 'Phase 3/5: Replaying Live Traffic Shadow Test',
        code: `[Sandbox] Spin up replica DB with 4.8M synthetic rows...
Executing migration concurrently with 1,500 write operations/sec:
 - Lock duration: 1.4ms (Safe < 50ms threshold)
 - Replicated write consistency: 100.00%`
      },
      {
        pill: 'pill-debug',
        state: 'Phase 4/5: Verification & Safety Guardrails',
        code: `[Claude Reflection Loop] Checking edge cases:
- Single-word names (e.g., 'Cher', 'Madonna') verified: handled gracefully without null crash.
✔ No anomalies detected in shadow test.`
      },
      {
        pill: 'pill-deploy',
        state: 'Phase 5/5: Ready for Human Approval',
        code: `[Claude Agent] Generating Human-in-the-Loop release pack:
⚠ CHECKPOINT: Production DB Migration requires 1-click human confirmation.
✔ Reversible rollback script verified.
✔ PR and migration dashboard ready.
Execution status: WAITING FOR HUMAN MERGE`
      }
    ]
  }
};

let currentScenario = 'auth';
let currentStepIdx = 0;
let stepTimer = null;

function initSimulator() {
  const codeStream = document.getElementById('code-stream');
  const replayBtn = document.getElementById('sim-replay-btn');
  const presetBtns = document.querySelectorAll('.preset-btn');
  const stateLabel = document.getElementById('agent-state-label');

  if (!codeStream) return;

  function renderStep(scenarioKey, stepIdx) {
    const scenario = SCENARIOS[scenarioKey];
    const step = scenario.steps[stepIdx];

    // Update step pills
    const allPills = ['pill-plan', 'pill-write', 'pill-test', 'pill-debug', 'pill-deploy'];
    allPills.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (id === step.pill) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    });

    if (stateLabel) {
      stateLabel.textContent = `Agent: ${step.state}`;
    }

    // Syntax highlight simple tokens
    let formattedCode = escapeHtml(step.code)
      .replace(/(\[Claude.*?\])/g, '<span class="tok-cmd">$1</span>')
      .replace(/(✔.*?)(?=\n|$)/g, '<span class="tok-success">$1</span>')
      .replace(/(FAIL.*|AssertionError:.*)/g, '<span class="tok-error">$1</span>')
      .replace(/(PASS.*)/g, '<span class="tok-success">$1</span>')
      .replace(/(&lt;thought&gt;[\s\S]*?&lt;\/thought&gt;)/g, '<span class="tok-comment">$1</span>')
      .replace(/(&lt;code&gt;[\s\S]*?&lt;\/code&gt;)/g, '<span class="tok-info">$1</span>');

    codeStream.innerHTML = formattedCode;
  }

  function runSimulationLoop() {
    clearTimeout(stepTimer);
    const stepsCount = SCENARIOS[currentScenario].steps.length;

    renderStep(currentScenario, currentStepIdx);

    stepTimer = setTimeout(() => {
      currentStepIdx = (currentStepIdx + 1) % stepsCount;
      runSimulationLoop();
    }, 4500);
  }

  // Handle Preset Buttons
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentScenario = btn.getAttribute('data-scenario');
      currentStepIdx = 0;
      runSimulationLoop();
    });
  });

  // Handle Replay
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      currentStepIdx = 0;
      runSimulationLoop();
    });
  }

  // Start initial run
  runSimulationLoop();
}

function escapeHtml(string) {
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* --------------------------------------------------------------------------
   4. Contact Form Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const company = document.getElementById('form-company').value;
    const role = document.getElementById('form-role').value;
    const msg = document.getElementById('form-msg').value;

    const subject = encodeURIComponent(`[Smpolish Access Request] ${company} - ${name} (${role})`);
    const body = encodeURIComponent(
      `Hello Smpolish Team,\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nInquiry Type: ${role}\n\nProject details:\n${msg}\n\nSent from Smpolish.pl`
    );

    status.className = 'form-status success';
    status.innerHTML = `
      <strong>Thank you, ${escapeHtml(name)}!</strong><br>
      Your inquiry has been prepared. Opening your email client to send to <code>contact@smpolish.pl</code>...<br>
      <small>If your mail client didn't open automatically, please click: <a href="mailto:contact@smpolish.pl?subject=${subject}&body=${body}" style="color: #f59e0b; text-decoration: underline;">Send Email Manually</a></small>
    `;
    status.style.display = 'block';

    // Trigger mailto client
    setTimeout(() => {
      window.location.href = `mailto:contact@smpolish.pl?subject=${subject}&body=${body}`;
    }, 600);
  });
}
