// VALUES & VARIABLES
const country = "United States";
const continent = "North America";
let population = 328.2;

console.log(country);
console.log(continent);
console.log(population);

// DATA TYPES
const isIsland = false;
let language;

console.log(typeof isIsland)
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

// LET, CONST, & VAR
language = "English";

// BASIC OPERATORS
console.log(population / 2);
console.log(population++);
const finlandPop = 6;
console.log(population > finlandPop);
const avgPop = 33;
console.log(population < avgPop);
const description = `${country} is in ${continent}, and its ${population} million people speak ${language}.`
console.log(description)

// IF/ELSE STATEMENTS
if (population > 33) {
    console.log(`${country}'s population is above average.`)
} else {
    console.log(`${country}'s population is ${33 - population} million below average.`)
}

// TYPE COERCION & CONVERSION
console.log('9' - '5') //4
console.log('19' - '13' + '17') //617
console.log('19' - '13' + 17) //23
console.log('123' < 57) //false
console.log(5 + 6 + '4' + 9 - 4 - 2) //1143

// EQUALITY OPERATORS
// const numNeighbors = Number(prompt("How many neighbor countries does your country have?"))

// if (numNeighbors === 1) {
//     console.log("Only 1 border!")
// } else if (numNeighbors > 1) {
//     console.log("More than 1 border")
// } else {
//     console.log("No borders")
// }

// LOGICAL OPERATORS
if (language == "English" && population < 50 && !isIsland) {
    console.log(`You should live in ${country} :)`)
} else {
    console.log(`${country} does not meet your criteria :(`)
}

// SWITCH STATEMENTS
// mini exercise:
// const day = "Sunday"

// if (day === "Monday") {
//     console.log("Plan course structure")
//     console.log("Go to coding meetup")
// } else if (day === "Tuesday") {
//     console.log("Prepare theory videos")
// } else if (day === "Wednesday" || day === "Thursday") {
//     console.log("Write code examples")
// } else if (day === "Friday") {
//     console.log("Record videos")
// } else if (day === "Saturday" || day === "Sunday") {
//     console.log("Enjoy the weekend 😄")
// } else {
//     console.log("Not a valid day! ❌")
// }

switch (language) {
    case "Chinese":
    case "Mandarin":
        console.log("MOST number of native speakers!");
        break;
    case "Spanish":
        console.log("2nd place in number of native speakers");
        break;
    case "English":
        console.log("3rd place");
        break;
    case "Hindi":
        console.log("Number 4");
        break;
    case "Arabic":
        console.log("5th most spoken language");
        break;
    default:
        console.log("Great language too 😃");
}


