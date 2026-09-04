/* Monish Kapadia — site behaviour. No dependencies, no build step. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;
  function safePlay(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }

  /* ---- 1. Lift the load veil, drop the floating chrome in ---- */
  function lift() { root.classList.add("loaded"); }
  if (document.readyState === "complete") lift();
  else window.addEventListener("load", lift);
  setTimeout(lift, 1800); // never leave the veil up if something stalls

  /* ---- 2. Theme (dark is the default, choice persists) ---- */
  var toggle = document.querySelector("[data-theme-toggle]");
  function currentTheme() { return root.getAttribute("data-theme") === "light" ? "light" : "dark"; }
  function paintLabel() {
    var el = document.querySelector("[data-theme-label]");
    if (el) el.textContent = currentTheme() === "light" ? "Light" : "Dark";
  }
  paintLabel();
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "light" ? "dark" : "light";
      if (next === "dark") root.removeAttribute("data-theme");
      else root.setAttribute("data-theme", "light");
      try { localStorage.setItem("mk-theme", next); } catch (e) {}
      paintLabel();
    });
  }

  /* ---- 3. Split display type into characters so it can focus in ---- */
  function split(el) {
    if (el.dataset.split) return;
    el.dataset.split = "1";
    var n = 0;
    (function walk(node) {
      var kids = [].slice.call(node.childNodes);
      kids.forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.nodeValue.split(/(\s+)/).forEach(function (chunk) {
            if (!chunk) return;
            if (/^\s+$/.test(chunk)) { frag.appendChild(document.createTextNode(" ")); return; }
            var word = document.createElement("span");
            word.className = "b-word";
            chunk.split("").forEach(function (ch) {
              var s = document.createElement("span");
              s.className = "b-char";
              s.style.setProperty("--i", n++);
              s.textContent = ch;
              word.appendChild(s);
            });
            frag.appendChild(word);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1 && !child.classList.contains("peek") && !child.classList.contains("caret")) {
          walk(child);
        }
      });
    })(el);
  }

  var animated = [].slice.call(document.querySelectorAll("[data-anim]"));
  animated.forEach(function (el) {
    el.classList.add("anim");
    if (!reduced) split(el);
  });

  function lightUp(el) { el.classList.add("lit"); }

  if (reduced || !("IntersectionObserver" in window)) {
    animated.forEach(lightUp);
  } else {
    var ao = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { lightUp(en.target); ao.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });
    animated.forEach(function (el) { ao.observe(el); });
    // the hero should start focusing in as soon as the veil lifts
    window.addEventListener("load", function () {
      var first = document.querySelector("[data-anim]");
      if (first) setTimeout(function () { lightUp(first); }, 260);
    });
  }

  /* ---- 4. The hero "this" peek: cycles project loops inline ---- */
  var peek = document.querySelector("[data-peek]");
  if (peek) {
    var items = [];
    try { items = JSON.parse(peek.getAttribute("data-peek")); } catch (e) { items = []; }
    var vid = peek.querySelector("video");
    var i = 0, timer = null;

    function show(n) {
      var it = items[n];
      if (!it || !vid) return;
      vid.poster = it.poster;
      vid.src = it.src;
      peek.setAttribute("data-href", it.href);
      if (!reduced) safePlay(vid);
    }
    function advance() { i = (i + 1) % items.length; show(i); }

    if (items.length) {
      show(0);
      if (!reduced) {
        timer = setInterval(advance, 3200);
        peek.addEventListener("mouseenter", function () { clearInterval(timer); });
        peek.addEventListener("mouseleave", function () { timer = setInterval(advance, 3200); });
      }
      peek.addEventListener("click", function () {
        var href = peek.getAttribute("data-href");
        if (href) window.location.href = href;
      });
    }
  }

  /* ---- 5. Grid tiles: play on hover (desktop) / in view (touch) ---- */
  var tiles = [].slice.call(document.querySelectorAll("[data-loop]"));
  var canHover = window.matchMedia("(hover: hover)").matches;

  if (tiles.length && !reduced) {
    if (canHover) {
      tiles.forEach(function (v) {
        var card = v.closest(".card") || v.parentElement;
        card.addEventListener("mouseenter", function () { safePlay(v); });
        card.addEventListener("mouseleave", function () { v.pause(); v.currentTime = 0; });
      });
    } else if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) safePlay(en.target); else en.target.pause();
        });
      }, { threshold: 0.45 });
      tiles.forEach(function (v) { io.observe(v); });
    }
  }

  /* ---- 6. Click-to-play films (keeps heavy video off first paint) ---- */
  [].slice.call(document.querySelectorAll(".film")).forEach(function (film) {
    var btn = film.querySelector(".film__btn");
    var v = film.querySelector("video");
    if (!btn || !v) return;
    btn.addEventListener("click", function () {
      var src = v.getAttribute("data-src");
      if (src && !v.src) v.src = src;
      v.controls = true;
      film.classList.add("is-playing");
      safePlay(v);
    });
  });

  /* ---- 7. Rise on scroll ---- */
  var rises = [].slice.call(document.querySelectorAll(".rise"));
  if (rises.length) {
    if (reduced || !("IntersectionObserver" in window)) {
      rises.forEach(function (el) { el.classList.add("in"); });
    } else {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); ro.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
      rises.forEach(function (el) { ro.observe(el); });
    }
  }
})();
