// Small helpers
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

// Theme persistence
const savedTheme =
  localStorage.getItem("site-theme") ||
  (window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark");
root.setAttribute("data-theme", savedTheme);

function toggleTheme() {
  const cur = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", cur);
  localStorage.setItem("site-theme", cur);
  themeToggle.setAttribute("aria-pressed", cur === "dark" ? "false" : "true");
}
themeToggle.addEventListener("click", toggleTheme);

// Active nav as user scrolls
const navLinks = document.querySelectorAll(".nav-link");
const sections = Array.from(navLinks).map((a) =>
  document.querySelector(a.getAttribute("href"))
);

function onScroll() {
  const scrollY = window.scrollY + 130;
  let currentIndex = 0;
  sections.forEach((sec, i) => {
    if (sec && sec.offsetTop <= scrollY) currentIndex = i;
  });
  navLinks.forEach((a, i) => a.classList.toggle("active", i === currentIndex));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      e.preventDefault();
      document
        .querySelector(id)
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// IntersectionObserver reveal animation
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
reveals.forEach((el) => io.observe(el));

// small UX touches
document.getElementById("year").textContent = new Date().getFullYear();

// Responsive mobile toggle (optional)
const mobileToggle = document.querySelector(".mobile-nav-toggle");
mobileToggle?.addEventListener("click", () => {
  const nav = document.querySelector(".nav-links");
  const opened = nav.style.display === "flex";
  nav.style.display = opened ? "none" : "flex";
  mobileToggle.setAttribute("aria-expanded", !opened);
});

// projects
const projects = [
  {
    img: "images/todo.png",
    name: "Task Manager App",
    desc: `A responsive and intuitive task management application built using vanilla JavaScript, 
    HTML, and CSS.Users can add new tasks, mark them as completed, edit or delete pending tasks, 
    and filter the view by task status.All data is
    stored in the browser's localStorage for seamless offline use.`,
    live: "https://projecttasksmanager.netlify.app/",
    github: "https://github.com/vasundhara-thakur/Task-Manager-App",
  },
  {
    img: "./images/alvy.png",
    name: "ALVY UI clone",
    desc: `A responsive UI clone of the Alvy website built to replicate its layout, design system, and visual hierarchy. Focused on pixel-perfect styling and modern frontend practices.`,
    live: "https://alvyuiclone.netlify.app/",
    github: "https://github.com/vasundhara-thakur/ALVY-Clone-UI",
  },
  {
    img: "./images/weather.png",
    name: "Weather App",
    desc: `A dynamic weather application built using JavaScript that fetches real-time data from a weather API. Features include city-based search, live temperature updates, and responsive UI for seamless use across devices.`,
    live: "https://vasundhara-thakur.github.io/javascript_small_projects/Weather%20App/",
    github: "https://github.com/vasundhara-thakur/javascript_small_projects/tree/main/Weather%20App",
  },
  {
    img: "./images/calculator.png",
    name: "Simple Calculator",
    desc: `A basic calculator built using HTML, CSS, and JavaScript that performs standard arithmetic operations with a clean and user-friendly interface.`,
    live: "https://vasundhara-thakur.github.io/javascript_small_projects/Simple%20Calculator/",
    github: "https://github.com/vasundhara-thakur/javascript_small_projects/tree/main/Simple%20Calculator",
  },
  {
    img: "./images/snakegame.png",
    name: "Snake Game",
    desc: `An interactive Snake game developed with HTML, CSS, and JavaScript using keyboard controls, real-time score tracking, and collision detection logic.`,
    live: "https://vasundhara-thakur.github.io/javascript_small_projects/Snake%20Game/",
    github: "https://github.com/vasundhara-thakur/javascript_small_projects/tree/main/Snake%20Game",
  },
  {
    img: "./images/icecream.png",
    name: "Ice-cream Webpage",
    desc: `A responsive ice cream website built using HTML, CSS, and JavaScript, focusing on clean design, layout structuring, and user-friendly navigation.`,
    live: "https://icecreamwebpage.netlify.app/",
    github: "https://github.com/vasundhara-thakur/Ice-cream-website",
  },
];

const project = document.querySelector(".projects-grid");
let allProjects = "";

projects.forEach((elem) => {
  allProjects += `<article class="project" aria-labelledby="Task Manager App">
  <img src="${elem.img}" alt="Screenshot - ${elem.name}">
          <h3 id="stopwatch">${elem.name}</h3>
          <p class="muted">${elem.desc}</p>
          <div class="meta">
            <a href="${elem.live}" target="_blank" rel="noopener noreferrer">Live demo</a>
            <a href="${elem.github}" target="_blank" rel="noopener noreferrer">Code</a>
          </div>
  </article>`;
});

project.innerHTML = allProjects;
