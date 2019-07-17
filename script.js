/* Slides the navigation into view for mobile devices. */
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

}

/* Typewriter effect for Hello World header. */
function typeWriter(id, callback) {
    var i = 0;
    var speed = 95;
    var helloText = document.querySelector(id);
    text = helloText.dataset.content;
    helloText.innerHTML = "|";

    /* Types the words across the screen, and calls the callback function when done.*/
    function typing(callback) {
        if (i < text.length) {
            helloText.innerHTML = helloText.innerHTML.slice(0, i) + text.charAt(i) + helloText.innerHTML.slice(i);
            i++;
            setTimeout(typing, speed, callback);
        }
        else {
            callback();
        }

    }
    typing(callback);

}

/* Blinks the "cursor" when text is finished writing. */
function blink() {
    helloText = document.querySelector("#hello-text");
    helloText.innerHTML = helloText.innerHTML.slice(0, -1);
    var span = document.createElement("span");
    span.textContent = "|";
    span.classList.add("toggle-cursor");
    helloText.appendChild(span);
}

/* Activated when a navigation link is clicked. */
function navClick() {
    var aboutMe = document.querySelector("#about-me-link");
    var resume = document.querySelector("#resume-link");
    var projects = document.querySelector("#projects-link");
    var logo = document.querySelector("#logo");
    var duration = 1200;
    aboutMe.addEventListener("click", function () {
        smoothScroll("#about-me", duration);
    });
    resume.addEventListener("click", function () {
        smoothScroll("#resume", duration);
    });
    projects.addEventListener("click", function () {
        smoothScroll("#projects", duration);
    });
    logo.addEventListener("click", function () {
        smoothScroll("#hello", duration);
    });
};

/* Smoothly scrolls to different sections of the page. */
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
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    };

    requestAnimationFrame(animate);
}

/* Background colour changes upon scrolling to different sections of the page. */
function colourScroll(target) {
    var sections = document.querySelectorAll("section");
    var body = document.querySelector("body");
    window.addEventListener("scroll", function () {
        sections.forEach(element => {
            var headerHeight = document.querySelector("header").offsetHeight - 2;
            var positionTop = element.getBoundingClientRect().top - headerHeight;
            var positionBottom = element.getBoundingClientRect().bottom;
            var pixels = 300;
            if (Math.abs(positionTop) < pixels || (positionTop < 0 && positionBottom > 0)) {
                var colour = element.dataset.colour;
                body.style.backgroundColor = colour;
                this.console.log(positionTop + " " + positionBottom);
            }
        });
    });
}

/* Container function for all activities for the page. */
function activites() {
    window.onbeforeunload = function () {
        var body = document.querySelector("body");
        body.style.backgroundColor = "#c8f2ff";
        window.scrollTo(0, 0);
    };

    typeWriter("#hello-text", blink);
    colourScroll();
    slideNavigation();
    navClick();
}
activites();