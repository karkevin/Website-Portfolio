const slideNavigation = function () {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links a");

    burger.addEventListener('click', function () {
        nav.style.transition = "transform 0.4s ease-in";
        nav.classList.toggle("nav-active");

        burger.classList.toggle("cross");
    });

    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function () {
            nav.classList.toggle("nav-active");
            burger.classList.toggle("cross");

        });
    };

};

const smoothScroll = function (target, duration) {
    var target = document.querySelector(target);
    var headerHeight = document.querySelector("header").offsetHeight - 2;
    var position = target.getBoundingClientRect().top - headerHeight;
    var startPosition = window.pageYOffset;
    var startTime = null;
    function animate(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, position, duration);

        window.scrollTo(0, run);

        if (timeElapsed < duration) {
            requestAnimationFrame(animate);
        }
    };
    function ease(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    };

    requestAnimationFrame(animate);
}



function activites() {
    slideNavigation();
    var aboutMe = document.querySelector("#about-me-link");
    var resume = document.querySelector("#resume-link");
    var projects = document.querySelector("#projects-link");
    var logo = document.querySelector("#logo");
    var duration = 1200;
    aboutMe.addEventListener("click", function() {
        smoothScroll("#about-me", duration);
    });
    resume.addEventListener("click", function() {
        smoothScroll("#resume", duration);
    });
    projects.addEventListener("click", function() {
        smoothScroll("#projects", duration);
    });
    logo.addEventListener("click", function() {
        smoothScroll("#hello", duration);
    });
}

activites();