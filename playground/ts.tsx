// TS Types
// let dontDo: any;
// let name: string;
// let age: number | string;
// let isStudent: boolean;
// let hobbies: string[];
// let role: [number, string];

// takes any type
let personName: unknown

// Define an object in TS
type X = {
  a: string
  b: number
}

// type Y = X & {
//   c: string
//   d: number
// }

// When connecting 2 types you have to provide all a,b,c,d
// let artist:Y = {
//     c: 'Cornell',
//     d: 42,
//     a: 'Mouse',
//     b: 42
// }

// Extends Interface between 2
interface Song extends X {
  name: string;
  age?: number;
}

// type Person = {
//   name: string;
//   age?: number; // Optional
// }

interface Person {
  name: string
  age?: number
}

// let person: Person = {
//   name: 'Cornell',
//   age: 22,
// }

// Array
//let lotsOfPeople:Person[];

// Define a Function
// never returns nothing
// void returns undefined
let printName: (name: string) => never

// function printName1(name: string) {
//   console.log(name)
// }

// printName1('Cornell')
