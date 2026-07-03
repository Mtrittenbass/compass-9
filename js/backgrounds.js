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

  /* ========================================================================
     GLSL HILLS  (port of glsl-hills.tsx: a flowing Perlin-noise terrain)
     ===================================================================== */
  window.initHillsBackground = function (container, opts) {
    if (!container || !window.THREE) return null;
    opts = opts || {};
    const cameraZ = opts.cameraZ || 125;
    const planeSize = opts.planeSize || 256;
    const speed = opts.speed || 0.5;

    const vertexShader = `
      #define GLSLIFY 1
      attribute vec3 position;
      uniform mat4 projectionMatrix;
      uniform mat4 modelViewMatrix;
      uniform float time;
      varying vec3 vPosition;

      mat4 rotateMatrixX(float radian) {
        return mat4(1.0,0.0,0.0,0.0, 0.0,cos(radian),-sin(radian),0.0, 0.0,sin(radian),cos(radian),0.0, 0.0,0.0,0.0,1.0);
      }
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
      float cnoise(vec3 P) {
        vec3 Pi0 = floor(P); vec3 Pi1 = Pi0 + vec3(1.0);
        Pi0 = mod289(Pi0); Pi1 = mod289(Pi1);
        vec3 Pf0 = fract(P); vec3 Pf1 = Pf0 - vec3(1.0);
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz; vec4 iz1 = Pi1.zzzz;
        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0); vec4 ixy1 = permute(ixy + iz1);
        vec4 gx0 = ixy0 * (1.0 / 7.0);
        vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5; gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0); vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);
        vec4 gx1 = ixy1 * (1.0 / 7.0);
        vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5; gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1); vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);
        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x); vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z); vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x); vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z); vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
        vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
        g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
        g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);
        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000,n100,n010,n110), vec4(n001,n101,n011,n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
        return 2.2 * n_xyz;
      }
      void main(void) {
        vec3 updatePosition = (rotateMatrixX(radians(90.0)) * vec4(position, 1.0)).xyz;
        float sin1 = sin(radians(updatePosition.x / 128.0 * 90.0));
        vec3 noisePosition = updatePosition + vec3(0.0, 0.0, time * -30.0);
        float noise1 = cnoise(noisePosition * 0.08);
        float noise2 = cnoise(noisePosition * 0.06);
        float noise3 = cnoise(noisePosition * 0.4);
        vec3 lastPosition = updatePosition + vec3(0.0,
          noise1 * sin1 * 8.0 + noise2 * sin1 * 8.0 + noise3 * (abs(sin1) * 2.0 + 0.5) + pow(sin1, 2.0) * 40.0, 0.0);
        vPosition = lastPosition;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(lastPosition, 1.0);
      }
    `;
    const fragmentShader = `
      precision highp float;
      #define GLSLIFY 1
      varying vec3 vPosition;
      void main(void) {
        float opacity = (96.0 - length(vPosition)) / 256.0 * 0.6;
        vec3 color = vec3(0.62, 0.68, 0.82); // cool light to sit on the navy hero
        gl_FragColor = vec4(color, opacity);
      }
    `;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
    container.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 1, 10000);
    const clock = new THREE.Clock();
    const uniforms = { time: { value: 0 } };
    const geometry = new THREE.PlaneGeometry(planeSize, planeSize, planeSize, planeSize);
    const material = new THREE.RawShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.position.set(0, 16, cameraZ);
    camera.lookAt(new THREE.Vector3(0, 28, 0));

    function resize() {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    if (reduced()) {
      uniforms.time.value = 6;
      renderer.render(scene, camera);
    } else {
      (function frame() {
        uniforms.time.value += clock.getDelta() * speed;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
      })();
    }

    return function teardown() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  };
})();
