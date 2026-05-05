// Cloudflare Worker — Portfolio Site
// Returns a fully self-contained HTML page (inlined CSS + JS)

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Nameesha K — Data Analyst & ML Developer. Portfolio of projects, achievements and contact." />
  <title>Nameesha K — Portfolio</title>
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
      --glass-hover: rgba(255, 255, 255, 0.08);
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
    }
    a { color: inherit; text-decoration: none; }
    img { max-width: 100%; display: block; }

    /* ---------- LAYOUT ---------- */
    .container { width: 100%; max-width: 1100px; margin: 0 auto; padding: 0 24px; }
    section { padding: 120px 0; position: relative; }

    /* ---------- NAVBAR (frosted glass) ---------- */
    .nav {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 100;
      padding: 14px 0;
      background: rgba(10, 10, 10, 0.6);
      backdrop-filter: saturate(180%) blur(20px);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      border-bottom: 1px solid transparent;
      transition: background 0.4s var(--ease), border-color 0.4s var(--ease);
    }
    .nav.scrolled {
      background: rgba(10, 10, 10, 0.85);
      border-bottom-color: rgba(255,255,255,0.08);
    }
    .nav-inner { display: flex; align-items: center; justify-content: space-between; }
    .logo { font-size: 20px; font-weight: 600; letter-spacing: -0.01em; }
    .nav-links { display: flex; gap: 28px; }
    .nav-links a {
      font-size: 13.5px; font-weight: 400; color: var(--text-dim);
      transition: color 0.3s var(--ease);
    }
    .nav-links a:hover { color: var(--text); }

    /* ---------- HERO ---------- */
    .hero {
      min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      text-align: center;
      position: relative;
      overflow: hidden;
      padding-top: 80px;
    }
    /* Animated gradient background */
    .hero-bg {
      position: absolute; inset: 0;
      background:
        radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.25), transparent 45%),
        radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.18), transparent 45%),
        radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.22), transparent 50%);
      animation: drift 18s ease-in-out infinite alternate;
      filter: blur(40px);
      z-index: 0;
    }
    @keyframes drift {
      0%   { transform: translate3d(0, 0, 0) scale(1); }
      50%  { transform: translate3d(-30px, 20px, 0) scale(1.08); }
      100% { transform: translate3d(30px, -20px, 0) scale(1.05); }
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

    /* ---------- BUTTONS (pill) ---------- */
    .btn-group { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 28px;
      border-radius: 980px;
      font-size: 15px; font-weight: 500;
      letter-spacing: -0.01em;
      cursor: pointer; border: 1px solid transparent;
      transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease), background 0.3s var(--ease);
    }
    .btn-primary { background: #ffffff; color: #000; }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 40px rgba(255,255,255,0.25);
    }
    .btn-secondary {
      background: transparent; color: var(--text);
      border-color: rgba(255,255,255,0.2);
    }
    .btn-secondary:hover {
      background: rgba(255,255,255,0.08);
      border-color: rgba(255,255,255,0.35);
      transform: translateY(-2px);
    }

    /* ---------- SECTION HEADERS ---------- */
    .section-header { text-align: center; margin-bottom: 64px; }
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

    /* ---------- ABOUT ---------- */
    .about-card {
      max-width: 820px; margin: 0 auto;
      padding: 48px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }
    .about-card p {
      font-size: 18px; color: var(--text-dim);
      margin-bottom: 16px; line-height: 1.65;
    }
    .about-card p:last-child { margin-bottom: 0; }

    /* ---------- PROJECT GRID (glassmorphism) ---------- */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
    }
    .card {
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius);
      padding: 32px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      transition: transform 0.4s var(--ease), background 0.4s var(--ease), border-color 0.4s var(--ease), box-shadow 0.4s var(--ease);
      display: flex; flex-direction: column;
    }
    .card:hover {
      transform: translateY(-6px);
      background: var(--glass-hover);
      border-color: rgba(255,255,255,0.18);
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
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
    .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
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
      transition: gap 0.3s var(--ease);
    }
    .card-link:hover { gap: 10px; }
    .card-link::after { content: "→"; transition: transform 0.3s var(--ease); }

    /* ---------- ACHIEVEMENTS / SKILLS ---------- */
    .list-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }
    .list-item {
      padding: 28px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius);
      backdrop-filter: blur(20px);
      transition: transform 0.4s var(--ease), border-color 0.4s var(--ease);
    }
    .list-item:hover {
      transform: translateY(-4px);
      border-color: rgba(255,255,255,0.18);
    }
    .list-item h4 { font-size: 17px; font-weight: 600; margin-bottom: 8px; }
    .list-item p { font-size: 14.5px; color: var(--text-dim); line-height: 1.55; }

    /* ---------- CONTACT ---------- */
    .contact { text-align: center; }
    .contact-box {
      max-width: 720px; margin: 0 auto;
      padding: 64px 48px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius);
      backdrop-filter: blur(20px);
    }

    /* ---------- FOOTER ---------- */
    footer {
      padding: 40px 0;
      border-top: 1px solid rgba(255,255,255,0.06);
      text-align: center;
    }
    .social { display: flex; justify-content: center; gap: 24px; margin-bottom: 16px; }
    .social a {
      font-size: 14px; color: var(--text-dim);
      transition: color 0.3s var(--ease);
    }
    .social a:hover { color: var(--text); }
    footer p { font-size: 12px; color: var(--text-dim); }

    /* ---------- SCROLL FADE-IN ---------- */
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
      will-change: opacity, transform;
    }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    /* ---------- RESPONSIVE ---------- */
    @media (max-width: 640px) {
      section { padding: 80px 0; }
      .nav-links { gap: 16px; }
      .nav-links a { font-size: 12.5px; }
      .about-card { padding: 32px 24px; }
      .contact-box { padding: 44px 24px; }
      .card { padding: 24px; }
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

  <!-- ============ ABOUT ============ -->
  <section id="about">
    <div class="container">
      <div class="section-header reveal">
        <h2>About</h2>
        <p>A little background on who I am and what drives me.</p>
      </div>
      <div class="about-card reveal">
        <p>I'm K. Nameesha — a Computer Science engineer who survived both the pandemic and the degree, graduating with a solid 9.26 CGPA and zero disciplinary actions (Asian-parent approved).</p>
        <p>I've taken on multiple hackathons and won a few along the way. I love learning new things, and even when I'm not the best at something, I have the resilience to figure it out.</p>
        <p>My focus: turning data into decisions, and ideas into products that feel effortless to use.</p>
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
        <!-- PROJECT 1 -->
        <div class="card reveal">
          <h3>QUOLO</h3>
          <p>AI-powered learning platform that lets students interact with their study materials through summaries and Q&A, plus academic progress tracking.</p>
          <div class="tags">
            <span class="tag">React</span><span class="tag">Node</span>
            <span class="tag">MongoDB</span><span class="tag">LLMs</span><span class="tag">LangChain</span>
          </div>
          <a href="https://github.com/NameeshaK" class="card-link" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>

        <!-- PROJECT 2 -->
        <div class="card reveal">
          <h3>Green Guardian</h3>
          <p>Tech-driven waste management solution connecting citizens with collectors — featuring real-time tracking and route optimization.</p>
          <div class="tags">
            <span class="tag">TensorFlow</span><span class="tag">Socket.IO</span>
            <span class="tag">Maps API</span><span class="tag">Express</span>
          </div>
          <a href="https://github.com/NameeshaK" class="card-link" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>

        <!-- PROJECT 3 -->
        <div class="card reveal">
          <h3>Legal Connect India</h3>
          <p>E-marketplace connecting citizens with legal service providers, powered by an ML review system and intelligent service matching.</p>
          <div class="tags">
            <span class="tag">Node.js</span><span class="tag">TextBlob</span>
            <span class="tag">NLTK</span><span class="tag">Socket.IO</span>
          </div>
          <a href="https://github.com/NameeshaK" class="card-link" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>

        <!-- PROJECT 4 -->
        <div class="card reveal">
          <h3>CareerCastAI</h3>
          <p>Machine learning solution that predicts student career paths from performance analysis, enabling early academic intervention.</p>
          <div class="tags">
            <span class="tag">Python</span><span class="tag">Flask</span>
            <span class="tag">Jupyter</span><span class="tag">ML</span>
          </div>
          <a href="https://github.com/NameeshaK" class="card-link" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>

        <!-- PROJECT 5 -->
        <div class="card reveal">
          <h3>Abhyudaya</h3>
          <p>Digital career guidance platform addressing knowledge gaps for students in Odisha about competitive exams and career pathways.</p>
          <div class="tags">
            <span class="tag">HTML/CSS</span><span class="tag">Express</span>
            <span class="tag">Socket.IO</span><span class="tag">Chat</span>
          </div>
          <a href="https://github.com/NameeshaK" class="card-link" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>

        <!-- PROJECT 6 -->
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

  <!-- ============ CONTACT ============ -->
  <section id="contact" class="contact">
    <div class="container">
      <div class="contact-box reveal">
        <div class="section-header" style="margin-bottom: 28px;">
          <h2>Let's build something.</h2>
          <p>Open to collaborations, roles, and interesting conversations.</p>
        </div>
        <div class="btn-group">
          <a href="mailto:nameeshak1@gmail.com" class="btn btn-primary">Reach Out</a>
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
        <a href="mailto:nameeshak1@gmail.com">Email</a>
      </div>
      <p>&copy; 2025 Nameesha K. All rights reserved.</p>
    </div>
  </footer>

  <script>
    // ---------- Sticky nav opacity change on scroll ----------
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }, { passive: true });

    // ---------- IntersectionObserver for scroll-fade-in ----------
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach((el, i) => {
      // Stagger via transition-delay so animation feels natural
      el.style.transitionDelay = (i % 6) * 60 + 'ms';
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