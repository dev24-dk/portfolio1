const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const year = document.getElementById("year");

// Set the current year automatically.
year.textContent = new Date().getFullYear();

// Mobile navigation.
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close mobile menu after selecting a navigation link.
document.querySelectorAll("#navLinks a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});

// Dark/light mode with saved preference.
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "☀️";
    themeToggle.setAttribute("aria-label", "Switch to light mode");
    themeToggle.setAttribute("aria-pressed", "true");
}

themeToggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark");

    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
    themeToggle.setAttribute("aria-pressed", isDark);
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
});

// Reveal sections while scrolling.
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("visible"));
}

// Back-to-top button.
window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 500);
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Contact form validation and feedback.
// This is a front-end demo; it does not send email without a backend service.
contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        formStatus.textContent = "Please fill in all the fields.";
        return;
    }

    if (!email.validity.valid) {
        formStatus.textContent = "Please enter a valid email address.";
        email.focus();
        return;
    }

    formStatus.textContent =
        `Thanks, ${name.value.trim()}! Your message has been validated successfully.`;
    contactForm.reset();
});
