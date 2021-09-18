"use strict";

const arr = [17, 21, 23];
const arr2 = [12, 5, -5, 0, 4];

function printForecast(arr) {
  const dots = `...`;
  let pushArr = [];
  for (let i = 0; i < arr.length; i++) {
    pushArr.push(`${arr[i]}°C in ${i + 1} ${i > 0 ? "days" : "day"}`);
  }
  console.log(`${dots} ` + pushArr.join(` ${dots} `) + ` ${dots}`);
}

printForecast(arr);
printForecast(arr2);
