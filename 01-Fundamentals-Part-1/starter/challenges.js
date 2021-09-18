// CHALLENGE 1
// BMI = mass / height ** 2 = mass / (height * height)

const wMark1 = 78
const hMark1 = 1.69
const wJohn1 = 92
const hJohn1 = 1.95

const wMark2 = 95
const hMark2 = 1.88
const wJohn2 = 85
const hJohn2 = 1.76

// const markBMI2 = wMark1 / hMark1 ** 2
const markBMI1 = Math.round((wMark1 / hMark1 ** 2) * 10) / 10 // 27.3
// const johnBMI1 = wJohn1 / hJohn1 ** 2
const johnBMI1 = Math.round((wJohn1 / hJohn1 ** 2) * 10) / 10 // 24.2
console.log(markBMI1, johnBMI1)

// const markBMI2 = wMark2 / hMark2 ** 2
const markBMI2 = Math.round((wMark2 / hMark2 ** 2) * 10) / 10 // 26.9
// const johnBMI2 = wJohn2 / hJohn2 ** 2
const johnBMI2 = Math.round((wJohn2 / hJohn2 ** 2) * 10) / 10 // 27.4
console.log(markBMI2, johnBMI2)

const markHigherBMI1 = markBMI1 > johnBMI1 // true
const markHigherBMI2 = markBMI2 > johnBMI2 // false
console.log(markHigherBMI1)
console.log(markHigherBMI2)


// CHALLENGE 2
if (markHigherBMI1) {
    console.log(`Mark's BMI (${markBMI1}) is higher than John's (${johnBMI1})!`)
} else {
    console.log(`John's BMI (${johnBMI1}) is higher than Mark's (${markBMI1})!`)
}

if (markHigherBMI2) {
    console.log(`Mark's BMI (${markBMI1}) is higher than John's (${johnBMI1})!`)
} else {
    console.log(`John's BMI (${johnBMI1}) is higher than Mark's (${markBMI1})!`)
}

// CHALLENGE 3
const dolphins = [96, 108, 89]
// const dolphins = [96, 108, 110]
// const koalas = [96, 108, 110]
const koalas = [88, 91, 110]

let dolphinsSum = 0
let koalasSum = 0

for (score of dolphins) {
    dolphinsSum += score
}
const dolphinsAvgScore = Math.round(dolphinsSum / 3)

for (score of koalas) {
    koalasSum += score
}
const koalasAvgScore = Math.round(koalasSum / 3)

// if (dolphinsAvgScore > koalasAvgScore) {
//     console.log(`Dolphins win with an average score of ${dolphinsAvgScore}!`)
// } else if (dolphinsAvgScore < koalasAvgScore) {
//     console.log(`Koalas win with an average score of ${koalasAvgScore}!`)
// } else {
//     console.log(`Dolphins and Koalas tie with an average score of ${koalasAvgScore}!`)
// }

if (dolphinsAvgScore >= 100 && koalasAvgScore >= 100 && dolphinsAvgScore === koalasAvgScore) {
    console.log(`Dolphins and Koalas tie with an average score of ${koalasAvgScore}!`)
} else if (dolphinsAvgScore >= 100 || koalasAvgScore >= 100 && dolphinsAvgScore > koalasAvgScore) {
    console.log(`Dolphins win with an average score of ${dolphinsAvgScore}!`)
} else if (dolphinsAvgScore >= 100 || koalasAvgScore >= 100 && dolphinsAvgScore < koalasAvgScore) {
    console.log(`Koalas win with an average score of ${koalasAvgScore}!`)
} else {
    console.log(`Neither team has won. ☹️ Neither team scored at least 100 points.`)
}

// CHALLENGE 4
const bill = 430
const tip = 50 <= bill && bill <= 300 ? bill * 0.15 : bill * 0.2

console.log(`The bill was $${bill}, the tip was $${tip}, and the total value was $${bill + tip}.`)
