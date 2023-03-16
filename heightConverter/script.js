let inputFeet = document.getElementById("inputFeet");
let inputInch = document.getElementById("inputInch");
let feetM = 0.3048;
let inchM = 0.0254;
let output = document.getElementById("output");


function convertToMeters() {
  let sum = inputFeet.value * feetM + inputInch.value * inchM;
  let rounded = sum.toFixed(3);
  output.innerHTML = `${rounded} m`;
  // console.log(`Feet: ${inputFeet.value} Inch: ${inputInch.value}`);
}

let inputMeters = document.getElementById("inputMeters");
let meterFt = 3.2808;
let meterIn = 39.37;
let outputF = document.getElementById("outputF");
let outputI = document.getElementById("outputI");

function convertToFeetInches() {
  let length = 100 * inputMeters.value / 2.54;
  lr = length.toFixed(6);
  sumFt = Math.floor(lr / 12);
  sumIn = Math.floor(lr) - Math.floor(12 * sumFt);
  outputF.innerHTML = `${sumFt} feet ${sumIn} inches`;
  // outputI.innerHTML = `${sumIn} `;
}