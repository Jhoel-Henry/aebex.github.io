// script.js

document.addEventListener("DOMContentLoaded", () => {
  // --- AQUÍ PEGAS EL CÓDIGO DEL MAPA (PUNTO 5) ---
  const selectedCountries = ["CA", "CN", "KR", "BE", "ES", "TR", "RO"];

  const map = new jsVectorMap({
    selector: "#world-map",
    map: "world",
    draggable: true,
    zoomButtons: false,
    zoomOnScroll: false,
    regionStyle: {
      initial: {
        fill: "#1e293b",
        stroke: "#070C18",
        strokeWidth: 0.5,
        fillOpacity: 1,
      },
      hover: {
        fillOpacity: 0.8,
      },
    },
    markers: [
      { name: "Comunidad AEBEX - Canadá 🇨🇦", coords: [56.1304, -106.3468] },
      { name: "Comunidad AEBEX - España 🇪🇸", coords: [40.4637, -3.7492] },
      { name: "Comunidad AEBEX - Bélgica 🇧🇪", coords: [50.5039, 4.4699] },
      { name: "Comunidad AEBEX - Rumanía 🇷🇴", coords: [45.9432, 24.9668] },
      { name: "Comunidad AEBEX - Turquía 🇹🇷", coords: [38.9637, 35.2433] },
      { name: "Comunidad AEBEX - China 🇨🇳", coords: [35.8617, 104.1954] },
      {
        name: "Comunidad AEBEX - Corea del Sur 🇰🇷",
        coords: [35.9078, 127.7669],
      },
    ],
    markerStyle: {
      initial: {
        r: 5,
        fill: "#38BDF8",
        stroke: "#FFFFFF",
        strokeWidth: 1.5,
      },
      hover: {
        r: 8,
        fill: "#22C55E",
      },
    },
    selectedRegions: selectedCountries,
    regionSelectable: false,
    series: {
      regions: [
        {
          attribute: "fill",
          states: {
            default: {
              CA: "#0284C7",
              CN: "#0284C7",
              KR: "#0284C7",
              BE: "#0284C7",
              ES: "#0284C7",
              TR: "#0284C7",
              RO: "#0284C7",
            },
          },
        },
      ],
    },
  });

  // --- AQUÍ CONTINÚA EL RESTO DE TU CÓDIGO (Menú hamburguesa, buscador, etc.) ---
});
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// Soporte para desplegables en móviles mediante clic
const dropdownTriggers = document.querySelectorAll(".dropdown-trigger");
dropdownTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const parent = trigger.parentElement;
      parent.classList.toggle("active");
    }
  });
});

// 2. BUSCADOR EN TIEMPO REAL DE BECAS
const scholarshipSearch = document.getElementById("scholarshipSearch");
const scholarshipCards = document.querySelectorAll(".scholarship-card");

if (scholarshipSearch) {
  scholarshipSearch.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    scholarshipCards.forEach((card) => {
      const tags = card.getAttribute("data-tags") || "";
      const title = card.querySelector("h3").textContent.toLowerCase();
      const text = card.querySelector("p").textContent.toLowerCase();

      if (
        tags.includes(query) ||
        title.includes(query) ||
        text.includes(query)
      ) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// 3. ANIMACIÓN DE CONTADORES / MÉTRICAS
const metricNumbers = document.querySelectorAll(".metric-number");
let animated = false;

function animateMetrics() {
  metricNumbers.forEach((metric) => {
    const target = +metric.getAttribute("data-target");
    let count = 0;
    const speed = target / 50;

    const updateCount = () => {
      count += speed;
      if (count < target) {
        metric.innerText = "+" + Math.ceil(count);
        setTimeout(updateCount, 30);
      } else {
        metric.innerText = "+" + target;
      }
    };
    updateCount();
  });
}

// Trigger de animación al hacer scroll hasta la sección
window.addEventListener("scroll", () => {
  const metricsSection = document.querySelector(".metrics-section");
  if (metricsSection) {
    const sectionPos = metricsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos && !animated) {
      animateMetrics();
      animated = true;
    }
  }
});

// 4. LÓGICA DE PESTAÑAS (TABS DE LA GUÍA DE ESTUDIOS)
function openTab(evt, tabName) {
  const tabContents = document.querySelectorAll(".tab-content");
  const tabBtns = document.querySelectorAll(".tab-btn");

  tabContents.forEach((content) => content.classList.remove("active"));
  tabBtns.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

function switchGuideTab(tabName) {
  const targetElement = document.getElementById(tabName);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
}

// 5. SISTEMA DE MODALES
function openModal(title) {
  const modal = document.getElementById("customModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.innerText = `Detalles: ${title}`;
  modalBody.innerHTML = `
        <p>Has seleccionado la convocatoria <strong>${title}</strong>.</p>
        <br>
        <p>Próximamente se abrirán las postulaciones oficiales. Los miembros de AEBEX cuentan con acceso a revisión de ensayos y sesiones de preguntas y respuestas en vivo.</p>
    `;

  modal.classList.add("active");
}

function openResourceModal(resourceName) {
  const modal = document.getElementById("customModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.innerText = `Descarga: ${resourceName}`;
  modalBody.innerHTML = `
        <p>Tu recurso <strong>${resourceName}</strong> está listo para ser descargado en formato Word/PDF editable.</p>
        <br>
        <a href="#" class="btn btn-primary" onclick="alert('Descarga simulada iniciada'); closeModal();">Confirmar Descarga</a>
    `;

  modal.classList.add("active");
}

function closeModal() {
  const modal = document.getElementById("customModal");
  modal.classList.remove("active");
}

// 6. FORMULARIO DE CONTACTO/REGISTRO
function handleFormSubmit(e) {
  e.preventDefault();
  alert(
    "¡Gracias por sumarte a AEBEX! Te hemos enviado un correo de bienvenida para completar tu perfil.",
  );
  e.target.reset();
}

//Para el carrusel
// 1. Datos simulados en arreglos locales
/* =========================================================
   AEBEX — JUNTA DIRECTIVA
   ========================================================= */

const teamMembers = [
  {
    name: "Valeria Rojas",
    role: "Directora Ejecutiva",
    image: "assets/team/valeria.jpg",
    description:
      "Responsable de liderar la estrategia institucional, coordinar iniciativas clave y representar la visión de AEBEX.",
  },

  {
    name: "Marco Antonio",
    role: "Coordinador Académico",
    image: "assets/team/marco.jpg",
    description:
      "Encargado de fortalecer programas académicos, oportunidades de formación y espacios de desarrollo para la comunidad.",
  },

  {
    name: "Lucía Mamani",
    role: "Líder de Alianzas Estratégicas",
    image: "assets/team/lucia.jpg",
    description:
      "Construye relaciones institucionales y desarrolla alianzas que permiten ampliar el alcance y el impacto de AEBEX.",
  },

  {
    name: "Carlos Pérez",
    role: "Director de Innovación",
    image: "assets/team/carlos.jpg",
    description:
      "Lidera proyectos de innovación y tecnología orientados a fortalecer la transformación digital de AEBEX.",
  },
];

/* =========================================================
   ELEMENTOS
   ========================================================= */

const track = document.getElementById("teamTrack");

const cards = [...document.querySelectorAll(".member-card")];

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

const dotsContainer = document.getElementById("carouselDots");

const currentNumber = document.getElementById("currentNumber");

const totalNumber = document.getElementById("totalNumber");

/* =========================================================
   MODAL
   ========================================================= */

const modal = document.getElementById("profileModal");

const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");

const modalName = document.getElementById("modalName");

const modalRole = document.getElementById("modalRole");

const modalDescription = document.getElementById("modalDescription");

/* =========================================================
   ESTADO
   ========================================================= */

let currentIndex = 0;

let autoplay;

/* =========================================================
   CUÁNTAS TARJETAS MOSTRAR
   ========================================================= */

function visibleCards() {
  if (window.innerWidth <= 760) {
    return 1;
  }

  if (window.innerWidth <= 1150) {
    return 2;
  }

  return 3;
}

/* =========================================================
   MÁXIMO ÍNDICE
   ========================================================= */

function maxIndex() {
  return Math.max(0, cards.length - visibleCards());
}

/* =========================================================
   DOTS
   ========================================================= */

function createDots() {
  dotsContainer.innerHTML = "";

  for (let i = 0; i <= maxIndex(); i++) {
    const dot = document.createElement("button");

    dot.className = "carousel-dot";

    dot.type = "button";

    dot.setAttribute("aria-label", `Ir a posición ${i + 1}`);

    dot.addEventListener("click", () => {
      currentIndex = i;

      updateCarousel();

      restartAutoplay();
    });

    dotsContainer.appendChild(dot);
  }
}

/* =========================================================
   ACTUALIZAR DOTS
   ========================================================= */

function updateDots() {
  const dots = [...dotsContainer.children];

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });

  currentNumber.textContent = String(currentIndex + 1).padStart(2, "0");

  totalNumber.textContent = String(maxIndex() + 1).padStart(2, "0");
}

/* =========================================================
   ACTUALIZAR CARRUSEL
   ========================================================= */

function updateCarousel() {
  const cardWidth = cards[0].getBoundingClientRect().width;

  const gap = 24;

  const offset = currentIndex * (cardWidth + gap);

  track.style.transform = `translate3d(-${offset}px, 0, 0)`;

  updateDots();
}

/* =========================================================
   NEXT
   ========================================================= */

function nextSlide() {
  if (currentIndex >= maxIndex()) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }

  updateCarousel();
}

/* =========================================================
   PREVIOUS
   ========================================================= */

function previousSlide() {
  if (currentIndex <= 0) {
    currentIndex = maxIndex();
  } else {
    currentIndex--;
  }

  updateCarousel();
}

/* =========================================================
   AUTOPLAY
   ========================================================= */

function startAutoplay() {
  clearInterval(autoplay);

  autoplay = setInterval(nextSlide, 5500);
}

function stopAutoplay() {
  clearInterval(autoplay);
}

function restartAutoplay() {
  startAutoplay();
}

/* =========================================================
   BOTONES
   ========================================================= */

nextBtn.addEventListener("click", () => {
  nextSlide();

  restartAutoplay();
});

prevBtn.addEventListener("click", () => {
  previousSlide();

  restartAutoplay();
});

/* =========================================================
   PAUSAR AL PASAR MOUSE
   ========================================================= */

const carousel = document.querySelector(".team-carousel");

carousel.addEventListener("mouseenter", stopAutoplay);

carousel.addEventListener("mouseleave", startAutoplay);

/* =========================================================
   MODAL
   ========================================================= */

function openModal(index) {
  const member = teamMembers[index];

  if (!member) return;

  modalImage.src = member.image;

  modalImage.alt = member.name;

  modalName.textContent = member.name;

  modalRole.textContent = member.role;

  modalDescription.textContent = member.description;

  modal.classList.add("is-open");

  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  stopAutoplay();
}

/* =========================================================
   CERRAR MODAL
   ========================================================= */

function closeModal() {
  modal.classList.remove("is-open");

  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  startAutoplay();
}

modalClose.addEventListener("click", closeModal);

document
  .querySelector("[data-close-modal]")
  .addEventListener("click", closeModal);

/* =========================================================
   BOTONES DE PERFIL
   ========================================================= */

document.querySelectorAll(".profile-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();

    const index = Number(button.dataset.member);

    openModal(index);
  });
});

/* =========================================================
   TECLADO
   ========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();

    return;
  }

  if (modal.classList.contains("is-open")) {
    return;
  }

  if (event.key === "ArrowRight") {
    nextSlide();

    restartAutoplay();
  }

  if (event.key === "ArrowLeft") {
    previousSlide();

    restartAutoplay();
  }
});

/* =========================================================
   RESPONSIVE
   ========================================================= */

window.addEventListener("resize", () => {
  currentIndex = Math.min(currentIndex, maxIndex());

  createDots();

  updateCarousel();
});

/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

createDots();

updateCarousel();

startAutoplay();
const datosUniversidadesAliados = [
  { logo: "assets/uni-logos/harvard-logo.png", nombre: "Harvard" },
  {
    logo: "assets/uni-logos/Duke-University-Logo.jpg",
    nombre: "Duke University",
  },
  {
    logo: "assets/uni-logos/Georgetown-University-Logo.png",
    nombre: "Georgetown Univesity",
  },
  { logo: "assets/uni-logos/columbia-logo.png", nombre: "Columbia Univesity" },
  {
    logo: "assets/uni-logos/Rice-University-logo.png",
    nombre: "Rice University",
  },
  {
    logo: "assets/uni-logos/Stanford-University-logo.png",
    nombre: "Stanford University",
  },
  {
    logo: "assets/uni-logos/University-of-Pennsylvania-logo.png",
    nombre: "University of Pennsylvania",
  },
];

// 2. Funciones para renderizar automáticamente
document.addEventListener("DOMContentLoaded", () => {
  // Cargar Directiva
  const contenedorDirectiva = document.getElementById("gridDirectiva");
  if (contenedorDirectiva) {
    contenedorDirectiva.innerHTML = "";
    datosDirectiva.forEach((dir) => {
      contenedorDirectiva.innerHTML += `
                <div class="profile-card">
                    <div class="profile-image">
                        <img src="${dir.foto}" alt="${dir.nombre}">
                        <span class="country-tag">🇧🇴 Bolivia</span>
                    </div>
                    <div class="profile-info">
                        <h3>${dir.nombre}</h3>
                        <span class="study-field">${dir.cargo}</span>
                    </div>
                </div>
            `;
    });
  }

  // Cargar Carrusel Automático
  const track = document.getElementById("infiniteTrack");
  if (track) {
    track.innerHTML = "";
    const elementosInfinitos = [
      ...datosUniversidadesAliados,
      ...datosUniversidadesAliados,
    ];
    elementosInfinitos.forEach((item) => {
      track.innerHTML += `
                <div class="carousel-item">
                    <img src="${item.logo}" alt="${item.nombre}">
                </div>
            `;
    });
  }
});
