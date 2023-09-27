"use strict";

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  /* NEVER do this!
  this.calcAge = function () {
    console.log(2037 - this.birthYear);
  }; */
};

const jonas = new Person("Jonas", 1991);
console.log(jonas); // Person {firstName: 'Jonas', birthYear: 1991}
// The new operator
/*
    1. new () new empty object is created
    2. function is called, this keyword points to the new objected created
    3. object is linked to prototype
    4. function automatically returns object from the beginning

    1. An empty object is created
    2. this keyword in constructor function call is set to the new object
    3. The new object is linked (__proto__property) to the constructor function's prototype property
    4. The new object is returned from the constructor function call
 */

const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);
console.log(matilda);
console.log(jack);

console.log(jonas instanceof Person); // true

// Prototypes
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
jonas.calcAge();
matilda.calcAge();
jack.calcAge();

// prototype is prototype of the linked objects and not of the original constructor function
// in this case prototype is prototype of the linked objects jonas, matilda, and jack, NOT of Person
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

Person.prototype.species = "Homo Sapiens";
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty("firstName")); // true
console.log(jonas.hasOwnProperty("species")); // false

/*
Prototype Chain - Series of links between objects, linked through prototypes
Constructor function -->     Prototype
    [Object()]           [Object.prototype]
                            __proto__: null
                                ^
                                |
                                |
                             Prototype
Constructor function --> [Person.prototype]
    [Person()]                __proto__ :
                          Object.prototype
                                ^
                                |
                                |
                             Object
                            [jonas]
                           __proto__:
                          Person.prototype

*/

// Creating your own array methods. NOTE: Try to avoid doing this because the next javascript update may have the same name as the array method you created and also when working with others because there may be multiple methods with different names that do the same thing
const arr = [2, 5, 4, 4, 3, 1, 3];
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector;

// Coding Challenge

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);
console.log(bmw, mercedes);

Car.prototype.accelerate = function () {
  console.log((this.speed += 10));
};
bmw.accelerate();
mercedes.accelerate();

Car.prototype.brake = function () {
  console.log((this.speed -= 5));
};
bmw.brake();
mercedes.brake();
mercedes.brake();

// Classes
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Methods will be added to the .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}
const jessica = new PersonCl("Jessica", 1996);
console.log(jessica);
jessica.calcAge();

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens which means we can pass them into functions and return them from functions
// 3. Classes are executed in strict mode

const account = {
  owner: "Jonas",
  movements: [200, 530, 120, 300],

  get latest() {
    // using get means you don't need to call it, it becomes an object property
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest); // 300

account.latest = 50;
console.log(account.movements); // [200, 530, 120, 300, 50]

//
class PersonCl2 {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // set a property that already exists
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else console.log(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // static method
  static hey() {
    console.log("Hey there");
  }
}
const jessica2 = new PersonCl2("Jessica Davis", 1996);
console.log(jessica2.fullName);

const walter = new PersonCl2("Walter", 1965); // Walter is not a full name!

// Static Methods

PersonCl2.hey();

// Object.create - use this to manually set the prototype of an object to any other object that we want
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firtName, birthYear) {
    this.firstName = firtName;
    this.birthYear = birthYear;
  },
};
const steven = Object.create(PersonProto);

steven.name = "Steven";
steven.birthYear = 2002;
steven.calcAge();

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1979);
sarah.calcAge();

console.log("---Break---");
// Coding Challenge
class Car2 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
const ford = new Car2("Ford", 120);

console.log(ford.speed); // 120
console.log(ford.speedUS); // 75
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speedUS = 50;
console.log(ford); // 80

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear); // use the call operator to be able to use the Person constructor function
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
console.log(mike);
mike.introduce();
mike.calcAge();
