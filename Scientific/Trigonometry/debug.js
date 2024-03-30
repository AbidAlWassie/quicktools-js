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
      resultElement.innerHTML = `<p class="text-blue-500">Result: ${result.result}</p><p class="text-gray-500"> = ${result.steps}</p>`;
    }
  }
  
  
function generateTrigonometricSteps(n_even, n_odd, theta_1, theta_2, angle, func) {
  const steps = [
    `Step 1: ${func}(90 * ${n_even} ${90 * n_even >= angle ? '-' : '+'} ${theta_1}) <br>`,
    `Step 1: ${func}(${theta_1}) <br>`,
    `Alt: ${func}(90 * ${n_odd} ${90 * n_odd >= angle ? '-' : '+'} ${theta_2}) <br>`,
    `Alt: ${func === 'tan' ? 'cot' : (func === 'sin' ? 'cos' : 'sin')}(${theta_2}) <br>`,
  ];
  return steps.join(' = ');
}

function calculateSin(angle) {
  const n_even = Math.floor(angle / 90);
  const n_odd = Math.ceil(angle / 90);

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

  const result = Math.sin((n_even % 2 === 0) ? (angle % 90) : (90 - (angle % 90))) * Math.PI / 180;
  const steps = generateTrigonometricSteps(n_even, n_odd, theta_1, theta_2, angle, 'sin');
  return { result, steps };
}

function calculateCos(angle) {
  const n_even = Math.floor(angle / 90);
  const n_odd = Math.ceil(angle / 90);

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

  const result = Math.cos((n_even % 2 === 0) ? (angle % 90) : (90 - (angle % 90))) * Math.PI / 180;
  const steps = generateTrigonometricSteps(n_even, n_odd, theta_1, theta_2, angle, 'cos');
  return { result, steps };
}

function calculateTan(angle) {
  const n_even = Math.floor(angle / 90);
  const n_odd = Math.ceil(angle / 90);

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

  const result = Math.tan((n_even % 2 === 0) ? (angle % 90) : (90 - (angle % 90))) * Math.PI / 180;
  const steps = generateTrigonometricSteps(n_even, n_odd, theta_1, theta_2, angle, 'tan');
  return { result, steps };
}
