"use strict";

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

let map, mapEvent;

class App {
	#map;
	#mapZoomLevel = 13;
	#mapEvent;
	#workouts = [];

	constructor() {
		// get user's position
		this._getPosition();

		// event handlers
		form.addEventListener("submit", this._newWorkout.bind(this));
		inputType.addEventListener("change", this._toggleElevationField);
		containerWorkouts.addEventListener("click", this._moveToPopup);

		// get user's local storage
		this._getLocalStorage();
	}

	_getPosition() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this._loadMap, function () {
				alert("Could not get your position.");
			});
		}
	}

	_loadMap = (position) => {
		const { latitude } = position.coords;
		const { longitude } = position.coords;

		const coords = [latitude, longitude];

		this.#map = L.map("map").setView(coords, this.#mapZoomLevel);

		L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.#map);

		// Handling clicks on map
		this.#map.on("click", this._showForm.bind(this));

		for (const workout of this.#workouts) {
			this._renderWorkoutMarker(workout);
		}
	};

	_showForm(mapE) {
		// console.log(this);
		// console.log(mapE);
		this.#mapEvent = mapE;
		form.classList.remove("hidden");
		inputDistance.focus();
	}

	_hideForm() {
		// prettier-ignore
		inputDistance.value = inputDuration.value = inputElevation.value = inputCadence.value = "";
		form.style.display = "none";
		form.classList.add("hidden");
		setTimeout(() => {
			form.style.display = "grid";
		}, 1000);
	}

	_toggleElevationField() {
		inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
		inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
	}

	_newWorkout(e) {
		const validInputs = (...inputs) => inputs.every((i) => Number.isFinite(i));
		const allPositive = (...inputs) => inputs.every((i) => i > 0);

		e.preventDefault();

		// Getting data from form
		const type = inputType.value;
		const distance = +inputDistance.value;
		const duration = +inputDuration.value;
		const { lat, lng } = this.#mapEvent.latlng;

		let workout;

		// if workout == running, create running object
		if (type === "running") {
			const cadence = +inputCadence.value;
			// Check if data is valid
			if (
				!validInputs(distance, duration, cadence) ||
				!allPositive(distance, duration, cadence)
			)
				return alert("Inputs have to be positive numbers");

			workout = new Running([lat, lng], distance, duration, cadence);
		}

		// if workout == cycling, create cycling object
		if (type === "cycling") {
			const elevation = +inputElevation.value;
			if (
				!validInputs(distance, duration, elevation) ||
				!allPositive(distance, duration)
			)
				return alert("Inputs have to be positive numbers");
			workout = new Cycling([lat, lng], distance, duration, elevation);
		}

		// add new object to workout array
		this.#workouts.push(workout);
		console.log(workout);
		console.log(this.#workouts);

		// // Clear input fields
		this._hideForm();

		// Display marker
		this._renderWorkoutMarker(workout);

		// Render workout on list
		this._renderWorkout(workout);

		this._setLocalStorage();
	}

	_renderWorkoutMarker(workout) {
		L.marker(workout.coords)
			.addTo(this.#map)
			.bindPopup(
				L.popup({
					maxWidth: 250,
					minWidth: 100,
					autoClose: false,
					closeOnClick: false,
					className: `${workout.type}-popup`
				})
			)
			.setPopupContent(
				`${workout.type === "running" ? "🏃‍♂️" : "🚴🏻‍♀️"} ${workout.description}`
			)
			.openPopup();
	}

	_renderWorkout(workout) {
		let html = `
		<li class="workout workout--${workout.type}" data-id="${workout.id}">
			<h2 class="workout__title">${workout.description}</h2>
				<div class="workout__details">
					<span class="workout__icon">${workout.type === "running" ? "🏃‍♂️" : "🚴🏻‍♀️"}</span>
					<span class="workout__value">${workout.distance}</span>
					<span class="workout__unit">mi</span>
				</div>
				<div class="workout__details">
					<span class="workout__icon">⏱</span>
					<span class="workout__value">${workout.duration}</span>
					<span class="workout__unit">min</span>
				</div>
		`;

		if (workout.type === "running") {
			html += `
				<div class="workout__details">
					<span class="workout__icon">⚡️</span>
					<span class="workout__value">${workout.pace.toFixed(1)}</span>
					<span class="workout__unit">min/mi</span>
				</div>
				<div class="workout__details">
					<span class="workout__icon">🦶🏼</span>
					<span class="workout__value">${workout.cadence}</span>
					<span class="workout__unit">spm</span>
				</div>
			</li>
			`;
		}

		if (workout.type === "cycling") {
			html += `
				<div class="workout__details">
					<span class="workout__icon">⚡️</span>
					<span class="workout__value">${workout.speed.toFixed(1)}</span>
					<span class="workout__unit">mi/h</span>
				</div>
				<div class="workout__details">
					<span class="workout__icon">⛰</span>
					<span class="workout__value">${workout.elevationGain}</span>
					<span class="workout__unit">m</span>
				</div>
			</li>
			`;
		}

		form.insertAdjacentHTML("afterend", html);
	}

	_moveToPopup = (e) => {
		// console.log(this);
		// console.log(e.target);
		const workoutEl = e.target.closest(".workout");
		// console.log(workoutEl);

		if (!workoutEl) return;

		// console.log(this.#workouts);
		// debugger;

		const workout = this.#workouts.find(
			(work) => work.id === workoutEl.dataset.id
		);
		console.log(workout);

		this.#map.setView(workout.coords, this.#mapZoomLevel, {
			animate: true,
			pan: { duration: 1 }
		});

		// workout.clicks()
	};

	_setLocalStorage() {
		localStorage.setItem("workouts", JSON.stringify(this.#workouts));
		// console.log(localStorage);
		// debugger;
	}

	_getLocalStorage() {
		const data = JSON.parse(localStorage.getItem("workouts"));
		// console.log(data);

		if (!data) return;

		this.#workouts = data;

		for (const workout of this.#workouts) {
			this._renderWorkout(workout);
		}
	}

	reset() {
		localStorage.removeItem("workouts");
		location.reload();
	}
}

class Workout {
	date = new Date();
	id = (Date.now() + "").slice(-10);
	// clicks = 0;

	// static all = [];

	constructor(coords, distance, duration) {
		this.coords = coords; // [lat, lng]
		this.distance = distance; // mi
		this.duration = duration; // minutes
	}

	_setDescription() {
		//prettier-ignore
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
			months[this.date.getMonth()]
		} ${this.date.getDate()}`;
	}

	// click() {
	// 	this.clicks++;
	// }
}

class Running extends Workout {
	type = "running";

	constructor(coords, distance, duration, cadence) {
		super(coords, distance, duration);
		this.cadence = cadence;

		this.calcPace();
		this._setDescription();
	}

	calcPace() {
		// min/mi
		return (this.pace = this.duration / this.distance);
	}
}

class Cycling extends Workout {
	type = "cycling";
	constructor(coords, distance, duration, elevationGain) {
		super(coords, distance, duration);
		this.elevationGain = elevationGain;

		this.calcSpeed();
		this._setDescription();
	}

	calcSpeed() {
		// mi/h
		return (this.speed = this.distance / this.duration);
	}
}

const app = new App();
// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);
