/* =============================================================================
   Compass 9, Animated backgrounds
   -----------------------------------------------------------------------------
   Vanilla ports of two React components (no npm / no build step):

   1) initPathsBackground() , "modern-background-paths": four generative SVG
      pattern sets (neural, flow, geometric, spiral) that cycle every 12s, with
      clickable indicator dots. framer-motion's `pathLength` loops are recreated
      with the Web Animations API (stroke-dashoffset). Used on the opening hero.

   2) initBeamsBackground() , "beams-background": blurred, pulsing light beams
      drawn on a <canvas>. Used behind the dark section bands.

   Both respect prefers-reduced-motion and return a teardown() for navigation.
   ========================================================================== */

(function () {
  const SVGNS = "http://www.w3.org/2000/svg";
  const reduced = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(name, attrs) {
    const e = document.createElementNS(SVGNS, name);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function safeAnim(node, frames, timing) {
    try { return node.animate(frames, timing); } catch (e) { return null; }
  }

  /* a path that draws itself, loops, and erases (framer pathLength [0,1,0]) */
  function drawPath(path, o, isReduced) {
    if (isReduced) return null;
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    return safeAnim(
      path,
      [
        { strokeDashoffset: len, opacity: 0 },
        { strokeDashoffset: 0, opacity: o.opacity, offset: 0.5 },
        { strokeDashoffset: -len, opacity: 0 }
      ],
      { duration: o.duration * 1000, delay: o.delay * 1000, iterations: Infinity, easing: "ease-in-out" }
    );
  }
  function pulseDot(circle, o, isReduced) {
    if (isReduced) { circle.style.opacity = 0.5; return null; }
    circle.style.transformBox = "fill-box";
    circle.style.transformOrigin = "center";
    return safeAnim(
      circle,
      [
        { transform: "scale(0)", opacity: 0 },
        { transform: "scale(1.2)", opacity: 0.8, offset: 0.6 },
        { transform: "scale(1)", opacity: 0.6 }
      ],
      { duration: o.duration * 1000, delay: o.delay * 1000, iterations: Infinity, easing: "ease-in-out" }
    );
  }

  /* ---------- pattern generators (return array of animations) ---------- */
  function neural(svg, isReduced) {
    const g = el("g", { opacity: 0.4 }); svg.appendChild(g);
    const nodes = Array.from({ length: 46 }, () => ({ x: Math.random() * 800, y: Math.random() * 600 }));
    const anims = []; let conns = 0;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length && conns < 64; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        if (Math.hypot(dx, dy) < 120 && Math.random() > 0.55) {
          const p = el("path", { d: `M${nodes[i].x},${nodes[i].y} L${nodes[j].x},${nodes[j].y}`, fill: "none", stroke: "currentColor", "stroke-width": 0.6 });
          g.appendChild(p); anims.push(drawPath(p, { duration: 6, delay: Math.random() * 8, opacity: 0.85 }, isReduced)); conns++;
        }
      }
    }
    nodes.forEach((n) => {
      const c = el("circle", { cx: n.x, cy: n.y, r: 2, fill: "currentColor" });
      g.appendChild(c); anims.push(pulseDot(c, { duration: 4, delay: Math.random() * 4 }, isReduced));
    });
    return anims;
  }
  function flow(svg, isReduced) {
    const g = el("g", { opacity: 0.32 }); svg.appendChild(g); const anims = [];
    for (let i = 0; i < 12; i++) {
      const amp = 50 + i * 10, off = i * 46;
      const d = `M-100,${140 + off} Q200,${140 + off - amp} 500,${140 + off} T900,${140 + off}`;
      const p = el("path", { d, fill: "none", stroke: "currentColor", "stroke-width": 1 + i * 0.3, "stroke-linecap": "round" });
      g.appendChild(p); anims.push(drawPath(p, { duration: 15, delay: i * 0.8, opacity: 0.12 + i * 0.05 }, isReduced));
    }
    return anims;
  }
  function geometric(svg, isReduced) {
    const g = el("g", { opacity: 0.22 }); svg.appendChild(g); const anims = []; const gs = 40;
    for (let x = 0; x < 20; x++) for (let y = 0; y < 15; y++) {
      if (Math.random() > 0.72) {
        const d = `M${x * gs},${y * gs} L${(x + 1) * gs},${y * gs} L${(x + 1) * gs},${(y + 1) * gs} L${x * gs},${(y + 1) * gs} Z`;
        const p = el("path", { d, fill: "none", stroke: "currentColor", "stroke-width": 1 });
        g.appendChild(p); anims.push(drawPath(p, { duration: 8, delay: Math.random() * 5, opacity: 0.6 }, isReduced));
      }
    }
    return anims;
  }
  function spiral(svg, isReduced) {
    const g = el("g", { opacity: 0.26 }); svg.appendChild(g); const anims = [];
    for (let i = 0; i < 8; i++) {
      const cx = 400 + ((i % 4) - 1.5) * 180, cy = 300 + (Math.floor(i / 4) - 0.5) * 200;
      const radius = 70 + i * 14, turns = 3 + i * 0.5;
      let d = `M${cx + radius},${cy}`;
      for (let a = 0; a <= turns * 360; a += 6) {
        const rad = (a * Math.PI) / 180, cr = radius * (1 - a / (turns * 360));
        d += ` L${(cx + cr * Math.cos(rad)).toFixed(1)},${(cy + cr * Math.sin(rad)).toFixed(1)}`;
      }
      const p = el("path", { d, fill: "none", stroke: "currentColor", "stroke-width": 1.4, "stroke-linecap": "round" });
      g.appendChild(p); anims.push(drawPath(p, { duration: 12, delay: i * 1.2, opacity: 0.7 }, isReduced));
    }
    return anims;
  }

  window.initPathsBackground = function (container) {
    if (!container) return null;
    const isReduced = reduced();
    const svg = el("svg", { viewBox: "0 0 800 600", preserveAspectRatio: "xMidYMid slice" });
    container.appendChild(svg);
    const patterns = [neural, flow, geometric, spiral];
    let anims = [], idx = 0, timer = 0;

    const dots = document.createElement("div");
    dots.className = "pattern-dots";
    patterns.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.setAttribute("aria-label", "Show background pattern " + (i + 1));
      b.addEventListener("click", () => { idx = i; render(); restart(); });
      dots.appendChild(b);
    });
    container.appendChild(dots);

    function render() {
      anims.forEach((a) => a && a.cancel()); anims = [];
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      anims = patterns[idx](svg, isReduced);
      if (!isReduced) safeAnim(svg, [{ opacity: 0 }, { opacity: 1 }], { duration: 1500, easing: "ease", fill: "backwards" });
      dots.querySelectorAll("button").forEach((b, j) => b.classList.toggle("active", j === idx));
    }
    function restart() {
      if (timer) clearInterval(timer);
      if (!isReduced) timer = setInterval(() => { idx = (idx + 1) % patterns.length; render(); }, 12000);
    }
    render(); restart();

    return function teardown() {
      if (timer) clearInterval(timer);
      anims.forEach((a) => a && a.cancel());
      if (svg.parentNode) svg.parentNode.removeChild(svg);
      if (dots.parentNode) dots.parentNode.removeChild(dots);
    };
  };

  /* ========================================================================
     BEAMS
     ===================================================================== */
  window.initBeamsBackground = function (container, opts) {
    if (!container) return null;
    opts = opts || {};
    const intensity = opts.intensity || "strong";
    const opacityMap = { subtle: 0.7, medium: 0.85, strong: 1 };
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;filter:blur(14px)";
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    let W = 0, H = 0, beams = [], raf = 0;
    const COUNT = 24;

    function createBeam() {
      const goldish = Math.random() < 0.62; // brand: gold-forward with blue accents
      return {
        x: Math.random() * W * 1.5 - W * 0.25,
        y: Math.random() * H * 1.5 - H * 0.25,
        width: 40 + Math.random() * 70,
        length: H * 2.5,
        angle: -35 + Math.random() * 10,
        speed: 0.6 + Math.random() * 1.0,
        opacity: 0.12 + Math.random() * 0.16,
        hue: goldish ? 42 + Math.random() * 14 : 212 + Math.random() * 30,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03
      };
    }
    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = container.clientWidth || window.innerWidth;
      H = container.clientHeight || 400;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      beams = Array.from({ length: COUNT }, createBeam);
    }
    function resetBeam(b, i) {
      const spacing = W / 3;
      b.y = H + 100;
      b.x = (i % 3) * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      b.width = 100 + Math.random() * 100;
      b.speed = 0.5 + Math.random() * 0.4;
      b.opacity = 0.2 + Math.random() * 0.1;
    }
    function draw(b) {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate((b.angle * Math.PI) / 180);
      const po = b.opacity * (0.8 + Math.sin(b.pulse) * 0.2) * opacityMap[intensity];
      const g = ctx.createLinearGradient(0, 0, 0, b.length);
      g.addColorStop(0, `hsla(${b.hue},85%,62%,0)`);
      g.addColorStop(0.1, `hsla(${b.hue},85%,62%,${po * 0.5})`);
      g.addColorStop(0.4, `hsla(${b.hue},85%,62%,${po})`);
      g.addColorStop(0.6, `hsla(${b.hue},85%,62%,${po})`);
      g.addColorStop(0.9, `hsla(${b.hue},85%,62%,${po * 0.5})`);
      g.addColorStop(1, `hsla(${b.hue},85%,62%,0)`);
      ctx.fillStyle = g;
      ctx.fillRect(-b.width / 2, 0, b.width, b.length);
      ctx.restore();
    }
    function frame() {
      ctx.clearRect(0, 0, W, H);
      ctx.filter = "blur(35px)";
      beams.forEach((b, i) => {
        b.y -= b.speed; b.pulse += b.pulseSpeed;
        if (b.y + b.length < -100) resetBeam(b, i);
        draw(b);
      });
      raf = requestAnimationFrame(frame);
    }

    size();
    window.addEventListener("resize", size);
    if (reduced()) { ctx.filter = "blur(35px)"; beams.forEach(draw); }
    else frame();

    return function teardown() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  };
})();
