/* =========================================================
   Sadio Mané — Biography & Career
   Interactions de la page
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector("header");
    const menu = document.querySelector("nav ul");
    const links = document.querySelectorAll("nav ul a");

    /* ---------- 1. Menu burger (mobile) ---------- */
    // Le bouton est créé ici pour ne pas modifier le HTML
    const burger = document.createElement("button");
    burger.className = "burger";
    burger.setAttribute("aria-label", "Ouvrir le menu");
    burger.textContent = "☰";
    document.querySelector("nav").appendChild(burger);

    burger.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("open");
        burger.textContent = isOpen ? "✕" : "☰";
    });

    // Fermer le menu après un clic sur un lien
    links.forEach(link => link.addEventListener("click", () => {
        menu.classList.remove("open");
        burger.textContent = "☰";
    }));

    /* ---------- 2. Bouton « retour en haut » ---------- */
    const toTop = document.createElement("button");
    toTop.className = "to-top";
    toTop.setAttribute("aria-label", "Retour en haut");
    toTop.textContent = "↑";
    document.body.appendChild(toTop);

    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    /* ---------- 3. Effets liés au défilement ---------- */
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 20); // ombre du header
        toTop.classList.toggle("show", window.scrollY > 500);     // affichage du bouton
    });

    /* ---------- 4. Lien actif du menu selon la section visible ---------- */
    const sections = document.querySelectorAll("main section[id]");

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(link => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
                });
            }
        });
    }, { rootMargin: "-45% 0px -50% 0px" }); // se déclenche quand la section est au milieu de l'écran

    sections.forEach(section => sectionObserver.observe(section));

    /* ---------- 5. Apparition progressive des éléments ---------- */
    const revealItems = document.querySelectorAll(
        "section > h2, .biography-part, .career-item, .palmares-category, " +
        ".statistic-card, .video-card, .gallery-item, .player-image, .player-info"
    );

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // l'animation ne se joue qu'une fois
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach(item => {
        item.classList.add("reveal");
        revealObserver.observe(item);
    });

    /* ---------- 6. Compteurs animés (statistiques) ---------- */
    const counters = document.querySelectorAll(".statistic-value");

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const target = parseInt(el.textContent, 10);
            const duration = 1500; // en millisecondes
            const start = performance.now();

            // Fait monter le nombre de 0 jusqu'à sa valeur finale
            function update(now) {
                const progress = Math.min((now - start) / duration, 1);
                el.textContent = Math.floor(progress * target);
                if (progress < 1) requestAnimationFrame(update);
            }

            requestAnimationFrame(update);
            observer.unobserve(el);
        });
    }, { threshold: 0.6 });

    counters.forEach(counter => counterObserver.observe(counter));

});