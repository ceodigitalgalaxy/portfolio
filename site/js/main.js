/* ==========================================================================
   Digital Galaxy — Portfólio: interações
   ========================================================================== */

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  setupSmoothScroll();
  setupHeader();
  setupLogoSpin();
  setupMenu();
  setupStarfields();
  setupPhotoTabs();
  setupReels();
  setupReveal();
  setupLightbox();
  setupStickyCta();
  setupYear();
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Rolagem suave (Lenis, js/vendor/lenis.min.js), igual à do site principal */
function setupSmoothScroll() {
  if (!window.Lenis || reduceMotion) return;
  const headerHeight = () => document.querySelector(".header")?.offsetHeight || 0;
  window.lenis = new window.Lenis({ autoRaf: true, lerp: 0.075, wheelMultiplier: 0.9, anchors: { offset: -headerHeight() } });
}

/* Topo ganha fundo depois de rolar um pouco */
function setupHeader() {
  const header = document.querySelector(".header");
  if (!header) return;
  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

/* Estrela do símbolo: gira com inércia enquanto o mouse está em cima (igual ao site principal) */
function setupLogoSpin() {
  const brand = document.querySelector(".brand");
  const star = brand && brand.querySelector(".brand__star");
  if (!star || reduceMotion) return;
  const MAX_SPEED = 200;      // graus por segundo
  const EASE = 3.2;           // maior = acelera e freia mais rápido
  let angle = 0, speed = 0, target = 0, last = 0, running = false;
  const tick = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    speed += (target - speed) * (1 - Math.exp(-EASE * dt));
    angle = (angle + speed * dt) % 360;
    star.style.transform = `rotate(${angle.toFixed(2)}deg)`;
    if (target === 0 && Math.abs(speed) < 0.5) { running = false; return; }
    requestAnimationFrame(tick);
  };
  const setTarget = (value) => {
    target = value;
    if (!running) { running = true; last = performance.now(); requestAnimationFrame(tick); }
  };
  brand.addEventListener("pointerenter", () => setTarget(MAX_SPEED));
  brand.addEventListener("pointerleave", () => setTarget(0));
  brand.addEventListener("focus", () => setTarget(MAX_SPEED));
  brand.addEventListener("blur", () => setTarget(0));
}

/* Menu lateral (igual ao site principal): o hambúrguer abre um painel que desliza
   da direita; o fundo desfoca a página e a rolagem fica travada */
function setupMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("menu");
  const overlay = document.querySelector(".menu-overlay");
  const header = document.querySelector(".header");
  if (!toggle || !nav) return;
  const isOpen = () => nav.classList.contains("is-open");
  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    nav.inert = !open;
    overlay.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    if (window.lenis) window.lenis[open ? "stop" : "start"]();
    else document.documentElement.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setOpen(!isOpen()));
  overlay.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) { setOpen(false); toggle.focus(); }
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", (event) => {
    setOpen(false);
    // Link para uma seção desta página: rola até ela depois de destravar a rolagem
    const hash = link.getAttribute("href");
    const target = hash.startsWith("#") && document.querySelector(hash);
    if (!target) return;
    event.preventDefault();
    if (window.lenis) window.lenis.scrollTo(target, { offset: -header.offsetHeight });
    else target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }));
}

/* Céu estrelado discreto da chamada final */
function setupStarfields() {
  const count = window.matchMedia("(max-width: 768px)").matches ? 16 : 32;
  const rand = (min, max) => min + Math.random() * (max - min);
  document.querySelectorAll(".starfield").forEach((sky) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i += 1) {
      const star = document.createElement("span");
      const size = rand(1, 2.4);
      star.className = "star";
      star.style.left = `${rand(0, 100)}%`;
      star.style.top = `${rand(0, 100)}%`;
      star.style.width = star.style.height = `${size}px`;
      star.style.setProperty("--dur", `${rand(3, 7).toFixed(2)}s`);
      star.style.setProperty("--delay", `${(-rand(0, 7)).toFixed(2)}s`);
      star.style.setProperty("--max", rand(0.3, 0.85).toFixed(2));
      fragment.appendChild(star);
    }
    sky.appendChild(fragment);
  });
}

/* Fotografia: as abas trocam o mosaico de fotos do cliente escolhido, com cruzamento suave.
   Passa sozinho para o próximo cliente quando a barra de tempo da aba termina (CSS, 6s);
   pausa com o mouse ou o foco nas fotos, fora da tela e com a foto ampliada aberta.
   Setas do teclado andam entre as abas, como pede o padrão de abas. */
function setupPhotoTabs() {
  const section = document.querySelector(".photos");
  const tabs = Array.from(document.querySelectorAll(".photos__tab"));
  if (!section || !tabs.length) return;
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));
  // Com JS os painéis ficam empilhados e só o ativo aparece (inert tira os outros do teclado)
  panels.forEach((panel, index) => { panel.hidden = false; panel.inert = index !== 0; });
  let current = 0;
  const select = (index, focus) => {
    if (index === current) return;
    current = index;
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[i].classList.toggle("is-active", active);
      panels[i].inert = !active;
    });
    if (focus) tabs[index].focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(index, false));
    tab.addEventListener("keydown", (event) => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
      if (!step) return;
      event.preventDefault();
      select((index + step + tabs.length) % tabs.length, true);
    });
    // Fim da barra de tempo da aba ativa: próximo cliente
    tab.querySelector(".photos__timer").addEventListener("animationend", () => {
      if (index === current) select((current + 1) % tabs.length, false);
    });
  });

  if (reduceMotion) return;
  section.classList.add("is-auto");
  const reasons = new Set();
  const pause = (reason, on) => {
    reasons[on ? "add" : "delete"](reason);
    section.classList.toggle("is-paused", reasons.size > 0);
  };
  const stage = section.querySelector(".photos__stage");
  stage.addEventListener("pointerenter", () => pause("hover", true));
  stage.addEventListener("pointerleave", () => pause("hover", false));
  stage.addEventListener("focusin", () => pause("focus", true));
  stage.addEventListener("focusout", () => pause("focus", false));
  const lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    new MutationObserver(() => pause("lightbox", lightbox.open)).observe(lightbox, { attributes: true, attributeFilter: ["open"] });
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => pause("offscreen", !entry.isIntersecting), { threshold: 0.2 }).observe(stage);
  }
}

/* Vídeos de conteúdo: rodam sem som enquanto estão na tela e pausam ao sair.
   Com movimento reduzido não tocam sozinhos: ganham os controles do navegador. */
function setupReels() {
  const videos = document.querySelectorAll(".reel-row video");
  if (!videos.length) return;
  if (reduceMotion || !("IntersectionObserver" in window)) { videos.forEach((video) => { video.controls = true; }); return; }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) target.play().catch(() => { target.controls = true; });
      else target.pause();
    });
  }, { threshold: 0.25 });
  videos.forEach((video) => observer.observe(video));
}

/* Cards e blocos entram suavemente ao aparecer na tela */
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach((item) => item.classList.add("is-visible")); return; }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
  items.forEach((item) => {
    // Pequeno atraso em cascata para itens lado a lado
    const siblings = Array.from(item.parentElement.children).filter((el) => el.classList.contains("reveal"));
    item.style.transitionDelay = `${(siblings.indexOf(item) % 2) * 80}ms`;
    observer.observe(item);
  });
}

/* Foto ampliada: botões .shot abrem a imagem grande num <dialog> */
function setupLightbox() {
  const dialog = document.querySelector(".lightbox");
  if (!dialog || !dialog.showModal) return;
  const image = dialog.querySelector("img");
  document.querySelectorAll(".shot").forEach((button) => {
    button.addEventListener("click", () => {
      const thumb = button.querySelector("img");
      image.src = button.dataset.full;
      image.alt = thumb ? thumb.alt : "";
      dialog.showModal();
    });
  });
  dialog.querySelector(".lightbox__close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
}

/* Barra fixa do celular aparece depois que os botões da abertura saem da tela */
function setupStickyCta() {
  const bar = document.querySelector(".sticky-cta");
  const anchor = document.querySelector("[data-sticky-anchor]");
  if (!bar) return;
  if (!anchor || !("IntersectionObserver" in window)) { bar.classList.add("is-visible"); return; }
  new IntersectionObserver(([entry]) => {
    bar.classList.toggle("is-visible", !entry.isIntersecting && entry.boundingClientRect.top < 0);
  }).observe(anchor);
}

function setupYear() {
  document.querySelectorAll(".js-year").forEach((el) => { el.textContent = new Date().getFullYear(); });
}
