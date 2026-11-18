function download() {
  const a = document.createElement("a");
  a.href = "assets/Bharath_G_P_Resume.pdf";
  a.download = "Bharath_G_P_Resume.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
["dl-nav", "dl-top", "dl-contact"].forEach(function (id) {
  document.getElementById(id).addEventListener("click", download);
});

const root = document.documentElement;
document.getElementById("theme").addEventListener("click", function () {
  const dark =
    root.getAttribute("data-theme") === "dark" ||
    (!root.hasAttribute("data-theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.setAttribute("data-theme", dark ? "light" : "dark");
});

const bar = document.getElementById("progress");
function onScroll() {
  const h = root.scrollHeight - window.innerHeight;
  bar.style.width =
    (h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0) + "%";
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll("#projects .card");
tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    tabs.forEach(function (t) {
      t.classList.remove("on");
    });
    tab.classList.add("on");
    const f = tab.getAttribute("data-f");
    cards.forEach(function (c) {
      c.style.display =
        f === "all" || c.getAttribute("data-cat") === f ? "" : "none";
    });
  });
});

function count(el) {
  const target = parseFloat(el.getAttribute("data-n"));
  const suffix = el.getAttribute("data-s");
  const dec = String(target).indexOf(".") > -1 ? 1 : 0;
  const start = performance.now();
  function step(now) {
    const p = Math.min(1, (now - start) / 1400);
    el.textContent = (target * p).toFixed(dec) + (p === 1 ? suffix : "");
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const items = document.querySelectorAll(".card, .stat, h2, .big");
items.forEach(function (el) {
  el.classList.add("reveal");
});
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        const b = en.target.querySelector("b[data-n]");
        if (b) count(b);
        io.unobserve(en.target);
      });
    },
    { threshold: 0.12 },
  );
  items.forEach(function (el) {
    io.observe(el);
  });
} else {
  items.forEach(function (el) {
    el.classList.add("in");
  });
  document.querySelectorAll("b[data-n]").forEach(function (b) {
    b.textContent = b.getAttribute("data-n") + b.getAttribute("data-s");
  });
}
