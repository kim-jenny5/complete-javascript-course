"use strict";

// LABEL: LECTURES
const Person = function (firstName, birthYear) {
	this.firstName = firstName;
	this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
	console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
	Person.call(this, firstName, birthYear);
	this.course = course;
};

console.log(`Person prototype: `, Person.prototype);
console.log(`Student prototype: `, Student.prototype);
console.log(Object.create(Person.prototype));
Student.prototype = Object.create(Person.prototype);
console.log(Student.prototype);

Student.prototype.introduce = function () {
	console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jenny = new Student("Jenny", 1998, "Business");
jenny.introduce();

// The following 2 lines' output are the same. A 'proto' of an object instance is the Object's 'prototype'.
console.log(`Student.prototype:`, Student.prototype);
console.log(`jenny.__proto__`, jenny.__proto__);
console.log(Student.prototype === jenny.__proto__); // TRUE

// The following 2 lines' output are the same. An instance of an object's 'proto''s 'proto' is the parent Object's 'prototype'.
console.log(`jenny.__proto__.__proto__`, jenny.__proto__.__proto__);
console.log(`Person.prototype`, Person.prototype);
console.log(jenny.__proto__.__proto__ === Person.prototype); // TRUE

console.log(jenny instanceof Student); // TRUE
console.log(jenny instanceof Person); // TRUE
console.log(jenny instanceof Object); // TRUE

// LABEL: CODING CHALLENGES
// LABEL: Coding Challenge #1
// class Car {
// 	constructor(make, speed) {
// 		this.make = make;
// 		this.speed = speed;
// 	}

// 	accelerate() {
// 		const newSpeed = (this.speed += 10);
// 		console.log(
// 			`${this.make} has accelerated and its speed is now ${newSpeed}km/h.`
// 		);
// 	}

// 	brake() {
// 		const newSpeed = (this.speed -= 5);
// 		console.log(
// 			`${this.make} has braked and its speed is now ${newSpeed}km/h.`
// 		);
// 	}
// }

// const car1 = new Car("BMW", 120);
// const car2 = new Car("Mercedes", 95);

// car1.accelerate();
// car2.accelerate();

// car1.brake();
// car2.brake();

//LABEL: Coding Challenge #2
// class Car {
// 	constructor(make, speed) {
// 		this.make = make;
// 		this.speed = speed;
// 	}

// 	accelerate() {
// 		const newSpeed = (this.speed += 10);
// 		console.log(
// 			`${this.make} has accelerated and its speed is now ${newSpeed}km/h.`
// 		);
// 	}

// 	brake() {
// 		const newSpeed = (this.speed -= 5);
// 		console.log(
// 			`${this.make} has braked and its speed is now ${newSpeed}km/h.`
// 		);
// 	}

// 	get speedUS() {
// 		return this.speed / 1.6;
// 	}

// 	set speedUS(speed) {
// 		this.speed = speed * 1.6;
// 	}
// }

// const car1 = new Car("Ford", 120);
// console.log(car1.speedUS);
// const blank = () => {
// 	car1.speedUS = 120;
// 	console.log(car1.speed);
// };
// blank();

// LABEL: Coding Challenge #3
// const Car = function (make, speed) {
// 	this.make = make;
// 	this.speed = speed;
// };

// Car.prototype.accelerate = function () {
// 	this.speed += 10;
// 	console.log(`Acceleration: ${this.make} is going at ${this.speed}km/h.`);
// };

// Car.prototype.brake = function () {
// 	this.speed -= 5;
// 	console.log(`Braking: ${this.make} is going at ${this.speed}km/h.`);
// };

// const EV = function (make, speed, charge) {
// 	Car.call(this, make, speed);
// 	this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype);
// console.log(EV.prototype);
// console.log(EV.prototype.__proto__);
// console.log(Car.prototype);

// const hyundai = new Car("Hyundai", 40, "n/a");
// const tesla = new EV("Tesla", 120, 23);

// EV.prototype.chargeBattery = function (chargeTo) {
// 	this.charge = chargeTo;
// 	console.log(`${this.make} has been charged to ${chargeTo}%.`);
// };

// EV.prototype.accelerate = function () {
// 	this.speed += 20;
// 	this.charge -= 1;
// 	console.log(
// 		`${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%.`
// 	);
// };

// console.log(hyundai);
// console.log(tesla);

// tesla.chargeBattery(50);
// tesla.accelerate();
// tesla.brake();
// hyundai.accelerate();
// hyundai.brake();

// console.log(hyundai);
// console.log(tesla);

// LABEL: Coding Challenge #4
class Car {
	constructor(make, speed) {
		this.make = make;
		this.speed = speed;
	}

	accelerate() {
		const newSpeed = (this.speed += 10);
		console.log(
			`${this.make} has accelerated and its speed is now ${newSpeed}km/h.`
		);
		return this;
	}

	brake() {
		const newSpeed = (this.speed -= 5);
		console.log(
			`${this.make} has braked and its speed is now ${newSpeed}km/h.`
		);
		return this;
	}

	get speedUS() {
		return this.speed / 1.6;
	}

	set speedUS(speed) {
		this.speed = speed * 1.6;
	}
}

class EV extends Car {
	#charge;

	constructor(make, speed, charge) {
		super(make, speed);
		this.#charge = charge;
	}

	chargeBatteryTo(chargeTo) {
		this.#charge = chargeTo;
		return this;
	}
}

const rivian = new EV("Rivian", 120, 23);
console.log(rivian.accelerate().brake().chargeBatteryTo(40));
