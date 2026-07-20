/* =============================================================================
   Compass 9, App (router + views + My Plan)
   -----------------------------------------------------------------------------
   Vanilla hash-routed SPA. No framework, no build step, no backend.
   Routes:
     #/                                Home (shader hero)
     #/quiz  #/quiz-results            Quiz + matches
     #/fields  #/careers/:m  #/results/:m/:c   Explore + Results Hub
     #/colleges                        Colleges explorer (filterable)
     #/how  #/about                    Method + trust pages
     #/plan                            My Plan, a printable dossier
   ========================================================================== */

(function () {
  "use strict";

  const app = document.getElementById("app");

  /* ---------- helpers ---------- */
  const esc = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const money = (n) => "$" + Number(n).toLocaleString("en-US");
  const go = (h) => (window.location.hash = h);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "auto" });

  function iconFor(majorKey) {
    return (ICONS.field && ICONS.field[majorKey]) || "";
  }

  /* ---------- state ---------- */
  const quizState = { current: 0, answers: {} };
  let activeBgs = [];
  const explorerFilter = { major: null };

  /* ---------- persistence ---------- */
  function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function safeDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

  function loadResults() {
    try { const r = sessionStorage.getItem("pf_results"); return r ? JSON.parse(r) : null; }
    catch (e) { return null; }
  }
  function saveResults(r) { try { sessionStorage.setItem("pf_results", JSON.stringify(r)); } catch (e) {} }

  function loadPlan() {
    try { const r = safeGet("pf_plan"); return r ? JSON.parse(r) : null; } catch (e) { return null; }
  }
  function savePlan(majorKey, careerId) {
    safeSet("pf_plan", JSON.stringify({ majorKey, careerId, savedAt: Date.now() }));
  }
  function clearPlan() { safeDel("pf_plan"); }
  const getPlanName = () => safeGet("pf_plan_name") || "";
  const setPlanName = (n) => safeSet("pf_plan_name", n);

  /* ---------- view lifecycle ---------- */
  function teardownView() {
    activeBgs.forEach((fn) => { try { fn && fn(); } catch (e) {} });
    activeBgs = [];
  }

  // Boot any [data-bg] mounts in the current view (paths / beams).
  function mountBackgrounds() {
    app.querySelectorAll("[data-bg]").forEach((mount) => {
      let t = null;
      if (mount.dataset.bg === "hills" && window.initHillsBackground) t = window.initHillsBackground(mount);
      else if (mount.dataset.bg === "paths" && window.initPathsBackground) t = window.initPathsBackground(mount);
      else if (mount.dataset.bg === "beams" && window.initBeamsBackground) t = window.initBeamsBackground(mount, { intensity: mount.dataset.intensity || "strong" });
      if (t) activeBgs.push(t);
    });
  }

  function reduceMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function setupReveals() {
    const els = app.querySelectorAll(".reveal, .reveal-stagger");
    if (!els.length) return;
    if (reduceMotion() || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
  }

  // Count-up on any [data-count] number (whispered motion).
  function animateCounts(root) {
    const nodes = (root || app).querySelectorAll("[data-count]");
    nodes.forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const fmt = (v) => prefix + Math.round(v).toLocaleString("en-US") + suffix;
      if (reduceMotion()) { el.textContent = fmt(target); return; }
      const dur = 850, start = performance.now();
      (function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      })(performance.now());
    });
  }

  /* ---------- nav ---------- */
  function updateNav(routeKey) {
    document.querySelectorAll("[data-route]").forEach((a) => {
      a.classList.toggle("active", a.dataset.route === routeKey);
    });
    const hasPlan = !!loadPlan();
    document.querySelectorAll(".plan-chip").forEach((c) => c.classList.toggle("show", hasPlan));
  }

  /* ========================================================================
     HOME
     ===================================================================== */
  function renderHome() {
    app.innerHTML = `
      <section class="hero-shader">
        <div class="bg-mount hero-hills" data-bg="hills"></div>
        <div class="hero-overlay">
          <span class="eyebrow">plan your high school path · grades 9 to 12</span>
          <h1 class="hero-title">Your future,<br><span class="foil">mapped from grade 9.</span></h1>
          <p class="hero-lead">${esc(APP_DATA.tagline)}</p>
          <div class="hero-ctas">
            <button class="btn btn-gold" data-go="#/quiz">${ICONS.ui.compass}Take the 2-minute quiz</button>
            <button class="btn btn-ghost" data-go="#/fields">Browse fields</button>
          </div>
        </div>
        <div class="hero-scroll">how it works ↓</div>
      </section>

      <section class="home-content viewfade">
        <div class="home-lede reveal">
          <h2>Not a quiz. A plan.</h2>
          <p>Most students pick high school classes blind. Compass 9 works like a college counselor: it finds a direction that fits you, then hands you the exact courses, scores, clubs, and colleges to aim for.</p>
        </div>

        <div class="entry-grid reveal-stagger">
          <button class="entry-card" data-go="#/quiz">
            ${ICONS.ui.compass}
            <h3>Not sure yet?</h3>
            <p>Answer 12 quick questions and we'll match you to fields that fit how you think and work.</p>
            <span class="entry-cta">Take the quiz →</span>
          </button>
          <button class="entry-card alt" data-go="#/fields">
            ${ICONS.ui.target}
            <h3>Already know your interest?</h3>
            <p>Skip ahead, browse fields, real careers, and the schools that lead there.</p>
            <span class="entry-cta">Browse fields →</span>
          </button>
        </div>

        <div class="how">
          <div class="section-head-c reveal">
            <span class="eyebrow">the path in three steps</span>
            <h2>From "no idea" to a real plan.</h2>
          </div>
          <div class="steps reveal-stagger">
            <div class="step"><div class="step-num">01</div><h4>Quiz or browse</h4><p>Take the quiz or pick a field you already like.</p></div>
            <div class="step"><div class="step-num">02</div><h4>Explore careers</h4><p>See real jobs with salaries and what the work is actually like.</p></div>
            <div class="step"><div class="step-num">03</div><h4>Get your dossier</h4><p>A year-by-year AP plan, SAT target, top colleges, and clubs, printable.</p></div>
          </div>
        </div>
      </section>

      <section class="full-bleed">
        <div class="beams-band closing-band">
          <div class="bg-mount" data-bg="beams" data-intensity="medium"></div>
          <div class="beams-band-inner">
            <h2>Your plan is two minutes away.</h2>
            <p>Twelve questions. One direction. A dossier you can print and hand to your counselor.</p>
            <button class="btn btn-gold" data-go="#/quiz">${ICONS.ui.compass}Start the quiz</button>
          </div>
        </div>
      </section>
    `;
  }

  /* ========================================================================
     QUIZ
     ===================================================================== */
  function renderQuiz() {
    const total = QUIZ_QUESTIONS.length;
    const idx = quizState.current;
    const q = QUIZ_QUESTIONS[idx];
    const answered = quizState.answers[q.id];
    const pct = Math.round(((idx + (answered !== undefined ? 1 : 0)) / total) * 100);
    const isLast = idx === total - 1;
    const typeLabel = q.type === "interest" ? "what interests you" : "how you work best";

    app.innerHTML = `
      <section class="quiz viewfade">
        <div class="progress-wrap">
          <div class="progress-meta"><span>Question ${idx + 1} of ${total}</span><span>${pct}%</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        </div>
        <span class="eyebrow q-type">${typeLabel}</span>
        <h2 class="q-text">${esc(q.text)}</h2>
        <div class="options" role="radiogroup" aria-label="${esc(q.text)}">
          ${q.options.map((opt, i) => `
            <button class="option ${answered === i ? "selected" : ""}" role="radio" aria-checked="${answered === i}" data-opt="${i}">
              <span class="option-marker"></span><span class="option-text">${esc(opt.text)}</span>
            </button>`).join("")}
        </div>
        <div class="quiz-nav">
          <button class="btn btn-ghost" data-back ${idx === 0 ? "disabled" : ""}>← Back</button>
          <button class="btn btn-primary" data-next ${answered === undefined ? "disabled" : ""}>${isLast ? "See my matches" : "Next →"}</button>
        </div>
      </section>`;

    app.querySelectorAll(".option").forEach((btn) =>
      btn.addEventListener("click", () => { quizState.answers[q.id] = Number(btn.dataset.opt); renderQuiz(); })
    );
    const back = app.querySelector("[data-back]");
    if (back) back.addEventListener("click", () => { if (quizState.current > 0) { quizState.current--; renderQuiz(); scrollTop(); } });
    const next = app.querySelector("[data-next]");
    if (next) next.addEventListener("click", () => {
      if (quizState.answers[q.id] === undefined) return;
      if (isLast) { saveResults(scoreQuiz(quizState.answers)); go("#/quiz-results"); }
      else { quizState.current++; renderQuiz(); scrollTop(); }
    });
  }

  /* ========================================================================
     QUIZ RESULTS
     ===================================================================== */
  function renderQuizResults() {
    const ranked = loadResults();
    if (!ranked || !ranked.length) { go("#/quiz"); return; }
    const top = ranked.slice(0, 3);

    app.innerHTML = `
      <section class="results-intro viewfade">
        <span class="eyebrow">your matches</span>
        <h1>These fields fit you well.</h1>
        <p class="lead">This isn't your destiny, it's a strong place to start. Pick one to see real careers and a plan.</p>
        <div class="match-list reveal-stagger">
          ${top.map((r, i) => {
            const m = getMajor(r.key);
            return `
            <article class="match-card">
              <div class="match-rank">${i + 1}</div>
              <div class="match-thumb" style="--tint:${fieldMedia(m.key).tint}">
                ${iconFor(m.key)}
                <img src="${fieldMedia(m.key).img}" alt="" loading="lazy" onerror="this.remove()" />
              </div>
              <div class="match-body">
                <h3>${esc(m.name)}</h3>
                <p class="match-desc">${esc(m.short)}</p>
                <p class="why"><strong>Why this fits you:</strong> ${esc(m.whyFits)}</p>
                <button class="btn btn-primary" data-go="#/careers/${m.key}">Explore ${esc(m.name)} careers →</button>
              </div>
            </article>`;
          }).join("")}
        </div>
        <div class="retake">
          <button class="btn btn-ghost" data-retake>↺ Retake the quiz</button>
          <button class="btn btn-ghost" data-go="#/fields">Browse all fields</button>
        </div>
      </section>`;

    const rt = app.querySelector("[data-retake]");
    if (rt) rt.addEventListener("click", () => { quizState.current = 0; quizState.answers = {}; go("#/quiz"); });
  }

  /* ========================================================================
     FIELDS
     ===================================================================== */
  function renderFields() {
    app.innerHTML = `
      <section class="fields viewfade">
        <span class="eyebrow">browse fields</span>
        <h1>Pick a field that interests you.</h1>
        <p class="lead">Choose one to see the real careers inside it.</p>
        <div class="field-grid reveal-stagger">
          ${APP_DATA.majors.map((m) => {
            const media = fieldMedia(m.key);
            return `
            <button class="field-card" data-go="#/careers/${m.key}">
              <div class="field-cover" style="--tint:${media.tint}">
                <img src="${media.img}" alt="" loading="lazy" onerror="this.remove()" />
                ${iconFor(m.key)}
              </div>
              <h3>${esc(m.name)}</h3>
              <p>${esc(m.short)}</p>
            </button>`;
          }).join("")}
        </div>
      </section>`;
  }

  /* ========================================================================
     CAREER LIST
     ===================================================================== */
  function renderCareers(majorKey) {
    const major = getMajor(majorKey);
    if (!major) { go("#/fields"); return; }
    app.innerHTML = `
      <section class="careers viewfade">
        <a class="back-link" href="#/fields">← all fields</a>
        <div class="section-head">
          ${iconFor(major.key)}
          <div><h1>${esc(major.name)}</h1><p class="lead">${esc(major.description)}</p></div>
        </div>
        <h3 class="list-title">Careers in this field</h3>
        <div class="career-grid reveal-stagger">
          ${major.careers.map((c) => {
            const cm = careerImg(major.key, c.id);
            return `
            <button class="career-card" data-go="#/results/${major.key}/${c.id}">
              <div class="career-cover" style="--tint:${cm.tint}">
                <img src="${cm.img || cm.fallback}" alt="" loading="lazy" onerror="this.onerror=null;this.src='${cm.fallback}'" />
              </div>
              <h3>${esc(c.title)}</h3>
              <p class="career-short">${esc(c.short)}</p>
              <div class="career-stats">
                <span class="stat"><span class="stat-label">Median pay</span><span class="stat-val">${money(c.salaryMedian)}</span></span>
                <span class="stat"><span class="stat-label">Hours</span><span class="stat-val">${esc(c.hours)}</span></span>
              </div>
              <span class="career-cta">See the roadmap →</span>
            </button>`;
          }).join("")}
        </div>
      </section>`;
  }

  /* ========================================================================
     RESULTS HUB
     ===================================================================== */
  const escAttr = (s) => esc(s).replace(/"/g, "&quot;");

  // Year-by-year plan: core courses for the field plus optional "boost" courses,
  // each labelled and hoverable for a plain-language description.
  function roadmapHTML(major) {
    const years = [["freshman", "Freshman"], ["sophomore", "Sophomore"], ["junior", "Junior"], ["senior", "Senior"]];
    return years.map(([key, label], i) => {
      const core = (major.apRoadmap[key] || []).map((cl) => ({ name: cl.name, note: cl.note, tag: "core" }));
      const boost = boostAPsFor(major.key, key).map((b) => ({ name: b.name, note: b.why, tag: "boost" }));
      const items = core.concat(boost);
      return `
      <div class="year-col">
        <div class="year-head"><span class="year-num">Grade ${9 + i}</span>${label}</div>
        <ul class="year-classes">
          ${items.map((cl) => {
            const tip = apDescription(cl.name);
            return `<li data-tag="${cl.tag}"${tip ? ` data-tip="${escAttr(tip)}"` : ""} tabindex="0">
              <span class="cl-tag cl-${cl.tag}">${cl.tag === "core" ? "Core" : "Boost"}</span>
              <span class="cl-name">${esc(cl.name)}</span>
              ${cl.note ? `<span class="cl-note">${esc(cl.note)}</span>` : ""}
            </li>`;
          }).join("")}
        </ul>
      </div>`;
    }).join("");
  }

  // Nine schools grouped by how selective they are, with acceptance rate + SAT.
  function collegeTiersHTML(majorKey) {
    const tiers = collegeTiers(majorKey, 3);
    const groups = [
      { key: "reach", label: "Reach", sub: "under 20% accepted" },
      { key: "target", label: "Target", sub: "20% to 50% accepted" },
      { key: "likely", label: "Likely", sub: "over 50% accepted" }
    ];
    return groups.map((g) => {
      const list = tiers[g.key] || [];
      if (!list.length) return "";
      return `
      <div class="tier">
        <div class="tier-head"><span class="tier-name tier-${g.key}">${g.label}</span><span class="tier-sub">${g.sub}</span></div>
        <div class="tier-list">
          ${list.map((c) => `
            <div class="college" style="--c1:${c.c1};--c2:${c.c2};--tx:${c.tx}">
              <div class="crest"><img src="${collegeLogo(c)}" alt="" loading="lazy" onerror="this.remove()" /><span class="crest-mono">${esc(c.mono)}</span></div>
              <div class="college-info">
                <div class="college-name">${esc(c.name)}</div>
                <div class="college-meta">${esc(c.city)}</div>
              </div>
              <div class="college-stats">
                <div class="cstat"><span class="cstat-v">${c.acc}%</span><span class="cstat-k">accepted</span></div>
                <div class="cstat"><span class="cstat-v">${c.sat[0]}-${c.sat[1]}</span><span class="cstat-k">SAT</span></div>
              </div>
            </div>`).join("")}
        </div>
      </div>`;
    }).join("");
  }

  function renderResults(majorKey, careerId) {
    const major = getMajor(majorKey);
    const career = getCareer(majorKey, careerId);
    if (!major || !career) { go("#/fields"); return; }

    let salaryHtml;
    if (career.salaryLow && career.salaryHigh) {
      salaryHtml = `
        <div class="salary-range">
          <div class="salary-point"><span class="salary-label">Entry level</span><span class="salary-num" data-count="${career.salaryLow}" data-prefix="$">$0</span></div>
          <div class="salary-track"><div class="salary-median">Median ${money(career.salaryMedian)}</div></div>
          <div class="salary-point"><span class="salary-label">Experienced</span><span class="salary-num" data-count="${career.salaryHigh}" data-prefix="$" data-suffix="+">$0</span></div>
        </div>
        ${career.salaryNote ? `<span class="salary-note">${esc(career.salaryNote)}</span>` : ""}`;
    } else {
      salaryHtml = `
        <div class="salary-single">
          <span class="salary-num" data-count="${career.salaryMedian}" data-prefix="$">$0</span><span class="per">/yr</span>
          <span class="salary-note">${esc(career.salaryNote || "National median (BLS). Entry-level pay is typically lower; experienced/specialized pay runs higher.")}</span>
        </div>`;
    }

    const saved = loadPlan();
    const isSaved = saved && saved.majorKey === majorKey && saved.careerId === careerId;

    app.innerHTML = `
      <section class="hub viewfade">
        <a class="back-link" href="#/careers/${major.key}">← other ${esc(major.name)} careers</a>
        <header class="hub-header">
          <span class="hub-field">${esc(major.name)}</span>
          <h1>${esc(career.title)}</h1>
          <p class="hub-desc">${esc(career.long)}</p>
          ${career.caveat ? `<p class="inline-caveat">⚠️ ${esc(career.caveat)}</p>` : ""}
          <div class="hub-actions">
            ${isSaved
              ? `<button class="btn btn-primary" data-go="#/plan">${ICONS.ui.check}View my plan</button>`
              : `<button class="btn btn-gold" data-action="save-plan" data-major="${major.key}" data-career="${career.id}">${ICONS.ui.bookmark}Save to my plan</button>`}
          </div>
        </header>

        <div class="hub-card reveal">
          <h3 class="hub-card-title">${ICONS.ui.salary}Career snapshot</h3>
          ${salaryHtml}
          <div class="snapshot-grid"><div class="snapshot-item"><span class="si-label">Typical hours</span><span class="si-val">${esc(career.hours)}</span></div></div>
          ${career.dayInLife ? `<div class="day-in-life"><h4>A day in the life</h4><ul>${career.dayInLife.map((d) => `<li>${esc(d)}</li>`).join("")}</ul></div>` : ""}
          <p class="region-note">${esc(APP_DATA.regionNote)}</p>
        </div>

        <div class="hub-card rigor-card reveal">
          <h3 class="hub-card-title">${ICONS.ui.star}${esc(AP_RIGOR_BLURB.title)}</h3>
          <p class="rigor-body">${esc(AP_RIGOR_BLURB.body)}</p>
          <ul class="rigor-points">
            ${AP_RIGOR_BLURB.points.map((p) => `<li>${esc(p)}</li>`).join("")}
          </ul>
        </div>

        <div class="hub-card reveal">
          <h3 class="hub-card-title">${ICONS.ui.map}Your AP class roadmap</h3>
          <p class="hub-card-sub">A year-by-year plan tuned for ${esc(major.name)}. Hover any course for a plain-language description.</p>
          <div class="plan-toggle" role="tablist" aria-label="Filter courses">
            <button class="ptab active" data-plan="all" role="tab">All courses</button>
            <button class="ptab" data-plan="core" role="tab">Core only</button>
            <button class="ptab" data-plan="boost" role="tab">Boosts only</button>
          </div>
          <div class="roadmap" data-filter="all">${roadmapHTML(major)}</div>
          <p class="caveat">📌 ${esc(APP_DATA.bhsCaveat)}</p>
        </div>

        <div class="hub-card reveal">
          <h3 class="hub-card-title">${ICONS.ui.target}Target SAT score</h3>
          <div class="sat-box"><div class="sat-range"><span data-count="${major.sat.low}">0</span>-<span data-count="${major.sat.high}">0</span></div><div class="sat-scale">out of 1600</div></div>
          <p class="sat-note">${esc(major.sat.note)}</p>
          <p class="sat-timing">🗓️ ${esc(APP_DATA.satTimingNote)}</p>
        </div>

        <div class="hub-card reveal">
          <h3 class="hub-card-title">${ICONS.ui.star}Recommended extracurriculars</h3>
          <p class="hub-card-sub">Clubs and activities that build your skills, and your college application, in this field.</p>
          <ul class="ec-list">${major.extracurriculars.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
        </div>

        <div class="hub-card colleges-card reveal">
          <h3 class="hub-card-title">${ICONS.ui.cap}Where to apply for ${esc(major.name)}</h3>
          <p class="hub-card-sub">A balanced list: three reaches, three targets, and three likelies, with each school's acceptance rate and SAT middle 50%.</p>
          <div class="tiers">${collegeTiersHTML(major.key)}</div>
          <p class="fine">Acceptance rates and SAT ranges are approximate and shift every year. Build a balanced list, and remember that a strong application is more than numbers. <a href="#/colleges" style="color:var(--gold-bright)">Explore all schools →</a></p>
        </div>

        <div class="hub-footer-ctas">
          <button class="btn btn-primary" data-go="#/careers/${major.key}">← Other ${esc(major.name)} careers</button>
          <button class="btn btn-ghost" data-go="#/fields">Start over</button>
        </div>
      </section>`;

    const save = app.querySelector('[data-action="save-plan"]');
    if (save) save.addEventListener("click", () => { savePlan(major.key, career.id); go("#/plan"); });

    // Core / Boost filter for the AP plan
    const roadmapEl = app.querySelector(".roadmap");
    app.querySelectorAll(".ptab").forEach((tab) => {
      tab.addEventListener("click", () => {
        app.querySelectorAll(".ptab").forEach((t) => t.classList.toggle("active", t === tab));
        if (roadmapEl) roadmapEl.dataset.filter = tab.dataset.plan;
      });
    });

    // count-ups run when their card scrolls into view
    scheduleCountsOnReveal();
  }

  // Trigger count-ups the first time a card with counts becomes visible.
  function scheduleCountsOnReveal() {
    const targets = app.querySelectorAll(".hub-card [data-count], .dossier [data-count]");
    if (!targets.length) return;
    if (reduceMotion() || !("IntersectionObserver" in window)) { animateCounts(app); return; }
    const seen = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && !seen.has(en.target)) { seen.add(en.target); animateCounts(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    // observe the numbers' nearest card wrapper
    app.querySelectorAll(".hub-card, .dossier").forEach((c) => { if (c.querySelector("[data-count]")) io.observe(c); });
  }

  /* ========================================================================
     COLLEGES EXPLORER
     ===================================================================== */
  function renderColleges() {
    const fields = APP_DATA.majors;
    const { major } = explorerFilter;

    const bandHTML = ADMIT_BANDS.map((band) => {
      const list = collegesInBand(band.key, major, 15);
      if (!list.length) return "";
      const cards = list.map((c) => `
        <div class="xcollege" style="--c1:${c.c1};--c2:${c.c2};--tx:${c.tx}">
          <div class="crest"><img src="${collegeLogo(c)}" alt="" loading="lazy" onerror="this.remove()" /><span class="crest-mono">${esc(c.mono)}</span></div>
          <div class="xcollege-body">
            <div class="xcollege-name">${esc(c.short)}</div>
            <div class="xcollege-meta">${esc(c.city)}</div>
            <div class="xcollege-nums"><span>${c.acc}% accepted</span><span>SAT ${c.sat[0]}-${c.sat[1]}</span></div>
          </div>
        </div>`).join("");
      return `
      <div class="band reveal">
        <div class="band-head">
          <div>
            <span class="tier-name tier-${band.key}">${esc(band.label)}</span>
            <span class="tier-sub">${esc(band.range)}</span>
          </div>
          <span class="band-count">${list.length} schools</span>
        </div>
        <p class="band-blurb">${esc(band.blurb)}</p>
        <ul class="band-marks">${band.marks.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
        <div class="college-grid">${cards}</div>
      </div>`;
    }).join("");

    app.innerHTML = `
      <section class="explorer viewfade">
        <span class="eyebrow">the college board</span>
        <h1>Colleges by how hard they are to get into.</h1>
        <p class="lead">Every school grouped by acceptance rate, with what each group realistically takes. Filter by field to see who is strong where.</p>

        <div class="filter-bar">
          <span class="filter-label">Field</span>
          <button class="chip ${!major ? "active" : ""}" data-filter-major="">All</button>
          ${fields.map((m) => `<button class="chip ${major === m.key ? "active" : ""}" data-filter-major="${m.key}">${esc(m.name)}</button>`).join("")}
        </div>

        ${bandHTML || `<p class="explorer-empty">No schools match that filter yet.</p>`}
        <p class="fine" style="margin-top:var(--sp5)">Acceptance rates and SAT ranges are approximate and move every year. Use them to build a balanced list, not as a cutoff.</p>
      </section>`;

    app.querySelectorAll("[data-filter-major]").forEach((b) =>
      b.addEventListener("click", () => { explorerFilter.major = b.dataset.filterMajor || null; renderColleges(); setupReveals(); }));
  }

  /* ========================================================================
     HOW IT WORKS (method)
     ===================================================================== */
  function renderHow() {
    const steps = [
      { icon: ICONS.ui.quiz, img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=70", h: "We read interest and strength, not just interest.", p: "The quiz mixes RIASEC-style interest questions (\"which sounds more interesting?\") with strength questions (\"which assignment do you do best on?\"). Each answer adds points across the seven fields, so your top matches reflect both what you like and where you shine." },
      { icon: ICONS.ui.salary, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=70", h: "Every salary is real, from the government.", p: "Pay figures come from the U.S. Bureau of Labor Statistics: national medians, most recent available. We show ranges where BLS publishes them, and note that pay usually runs higher in big cities and tech hubs." },
      { icon: ICONS.ui.map, img: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=600&q=70", h: "The roadmap respects real prerequisites.", p: "AP suggestions are sequenced the way high schools actually schedule them, you can't take AP Calc BC before AB, or AP Bio before Chemistry. The order is standard for most public high schools; exact prereqs should be confirmed against your school's catalog." },
      { icon: ICONS.ui.cap, img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=70", h: "Colleges are matched by program reputation.", p: "For each field we rank strong undergraduate programs and show them in their own school colors. It's inspiration for where to aim, admissions depend on far more than one list." }
    ];
    app.innerHTML = `
      <section class="method viewfade">
        <span class="eyebrow">how it works</span>
        <h1>The method behind the plan.</h1>
        <p class="lead">Compass 9 is built to be credible enough for a counselor and clear enough for a student. Here's what's under the hood.</p>
        <div class="reveal-stagger" style="margin-top:var(--sp6)">
          ${steps.map((s, i) => `
            <div class="method-step">
              <div class="method-idx">0${i + 1}</div>
              <div class="method-body"><h3>${s.icon} ${esc(s.h)}</h3><p>${esc(s.p)}</p></div>
              <div class="method-photo photo"><img src="${s.img}" alt="" loading="lazy" onerror="this.closest('.method-photo').remove()" /></div>
            </div>`).join("")}
        </div>
        <div class="hub-footer-ctas" style="margin-top:var(--sp7)">
          <button class="btn btn-gold" data-go="#/quiz">Take the quiz</button>
          <button class="btn btn-ghost" data-go="#/about">Who this is for →</button>
        </div>
      </section>`;
  }

  /* ========================================================================
     ABOUT (trust)
     ===================================================================== */
  function renderAbout() {
    app.innerHTML = `
      <section class="about viewfade">
        <div class="about-hero">
          <span class="eyebrow">about</span>
          <h1>Every student deserves a counselor.</h1>
          <p class="lead">Not every family can hire a $300-an-hour college consultant. Compass 9 puts the same kind of guidance in front of any student for free: clear, credible, and built for the way they actually think.</p>
        </div>

        <div class="about-photos reveal">
          <div class="photo"><img src="assets/about-1.jpg" alt="College pennants on a wall" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1000&q=70'" /></div>
          <div class="photo"><img src="assets/about-2.jpg" alt="Students planning their path with a counselor" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=70'" /></div>
        </div>

        <div class="pillars reveal-stagger">
          <div class="pillar">${ICONS.ui.target}<h3>Made for students</h3><p>Written in plain, jargon-free language, without talking down. The goal is a plan you can act on right away.</p></div>
          <div class="pillar">${ICONS.ui.salary}<h3>Grounded in real data</h3><p>Salaries from the Bureau of Labor Statistics, sequencing from real course catalogs, colleges ranked by program strength.</p></div>
          <div class="pillar">${ICONS.ui.cap}<h3>Built around real classes</h3><p>Roadmaps follow the way high schools actually sequence courses, so the plan matches what students can really schedule.</p></div>
        </div>

        <div class="beams-band about-band reveal">
          <div class="bg-mount" data-bg="beams" data-intensity="medium"></div>
          <div class="beams-band-inner">
            <h2>A plan beats a <span class="foil">panic</span> every time.</h2>
            <p>Deciding early doesn't lock anyone in, it just replaces guesswork with a direction you can adjust. That head start is the whole point.</p>
          </div>
        </div>

        <div class="reveal">
          <span class="eyebrow">where the numbers come from</span>
          <h2 style="font-size:var(--t4);margin-top:6px">Our sources</h2>
          <div class="source-list">
            <div class="source"><strong>Salaries &amp; hours</strong><span>U.S. Bureau of Labor Statistics, Occupational Employment &amp; Wage Statistics (national medians).</span></div>
            <div class="source"><strong>AP sequencing</strong><span>Standard public-high-school course progressions; confirm exact prerequisites in your school's catalog.</span></div>
            <div class="source"><strong>College strengths</strong><span>Program-reputation rankings across the seven fields, a starting point, not a guarantee.</span></div>
            <div class="source"><strong>SAT ranges</strong><span>Typical admitted-student ranges for related undergraduate programs.</span></div>
          </div>
        </div>

        <div class="reveal" style="margin-top:var(--sp8)">
          <span class="eyebrow">the founder</span>
          <h2 style="font-size:var(--t4);margin-top:6px">Built by a student who wished this existed.</h2>
          <p class="lead">I went through course selection without a map. Compass 9 is the tool I wish I'd had starting high school.</p>
          <div class="founders founders-solo">
            <div class="founder"><div class="founder-avatar"><img src="assets/marcus.png" alt="Marcus Trittenbass" loading="lazy" onerror="this.remove()" />MT</div><div><div class="founder-name">Marcus Trittenbass</div><div class="founder-role">Founder · Bellevue High School</div></div></div>
          </div>
        </div>

        <div class="hub-footer-ctas" style="margin-top:var(--sp7)">
          <button class="btn btn-gold" data-go="#/quiz">Start the quiz</button>
          <button class="btn btn-ghost" data-go="#/how">See the method →</button>
        </div>
      </section>`;
  }

  /* ========================================================================
     MY PLAN, the dossier
     ===================================================================== */
  function renderPlan() {
    const plan = loadPlan();
    const major = plan && getMajor(plan.majorKey);
    const career = plan && getCareer(plan.majorKey, plan.careerId);

    if (!plan || !major || !career) {
      app.innerHTML = `
        <section class="plan-wrap viewfade">
          <div class="plan-empty">
            ${sealSVG("seal")}
            <h1>Your dossier is empty.</h1>
            <p class="lead" style="margin:0 auto var(--sp5)">Pick a career and hit "Save to my plan", we'll assemble a one-page briefing with your roadmap, SAT target, colleges, and clubs. Ready to print.</p>
            <button class="btn btn-gold" data-go="#/quiz">Find my path</button>
          </div>
        </section>`;
      return;
    }

    const fileNo = "PF-" + String(Math.abs(hashStr(major.key + career.id)) % 9000 + 1000);
    const dTiers = collegeTiers(major.key, 3);
    const pill = (c) =>
      `<span class="d-college" style="--c1:${c.c1};--c2:${c.c2};--tx:${c.tx}"><span class="crest"><img src="${collegeLogo(c)}" alt="" loading="lazy" onerror="this.remove()" /><span class="crest-mono">${esc(c.mono)}</span></span>${esc(c.short)} <em>${c.acc}%</em></span>`;
    const collegePills = [
      ["Reach", dTiers.reach], ["Target", dTiers.target], ["Likely", dTiers.likely]
    ].filter(([, list]) => list.length).map(([label, list]) =>
      `<div class="d-tier"><span class="d-tier-label">${label}</span><div class="d-colleges">${list.map(pill).join("")}</div></div>`
    ).join("");

    app.innerHTML = `
      <section class="plan-wrap viewfade">
        <div class="plan-toolbar">
          <a class="back-link" href="#/results/${major.key}/${career.id}" style="margin:0">← back to ${esc(career.title)}</a>
          <div style="display:flex;gap:10px">
            <button class="btn btn-ghost btn-sm" data-action="clear-plan">Change path</button>
            <button class="btn btn-gold btn-sm" data-action="print">${ICONS.ui.print}Print / save PDF</button>
          </div>
        </div>

        <article class="dossier">
          <div class="dossier-topbar"><span class="k">Confidential · college planning dossier</span><span class="file-no">${fileNo}</span></div>

          <div class="dossier-head">
            ${sealSVG("seal")}
            <div>
              <div class="prepared">prepared for</div>
              <input class="prepared-name" value="${esc(getPlanName())}" placeholder="Add your name" aria-label="Your name" />
              <div class="dossier-target">${esc(career.title)} · <span style="color:var(--gold-ink)">${esc(major.name)}</span></div>
            </div>
          </div>

          <div class="dossier-body">
            <div class="dsec">
              <div class="dsec-h">the role</div>
              <p style="margin:0 0 var(--sp4)">${esc(career.long)}</p>
              <div class="d-cols">
                <div class="d-fact"><span class="k">Median pay</span><span class="v mono-num" data-count="${career.salaryMedian}" data-prefix="$">$0</span></div>
                <div class="d-fact"><span class="k">Typical hours</span><span class="v">${esc(career.hours)}</span></div>
                <div class="d-fact"><span class="k">Target SAT</span><span class="v mono-num">${major.sat.low}-${major.sat.high}</span></div>
              </div>
            </div>

            <div class="dsec">
              <div class="dsec-h">four-year AP roadmap</div>
              <div class="roadmap">${roadmapHTML(major)}</div>
            </div>

            <div class="dsec">
              <div class="dsec-h">colleges to aim for</div>
              <div class="d-tiers">${collegePills}</div>
            </div>

            <div class="dsec">
              <div class="dsec-h">clubs &amp; activities</div>
              <ul class="ec-list" style="margin-top:0">${major.extracurriculars.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
            </div>

            <div class="dsec">
              <div class="dsec-h">next step</div>
              <p style="margin:0">Take this to your school counselor when you plan 9th-grade classes. Start with the Freshman column, and confirm exact AP prerequisites against your school's course catalog.</p>
            </div>
          </div>
        </article>
      </section>`;

    const nameInput = app.querySelector(".prepared-name");
    if (nameInput) nameInput.addEventListener("input", (e) => setPlanName(e.target.value));
    const printBtn = app.querySelector('[data-action="print"]');
    if (printBtn) printBtn.addEventListener("click", () => window.print());
    const clearBtn = app.querySelector('[data-action="clear-plan"]');
    if (clearBtn) clearBtn.addEventListener("click", () => { clearPlan(); go("#/fields"); });

    scheduleCountsOnReveal();
  }

  function hashStr(s) { let h = 0; for (let i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; } return h; }

  /* ========================================================================
     ROUTER
     ===================================================================== */
  function router() {
    const hash = window.location.hash || "#/";
    const parts = hash.replace(/^#\//, "").split("/").filter(Boolean);
    teardownView();

    let routeKey = parts[0] || "home";
    if (parts[0] === "careers" || parts[0] === "results") routeKey = "fields";

    if (parts.length === 0) renderHome();
    else if (parts[0] === "quiz") renderQuiz();
    else if (parts[0] === "quiz-results") renderQuizResults();
    else if (parts[0] === "fields") renderFields();
    else if (parts[0] === "careers" && parts[1]) renderCareers(decodeURIComponent(parts[1]));
    else if (parts[0] === "results" && parts[1] && parts[2]) renderResults(decodeURIComponent(parts[1]), decodeURIComponent(parts[2]));
    else if (parts[0] === "colleges") renderColleges();
    else if (parts[0] === "how") renderHow();
    else if (parts[0] === "about") renderAbout();
    else if (parts[0] === "plan") renderPlan();
    else renderHome();

    updateNav(routeKey);
    mountBackgrounds();
    setupReveals();
    scrollTop();
  }

  /* ---------- global click delegation ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-go]");
    if (t) { e.preventDefault(); go(t.dataset.go); }
  });

  function applyBranding() {
    document.querySelectorAll("[data-appname]").forEach((el) => (el.textContent = APP_DATA.appName));
    document.querySelectorAll("[data-seal]").forEach((el) => (el.innerHTML = sealSVG(el.dataset.seal)));
    document.title = APP_DATA.appName + ", plan your path from grade 9";
  }

  window.addEventListener("hashchange", router);
  window.addEventListener("DOMContentLoaded", () => { applyBranding(); router(); });
  if (document.readyState !== "loading") { applyBranding(); router(); }
})();
