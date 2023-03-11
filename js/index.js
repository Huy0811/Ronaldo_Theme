// Data Rotate
const TxtRotate = function (element, toRotate, period) {
  this.element = element;
  this.toRotate = toRotate;
  this.period = parseInt(period, 10) || 2000;
  this.loopNum = 0;
  this.txt = "";
  this.isDeleting = false;
  this.tick();
};

TxtRotate.prototype.tick = function () {
  // Stops when text completes
  if (this.loopNum >= this.toRotate.length) return;

  let i = this.loopNum;
  let fullTxt = this.toRotate[i];

  // Get the letter to substring that needs to be appended in the span
  this.txt = fullTxt.substring(0, this.txt.length + 1);

  if (this.loopNum === 0) {
    this.element.innerHTML = '<span class="wrap">' + this.txt + "</span>";
  } else {
    // Add a letter on the screen
    let spacing = "";
    this.element.innerHTML =
      '<span class="wrap">' + spacing + this.txt + "</span>";
  }

  let that = this;

  // Calculate the time to wait before writing next letter
  let delta = 300 - Math.random() * 100;

  // If backspacing reduce it by half
  if (this.isDeleting) {
    delta /= 2;
  }

  // If the word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // Add a delay of 500mx
    delta = 500;
    // Pick the next word
    this.loopNum++;
    // Clear current txt
    this.txt = "";
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  let elements = document.getElementsByClassName("txt-rotate");
  for (let i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute("data-rotate");
    let period = elements[i].getAttribute("data-period");

    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
};

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

window.addEventListener("scroll", () => {
  let nav = document.querySelector("nav");
  nav.classList.toggle("sticky", window.scrollY > screen.height / 2);
});

// Highlight Active Nav Link

// Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");

// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  // Get current scroll position
  let scrollY = window.pageYOffset;

  // Now we loop through sections to get height, top and ID values for each
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    let sectionId = current.getAttribute("id");

    /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".sub-nav a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".sub-nav a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}
