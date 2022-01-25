"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

// NOTE: Coding Challenge #1
const renderCountry = function (data, className = "") {
	const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
					+data.population / 1000000
				).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;
	countriesContainer.insertAdjacentHTML("beforeend", html);
	countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
	countriesContainer.insertAdjacentText("beforeend", msg);
	countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = "Something went wrong") {
	return fetch(url).then((response) => {
		if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

		return response.json();
	});
};

// const whereAmI = (lat, lng) => {
// 	fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
// 		.then((resp) => {
// 			if (!resp.ok) throw new Error("Failed to retrieve data from server.");
// 			return resp.json();
// 		})
// 		.then((data) => {
// 			console.log(`You are in ${data.state}, ${data.country}.`);
// 			return fetch(`https://restcountries.com/v2/name/${data.country}`);
// 		})
// 		.then((resp) => {
// 			if (!resp.ok) throw new Error("Country not found.");
// 			return resp.json();
// 		})
// 		.then((datas) => {
// 			if (datas.length > 1) {
// 				for (const data of datas) {
// 					return renderCountry(data);
// 				}
// 			} else return renderCountry(datas[0]);
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// Asynchronous JavaScript
// const lotteryPromise = new Promise((resolve, reject) => {});
// console.log("Getting position");

// const getPosition = () => {
// 	return new Promise(function (resolve, reject) {
// 		// navigator.geolocation.getCurrentPosition(
// 		// 	(position) => resolve(position),
// 		// 	(err) => reject(err)
// 		// );
// 		navigator.geolocation.getCurrentPosition(resolve, reject);
// 	});
// };

// getPosition().then((pos) => console.log(pos));

// const whereAmI = () => {
// 	getPosition()
// 		.then((pos) => {
// 			const { latitude: lat, longitude: lng } = pos.coords;
// 			return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
// 		})
// 		.then((resp) => {
// 			if (!resp.ok) throw new Error("Failed to retrieve data from server.");
// 			return resp.json();
// 		})
// 		.then((data) => {
// 			console.log(`You are in ${data.state}, ${data.country}.`);
// 			return fetch(`https://restcountries.com/v2/name/${data.country}`);
// 		})
// 		.then((resp) => {
// 			if (!resp.ok) throw new Error("Country not found.");
// 			return resp.json();
// 		})
// 		.then((datas) => {
// 			if (datas.length > 1) {
// 				for (const data of datas) {
// 					return renderCountry(data);
// 				}
// 			} else return renderCountry(datas[0]);
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// };

// whereAmI();

// 👉🏻 CODING CHALLENGE #2
const wait = (seconds) => {
	return new Promise((resolve) => {
		setTimeout(resolve, seconds * 1000);
	});
};

const createImage = (imgPath) => {
	return new Promise((resolve, reject) => {
		const img = document.createElement("img");
		img.src = imgPath;
		img.addEventListener("load", () => {
			img.setAttribute("class", "images");

			document.querySelector(".images").append(img);
			resolve(img);
		});
		img.addEventListener("error", () => {
			reject(new Error("Trouble loading image."));
		});
	});
};

let imgEl;

// createImage("./img/img-1.jpg")
// 	.then((img) => {
// 		imgEl = img;
// 		return wait(2);
// 	})
// 	.then(() => {
// 		imgEl.style.display = "none";
// 		return createImage("./img/img-2.jpg");
// 	})
// 	.then((img) => {
// 		imgEl = img;
// 		return wait(2);
// 	})
// 	.then(() => {
// 		imgEl.style.display = "none";
// 		return createImage("./img/img-3.jpg");
// 	})
// 	.catch((err) => alert(err));

////////////////////////////////////////

const getPosition = () => {
	return new Promise(function (resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
};

const whereAmI = async function () {
	try {
		// Geolocation
		const pos = await getPosition();
		const { latitude: lat, longitude: lng } = pos.coords;

		// Reverse geocoding
		const geoResp = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
		if (!geoResp.ok) throw new Error("Problem getting location data");
		const dataGeo = await geoResp.json();

		const resp = await fetch(
			`https://restcountries.com/v2/name/${dataGeo.country}`
		);
		if (!resp.ok) throw new Error("Problem getting country");
		const data = await resp.json();

		renderCountry(data[0]);
		return `You are in ${dataGeo.city}, ${dataGeo.country}`;
	} catch (err) {
		console.log(`${err}`);
		renderError(`${err.message}`);
		throw err;
	}
};

// whereAmI("united states of america");
// console.log("first");

// btn.addEventListener("click", whereAmI);

// console.log("1: Will get location");

const whereAmIAsync = async function () {
	try {
		const resp = await whereAmI();
		console.log(`2: ${resp}`);
	} catch (err) {
		console.log(`2: ${err.message}`);
	}

	console.log(`3: Finished getting location.`);
};

// whereAmIAsync();

const get3Countries = async function (c1, c2, c3) {
	try {
		// const [, data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
		// const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
		// const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

		const data = await Promise.all([
			getJSON(`https://restcountries.com/v2/name/${c1}`),
			getJSON(`https://restcountries.com/v2/name/${c2}`),
			getJSON(`https://restcountries.com/v2/name/${c3}`)
		]);

		// console.log([data1.capital, data2.capital, data3.capital]);
		console.log(
			data.map((country) => {
				return country.length > 1 ? country[1].capital : country[0].capital;
			})
		);
	} catch (err) {
		console.log(err);
	}
};

// get3Countries("Korea", "Japan", "United States of America");

// Promise.race()
const promiseRace = async function () {
	const resp = await Promise.race([
		getJSON(`https://restcountries.com/v2/name/japan`),
		getJSON(`https://restcountries.com/v2/name/italy`),
		getJSON(`https://restcountries.com/v2/name/spain`)
	]);
	// console.log(resp[0]);
};

promiseRace();

// This is useful for making a promise quit if it takes too long.
const timeout = function (sec) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error("Request took too long."), sec);
		});
	});
};

// Promise.race([getJSON(`https://restcountries.com/v2/name/japan`), timeout(1)])
// 	.then((resp) => console.log(resp[0]))
// 	.catch((err) => console.log(err));

// Promise.allSettled([
// 	Promise.resolve("Success"),
// 	Promise.reject("Error"),
// 	Promise.resolve("Another success")
// ]).then((resp) => console.log(resp));

// Promise.all([
// 	Promise.resolve("Success"),
// 	Promise.reject("Error"),
// 	Promise.resolve("Another success")
// ]).then((resp) => console.log(resp));

// Promise.any([
// 	Promise.resolve("Success"),
// 	Promise.reject("Error"),
// 	Promise.resolve("Another success")
// ]).then((resp) => console.log(resp));

// 👉🏻 CODING CHALLENGE #3
const loadNPause = async () => {
	try {
		let img = await createImage("./img/img-1.jpg");
		await wait(2);
		img.style.display = "none";

		img = await createImage("./img/img-2.jpg");
		await wait(2);
		img.style.display = "none";

		img = await createImage("./img/img-3.jpg");
	} catch (err) {
		console.log(err);
	}
};

// loadNPause();

const loadAll = async (imgArr) => {
	try {
		const imgs = imgArr.map(async (img) => {
			return await createImage(img);
		});
		const imgsEl = await Promise.all(imgs);
		console.log(imgsEl);
		console.log(imgs);
		for (const img of imgsEl) {
			img.setAttribute("class", "parallel");
		}
	} catch (err) {
		console.log(err);
	}
};

loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
