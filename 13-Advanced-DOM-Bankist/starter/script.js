"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

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

// const btnScrollTo = document.querySelector(".btn--scroll-to");
// const section1 = document.querySelector("#section--1");

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

///////////////////////////////////////////////////////
// Page Navigation
// document.querySelectorAll(".nav__link").forEach(function (el) {
// 	el.addEventListener("click", function (e) {
// 		e.preventDefault();
// 		// console.log(this);
// 		const id = this.getAttribute("href");
// 		console.log(id);
// 		document.querySelector(id).scrollIntoView({ behavior: "smooth" });
// 	});
// });

// Event Delegation (BETTER OPTION)
document.querySelector(".nav__links").addEventListener("click", function (e) {
	e.preventDefault();
	// console.log(e.target);
	if (e.target.classList.contains("nav__link")) {
		const id = e.target.getAttribute("href");
		// console.log(id);
		document.querySelector(id).scrollIntoView({ behavior: "smooth" });
	}
});

// Tabbed components
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
	const clicked = e.target.closest(".operations__tab");
	// console.log(e.target);
	console.log(clicked);
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
