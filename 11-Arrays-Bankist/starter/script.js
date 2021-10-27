"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LABEL: BANKIST APP

// Data
const account1 = {
	owner: "Jonas Schmedtmann",
	movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
	interestRate: 1.2, // %
	pin: 1111
};

const account2 = {
	owner: "Jessica Davis",
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222
};

const account3 = {
	owner: "Steven Thomas Williams",
	movements: [200, -200, 340, -300, -20, 50, 400, -460],
	interestRate: 0.7,
	pin: 3333
};

const account4 = {
	owner: "Sarah Smith",
	movements: [430, 1000, 700, 50, 90],
	interestRate: 1,
	pin: 4444
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements) {
	movements.forEach(function (m, i) {
		// containerMovements.innerHTML = "";

		const type = m > 0 ? `deposit` : `withdrawal`;

		const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
        ${i + 1} ${type}
      </div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${m}</div>
    </div>`;
		containerMovements.insertAdjacentHTML("afterbegin", html);
	});
};

displayMovements(account1.movements);

const calcDisplayBalance = (movements) => {
	const balance = movements.reduce((acc, m) => acc + m, 0);
	labelBalance.textContent = `${balance}€`;
};

calcDisplayBalance(account1.movements);

const calcDisplaySummary = (movements) => {
	const incomes = movements
		.filter((mov) => mov > 0)
		.reduce((prev, curr) => prev + curr, 0);
	labelSumIn.textContent = `${incomes}€`;

	const out = movements
		.filter((mov) => mov < 0)
		.reduce((prev, curr) => prev + curr, 0);

	labelSumOut.textContent = `${Math.abs(out)}€`;

	const interest = movements
		.filter((mov) => mov > 0)
		.map((deposit) => deposit * 0.012)
		.filter((int) => int >= 1)
		.reduce((prev, curr) => prev + curr, 0);

	labelSumInterest.textContent = `${interest}€`;
};

calcDisplaySummary(account1.movements);

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

const user = `Steven Thomas Williams`; //stw
createUsernames(accounts);
// console.log(accounts);

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

console.log(calcAverageHumanAge(ages1));
console.log(calcAverageHumanAge(ages2));
