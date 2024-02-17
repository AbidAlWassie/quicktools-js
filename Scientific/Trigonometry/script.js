// File name: script.js

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


function calculateSin(angle) {
  // Calculate the angle within the range [0, 360)
  const normalizedAngle = angle % 360;
  const positiveAngle = normalizedAngle >= 0 ? normalizedAngle : 360 + normalizedAngle;

  // Check if the angle matches one of the known solutions
  if (positiveAngle === 330) {
    return -Math.cos(30 * Math.PI / 180); // Using the solution for sin(690)
  } else if (positiveAngle === 45) {
    return Math.sin(45 * Math.PI / 180); // Using the solution for sin(315)
  } else if (positiveAngle === 690) {
    return -Math.cos(30 * Math.PI / 180); // Using the solution for sin(690)
  } else {
    logError('Angle not supported.');
    return null;
  }
}

function calculateCos(angle) {
  // Calculate the angle within the range [0, 360)
  const normalizedAngle = angle % 360;
  const positiveAngle = normalizedAngle >= 0 ? normalizedAngle : 360 + normalizedAngle;

  // Check if the angle matches one of the known solutions
  if (positiveAngle === 480) {
    return -1 / 2; // Using the solution for cos(480)
  } else if (positiveAngle === 570) {
    return -Math.cos(30 * Math.PI / 180); // Using the solution for cos(570)
  } else {
    logError('Angle not supported.');
    return null;
  }
}

function calculateTan(angle) {
  // Calculate the angle within the range [0, 360)
  const normalizedAngle = angle % 360;
  const positiveAngle = normalizedAngle >= 0 ? normalizedAngle : 360 + normalizedAngle;

  // Define known solutions for certain angles
  const solutions = {
    15: { result: 2 - Math.sqrt(3), steps: "tan(15)" }, // Solution for tan(15)
    195: { result: 2 - Math.sqrt(3), steps: "tan(90*2 + 15) = tan(15)" }, // Solution for tan(195)
    285: { result: -2 + Math.sqrt(3), steps: "tan(90*3 - 75) = tan(-75)" }, // Solution for tan(285)
    // Add more known solutions here as needed
  };

  // Check if the angle matches one of the known solutions
  if (solutions.hasOwnProperty(positiveAngle)) {
    let steps = [];
    for (const angleKey in solutions) {
      if (Object.hasOwnProperty.call(solutions, angleKey)) {
        const { result, steps: step } = solutions[angleKey];
        steps.push(`${step} = ${result}`);
      }
    }
    const result = solutions[positiveAngle].result;
    return `Steps: ${steps.join(", ")}, Result: ${result}`;
  } else {
    logError('Angle not supported.');
    return null;
  }
}


function displayResult(result) {
  const resultElement = document.getElementById('result');
  if (resultElement) {
    resultElement.innerHTML = `<p class="text-blue-500">Result: ${result}</p>`;
  }
}


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


