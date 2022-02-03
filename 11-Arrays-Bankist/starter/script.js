"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LABEL: BANKIST APP

// Data
const account1 = {
	owner: "Jonas Schmedtmann",
	movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
	interestRate: 1.2, // %
	pin: 1111,
	movementsDates: [
		"2019-11-18T21:31:17.178Z",
		"2019-12-23T07:42:02.383Z",
		"2020-01-28T09:15:04.904Z",
		"2020-04-01T10:17:24.185Z",
		"2020-05-08T14:11:59.604Z",
		"2021-10-30T17:01:17.194Z",
		"2021-11-04T23:36:17.929Z",
		"2021-11-05T10:51:36.790Z"
	],
	currency: "EUR",
	locale: "pt-PT" // de-DE
};

const account2 = {
	owner: "Jessica Davis",
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,
	movementsDates: [
		"2019-11-01T13:15:33.035Z",
		"2019-11-30T09:48:16.867Z",
		"2019-12-25T06:04:23.907Z",
		"2020-01-25T14:18:46.235Z",
		"2020-02-05T16:33:06.386Z",
		"2020-04-10T14:43:26.374Z",
		"2020-06-25T18:49:59.371Z",
		"2020-07-26T12:01:20.894Z"
	],
	currency: "USD",
	locale: "en-US"
};

// const account3 = {
// 	owner: "Steven Thomas Williams",
// 	movements: [200, -200, 340, -300, -20, 50, 400, -460],
// 	interestRate: 0.7,
// 	pin: 3333
// };

// const account4 = {
// 	owner: "Sarah Smith",
// 	movements: [430, 1000, 700, 50, 90],
// 	interestRate: 1,
// 	pin: 4444
// };

// const accounts = [account1, account2, account3, account4];
const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const formatMovementsDate = (date, locale) => {
	const calcDaysPassed = (date1, date2) => {
		return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
	};

	const daysPassed = calcDaysPassed(new Date(), date);
	// console.log(daysPassed);

	if (daysPassed === 0) return "Today";
	if (daysPassed === 1) return "Yesterday";
	if (daysPassed <= 7) return `${daysPassed} days ago`;

	// const day = `${date.getDate()}`.padStart(2, 0);
	// const month = `${date.getMonth() + 1}`.padStart(2, 0);
	// const year = date.getFullYear();
	// return `${month}/${day}/${year}`;
	return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = (value, locale, currency) => {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: currency
	}).format(value);
};

const displayMovements = function (acc, sort = false) {
	containerMovements.innerHTML = "";

	const movs = sort ? [...acc.movements].sort((a, b) => a - b) : acc.movements;

	movs.forEach(function (m, i) {
		const type = m > 0 ? `deposit` : `withdrawal`;

		const date = new Date(acc.movementsDates[i]);
		const displayDate = formatMovementsDate(date, acc.locale);

		const formattedMov = formatCur(m, acc.locale, acc.currency);

		const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
        ${i + 1} ${type}
      </div>
	  <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>`;
		containerMovements.insertAdjacentHTML("afterbegin", html);
	});
};

displayMovements(account1);

const calcDisplayBalance = (acc) => {
	acc.balance = acc.movements.reduce((acc, m) => acc + m, 0);
	labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

// calcDisplayBalance(account1);

const calcDisplaySummary = (acc) => {
	const incomes = acc.movements
		.filter((mov) => mov > 0)
		.reduce((prev, curr) => prev + curr, 0);
	labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

	const out = acc.movements
		.filter((mov) => mov < 0)
		.reduce((prev, curr) => prev + curr, 0);

	labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

	const interest = acc.movements
		.filter((mov) => mov > 0)
		.map((deposit) => (deposit * acc.interestRate) / 100)
		.filter((int) => int >= 1)
		.reduce((prev, curr) => prev + curr, 0);

	labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

calcDisplaySummary(account1);

const createUsernames = (accs) => {
	accs.forEach((acc) => {
		acc.username = acc.owner
			.toLowerCase()
			.split(" ")
			.map((name) => {
				return name[0];
			})
			.join("");

		return acc.username;
	});
};

createUsernames(accounts);

const updateUI = (acc) => {
	displayMovements(acc);
	calcDisplayBalance(acc);
	calcDisplaySummary(acc);
};

const startLogOutTimer = () => {
	const tick = () => {
		const min = String(Math.trunc(time / 60)).padStart(2, 0);
		const sec = String(time % 60).padStart(2, 0);
		// In each call, print the remaining time to UI
		labelTimer.textContent = `${min}:${sec}`;

		// When 0 seconds, stop timer and log out user
		if (time === 0) {
			clearInterval(timer);
			containerApp.style.opacity = 0;
			labelWelcome.textContent = `Log in to get started`;
		}

		// Decrease 1s
		time--;
	};

	// Set time to 5 minutesomos.
	let time = 300;

	// Call the timer every second
	tick();
	const timer = setInterval(tick, 1000);
	return timer;
};

let currentAccount, timer;

// NOTE: FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// const now = new Date();
// const options = {
// 	hour: "numeric",
// 	minute: "numeric",
// 	month: "numeric",
// 	day: "numeric",
// 	year: "numeric"
// };
// // const locale = navigator.language;
// // console.log(currentAccount.locale);
// labelDate.textContent = new Intl.DateTimeFormat(
// 	currentAccount.locale,
// 	options
// ).format(now);

// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hours = `${now.getHours()}`.padStart(2, 0);
// const min = `${now.getMinutes()}`.padStart(2, 0);
// labelDate.textContent = `${month}/${day}/${year}, ${hours}:${min}`;

btnLogin.addEventListener("click", (e) => {
	e.preventDefault();
	// console.log("LOGIN");
	currentAccount = accounts.find(
		(acc) => acc.username === inputLoginUsername.value
	);
	// console.log(currentAccount);
	if (currentAccount?.pin === +inputLoginPin.value) {
		// console.log(currentAccount.pin);
		labelWelcome.textContent = `Welcome back, ${
			currentAccount.owner.split(" ")[0]
		}`;

		containerApp.style.opacity = 100;

		// create current date and time
		const now = new Date();
		const options = {
			hour: "numeric",
			minute: "numeric",
			month: "numeric",
			day: "numeric",
			year: "numeric"
		};
		// const locale = navigator.language;
		// console.log(currentAccount.locale);
		labelDate.textContent = new Intl.DateTimeFormat(
			currentAccount.locale,
			options
		).format(now);
	}

	inputLoginUsername.value = inputLoginPin.value = "";
	inputLoginPin.blur();

	if (timer) clearInterval(timer);
	timer = startLogOutTimer();

	updateUI(currentAccount);
});

btnTransfer.addEventListener("click", (e) => {
	e.preventDefault();
	const amount = +inputTransferAmount.value;
	const receiverAcc = accounts.find(
		(acc) => acc.username === inputTransferTo.value
	);

	inputTransferTo.value = inputTransferAmount.value = "";

	if (
		amount > 0 &&
		receiverAcc &&
		currentAccount.balance >= amount &&
		receiverAcc.username !== currentAccount.username
	) {
		currentAccount.movements.push(-amount);
		receiverAcc.movements.push(amount);
		// Add transfer date
		currentAccount.movementsDates.push(new Date().toISOString());
		receiverAcc.movementsDates.push(new Date().toISOString());

		updateUI(currentAccount);

		// Reset timer
		clearInterval(timer);
		timer = startLogOutTimer();
	}
});

btnLoan.addEventListener("click", (e) => {
	e.preventDefault();

	const amount = Math.floor(inputLoanAmount.value);

	if (
		amount > 0 &&
		currentAccount.movements.some((mov) => mov >= amount * 0.1)
	) {
		setTimeout(() => {
			// Add movement
			currentAccount.movements.push(amount);

			// Add loan date
			currentAccount.movementsDates.push(new Date().toISOString());

			updateUI(currentAccount);

			clearInterval(timer);
			timer = startLogOutTimer();
		}, 2500);
	}
	inputLoanAmount.value = "";
});

btnClose.addEventListener("click", (e) => {
	e.preventDefault();
	// console.log(currentAccount);
	if (
		inputCloseUsername.value === currentAccount.username &&
		+inputClosePin.value === currentAccount.pin
	) {
		const index = accounts.findIndex(
			(acc) => acc.username === currentAccount.username
		);

		accounts.splice(index, 1);

		containerApp.style.opacity = 0;
	}
	inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", (e) => {
	e.preventDefault();
	displayMovements(currentAccount, !sorted);
	sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LABEL: LECTURES

const currencies = new Map([
	["USD", "United States dollar"],
	["EUR", "Euro"],
	["GBP", "Pound sterling"]
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;
const movementsUSD = movements.map((m) => m + euroToUsd);
// console.log(movements);
// console.log(movementsUSD);

const newMovementsUSD = [];
for (const m of movements) {
	newMovementsUSD.push(m + euroToUsd);
}
// console.log(newMovementsUSD);

const movementsDesc = movements.map((m, i) => {
	return `Movement ${i + 1}: You ${m > 0 ? `deposited` : `withdrew`} ${Math.abs(
		m
	)}`;
	// if (m > 0) {
	// 	return `Movement ${i + 1}: You deposited ${m}`;
	// } else {
	// 	return `Movement ${i + 1}: You withdrew ${Math.abs(m)}`;
	// }
});

// console.log(movementsDesc);

const deposits = movements.filter((m) => {
	return m > 0;
});
// console.log(deposits);

const withdrawals = movements.filter((m) => m < 0);
// console.log(withdrawals);

const balance = movements.reduce((acc, cur, i, arr) => {
	// console.log(`Iteration ${i}: ${acc}`);
	return acc + cur;
}, 0);

let balance2 = 0;
for (const m of movements) {
	balance2 += m;
}

// console.log(balance);
// console.log(balance2);

// Maximum value
const max = movements.reduce((acc, m) => {
	if (acc > m) {
		return acc;
	} else {
		return m;
	}
}, movements[0]);
// console.log(max);

const eurToUsd = 1.1;
// console.log(movements);

const totalDepositsUSD = movements
	.filter((mov) => mov > 0)
	.map((mov, i, arr) => mov * eurToUsd)
	.reduce((prev, curr) => prev + curr, 0);

// console.log(totalDepositsUSD);

const firstWithdrawal = movements.find((mov) => mov < 0);

// console.log(movements);
// console.log(firstWithdrawal);
// console.log(accounts);

const account = accounts.find((acc) => acc.owner === "Jessica Davis");
// console.log(account);

// console.log(movements);
// NOTE: SOME method

// EQUALITY
// console.log(movements.includes(-130));

// CONDITION
// console.log(movements.some((mov) => mov === -130));

const anyDeposits = movements.some((mov) => mov > 0);
// console.log(anyDeposits);

// NOTE: EVERY method
// console.log(movements.every((mov) => mov > 0));

// as a callback function for DRY
const deposit = (mov) => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2));

const accountMovements = accounts.map((acc) => acc.movements);
// console.log(accountMovements);
const allMovements = accountMovements.flat();
// console.log(allMovements);
const overallBalance = allMovements.reduce((prev, curr) => prev + curr, 0);
// console.log(overallBalance);

const overallBalance2 = accounts
	.map((acc) => acc.movements)
	.flat()
	.reduce((prev, curr) => prev + curr, 0);
// console.log(`chained map method:`, overallBalance2);

const overallBalance3 = accounts
	.flatMap((acc) => acc.movements)
	.reduce((prev, curr) => prev + curr, 0);
// console.log(`flatMap:`, overallBalance3);

const owners = ["Jonas", "Zach", "Adam", "Martha"];
// console.log(owners.sort());
// console.log(owners);

// ascending
// movements.sort((a, b) => {
// 	if (a < b) return -1;
// 	if (a > b) return 1;
// });
movements.sort((a, b) => a - b);
// console.log(movements);

//descending
// movements.sort((a, b) => {
// 	if (a > b) return -1;
// 	if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
// console.log(movements);

labelBalance.addEventListener("click", () => {
	const movementsUI = Array.from(
		document.querySelectorAll(".movements__value"),
		(el) => +el.textContent.replace("€", "")
	);
	// console.log(movementsUI);
	[...document.querySelectorAll(".movements__row")].forEach((row, i) => {
		i % 2 === 0 ? (row.style.backgroundColor = "orangered") : null;
		i % 3 === 0 ? (row.style.backgroundColor = "blue") : null;
	});
});

// Array Methods Practice

const bankDepositSum = accounts
	.flatMap((acc) => acc.movements)
	.filter((mov) => mov > 0)
	.reduce((prev, curr) => prev + curr, 0);

// console.log(bankDepositSum);

// const numDeposits1000 = accounts
// 	.flatMap((acc) => acc.movements)
// 	.filter((mov) => mov >= 1000).length;

const numDeposits1000 = accounts
	.flatMap((acc) => acc.movements)
	.reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);

// console.log(numDeposits1000);

/////////////////////////////////////////////////
// LABEL: CODING CHALLENGES
// LABEL: CODING CHALLENGE 1

// puppy < 3 and adult >= 3
// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];
// const dogsJulia = [9, 16, 6, 8, 3];
// const dogsKate = [10, 5, 6, 1, 4];

// const checkDogs = (dogsJulia, dogsKate) => {
// 	const newDogsJ = dogsJulia.slice(1, -2);
// 	const totalDogs = newDogsJ.concat(dogsKate);
// 	totalDogs.forEach(function (age, i) {
// 		console.log(
// 			`Dog number ${i + 1} is ${
// 				age >= 3 ? `an adult, and is ${age} years old` : `still a puppy 🐶`
// 			}`
// 		);
// 	});
// };

// checkDogs(dogsJulia, dogsKate);

// LABEL: CODING CHALLENGE 2
// const ages1 = [5, 2, 4, 1, 15, 8, 3];
// const ages2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = (ages) => {
// 	const humanAges = ages.map((dogAge) => {
// 		let humanAge;
// 		if (dogAge <= 2) {
// 			humanAge = 2 * dogAge;
// 		} else {
// 			humanAge = 16 + dogAge * 4;
// 		}
// 		return humanAge;
// 		});

// 		const adults = humanAges.filter((age) => age >= 18);
// 		const avgAge =
// 			adults.reduce((prev, current) => prev + current) / adults.length;
// 		return avgAge;
// };

// console.log(calcAverageHumanAge(ages1));
// console.log(calcAverageHumanAge(ages2));

// LABEL: CODING CHALLENGE 3
const ages1 = [5, 2, 4, 1, 15, 8, 3];
const ages2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = (ages) => {
	return ages
		.map((dogAge) => {
			return dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4;
		})
		.filter((age) => age >= 18)
		.reduce((prev, current, i, arr) => prev + current / arr.length, 0);
};

// console.log(calcAverageHumanAge(ages1));
// console.log(calcAverageHumanAge(ages2));

// LABEL: CODING CHALLENGE 4
const dogs = [
	{ weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
	{ weight: 8, curFood: 200, owners: ["Matilda"] },
	{ weight: 13, curFood: 275, owners: ["Sarah", "John"] },
	{ weight: 32, curFood: 340, owners: ["Michael"] }
];

let ownersEatTooMuch = [];
let ownersEatTooLittle = [];

// (1), (3)
for (const i in dogs) {
	// console.log(dogs[i]);
	const { weight, curFood, owners } = dogs[i];
	// console.log(weight, curFood, owners);
	dogs[i].recommendedFood = Math.round(weight ** 0.75 * 28);
	dogs[i].curFood > dogs[i].recommendedFood
		? ownersEatTooMuch.push(dogs[i].owners)
		: ownersEatTooLittle.push(dogs[i].owners);
	// dogs[i].curFood === dogs[i].recommendedFood
	// 	? console.log(true)
	// 	: console.log(false);

	// okayAmt === true ? console.log(true) : console.log(false);
}

// (2)
const sarahsDog = dogs.filter((dog) => dog.owners.includes("Sarah"));
// console.log(
// 	`Sarah's dog is eating too ${
// 		sarahsDog.curFood > sarahsDog.recommendedFood ? `much` : `little`
// 	}! Oh no's! 😵`
// );
// console.log(sarahsDog);

// (4)
const arr1 = ownersEatTooLittle.flat();
const arr2 = ownersEatTooMuch.flat();

// console.log(`${arr1.join(" and ")}'s dogs eat too much!`);
// console.log(`${arr2.join(" and ")}'s dogs eat too little!`);

// (5)
// console.log(dogs.some((dog) => dog.curFood === dog.recommendedFood));

// (6), (7)
let okayDogs = [];

dogs.some((dog) => {
	const okayAmt =
		dog.curFood > dog.recommendedFood * 0.9 &&
		dog.curFood < dog.recommendedFood * 1.1;
	// console.log(okayAmt);
	if (okayAmt) okayDogs.push(dog);
});

// console.log(okayDogs);

// (8)
// console.log(
// 	[...dogs].sort((dog1, dog2) => {
// 		return dog1.recommendedFood < dog2.recommendedFood ? -1 : 1;
// 	})
// );
