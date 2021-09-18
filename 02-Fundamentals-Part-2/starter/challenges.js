'use strict';

/* 🤍  PREVIOUS CHALLENGES 🤍 
// Challenge 1
const calcAverage = (a, b, c) => (a + b + c) / 3
// const dolphins = calcAverage(44, 23, 71)
// const koalas = calcAverage(65, 54, 49)
const dolphins = calcAverage(85, 54, 41)
const koalas = calcAverage(23, 34, 27)
console.log(dolphins)
console.log(koalas)

function checkWinner(avgDolphins, avgKoalas) {
    if (avgDolphins >= avgKoalas * 2) {
        return `Dolphins win (${avgDolphins} vs. ${avgKoalas})!`
    } else if (avgKoalas >= avgDolphins * 2) {
        return `Koalas win (${avgKoalas} vs. ${avgDolphins})!`
    } else {
        return `Aw... Nobody wins 😢`
    }
}
*/

// Challenge 2
function calcTip(bill) {
    if (50 <= bill && bill <= 300) {
        return bill * 0.15
    } else {
        return bill * 0.2
    }
}

/* 🤍  PREVIOUS CHALLENGES 🤍 
console.log(calcTip(100))

const bills = [125, 55, 44]

const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])]
console.log(tips)

const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]]
console.log(total)

// Challenge 3
const mark = {
    // fullName: "Mark Miller",
    firstName: "Mark",
    lastName: "Miller",
    mass: 78,
    height: 1.69,
    calcBMI: function () {
        this.bmi = ((this.mass / (this.height ** 2))).toFixed(2);
        return this.bmi;
    }
};

const john = {
    // fullName: "John Smith",
    firstName: "John",
    lastName: "Smith",
    mass: 92,
    height: 1.95,
    calcBMI: function () {
        this.bmi = ((this.mass / (this.height ** 2))).toFixed(2);
        return this.bmi;
    }
};

mark.calcBMI();
john.calcBMI();

console.log(mark.bmi)
console.log(john.bmi)

if (mark.bmi > john.bmi) {
    console.log(`${mark.firstName}'s BMI (${mark.bmi}) is higher than ${john.firstName}'s BMI (${john.bmi})!`)
} else {
    console.log(`${john.firstName}'s BMI (${john.bmi}) is higher than ${mark.firstName}'s BMI (${mark.bmi})!`)
}
*/

// Challenge 4
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52]
const tips = []
const totals = []

for (let i = 0; i < bills.length; i++) {
    tips.push(calcTip(bills[i]))
    totals.push(bills[i] + tips[i])
}

console.log(tips)
console.log(totals)

function calcAverage(arr) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum / arr.length
}

console.log(calcAverage(totals))
