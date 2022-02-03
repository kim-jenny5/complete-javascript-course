"use strict";

///////////////////////////////////////

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
const imgTargets = document.querySelectorAll("img[data-src]");
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

///////////////////////////////////////
// LABEL: Modal window
const openModal = function () {
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
};

const closeModal = function () {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
	btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal();
	}
});

// btnScrollTo.addEventListener("click", (e) => {
// 	const s1coords = section1.getBoundingClientRect();
// 	// console.log(s1coords);
// 	// console.log(e.target.getBoundingClientRect());
// 	// console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);
// 	// console.log(
// 	// 	"Height/width of viewport:",
// 	// 	document.documentElement.clientHeight,
// 	// 	document.documentElement.clientWidth
// 	// );

// 	// Scrolling
// 	// window.scrollTo(
// 	// 	s1coords.left + window.pageXOffset,
// 	// 	s1coords.top + window.pageYOffset
// 	// );

// 	// Smooth scrolling
// 	window.scrollTo({
// 		left: s1coords.left + window.pageXOffset,
// 		top: s1coords.top + window.pageYOffset,
// 		behavior: "smooth"
// 	});

// 	// NOTE: works only with modern browsers
// 	// section1.scrollIntoView({ behavior: "smooth" });
// });

// const h1 = document.querySelector("h1");

// const alertHi = () => {
// 	alert("Great! You're reading the heading 😊");
// 	// h1.removeEventListener("mouseenter", alertHi);
// };

// h1.addEventListener("mouseenter", alertHi);

// setTimeout(() => h1.removeEventListener("mouseenter", alertHi), 3000);

///////////////////////////////////////
// LABEL: Page Navigation
// document.querySelectorAll(".nav__link").forEach(function (el) {
// 	el.addEventListener("click", function (e) {
// 		e.preventDefault();
// 		// console.log(this);
// 		const id = this.getAttribute("href");
// 		console.log(id);
// 		document.querySelector(id).scrollIntoView({ behavior: "smooth" });
// 	});
// });

// LABEL: Event Delegation (BETTER OPTION)
document.querySelector(".nav__links").addEventListener("click", function (e) {
	e.preventDefault();
	// console.log(e.target);
	if (e.target.classList.contains("nav__link")) {
		const id = e.target.getAttribute("href");
		// console.log(id);
		document.querySelector(id).scrollIntoView({ behavior: "smooth" });
	}
});

// LABEL: Tabbed components
tabsContainer.addEventListener("click", function (e) {
	const clicked = e.target.closest(".operations__tab");
	// console.log(e.target);
	// console.log(clicked);
	if (!clicked) return;

	// Clicking on tabs
	tabs.forEach((t) => t.classList.remove("operations__tab--active"));
	clicked.classList.add("operations__tab--active");

	// con`sole.log(clicked.dataset);

	// Showing/hiding tab contents
	tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
	document
		.querySelector(`.operations__content--${clicked.dataset.tab}`)
		.classList.add("operations__content--active");
});

// LABEL: Menu fade animation

// const handleHover = (e, opacity) => {
const handleHover = function (e) {
	if (e.target.classList.contains("nav__link")) {
		const link = e.target;
		const siblings = link.closest(".nav").querySelectorAll(".nav__link");
		const logo = link.closest(".nav").querySelector("img");
		siblings.forEach((el) => {
			// if (el !== link) el.style.opacity = opacity;
			if (el !== link) el.style.opacity = this;
		});
		// logo.style.opacity = opacity;
		logo.style.opacity = this;
	}
};

// nav.addEventListener("mouseover", (e) => {
// 	handleHover(e, 0.5);
// });

// nav.addEventListener("mouseout", (e) => {
// 	handleHover(e, 1);
// });

// Passing argument into handler bc event handler functions can only take in one argument
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseover", handleHover.bind(1));

// LABEL: Sticky navigation
// Not a great method since the "scroll" event fires each time user scrolls
// const initialCoords = section1.getBoundingClientRect();
// // console.log(initialCoords);
// window.addEventListener("scroll", function () {
// 	// console.log(window.scrollY);
// 	if (window.scrollY > initialCoords.top) {
// 		nav.classList.add("sticky");
// 	} else {
// 		nav.classList.remove("sticky");
// 	}
// });

// Using the Intersection Observer API
// Lecture
// const observerCallback = function (entries, observer) {
// 	entries.forEach((entry) => {
// 		console.log(entry);
// 	});
// };
// const observerOpts = {
// 	root: null,
// 	threshold: [0, 0.2]
// };

// const observer = new IntersectionObserver(observerCallback, observerOpts);
// observer.observe(section1);

// Actual implementation
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
	const [entry] = entries; // or const entry = entries[0]
	if (!entry.isIntersecting) {
		nav.classList.add("sticky");
	} else {
		nav.classList.remove("sticky");
	}
};

const headerObserver = new IntersectionObserver(stickyNav, {
	root: null,
	threshold: 0,
	rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);

// LABEL: Reveal sections
const revealSection = function (entries, observer) {
	const [entry] = entries;
	// console.log(entry);
	if (entry.isIntersecting) {
		entry.target.classList.remove("section--hidden");
		// console.log(entry.target);
		observer.unobserve(entry.target);
	}
};

const sectionObserver = new IntersectionObserver(revealSection, {
	root: null,
	threshold: 0.15
});

allSections.forEach(function (section) {
	sectionObserver.observe(section);
	// section.classList.add("section--hidden");
});

// LABEL: Lazy loading images
const loadImg = function (entries, observer) {
	const [entry] = entries;
	// console.log(entry);
	if (entry.isIntersecting) {
		// console.log(entry.target);
		// debugger;
		entry.target.src = entry.target.dataset.src;
		entry.target.addEventListener("load", function () {
			entry.target.classList.remove("lazy-img");
		});
		observer.unobserve(entry.target);
	}
};

const imgObserver = new IntersectionObserver(loadImg, {
	root: null,
	threshold: 0,
	rootMargin: "200px"
});

imgTargets.forEach((img) => imgObserver.observe(img));

// LABEL: Slider for (section 3)
// Functions
const createDots = function () {
	slides.forEach((_, i) => {
		dotContainer.insertAdjacentHTML(
			"beforeend",
			`<button class="dots__dot" data-slide="${i}"></button>`
		);
	});
};

const activateDot = function (slide) {
	document.querySelectorAll(".dots__dot").forEach((dot) => {
		dot.classList.remove("dots__dot--active");
	});
	document
		.querySelector(`.dots__dot[data-slide="${slide}"]`)
		.classList.add("dots__dot--active");
};

const goToSlide = function (slide) {
	slides.forEach(
		(s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
	);
};

// slider.style.overflow = `visible`;

let curSlide = 0;
const maxSlide = slides.length - 1;

const nextSlide = function () {
	if (curSlide === maxSlide) {
		curSlide = 0;
	} else {
		curSlide++;
	}
	goToSlide(curSlide);
	activateDot(curSlide);
};

const previousSlide = function () {
	if (curSlide === 0) {
		curSlide = maxSlide;
	} else {
		curSlide--;
	}
	goToSlide(curSlide);
	activateDot(curSlide);
};

const init = function () {
	goToSlide(0);
	createDots();
	activateDot(0);
};

// Event Handlers
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", previousSlide);

document.addEventListener("keydown", function (e) {
	if (e.key === "ArrowLeft") {
		previousSlide();
	} else if (e.key === "ArrowRight") {
		nextSlide();
	}
});

dotContainer.addEventListener("click", function (e) {
	if (e.target.classList.contains("dots__dot")) {
		const { slide } = e.target.dataset;
		goToSlide(slide);
		activateDot(slide);
	}
});
