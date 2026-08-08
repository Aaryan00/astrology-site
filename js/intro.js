/* ============================================================================
 * intro.js — "Cosmic Genesis": first-visit cinematic intro (CSP-safe, zero-dep)
 * ----------------------------------------------------------------------------
 * Void -> ignition -> pull-back -> warp -> arrival -> Sri Yantra self-draws
 * -> cross-dissolve into the homepage. Pure vanilla WebGL + SVG + CSS timeline.
 * Plays once, then not again for an hour (localStorage timestamp), on whichever
 * page the visitor first lands. Loaded in <head> so it gates before first paint.
 * ==========================================================================*/
(function () {
  "use strict";
  var docEl = document.documentElement;

  /* ---- Gate: decide whether to play (runs during <head> parse) ------------ */
  var qs = location.search;
  var force = /[?&](intro|replayintro)/i.test(qs);
  var noIntro = /[?&]nointro/i.test(qs);
  var sm = qs.match(/[?&]introspeed=([0-9.]+)/i); // dev-only slow-mo, e.g. ?introspeed=0.25
  var speed = sm ? Math.max(0.05, Math.min(1, parseFloat(sm[1]) || 1)) : 1;
  var am = qs.match(/[?&]introat=([0-9.]+)/i);    // dev-only freeze at intro-time t
  var pinT = am ? parseFloat(am[1]) : null;
  var reduced = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);

  // Show once per visit, then not again for an hour — on WHICHEVER page the
  // visitor first lands (home, about, gallery, …). Not per-page, not every load.
  var now = Date.now();
  var last = 0;
  try { last = parseInt(localStorage.getItem("cosmicIntroAt") || "0", 10) || 0; } catch (e) {}
  var HOUR = 3600 * 1000;
  var shouldPlay = !noIntro && (force || (now - last) > HOUR);
  if (!shouldPlay) return;

  // Reveal the overlay before the body paints -> no flash of the page.
  docEl.classList.add("intro-active");
  // Stamp the time at START so a mid-intro reload won't replay within the hour.
  try { localStorage.setItem("cosmicIntroAt", String(now)); } catch (e) {}

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  ready(function () { try { init(); } catch (e) { bail(); } });

  function bail() {
    // Any failure must never trap the user behind the overlay.
    docEl.classList.remove("intro-active");
    var el = document.getElementById("cosmic-intro");
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  /* ---- Init --------------------------------------------------------------- */
  function init() {
    var root = document.getElementById("cosmic-intro");
    if (!root) { bail(); return; }
    var yantra = root.querySelector(".ci-yantra");
    var om = root.querySelector(".ci-om");
    var title = root.querySelector(".ci-title");
    var skip = root.querySelector(".ci-skip");
    var scrim = root.querySelector(".ci-scrim");
    var canvas = root.querySelector("#cosmic-canvas");

    var finished = false;
    var raf = 0;
    var failsafe = window.setTimeout(function () { end(); }, 13500 / speed);

    function teardown() {
      docEl.classList.remove("intro-active");
      docEl.classList.remove("intro-reveal");
      if (root.parentNode) root.parentNode.removeChild(root);
    }
    function end() {
      if (finished) return;
      finished = true;
      window.clearTimeout(failsafe);
      if (raf) cancelAnimationFrame(raf);
      // Crossfade: all three fire on the same frame so the homepage glows IN
      // exactly as the intro dims OUT.
      root.classList.add("ci-dim");          // cosmos canvas recedes
      docEl.classList.add("intro-reveal");   // real page fades up from black
      root.classList.add("ci-exit");         // overlay (geometry + wordmark) fades out
      window.setTimeout(teardown, 1650);
    }
    if (skip) skip.addEventListener("click", end);

    buildYantra(yantra);

    /* ---- Reduced motion / no-WebGL: gentle static reveal ------------------ */
    var gl = null;
    if (!reduced) {
      try {
        gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance", failIfMajorPerformanceCaveat: false })
          || canvas.getContext("experimental-webgl");
      } catch (e) { gl = null; }
    }
    if (reduced || !gl) {
      canvas.style.background = "radial-gradient(circle at 50% 45%, #1a1636 0%, #0a0e27 55%, #05070f 100%)";
      if (scrim) scrim.style.opacity = "1";
      yantra.style.opacity = "1";
      drawYantra(yantra, true);
      om.style.opacity = "1"; om.style.transform = "scale(1)";
      title.style.opacity = "1"; title.style.transform = "none";
      window.setTimeout(end, reduced ? 2400 : 3200);
      return;
    }

    /* ---- WebGL program ---------------------------------------------------- */
    var VERT = "attribute vec2 aPos;void main(){gl_Position=vec4(aPos,0.0,1.0);}";
    var FRAG = [
      "precision mediump float;",
      "uniform vec2 uRes;uniform float uTime,uZoom,uWarp,uNebula,uBloom,uSpin,uFade;",
      "float hash(vec2 p){p=fract(p*vec2(123.34,345.45));p+=dot(p,p+34.345);return fract(p.x*p.y);}",
      "float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);",
      " float a=hash(i),b=hash(i+vec2(1.0,0.0)),c=hash(i+vec2(0.0,1.0)),d=hash(i+vec2(1.0,1.0));",
      " return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}",
      "float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.03;a*=0.5;}return v;}",
      "float starCell(vec2 p){vec2 id=floor(p),f=fract(p)-0.5;float h=hash(id);",
      " vec2 off=(vec2(hash(id+3.1),hash(id+6.7))-0.5)*0.7;float d=length(f-off);",
      " float s=smoothstep(0.06,0.0,d);return s*step(0.86,h)*(0.55+0.45*hash(id+9.0));}",
      "void main(){",
      " vec2 p=(gl_FragCoord.xy-0.5*uRes)/uRes.y;",
      " float ca=cos(uSpin),sa=sin(uSpin);p=mat2(ca,-sa,sa,ca)*p;",
      " float r=length(p);vec2 dir=p/(r+1e-4);",
      " float st=0.0,ws=0.0;",
      " for(int k=0;k<6;k++){float kf=float(k)/5.0;float off=kf*uWarp*0.6;float wt=1.0-kf*0.85;",
      "  vec2 sp=(p-dir*off)*uZoom;",
      "  float layer=starCell(sp*7.0)+starCell(sp*12.0+31.7)*0.7+starCell(sp*20.0+63.3)*0.45;",
      "  st+=layer*wt;ws+=wt;}",
      " st/=ws;st*=0.7+0.3*sin(uTime*3.0+r*10.0);",
      " vec3 col=vec3(0.75,0.82,1.0)*st;",
      " vec2 q=p*2.2;float n=fbm(q+vec2(uTime*0.02,0.0)+fbm(q*1.4));",
      " vec3 neb=mix(vec3(0.02,0.02,0.08),vec3(0.34,0.12,0.5),smoothstep(0.25,0.85,n));",
      " neb=mix(neb,vec3(0.95,0.72,0.35),smoothstep(0.72,1.0,n)*0.7);",
      " neb*=smoothstep(1.35,0.05,r);",
      " col+=neb*uNebula;",
      " col+=vec3(1.0,0.82,0.5)*uBloom*exp(-r*5.0);",
      " col+=vec3(1.0,0.93,0.75)*uBloom*exp(-r*24.0)*1.6;",
      " col*=1.0-0.34*r*r;",
      " col*=uFade;",
      " col=col/(col+vec3(0.6))*1.6;",
      " col=pow(max(col,0.0),vec3(0.85));",
      " col+=(hash(gl_FragCoord.xy*0.5+uTime)-0.5)*0.004;", // dither: kill OLED banding in the void
      " gl_FragColor=vec4(col,1.0);}"
    ].join("\n");

    function compile(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      return s;
    }
    var prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      canvas.style.background = "radial-gradient(circle at 50% 45%, #1a1636 0%, #0a0e27 55%, #05070f 100%)";
      if (scrim) scrim.style.opacity = "1";
      yantra.style.opacity = "1"; drawYantra(yantra, true);
      om.style.opacity = "1"; om.style.transform = "scale(1)";
      title.style.opacity = "1"; title.style.transform = "none";
      window.setTimeout(end, 3200); return;
    }
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var U = {};
    ["uRes", "uTime", "uZoom", "uWarp", "uNebula", "uBloom", "uSpin", "uFade"].forEach(function (n) {
      U[n] = gl.getUniformLocation(prog, n);
    });

    function resize() {
      var cap = window.innerWidth < 820 ? 1.25 : 1.75;
      var dpr = Math.min(window.devicePixelRatio || 1, cap);
      var w = Math.max(1, Math.floor(window.innerWidth * dpr));
      var h = Math.max(1, Math.floor(window.innerHeight * dpr));
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(U.uRes, w, h);
    }
    resize();
    window.addEventListener("resize", resize);

    /* ---- Timeline (seconds) ---------------------------------------------- */
    function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
    function smooth(x) { x = clamp01(x); return x * x * (3 - 2 * x); }
    function lerp(a, b, t) { return a + (b - a) * t; }
    function track(kf, t) {
      if (t <= kf[0][0]) return kf[0][1];
      for (var i = 0; i < kf.length - 1; i++) {
        var a = kf[i], b = kf[i + 1];
        if (t <= b[0]) return lerp(a[1], b[1], smooth((t - a[0]) / (b[0] - a[0])));
      }
      return kf[kf.length - 1][1];
    }
    var K = {
      fade:   [[0, 0], [0.5, 1], [10.7, 1]],
      bloom:  [[0, 0], [0.35, 1.35], [1.2, 1.0], [3.0, 0.28], [6.2, 0.32], [7.1, 0.55], [10.7, 0.6]],
      nebula: [[0, 0], [1.5, 0.16], [4.0, 0.7], [6.0, 1.0], [6.9, 0.9], [7.5, 0.5], [10.7, 0.46]],
      warp:   [[0, 0], [3.8, 0], [4.6, 1.0], [6.0, 0.92], [6.9, 0.0], [10.7, 0]],
      zoom:   [[0, 2.6], [3.5, 1.0], [4.2, 1.06], [6.4, 2.25], [7.2, 1.35], [10.7, 1.35]]
    };

    // Geometry + wordmark are fully formed by ~8.6s and held on a calm cosmos
    // until 10.7s -> ~2 seconds to read the name and tagline before the dissolve.
    var rv = {};
    function reveals(t) {
      if (!rv.s && t >= 6.15) { rv.s = 1; if (scrim) scrim.style.opacity = "1"; }
      if (!rv.y && t >= 6.20) { rv.y = 1; yantra.style.opacity = "1"; drawYantra(yantra, false); }
      if (!rv.o && t >= 7.00) { rv.o = 1; om.style.opacity = "1"; om.style.transform = "scale(1)"; }
      if (!rv.t && t >= 7.45) { rv.t = 1; title.style.opacity = "1"; title.style.transform = "none"; }
    }

    if (pinT != null) { // dev freeze: hold a pinned frame (loops the draw so the buffer stays)
      window.clearTimeout(failsafe);
      if (pinT >= 6.30 && scrim) scrim.style.opacity = "1";
      if (pinT >= 6.35) { yantra.style.opacity = "1"; drawYantra(yantra, true); }
      if (pinT >= 7.25) { om.style.opacity = "1"; om.style.transform = "scale(1)"; }
      if (pinT >= 7.65) { title.style.opacity = "1"; title.style.transform = "none"; }
      (function pinFrame() {
        gl.uniform1f(U.uTime, pinT);
        gl.uniform1f(U.uFade, track(K.fade, pinT));
        gl.uniform1f(U.uBloom, track(K.bloom, pinT));
        gl.uniform1f(U.uNebula, track(K.nebula, pinT));
        gl.uniform1f(U.uWarp, track(K.warp, pinT));
        gl.uniform1f(U.uZoom, track(K.zoom, pinT));
        gl.uniform1f(U.uSpin, pinT * 0.12);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        requestAnimationFrame(pinFrame);
      })();
      return;
    }

    var start = performance.now(), last = start, spin = 0;
    function frame(now) {
      var t = (now - start) / 1000 * speed;
      var dt = Math.min(0.05, (now - last) / 1000) * speed; last = now;
      spin += dt * (0.05 + 0.32 * track(K.warp, t));
      gl.uniform1f(U.uTime, t);
      gl.uniform1f(U.uFade, track(K.fade, t));
      gl.uniform1f(U.uBloom, track(K.bloom, t));
      gl.uniform1f(U.uNebula, track(K.nebula, t));
      gl.uniform1f(U.uWarp, track(K.warp, t));
      gl.uniform1f(U.uZoom, track(K.zoom, t));
      gl.uniform1f(U.uSpin, spin);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      reveals(t);
      if (t < 10.7 && !finished) raf = requestAnimationFrame(frame);
      else end();
    }
    raf = requestAnimationFrame(frame);
  }

  /* ---- Sacred geometry: build + line-draw --------------------------------- */
  function buildYantra(svg) {
    var NS = "http://www.w3.org/2000/svg";
    svg.setAttribute("viewBox", "0 0 400 400");
    var cx = 200, cy = 200, order = [];
    function pt(rad, ang) { return [cx + rad * Math.cos(ang), cy + rad * Math.sin(ang)]; }
    function el(name, attrs) {
      var e = document.createElementNS(NS, name);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      svg.appendChild(e); return e;
    }
    function lotus(count, ri, ro, spread) {
      var d = "";
      for (var i = 0; i < count; i++) {
        var a = (i / count) * Math.PI * 2 - Math.PI / 2;
        var b1 = pt(ri, a - spread), b2 = pt(ri, a + spread), tip = pt(ro, a);
        var c1 = pt((ri + ro) * 0.5, a - spread * 0.5), c2 = pt((ri + ro) * 0.5, a + spread * 0.5);
        d += "M" + f(b1) + "Q" + f(c1) + " " + f(tip) + "Q" + f(c2) + " " + f(b2) + " ";
      }
      return el("path", { d: d });
    }
    function tri(rad, rot) {
      var p1 = pt(rad, rot), p2 = pt(rad, rot + 2.0944), p3 = pt(rad, rot + 4.18879);
      return el("polygon", { points: f(p1) + " " + f(p2) + " " + f(p3) });
    }
    function f(p) { return p[0].toFixed(1) + " " + p[1].toFixed(1); }

    order.push(el("circle", { cx: cx, cy: cy, r: 196 }));
    order.push(lotus(16, 150, 195, 0.16));
    order.push(el("circle", { cx: cx, cy: cy, r: 150 }));
    order.push(tri(120, -Math.PI / 2));
    order.push(tri(120, Math.PI / 2));
    order.push(el("circle", { cx: cx, cy: cy, r: 96 }));
    order.push(lotus(8, 56, 96, 0.30));
    order.push(el("circle", { cx: cx, cy: cy, r: 56 }));
    order.push(tri(50, Math.PI / 2));
    order.push(el("circle", { cx: cx, cy: cy, r: 6, fill: "#e8c66b", stroke: "none" }));
    svg._geo = order;
  }

  function drawYantra(svg, instant) {
    var geo = svg._geo || [];
    for (var i = 0; i < geo.length; i++) {
      (function (g, idx) {
        var fill = g.getAttribute("fill");
        if (fill && fill !== "none") { // bindu
          g.style.opacity = "0";
          if (instant) { g.style.opacity = "1"; }
          else window.setTimeout(function () {
            g.style.transition = "opacity 0.6s ease"; g.style.opacity = "1";
          }, idx * 95 + 500);
          return;
        }
        var L = 1200;
        try { L = g.getTotalLength() || 1200; } catch (e) {}
        g.style.strokeDasharray = L;
        g.style.strokeDashoffset = L;
        if (instant) { g.style.strokeDashoffset = "0"; return; }
        g.style.transition = "stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)";
        window.setTimeout(function () { g.style.strokeDashoffset = "0"; }, idx * 105);
      })(geo[i], i);
    }
  }
})();
