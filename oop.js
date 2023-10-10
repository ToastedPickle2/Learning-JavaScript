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
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
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

// Linking prototypes
Student.prototype = Object.create(Person.prototype); // This allows the Student constructor to access all of the methods created for the Person constructor. IMPORTANT - this must come before any methods that are made for the Student constructor

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
console.log(mike);
mike.introduce();
mike.calcAge();

Student.prototype.constructor = Student; // This is to set the constructor of Student.prototype back to Student since after doing this Student.prototype = Object.create(Person.prototype); the constructor was changed to Person
console.dir(Student.prototype.constructor);
console.log(mike.__proto__.__proto__);

// Coding Challenge
// - second version
// class Ev extends Car2 {
//   constructor(make, speed, charge) {
//     super(make, speed);
//     this.charge = charge;
//   }

//   chargeBattery(chargeTo) {
//     chargeTo = this.charge;
//     return console.log(this.charge);
//   }

//   accelerate() {
//     this.speed += 20;
//     this.charge -= 0.01;
//     return console.log(
//       `${this.make} going at ${this.speed} km/h, with a charge of ${
//         this.charge * 100
//       }%`
//     );
//   }
// }
// console.log(tesla.speed);
// console.log(tesla.charge);
// tesla.accelerate();
// tesla.chargeBattery();
// tesla.brake();
// tesla.brake();
// tesla.accelerate();

const Ev = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
Ev.prototype = Object.create(Car2.prototype);

Ev.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

Ev.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  return console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new Ev("Tesla", 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.accelerate();

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
}

const alex = new StudentCl("Alex Ochoa", 1999, "CS");
console.log(alex.course);
alex.introduce();
alex.calcAge();

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.fullName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init("Jay", 2010, "Computer Science");
console.log(jay);
jay.introduce();
jay.calcAge(); // Important - jay has access to the StudentProto methods and the StudentProto has access to the PersonProto methods which is where this calcAge method comes from

// 1. Public Fields
// 2. Private Fields
// 3. Public Methods
// 4. Private Methods

class Account {
  // 1. Public fields (instances)
  locale = navigator.language;

  // 2. Private Fields (instances) - using #
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protected property - use underscore infront of any information or methods that are protected
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3. Public Methods

  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this; // for chaining
  }

  withdraw(val) {
    this.deposit(-val);
    return this; // for chaining
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this; // for chaining
    } else {
      console.log("Loan denied");
    }
  }

  static helper() {
    // Static methods cannot be used by instances, only by the class itself
    console.log("Helper");
  }

  // 4. Private Methods
  #approveLoan(val) {
    // use underscore infront of any information or methods that are protected
    return true;
  }
}
const acc1 = new Account("Jonas", "EUR", 1111);
console.log(acc1);

acc1.deposit(250);
acc1.withdraw(150);
acc1.requestLoan(1000);
// acc1.#approveLoan(1000);
console.log(acc1.getMovements());

console.log(acc1);
// console.log(acc1.#pin);  Uncaught SyntaxError: Private field '#pin' must be declared in an enclosing class (at oop.js:411:17)
// console.log(acc1.#movements); Uncaught SyntaxError: Private field '#movements' must be declared in an enclosing class (at oop.js:411:17)

Account.helper();

// Chaining - for this to work, you need to return this; to each method that you're chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(20000).withdraw(4000);
console.log(acc1);

// Coding Challenge
class EVCl extends Car2 {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed, charge);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}
const rivian = new EVCl("Rivian", 120, 23);
console.log(rivian);
rivian.accelerate().brake().accelerate().chargeBattery(50).accelerate();
console.log(rivian.charge);
