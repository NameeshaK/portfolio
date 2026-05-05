// Cloudflare Worker — Portfolio Site v3
// Fully self-contained HTML page (inlined CSS + JS)

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Nameesha K - Data Analyst & ML Developer. Portfolio of projects, achievements and contact." />
  <title>Nameesha K — Portfolio</title>

  <!-- Globe favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌐</text></svg>" />

  <style>
    /* ---------- RESET + ROOT ---------- */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #000000;
      --text: #f5f5f7;
      --text-dim: #a1a1a6;
      --glass-bg: rgba(255, 255, 255, 0.04);
      --glass-border: rgba(255, 255, 255, 0.08);
      --glass-hover: rgba(255, 255, 255, 0.12);
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
      text-align: center;
      position: relative;
    }
    a { color: inherit; text-decoration: none; }

    /* ---------- ★ GLOBAL ANIMATED GRADIENT BACKGROUND ---------- */
    /* This is the SAME gradient from the hero, but now shifts across the ENTIRE page */
    .global-bg {
      position: fixed;
      inset: -10%;
      z-index: -1;
      background:
        radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.35), transparent 45%),
        radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.28), transparent 45%),
        radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.32), transparent 50%),
        radial-gradient(circle at 30% 70%, rgba(168, 85, 247, 0.22), transparent 50%),
        radial-gradient(circle at 70% 50%, rgba(14, 165, 233, 0.2), transparent 50%);
      background-color: #000;
      animation: globalDrift 16s ease-in-out infinite alternate;
      filter: blur(60px);
      pointer-events: none;
      will-change: transform;
    }
    @keyframes globalDrift {
      0%   { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
      25%  { transform: translate3d(-60px, 40px, 0) scale(1.1) rotate(2deg); }
      50%  { transform: translate3d(40px, -50px, 0) scale(1.15) rotate(-2deg); }
      75%  { transform: translate3d(-30px, -30px, 0) scale(1.08) rotate(3deg); }
      100% { transform: translate3d(50px, 40px, 0) scale(1.12) rotate(-3deg); }
    }

    /* Subtle overlay to keep text readable over gradient */
    .bg-overlay {
      position: fixed;
      inset: 0;
      z-index: -1;
      background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%);
      pointer-events: none;
    }

    /* ---------- LAYOUT ---------- */
    .container { width: 100%; max-width: 1100px; margin: 0 auto; padding: 0 24px; position: relative; }
    section { padding: 110px 0; position: relative; }

    /* ---------- NAVBAR ---------- */
    .nav {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 100;
      padding: 14px 0;
      background: rgba(10, 10, 10, 0.55);
      backdrop-filter: saturate(180%) blur(20px);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      border-bottom: 1px solid transparent;
      transition: background 0.3s var(--ease), border-color 0.3s var(--ease);
    }
    .nav.scrolled {
      background: rgba(10, 10, 10, 0.8);
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
      padding-top: 80px;
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
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 14px 50px rgba(255,255,255,0.35);
    }
    .btn-secondary {
      background: rgba(255,255,255,0.05);
      color: var(--text);
      border-color: rgba(255,255,255,0.2);
      backdrop-filter: blur(10px);
    }
    .btn-secondary:hover {
      background: rgba(255,255,255,0.15);
      border-color: rgba(255,255,255,0.4);
      transform: translateY(-3px) scale(1.05);
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

    /* ---------- SUMMARY CARD ---------- */
    .summary-card {
      max-width: 860px; margin: 0 auto;
      padding: 48px;
      background: rgba(10, 10, 10, 0.55);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius);
      backdrop-filter: blur(30px);
      -webkit-backdrop-filter: blur(30px);
      text-align: center;
    }
    .summary-card p {
      font-size: 17.5px; color: var(--text-dim);
      margin-bottom: 18px; line-height: 1.7;
    }
    .summary-card p:last-child { margin-bottom: 0; }
    .summary-card strong { color: var(--text); font-weight: 600; }

    /* ---------- ACHIEVEMENTS BANNER ---------- */
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
      background: linear-gradient(135deg, rgba(99,102,241,0.22), rgba(236,72,153,0.18), rgba(59,130,246,0.2));
      border: 1px solid var(--glass-border);
      border-radius: var(--radius);
      backdrop-filter: blur(30px);
      -webkit-backdrop-filter: blur(30px);
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
      background: rgba(255,255,255,0.12);
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

    /* ---------- ★ PROJECT TILES — POPPING HOVER EFFECT ---------- */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      justify-items: center;
      perspective: 1200px; /* Enables 3D pop effect */
    }
    .card {
      width: 100%;
      background: rgba(10, 10, 10, 0.5);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius);
      padding: 32px 28px;
      backdrop-filter: blur(30px);
      -webkit-backdrop-filter: blur(30px);
      transition:
        transform 0.4s var(--ease),
        background 0.4s var(--ease),
        border-color 0.4s var(--ease),
        box-shadow 0.4s var(--ease);
      display: flex; flex-direction: column;
      text-align: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      transform-style: preserve-3d;
    }

    /* ★ Animated gradient border glow on hover */
    .card::before {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: var(--radius);
      padding: 2px;
      background: linear-gradient(135deg,
        rgba(99, 102, 241, 0.6),
        rgba(236, 72, 153, 0.6),
        rgba(59, 130, 246, 0.6),
        rgba(168, 85, 247, 0.6));
      background-size: 300% 300%;
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.4s var(--ease);
      animation: borderShift 4s ease infinite;
      pointer-events: none;
    }
    @keyframes borderShift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* ★ Inner glow overlay on hover */
    .card::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: var(--radius);
      background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%),
        rgba(255, 255, 255, 0.12),
        transparent 50%);
      opacity: 0;
      transition: opacity 0.4s var(--ease);
      pointer-events: none;
    }

    /* ★ THE POP EFFECT */
    .card:hover {
      transform: translateY(-14px) scale(1.05);
      background: rgba(20, 20, 25, 0.7);
      border-color: rgba(255, 255, 255, 0.25);
      box-shadow:
        0 30px 80px rgba(0, 0, 0, 0.6),
        0 0 60px rgba(99, 102, 241, 0.25),
        0 0 100px rgba(236, 72, 153, 0.15);
      z-index: 2;
    }
    .card:hover::before { opacity: 1; }
    .card:hover::after { opacity: 1; }

    .card h3 {
      font-size: 22px; font-weight: 600;
      letter-spacing: -0.01em; margin-bottom: 12px;
      position: relative; z-index: 1;
      transition: transform 0.4s var(--ease);
    }
    .card:hover h3 { transform: translateY(-2px); }

    .card p {
      color: var(--text-dim); font-size: 15px;
      line-height: 1.6; margin-bottom: 20px;
      flex-grow: 1;
      position: relative; z-index: 1;
    }
    .tags {
      display: flex; flex-wrap: wrap; gap: 6px;
      margin-bottom: 20px; justify-content: center;
      position: relative; z-index: 1;
    }
    .tag {
      font-size: 12px;
      padding: 5px 12px;
      border-radius: 980px;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.1);
      color: var(--text-dim);
      transition: background 0.3s var(--ease), color 0.3s var(--ease);
    }
    .card:hover .tag {
      background: rgba(255,255,255,0.14);
      color: var(--text);
    }

    /* ---------- LIST GRID (achievements / skills) ---------- */
    .list-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
      justify-items: center;
      perspective: 1200px;
    }
    .list-item {
      width: 100%;
      padding: 28px;
      background: rgba(10, 10, 10, 0.5);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius);
      backdrop-filter: blur(30px);
      transition:
        transform 0.4s var(--ease),
        border-color 0.4s var(--ease),
        background 0.4s var(--ease),
        box-shadow 0.4s var(--ease);
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .list-item::after {
      content: '';
      position: absolute; inset: 0;
      border-radius: var(--radius);
      background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%),
        rgba(255, 255, 255, 0.1),
        transparent 50%);
      opacity: 0;
      transition: opacity 0.4s var(--ease);
      pointer-events: none;
    }
    .list-item:hover {
      transform: translateY(-10px) scale(1.04);
      border-color: rgba(255,255,255,0.25);
      background: rgba(20, 20, 25, 0.65);
      box-shadow:
        0 24px 60px rgba(0, 0, 0, 0.5),
        0 0 50px rgba(168, 85, 247, 0.2);
      z-index: 2;
    }
    .list-item:hover::after { opacity: 1; }
    .list-item h4 { font-size: 17px; font-weight: 600; margin-bottom: 8px; position: relative; z-index: 1; }
    .list-item p { font-size: 14.5px; color: var(--text-dim); line-height: 1.55; position: relative; z-index: 1; }

    /* ---------- CONTACT ---------- */
    .contact-box {
      max-width: 720px; margin: 0 auto;
      padding: 64px 48px;
      background: rgba(10, 10, 10, 0.55);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius);
      backdrop-filter: blur(30px);
      text-align: center;
    }

    /* ---------- FOOTER ---------- */
    footer {
      padding: 40px 0;
      border-top: 1px solid rgba(255,255,255,0.06);
      text-align: center;
      position: relative;
    }
    .social { display: flex; justify-content: center; gap: 24px; margin-bottom: 16px; flex-wrap: wrap; }
    .social a {
      font-size: 14px; color: var(--text-dim);
      transition: color 0.25s var(--ease);
    }
    .social a:hover { color: var(--text); }
    footer p { font-size: 12px; color: var(--text-dim); }

    /* ---------- SCROLL FADE-IN ---------- */
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

    /* ---------- PERFORMANCE: reduce animation on low-end devices ---------- */
    @media (prefers-reduced-motion: reduce) {
      .global-bg { animation: none; }
      .card::before { animation: none; }
    }
  </style>
</head>
<body>

  <!-- ★ GLOBAL ANIMATED GRADIENT — covers entire page -->
  <div class="global-bg"></div>
  <div class="bg-overlay"></div>

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
    <div class="hero-content">
      <h1 class="reveal">Data. Design. Delivered.</h1>
      <p class="reveal">Hi, I'm Nameesha K — a Data Analyst & ML Developer crafting thoughtful digital experiences.</p>
      <div class="btn-group reveal">
        <a href="#projects" class="btn btn-primary">View My Work</a>
        <a href="#contact" class="btn btn-secondary">Reach Out</a>
      </div>
    </div>
  </section>

  <!-- ============ PROFESSIONAL SUMMARY ============ -->
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
          <strong>Machine Learning</strong> with strong programming fundamentals.
        </p>
        <p>
          Over the past few years I've built <strong>six production-grade projects</strong> spanning
          AI-powered learning platforms, real-time waste-management systems, NLP-driven marketplaces,
          predictive career analytics, and digital career guidance platforms
          — working across the stack with React, Node, MongoDB, Python, Flask,
          TensorFlow, LangChain, and LLMs.
        </p>
        <p>
          I've competed in <strong>8+ hackathons and ideathons</strong>, winning at
          <em>SIH Internal Hackathon - HackerWar 4.0</em>, placing 1st Runners Up at <em>Trident Triathlon</em>, and earning
          finalist recognition at <em>Code4Odisha</em> (Govt. of Odisha). I lead teams, mentor juniors,
          and thrive in high-pressure build environments.
        </p>
        <p>
          Beyond code, I study philosophy, sketch, and journal — because great engineers need
          great ideas, and great ideas need quiet time to grow.
        </p>
      </div>

      <!-- Achievements banner -->
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
        </div>

        <div class="card reveal">
          <h3>Green Guardian</h3>
          <p>Tech-driven waste management solution connecting citizens with collectors — featuring real-time tracking and route optimization.</p>
          <div class="tags">
            <span class="tag">TensorFlow</span><span class="tag">Socket.IO</span>
            <span class="tag">Maps API</span><span class="tag">Express</span>
          </div>
        </div>

        <div class="card reveal">
          <h3>Legal Connect India</h3>
          <p>E-marketplace connecting citizens with legal service providers, powered by an ML review system and intelligent service matching.</p>
          <div class="tags">
            <span class="tag">Node.js</span><span class="tag">TextBlob</span>
            <span class="tag">NLTK</span><span class="tag">Socket.IO</span>
          </div>
        </div>

        <div class="card reveal">
          <h3>CareerCastAI</h3>
          <p>Machine learning solution that predicts student career paths from performance analysis, enabling early academic intervention.</p>
          <div class="tags">
            <span class="tag">Python</span><span class="tag">Flask</span>
            <span class="tag">Jupyter</span><span class="tag">ML</span>
          </div>
        </div>

        <div class="card reveal">
          <h3>Abhyudaya</h3>
          <p>Digital career guidance platform addressing knowledge gaps for students in Odisha about competitive exams and career pathways.</p>
          <div class="tags">
            <span class="tag">HTML/CSS</span><span class="tag">Express</span>
            <span class="tag">Socket.IO</span><span class="tag">Chat</span>
          </div>
        </div>

        <div class="card reveal">
          <h3>WastED</h3>
          <p>Communication platform connecting citizens, Municipal Corporations, and NGOs to improve waste-management efficiency.</p>
          <div class="tags">
            <span class="tag">HTML/CSS</span><span class="tag">Node.js</span>
            <span class="tag">TextBlob</span><span class="tag">Sentiment</span>
          </div>
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

  <!-- ============ CONTACT ============ -->
  <section id="contact">
    <div class="container">
      <div class="contact-box reveal">
        <div class="section-header" style="margin-bottom: 28px;">
          <h2>Let's build something.</h2>
          <p>Open to collaborations, roles, and interesting conversations.</p>
        </div>
        <div class="btn-group">
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
        <a href="https://forms.gle/uY7chgiYZEKwbwu47" target="_blank" rel="noopener noreferrer">Contact Form</a>
        <a href="mailto:nameeshak1@gmail.com">Email</a>
      </div>
      <p>&copy; Thanks for stopping by! &lt;3</p>
    </div>
  </footer>

  <script>
    // ---------- Sticky nav opacity change on scroll ----------
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }, { passive: true });

    // ---------- Fade-in on scroll ----------
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
      el.style.transitionDelay = (i % 6) * 30 + 'ms';
      io.observe(el);
    });

    // ---------- ★ MOUSE-TRACKING GLOW ON TILES ----------
    // Makes the radial glow follow the cursor inside each card for extra "pop"
    const tiles = document.querySelectorAll('.card, .list-item');
    tiles.forEach(tile => {
      tile.addEventListener('mousemove', (e) => {
        const rect = tile.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        tile.style.setProperty('--mx', x + '%');
        tile.style.setProperty('--my', y + '%');
      });
      tile.addEventListener('mouseleave', () => {
        tile.style.setProperty('--mx', '50%');
        tile.style.setProperty('--my', '50%');
      });
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