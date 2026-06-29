/*=========================================
    NAVBAR SCROLL EFFECT
=========================================*/

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.style.background = "rgba(0,0,0,.92)";
        header.style.boxShadow = "0 0 25px rgba(255,0,0,.25)";

    } else {

        header.style.background = "rgba(0,0,0,.35)";
        header.style.boxShadow = "none";

    }

});

/*=========================================
    COUNTER ANIMATION
=========================================*/

const counters = document.querySelectorAll("[data-count]");

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    const stats = document.getElementById("statistics");

    if (!stats) return;

    const top = stats.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {

        counterStarted = true;

        counters.forEach(counter => {

            const target = +counter.dataset.count;

            let value = 0;

            const speed = target / 120;

            const update = () => {

                value += speed;

                if (value < target) {

                    counter.innerText = Math.ceil(value);

                    requestAnimationFrame(update);

                } else {

                    counter.innerText = target + "+";

                }

            };

            update();

        });

    }

}

window.addEventListener("scroll", startCounters);

/*=========================================
    SCROLL REVEAL
=========================================*/

const reveals = document.querySelectorAll(

"#about, #statistics, #programs, #documents, #trainer, #gallery, #facebook, #contact"

);

reveals.forEach(section => {

    section.style.opacity = "0";
    section.style.transform = "translateY(70px)";
    section.style.transition = "1s ease";

});

function revealSections() {

    reveals.forEach(section => {

        const top = section.getBoundingClientRect().top;

        if (top < window.innerHeight - 120) {

            section.style.opacity = "1";
            section.style.transform = "translateY(0)";

        }

    });

}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

/*=========================================
    HERO BUTTON SMOOTH SCROLL
=========================================*/

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

/*=========================================
    GALLERY CLICK EFFECT
=========================================*/

const galleryImages = document.querySelectorAll(".gallery-grid img");

galleryImages.forEach(img => {

    img.addEventListener("click", () => {

        const overlay = document.createElement("div");

        overlay.style.position = "fixed";
        overlay.style.left = "0";
        overlay.style.top = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0,0,0,.92)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "99999";
        overlay.style.cursor = "pointer";

        const image = document.createElement("img");

        image.src = img.src;
        image.style.maxWidth = "90%";
        image.style.maxHeight = "90%";
        image.style.borderRadius = "15px";
        image.style.boxShadow = "0 0 40px rgba(255,0,0,.45)";

        overlay.appendChild(image);

        document.body.appendChild(overlay);

        overlay.onclick = () => {

            overlay.remove();

        };

    });

});

/*=========================================
    PARALLAX HERO
=========================================*/

const heroImage = document.querySelector(".hero-image");

window.addEventListener("scroll", () => {

    if (heroImage) {

        heroImage.style.transform =
            `translateY(${window.scrollY * 0.3}px) scale(1.05)`;

    }

});

/*=========================================
    ACTIVE NAV LINK
=========================================*/

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/*=========================================
    BUTTON HOVER GLOW
=========================================*/

const buttons = document.querySelectorAll(".btn, .btn2");

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.boxShadow = "0 0 35px rgba(255,0,0,.55)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.boxShadow = "";

    });

});

/*=========================================
    PAGE LOADED
=========================================*/

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

    startCounters();
    revealSections();

});