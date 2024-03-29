const angle = 830;
const divisionResult = angle / 90;

let n_even = Math.floor(divisionResult); // should return an even number
let n_odd = Math.ceil(divisionResult); // should return an odd number

// Adjust n_even if it's odd
if (n_even % 2 !== 0) {
    n_even++;
}

// Adjust n_odd if it's even
if (n_odd % 2 === 0) {
    n_odd--;
}

console.log("n_even:", n_even);
console.log("n_odd:", n_odd);
