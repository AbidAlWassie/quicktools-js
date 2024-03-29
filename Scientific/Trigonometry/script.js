// File name: script.js

function applyFormula(expression) {
  const match = expression.match(/([a-z]+)\((\d+)\)/i);
  if (match) {
      const func = match[1].toLowerCase();
      const value = parseInt(match[2]);
      const n = Math.floor(value / 90); // Extract n from the input
      const angle = value % 90; // Extract angle from the input

      // Apply formula for the first time
      const firstOutput = (n % 2 === 0) ? Math.cos(angle) : Math.sin(angle);

      // Apply formula for the second time
      const secondN = (n % 2 === 0) ? n - 1 : n + 1;
      const secondAngle = (n % 2 === 0) ? -angle : angle;
      const secondOutput = (secondN % 2 === 0) ? Math.cos(secondAngle) : Math.sin(secondAngle);

      return {
          firstOutput,
          secondOutput
      };
  } else {
      return null; // Invalid input format
  }
}

// Example usage
const input = "cos(1030)"; // You can change this input
const result = applyFormula(input);

if (result) {
  console.log("First Output:", result.firstOutput);
  console.log("Second Output:", result.secondOutput);
} else {
  console.log("Invalid input format.");
}


function calculatePeriodicity() {
  const functionSelect = document.getElementById('functionSelectPeriodicity');
  const selectedFunction = functionSelect.value;
  const amplitude = parseFloat(document.getElementById('amplitude').value);
  const frequency = parseFloat(document.getElementById('frequency').value);
  const phaseShift = parseFloat(document.getElementById('phaseShift').value);

  if (!selectedFunction || isNaN(amplitude) || isNaN(frequency) || isNaN(phaseShift)) {
    logError('Please fill in all the parameters.');
    return;
  }

  let periodicity;

  switch (selectedFunction) {
    case 'sine':
    case 'cosine':
      // Period for sine and cosine functions is 2π / frequency
      periodicity = 2 * Math.PI / frequency;
      break;
    case 'tangent':
      // Period for tangent function is π / frequency
      periodicity = Math.PI / frequency;
      break;
    default:
      logError('Invalid function selected.');
      return;
  }

  displayPeriodicity(periodicity);
}

function displayPeriodicity(periodicity) {
  const resultElement = document.getElementById('periodicityResult');
  if (resultElement) {
    resultElement.innerHTML = `<p class="text-blue-500">Periodicity: ${periodicity}</p>`;
  }
}

function logError(message) {
  const logBox = document.getElementById('logBox');
  logBox.innerHTML = `<div class="log-item error">${message}</div>`;
}


function performTrigonometricOperation() {
  const angleInput = document.getElementById('angleInput');
  const functionSelect = document.getElementById('functionSelectCalculation').value;

  if (!angleInput || isNaN(angleInput.value)) {
    logError('Please enter a valid angle.');
    return;
  }

  const angle = parseFloat(angleInput.value);

  let result;

  switch (functionSelect) {
    case 'sin':
      result = calculateSin(angle);
      break;
    case 'cos':
      result = calculateCos(angle);
      break;
    case 'tan':
      result = calculateTan(angle);
      break;
    default:
      logError('Invalid trigonometric function selected.');
      return;
  }

  displayResult(result);
}

function displayResult(result) {
  const resultElement = document.getElementById('result');
  if (resultElement) {
    resultElement.innerHTML = `<p class="text-blue-500">Result: ${result.result}</p><p class="text-gray-500">Steps: ${result.steps}</p>`;
  }
}

function calculateSin(angle) {
  const n = Math.floor(angle / 90);
  let n_even = Math.floor(angle / 90);
  let n_odd = Math.ceil(angle / 90);

  // Adjust n_even if it's odd
  if (n_even % 2 !== 0) {
    n_even++;
  }

  // Adjust n_odd if it's even
  if (n_odd % 2 === 0) {
    n_odd--;
  }

  let theta_1, theta_2 = 0;

  if (90 * n_even <= angle) {
    theta_1 = angle - 90 * n_even;
  } else {
    theta_1 = 90 * n_even - angle;
  }

  if (90 * n_odd >= angle) {
    theta_2 = (90 * n_odd) - angle;
  } else { 
    theta_2 = angle - (90 * n_odd);
  }

  const theta = angle % 90;
  const finalAngle = (n % 2 === 0) ? theta : 90 - theta;
  const result = Math.sin(finalAngle * Math.PI / 180);
  const steps = [
    `Step 1: sin(90 * ${n_even} ${90* n_even >= angle ? '-' : '+'} ${theta_1}) <br>`,
    `Step 1: sin(${theta_1}) <br>`,
    `Step 2: sin(90 * ${n_odd} ${90* n_odd >= angle ? '-' : '+'} ${theta_2}) <br>`,
    `Step 2: cos(${theta_2}) <br>`,
  ];
  return { result, steps: steps.join(' = ') };
}


function calculateCos(angle) {
  const n = Math.floor(angle / 90);
  let n_even = Math.floor(angle / 90);
  let n_odd = Math.ceil(angle / 90);
  // Adjust n_even if it's odd
  if (n_even % 2 !== 0) {
    n_even++;
  }
  // Adjust n_odd if it's even
  if (n_odd % 2 === 0) {
    n_odd--;
  }

  let theta_1, theta_2 = 0;

  if (90 * n_even <= angle) {
    theta_1 = angle - 90 * n_even;
  } else {
    theta_1 = 90 * n_even - angle;
  }


  if (90 * n_odd >= angle) {
    theta_2 = (90 * n_odd) - angle;
  } else { 
    theta_2 = angle - (90 * n_odd);
  }


  const theta = angle % 90;
  const finalAngle = (n % 2 === 0) ? theta : 90 - theta;
  const result = Math.cos(finalAngle * Math.PI / 180);
  const steps = [
    `Step 1: cos(90 * ${n_even} ${90* n_even >= angle ? '-' : '+'} ${theta_1}) <br>`,
    `Step 1: cos(${theta_1}) <br>`,
    `Step 2: cos(90 * ${n_odd} ${90* n_odd >= angle ? '-' : '+'} ${theta_2}) <br>`,
    `Step 2: sin(${theta_2}) <br>`,
  ];
  return { result, steps: steps.join(' = ') };
}


function calculateTan(angle) {
  const n = Math.floor(angle / 90);
  let n_even = Math.floor(angle / 90);
  let n_odd = Math.ceil(angle / 90);

  // Adjust n_even if it's odd
  if (n_even % 2 !== 0) {
    n_even++;
  }

  // Adjust n_odd if it's even
  if (n_odd % 2 === 0) {
    n_odd--;
  }

  let theta_1, theta_2 = 0;

  if (90 * n_even <= angle) {
    theta_1 = angle - 90 * n_even;
  } else {
    theta_1 = 90 * n_even - angle;
  }

  if (90 * n_odd >= angle) {
    theta_2 = (90 * n_odd) - angle;
  } else { 
    theta_2 = angle - (90 * n_odd);
  }

  const theta = angle % 90;
  const finalAngle = (n % 2 === 0) ? theta : 90 - theta;
  const result = Math.tan(finalAngle * Math.PI / 180);
  const steps = [
    `Step 1: tan(90 * ${n_even} ${90* n_even >= angle ? '-' : '+'} ${theta_1}) <br>`,
    `Step 1: tan(${theta_1}) <br>`,
    `Step 2: tan(90 * ${n_odd} ${90* n_odd >= angle ? '-' : '+'} ${theta_2}) <br>`,
    `Step 2: cot(${theta_2}) <br>`,
  ];
  return { result, steps: steps.join(' = ') };
}



// function displayResult(result) {
//   const resultElement = document.getElementById('result');
//   if (resultElement) {
//     resultElement.innerHTML = `<p class="text-blue-500">Result: ${result.result}</p><p class="text-gray-500">Steps: ${result.steps}</p>`;
//   }
// }



const canvas = document.getElementById('trigCircle');

// Ensure the canvas is square
const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
canvas.width = size;
canvas.height = size;

const ctx = canvas.getContext('2d');
const radius = size / 2;

ctx.translate(radius, radius);

// Draw the circle
ctx.beginPath();
ctx.arc(0, 0, radius - 5, 0, 2 * Math.PI);
ctx.strokeStyle = '#3198cc'; // Set stroke color to blue
ctx.stroke();

// Draw the 90-degree intervals
for (let angle = 0; angle < 360; angle += 90) {
  const radian = angle * Math.PI / 180; // Adjust for counterclockwise rotation
  const x = Math.cos(radian) * (radius - 5); // Adjust distance from the center
  const y = Math.sin(radian) * (radius - 5); // Adjust distance from the center

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(x, -y); // Adjust text position closer to the center
  ctx.strokeStyle = '#3198cc'; // Set stroke color to blue
  ctx.stroke();

  ctx.fillStyle = '#3198cc'; // Set text color to blue
  ctx.fillText(`${angle}°`, 0.9 * x - 25, -0.9 * y - 10); // Adjust text position slightly to the left
}


