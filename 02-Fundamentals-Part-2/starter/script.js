'use strict';

// FUNCTIONS
function describeCountry(country, population, capitalCity) {
    return `${country} has ${population} million people and its capital city is ${capitalCity}.`
}

const usa = describeCountry("United States", 331, "Washington, D.C.")
console.log(usa)

const korea = describeCountry("South Korea", 51, "Seoul")
console.log(korea)

const japan = describeCountry("Japan", 126, "Tokyo")
console.log(japan)

// FUNCTION DECLARATIONS VS EXPRESSIONS
function percentageOfWorld1(population) {
    return (population / 7900) * 100;
}

const usaPercentage1 = percentageOfWorld1(331);
console.log(usaPercentage1);

const koreaPercentage1 = percentageOfWorld1(51);
console.log(koreaPercentage1);

const japanPercentage1 = percentageOfWorld1(126);
console.log(japanPercentage1);

const percentageOfWorld2 = function (population) {
    return (population / 7900) * 100;
}
console.log(percentageOfWorld2(331))
console.log(percentageOfWorld2(51))
console.log(percentageOfWorld2(126))

// ARROW FUNCTIONS
const percentageOfWorld3 = population => (population / 7900) * 100;
console.log(percentageOfWorld3(331))
console.log(percentageOfWorld3(51))
console.log(percentageOfWorld3(126))

// FUNCTIONS CALLING OTHER FUNCTIONS
function describePopulation(country, population) {
    const percentage = Math.round(percentageOfWorld1(population))
    const statement = `${country} has ${population} million people, which is about ${percentage}% of the world.`
    console.log(statement);
}

describePopulation("USA", 331)
describePopulation("South Korea", 51)
describePopulation("Japan", 126)

// BASIC ARRAY OPERATIONS (METHODS)
const neighbors = ["Mexico", "Canada"];
neighbors.push("Utopia");
neighbors.pop();

if (!neighbors.includes("Germany")) {
    console.log("Probably not a central European country 😄")
}

// neighbors[1] = "France"
neighbors[neighbors.indexOf("Canada")] = "France"
console.log(neighbors)

// INTRODUCTION TO OBJECTS
const myCountry = {
    country: "United States of America",
    capital: "Washington, D.C.",
    language: "English",
    population: 331,
    neighbors: ["Canada", "Mexico"],
    describe: function () {
        console.log(`${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbors.length} and a capital called ${this.capital}.`)
    },
    checkIsland: function () {
        // this.neighbors.length === 0 ? this.isIsland = true : this.isIsland = false
        this.isIsland = this.neighbors.length === 0 ? true : false
    }
}

console.log(myCountry)

// DOT VS BRACKET NOTATION
// Mini Challenge
// Jonas has 3 friends, and his best friend is called Michael.
// Jonas is a 46-year old teacher, and he has a/no driver's license.

const jonas = {
    firstName: "Jonas",
    lastName: "Schmedtmann",
    age: 2037 - 1991,
    job: "teacher",
    friends: ["Michael", "Peter", "Steven"],
    hasDriversLicense: true,
    getSummary: function () {
        // if (this.hasDriversLicense === true) {
        //     return `${this.firstName} is a ${this.age}-year old ${this.job}, and he has a driver's license.`
        // } else {
        //     return `${this.firstName} is a ${this.age}-year old ${this.job}, and he has no driver's license.`
        // }
        return `${this.firstName} is a ${this.age}-year old ${this.job}, and he has ${this.hasDriversLicense ? "a" : "no"} driver's`
    }
}

console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`)

// Assignment
console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbors.length} neighboring countries and a capital called ${myCountry.capital}.`)

myCountry.population += 2
console.log(myCountry.population)

myCountry["population"] -= 2
console.log(myCountry.population)

// OBJECT METHODS
// Mini Challenge
console.log(jonas.getSummary())

// Assignment
myCountry.describe()
myCountry.checkIsland()
console.log(myCountry.isIsland)

// ITERATION: THE FOR LOOP
for (let i = 1; i <= 50; i++) {
    console.log(`Voter number ${i} is currently voting.`)
}

// LOOPING ARRAYS, BREAKING AND CONTINUING
const populations = [331, 51, 126, 127]
const percentages2 = []

for (let i = 0; i < populations.length; i++) {
    percentages2.push(percentageOfWorld1(populations[i]))
}

console.log(percentages2)

// LOOPING BACKWARDS AND LOOPS IN LOOPS
const listOfNeighbors = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']]

for (let i = 0; i < listOfNeighbors.length; i++) {
    for (let j = 0; j < listOfNeighbors[i].length; j++) {
        console.log(`Neighbor: ${listOfNeighbors[i][j]}`)
    }
}

// THE WHILE LOOP
const percentages3 = []

let i = 0
while (i < populations.length) {
    percentages3.push(percentageOfWorld1(populations[i]))
    i++
}
console.log(percentages3)
