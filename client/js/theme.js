const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const navbar = document.getElementById("navbar");


// ===============================
// LOAD SAVED THEME
// ===============================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeIcon.textContent = "☀️";

}


// ===============================
// THEME TOGGLE
// ===============================

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const isDark =
        document.body.classList.contains("dark-mode");


    if (isDark) {

        localStorage.setItem("theme", "dark");

        themeIcon.textContent = "☀️";

    }

    else {

        localStorage.setItem("theme", "light");

        themeIcon.textContent = "🌙";

    }

});


// ===============================
// NAVBAR SHRINK ON SCROLL
// ===============================

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("navbar-scrolled");

    }

    else {

        navbar.classList.remove("navbar-scrolled");

    }

});


// ===============================
// HERO BUTTON FUNCTIONS
// ===============================

function scrollToRoutes() {

    document
        .getElementById("routes")
        .scrollIntoView({

            behavior: "smooth"

        });

}


function scrollToMap() {

    document
        .getElementById("mapSection")
        .scrollIntoView({

            behavior: "smooth"

        });

}