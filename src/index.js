// Cloudflare Worker — Portfolio Site v2
// Fully self-contained HTML page (inlined CSS + JS)

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Nameesha K — Data Analyst & ML Developer. Portfolio of projects, achievements and contact." />
  <title>Nameesha K — Portfolio</title>

  <!-- ========== FAVICON: globe emoji as SVG (replaces Cloudflare default) ========== -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌐</text></svg>" />

  <style>
    /* ---------- RESET + ROOT ---------- */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #000000;
      --bg-elev: #0a0a0a;
      --text: #f5f5f7;
      --text-dim: #a1a1a6;
      --accent: #ffffff;
      --glass-bg: rgba(255, 255, 255, 0.04);
      --glass-border: rgba(255, 255, 255, 0.08);
      --glass-hover: rgba(255, 255, 255, 0.1);
      --radius: 22px;
      --ease: cubic-bezier(0.22, 1, 0.36, 1);
    }
    html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      overflow-x: hidden;
      font-weight: 400;
      text-align: center; /* ★ CHANGE 3: global center alignment */
    }
    a { color: inherit; text-decoration: none; }

    /* ---------- LAYOUT ---------- */
    .container { width: 100%; max-width: 1100px; margin: 0 auto; padding: 0 24px; }
    section { padding: 110px 0; position: relative; }

    /* ---------- NAVBAR ---------- */
    .nav {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 100;
      padding: 14px 0;
      background: rgba(10, 10, 10, 0.6);
      backdrop-filter: saturate(180%) blur(20px);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      border-bottom: 1px solid transparent;
      transition: background 0.3s var(--ease), border-color 0.3s var(--ease);
    }
    .nav.scrolled {
      background: rgba(10, 10, 10, 0.88);
      border-bottom-color: rgba(255,255,255,0.08);
    }
    .nav-inner { display: flex; align-items: center; justify-content: space-between; }
    .logo { font-size: 20px; font-weight: 600; letter-spacing: -0.01em; }
    .nav-links { display: flex; gap: 28px; }
    .nav-links a {
      font-size: 13.5px; font-weight: 400; color: var(--text-dim);
      transition: color 0.25s var(--ease);
    }
    .nav-links a:hover { color: var(--text); }

    /* ---------- HERO ---------- */
    .hero {
      min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      position: relative;
      overflow: hidden;
      padding-top: 80px;
    }
    /* ★ CHANGE 2: Faster, more dynamic animated gradient */
    .hero-bg {
      position: absolute; inset: -10%;
      background:
        radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.35), transparent 45%),
        radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.28), transparent 45%),
        radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.32), transparent 50%),
        radial-gradient(circle at 30% 70%, rgba(168, 85, 247, 0.22), transparent 50%);
      animation: drift 9s ease-in-out infinite alternate;
      filter: blur(50px);
      z-index: 0;
    }
    @keyframes drift {
      0%   { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
      50%  { transform: translate3d(-40px, 30px, 0) scale(1.15) rotate(3deg); }
      100% { transform: translate3d(40px, -30px, 0) scale(1.08) rotate(-3deg); }
    }
    .hero-content { position: relative; z-index: 1; max-width: 900px; padding: 0 24px; }
    .hero h1 {
      font-size: clamp(44px, 8vw, 88px);
      font-weight: 700;
      letter-spacing: -0.035em;
      line-height: 1.04;
      margin-bottom: 20px;
      background: linear-gradient(180deg, #ffffff 0%, #a1a1a6 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero p {
      font-size: clamp(18px, 2.2vw, 24px);
      color: var(--text-dim);
      font-weight: 400;
      letter-spacing: -0.01em;
      margin-bottom: 36px;
    }

    /* ---------- BUTTONS ---------- */
    .btn-group { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 28px;
      border-radius: 980px;
      font-size: 15px; font-weight: 500;
      letter-spacing: -0.01em;
      cursor: pointer; border: 1px solid transparent;
      transition: transform 0.2s var(--ease), box-shadow 0.25s var(--ease), background 0.25s var(--ease);
    }
    .btn-primary { background: #ffffff; color: #000; }
    .btn-primary:hover {
      transform: translateY(-3px) scale(1.03);
      box-shadow: 0 14px 50px rgba(255,255,255,0.3);
    }
    .btn-secondary {
      background: transparent; color: var(--text);
      border-color: rgba(255,255,255,0.2);
    }
    .btn-secondary:hover {
      background: rgba(255,255,255,0.1);
      border-color: rgba(255,255,255,0.4);
      transform: translateY(-3px) scale(1.03);
    }

    /* ---------- SECTION HEADERS ---------- */
    .section-header { text-align: center; margin-bottom: 56px; }
    .section-header h2 {
      font-size: clamp(36px, 5vw, 56px);
      font-weight: 700;
      letter-spacing: -0.025em;
      line-height: 1.08;
      margin-bottom: 14px;
    }
    .section-header p {
      font-size: 18px; color: var(--text-dim);
      max-width: 620px; margin: 0 auto;
    }

    /* ---------- ABOUT / SUMMARY ---------- */
    /* ★ CHANGE 5: Professional summary card */
    .summary-card {
      max-width: 860px; margin: 0 auto;
      padding: 48px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      text-align: center;
    }
    .summary-card p {
      font-size: 17.5px; color: var(--text-dim);
      margin-bottom: 18px; line-height: 1.7;
    }
    .summary-card p:last-child { margin-bottom: 0; }
    .summary-card strong { color: var(--text); font-weight: 600; }

    /* ---------- ★ CHANGE 6: ACHIEVEMENTS BANNER ---------- */
    .banner-wrap {
      margin-top: 40px;
      max-width: 1000px;
      margin-left: auto;
      margin-right: auto;
      padding: 0 24px;
    }
    .banner {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 0;
      padding: 28px;
      background: linear-gradient(135deg, rgba(99,102,241,0.18), rgba(236,72,153,0.14), rgba(59,130,246,0.16));
      border: 1px solid var(--glass-border);
      border-radius: var(--radius);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      overflow: hidden;
    }
    .banner-item {
      padding: 18px 16px;
      text-align: center;
      position: relative;
      transition: transform 0.25s var(--ease);
    }
    .banner-item:hover { transform: translateY(-4px); }
    .banner-item:not(:last-child)::after {
      content: '';
      position: absolute;
      right: 0; top: 20%;
      height: 60%;
      width: 1px;
      background: rgba(255,255,255,0.1);
    }
    .banner-num {
      font-size: clamp(28px, 4vw, 40px);
      font-weight: 700;
      letter-spacing: -0.02em;
      background: linear-gradient(180deg, #ffffff 0%, #a1a1a6 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 6px;
      line-height: 1;
    }
    .banner-label {
      font-size: 13px;
      color: var(--text-dim);
      font-weight: 500;
      letter-spacing: 0.02em;
    }
    @media (max-width: 560px) {
      .banner-item:not(:last-child)::after { display: none; }
    }

    /* ---------- PROJECT GRID ---------- */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 22px;
      justify-items: center;
    }
    .card {
      width: 100%;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius);
      padding: 32px 28px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      transition: transform 0.25s var(--ease), background 0.25s var(--ease), border-color 0.25s var(--ease), box-shadow 0.25s var(--ease);
      display: flex; flex-direction: column;
      text-align: center;
      align-items: center;
    }
    .card:hover {
      transform: translateY(-8px) scale(1.02);
      background: var(--glass-hover);
      border-color: rgba(255,255,255,0.22);
      box-shadow: 0 24px 70px rgba(0,0,0,0.5);
    }
    .card h3 {
      font-size: 22px; font-weight: 600;
      letter-spacing: -0.01em; margin-bottom: 12px;
    }
    .card p {
      color: var(--text-dim); font-size: 15px;
      line-height: 1.6; margin-bottom: 20px;
      flex-grow: 1;
    }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; justify-content: center; }
    .tag {
      font-size: 12px;
      padding: 5px 12px;
      border-radius: 980px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
      color: var(--text-dim);
    }
    .card-link {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 14px; font-weight: 500; color: #2997ff;
      transition: gap 0.25s var(--ease), color 0.25s var(--ease);
    }
    .card-link:hover { gap: 10px; color: #5ab0ff; }
    .card-link::after { content: "→"; transition: transform 0.25s var(--ease); }

    /* ---------- LIST GRID (achievements / skills) ---------- */
    .list-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 18px;
      justify-items: center;
    }
    .list-item {
      width: 100%;
      padding: 28px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius);
      backdrop-filter: blur(20px);
      transition: transform 0.25s var(--ease), border-color 0.25s var(--ease), background 0.25s var(--ease);
      text-align: center;
    }
    .list-item:hover {
      transform: translateY(-6px) scale(1.02);
      border-color: rgba(255,255,255,0.22);
      background: var(--glass-hover);
    }
    .list-item h4 { font-size: 17px; font-weight: 600; margin-bottom: 8px; }
    .list-item p { font-size: 14.5px; color: var(--text-dim); line-height: 1.55; }

    /* ---------- CONTACT ---------- */
    .contact-box {
      max-width: 720px; margin: 0 auto;
      padding: 64px 48px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius);
      backdrop-filter: blur(20px);
      text-align: center;
    }

    /* ---------- FOOTER ---------- */
    footer {
      padding: 40px 0;
      border-top: 1px solid rgba(255,255,255,0.06);
      text-align: center;
    }
    .social { display: flex; justify-content: center; gap: 24px; margin-bottom: 16px; flex-wrap: wrap; }
    .social a {
      font-size: 14px; color: var(--text-dim);
      transition: color 0.25s var(--ease);
    }
    .social a:hover { color: var(--text); }
    footer p { font-size: 12px; color: var(--text-dim); }

    /* ---------- ★ CHANGE 2: FASTER SCROLL FADE-IN ---------- */
    .reveal {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s var(--ease), transform 0.5s var(--ease);
      will-change: opacity, transform;
    }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    /* ---------- RESPONSIVE ---------- */
    @media (max-width: 640px) {
      section { padding: 80px 0; }
      .nav-links { gap: 16px; }
      .nav-links a { font-size: 12.5px; }
      .summary-card { padding: 32px 24px; }
      .contact-box { padding: 44px 24px; }
      .card { padding: 24px; }
      .banner { padding: 16px; }
    }
    @media (max-width: 480px) {
      .nav-links a:nth-child(n+4) { display: none; }
    }
  </style>
</head>
<body>

  <!-- ============ NAVBAR ============ -->
  <nav class="nav" id="navbar">
    <div class="container nav-inner">
      <div class="logo">Nameesha K</div>
      <div class="nav-links">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#achievements">Achievements</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  </nav>

  <!-- ============ HERO ============ -->
  <section class="hero" id="hero">
    <div class="hero-bg"></div>
    <div class="hero-content">
      <h1 class="reveal">Data. Design. Delivered.</h1>
      <p class="reveal">Hi, I'm Nameesha K — a Data Analyst & ML Developer crafting thoughtful digital experiences.</p>
      <div class="btn-group reveal">
        <a href="#projects" class="btn btn-primary">View My Work</a>
        <a href="#contact" class="btn btn-secondary">Reach Out</a>
      </div>
    </div>
  </section>

  <!-- ============ ★ CHANGE 5: PROFESSIONAL SUMMARY ============ -->
  <section id="about">
    <div class="container">
      <div class="section-header reveal">
        <h2>Professional Summary</h2>
        <p>Engineer, builder, and perpetual learner.</p>
      </div>

      <div class="summary-card reveal">
        <p>
          I'm <strong>K. Nameesha</strong> — a Computer Science engineer graduating with a
          <strong>9.26 CGPA</strong>, specializing in <strong>Data Analysis</strong> and
          <strong>Machine Learning</strong> with strong full-stack engineering fundamentals.
        </p>
        <p>
          Over the past few years I've shipped <strong>six production-grade projects</strong> spanning
          AI-powered learning platforms (<em>QUOLO</em>), real-time waste-management systems
          (<em>Green Guardian</em>, <em>WastED</em>), NLP-driven marketplaces (<em>Legal Connect India</em>),
          predictive career analytics (<em>CareerCastAI</em>), and digital career guidance platforms
          (<em>Abhyudaya</em>) — working across the stack with React, Node, MongoDB, Python, Flask,
          TensorFlow, LangChain, and LLMs.
        </p>
        <p>
          I've competed in <strong>8+ hackathons and ideathons</strong>, winning at
          <em>HackerWar 4.0</em>, placing 1st Runners Up at <em>Trident Triathlon</em>, and earning
          finalist recognition at <em>Code4Odisha</em> (Govt. of Odisha). I lead teams, mentor juniors,
          and thrive in high-pressure build environments.
        </p>
        <p>
          Beyond code, I study philosophy, sketch, and journal — because great engineers need
          great ideas, and great ideas need quiet time to grow.
        </p>
      </div>

      <!-- ★ CHANGE 6: ACHIEVEMENTS BANNER (right below summary) -->
      <div class="banner-wrap reveal">
        <div class="banner">
          <div class="banner-item">
            <div class="banner-num">9.26</div>
            <div class="banner-label">CGPA</div>
          </div>
          <div class="banner-item">
            <div class="banner-num">6×</div>
            <div class="banner-label">Hackathon Wins</div>
          </div>
          <div class="banner-item">
            <div class="banner-num">2×</div>
            <div class="banner-label">Ideathon Wins</div>
          </div>
          <div class="banner-item">
            <div class="banner-num">6</div>
            <div class="banner-label">Live Projects</div>
          </div>
          <div class="banner-item">
            <div class="banner-num">100+</div>
            <div class="banner-label">Teams Beaten</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ PROJECTS ============ -->
  <section id="projects">
    <div class="container">
      <div class="section-header reveal">
        <h2>Projects</h2>
        <p>Selected work spanning AI, full-stack platforms, and data-driven tools.</p>
      </div>

      <div class="grid">
        <div class="card reveal">
          <h3>QUOLO</h3>
          <p>AI-powered learning platform that lets students interact with their study materials through summaries and Q&A, plus academic progress tracking.</p>
          <div class="tags">
            <span class="tag">React</span><span class="tag">Node</span>
            <span class="tag">MongoDB</span><span class="tag">LLMs</span><span class="tag">LangChain</span>
          </div>
          <a href="https://github.com/NameeshaK" class="card-link" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>

        <div class="card reveal">
          <h3>Green Guardian</h3>
          <p>Tech-driven waste management solution connecting citizens with collectors — featuring real-time tracking and route optimization.</p>
          <div class="tags">
            <span class="tag">TensorFlow</span><span class="tag">Socket.IO</span>
            <span class="tag">Maps API</span><span class="tag">Express</span>
          </div>
          <a href="https://github.com/NameeshaK" class="card-link" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>

        <div class="card reveal">
          <h3>Legal Connect India</h3>
          <p>E-marketplace connecting citizens with legal service providers, powered by an ML review system and intelligent service matching.</p>
          <div class="tags">
            <span class="tag">Node.js</span><span class="tag">TextBlob</span>
            <span class="tag">NLTK</span><span class="tag">Socket.IO</span>
          </div>
          <a href="https://github.com/NameeshaK" class="card-link" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>

        <div class="card reveal">
          <h3>CareerCastAI</h3>
          <p>Machine learning solution that predicts student career paths from performance analysis, enabling early academic intervention.</p>
          <div class="tags">
            <span class="tag">Python</span><span class="tag">Flask</span>
            <span class="tag">Jupyter</span><span class="tag">ML</span>
          </div>
          <a href="https://github.com/NameeshaK" class="card-link" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>

        <div class="card reveal">
          <h3>Abhyudaya</h3>
          <p>Digital career guidance platform addressing knowledge gaps for students in Odisha about competitive exams and career pathways.</p>
          <div class="tags">
            <span class="tag">HTML/CSS</span><span class="tag">Express</span>
            <span class="tag">Socket.IO</span><span class="tag">Chat</span>
          </div>
          <a href="https://github.com/NameeshaK" class="card-link" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>

        <div class="card reveal">
          <h3>WastED</h3>
          <p>Communication platform connecting citizens, Municipal Corporations, and NGOs to improve waste-management efficiency.</p>
          <div class="tags">
            <span class="tag">HTML/CSS</span><span class="tag">Node.js</span>
            <span class="tag">TextBlob</span><span class="tag">Sentiment</span>
          </div>
          <a href="https://github.com/NameeshaK" class="card-link" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ ACHIEVEMENTS ============ -->
  <section id="achievements">
    <div class="container">
      <div class="section-header reveal">
        <h2>Achievements</h2>
        <p>A few milestones from the journey so far.</p>
      </div>
      <div class="list-grid">
        <div class="list-item reveal">
          <h4>HackerWar 4.0 — Winner</h4>
          <p>Won the internal hackathon for Smart India Hackathon (SIH) among 71+ teams.</p>
        </div>
        <div class="list-item reveal">
          <h4>Trident Triathlon — 1st Runners Up</h4>
          <p>Placed among the top teams out of 50+ competing across Odisha.</p>
        </div>
        <div class="list-item reveal">
          <h4>Code4Odisha — Finalist</h4>
          <p>Selected as a finalist at the Govt. of Odisha competition among 100+ teams.</p>
        </div>
        <div class="list-item reveal">
          <h4>6× Hackathons &amp; 2× Ideathons</h4>
          <p>Consistently led and contributed to winning teams across national events.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ SKILLS ============ -->
  <section id="skills">
    <div class="container">
      <div class="section-header reveal">
        <h2>Skills</h2>
        <p>Languages, tools, and interests I bring to the table.</p>
      </div>
      <div class="list-grid">
        <div class="list-item reveal">
          <h4>Technical</h4>
          <p>C++, Python, Full-Stack Web Development, Machine Learning.</p>
        </div>
        <div class="list-item reveal">
          <h4>Languages</h4>
          <p>English, Hindi, Odia (Proficient) · Telugu (Conversational).</p>
        </div>
        <div class="list-item reveal">
          <h4>Interests</h4>
          <p>Philosophy, Sketching, Journaling.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ ★ CHANGE 4: CONTACT — Google Form as primary Reach Out ============ -->
  <section id="contact">
    <div class="container">
      <div class="contact-box reveal">
        <div class="section-header" style="margin-bottom: 28px;">
          <h2>Let's build something.</h2>
          <p>Open to collaborations, roles, and interesting conversations.</p>
        </div>
        <div class="btn-group">
          <!-- Primary Reach Out → Google Form -->
          <a href="https://forms.gle/uY7chgiYZEKwbwu47" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Reach Out</a>
          <a href="mailto:nameeshak1@gmail.com" class="btn btn-secondary">Email</a>
          <a href="https://www.linkedin.com/in/nameesha-k/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">LinkedIn</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ FOOTER ============ -->
  <footer>
    <div class="container">
      <div class="social">
        <a href="https://github.com/NameeshaK" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/nameesha-k/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://www.instagram.com/nameeshaism/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://forms.gle/uY7chgiYZEKwbwu47" target="_blank" rel="noopener noreferrer">Contact Form</a>
        <a href="mailto:nameeshak1@gmail.com">Email</a>
      </div>
      <p>&copy; Thanks for stopping by! <3 </p>
    </div>
  </footer>

  <script>
    // ---------- Sticky nav opacity change on scroll ----------
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }, { passive: true });

    // ---------- ★ CHANGE 2: Faster, snappier fade-ins ----------
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach((el, i) => {
      // Shorter stagger = more dynamic feel
      el.style.transitionDelay = (i % 6) * 30 + 'ms';
      io.observe(el);
    });
  </script>
</body>
</html>`;

export default {
  async fetch(request) {
    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  },
};