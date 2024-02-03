let matrices = {};

function createMatrix() {
  const rows = document.getElementById('rows').value;
  const cols = document.getElementById('cols').value;

  const matrixNameInput = document.getElementById('matrixName');
  const matrixName = matrixNameInput.value.trim().toUpperCase();

  if (!matrixName) {
    alert('Matrix name cannot be empty.');
    return;
  }

  const matrix = generateMatrix(rows, cols);
  matrices[matrixName] = matrix;

  displayMatrices();
}

function generateMatrix(rows, cols) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix.push([]);
    for (let j = 0; j < cols; j++) {
      matrix[i].push(0); // Initialize with zeros, you can modify this based on your requirements.
    }
  }
  return matrix;
}

function displayMatrices() {
  const matrixContainer = document.getElementById('matrixContainer');

  // Ensure the 'matrixContainer' element is found before proceeding
  if (!matrixContainer) {
    console.error('Error: Element with ID "matrixContainer" not found.');
    return;
  }

  matrixContainer.innerHTML = '';

  for (const [name, matrix] of Object.entries(matrices)) {
    const matrixElement = document.createElement('div');
    matrixElement.textContent = name;

    const table = createEditableTable(matrix, name);
    matrixElement.appendChild(table);

    matrixContainer.appendChild(matrixElement);
  }

  updateMatrixSelectOptions(); // Add this line
}

function createEditableTable(matrix, matrixName) {
  const table = document.createElement('table');

  // Check if matrix is undefined or does not have valid length
  if (!matrix || !matrix.length || !matrix[0] || !matrix[0].length) {
    console.error('Invalid matrix data:', matrix);
    return table;
  }

  // Create table headers
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  for (let i = 0; i < matrix[0].length; i++) {
    const th = document.createElement('th');
    th.innerHTML = `C<sub>${i + 1}</sub>`;
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body with editable cells
  const tbody = document.createElement('tbody');
  for (let i = 0; i < matrix.length; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < matrix[i].length; j++) {
      const cell = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = matrix[i][j];
      input.addEventListener('input', (event) => updateMatrix(matrixName, i, j, event.target.value));
      cell.appendChild(input);
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);

  return table;
}

// Update the updateMatrixSelectOptions function to create two select elements
function updateMatrixSelectOptions() {
  const matrixSelect1 = document.getElementById('matrixSelect1');
  const matrixSelect2 = document.getElementById('matrixSelect2');

  matrixSelect1.innerHTML = '';
  matrixSelect2.innerHTML = '';

  for (const matrixName in matrices) {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');

    option1.value = matrixName;
    option1.textContent = matrixName;

    option2.value = matrixName;
    option2.textContent = matrixName;

    matrixSelect1.appendChild(option1);
    matrixSelect2.appendChild(option2);
  }
}

// Update the performMatrixOperation function to handle matrix multiplication
function performMatrixOperation() {
  const matrixNameSelect1 = document.getElementById('matrixSelect1');
  const matrixNameSelect2 = document.getElementById('matrixSelect2');
  const selectedMatrixName1 = matrixNameSelect1.value;
  const selectedMatrixName2 = matrixNameSelect2.value;

  const operationSelect = document.getElementById('operationSelect');
  const selectedOperation = operationSelect.value;

  if (!selectedMatrixName1 || !selectedMatrixName2 || !selectedOperation) {
    alert('Please select two matrices and an operation.');
    return;
  }

  switch (selectedOperation) {
    case 'multiply':
      multiplyMatrices(selectedMatrixName1, selectedMatrixName2);
      break;
    case 'transpose':
      // Call transpose function here
      break;
    case 'add':
      // Call add function here
      break;
    case 'subtract':
      // Call subtract function here
      break;
    default:
      alert('Invalid operation.');
  }
}

// Modify the multiplyMatrices function to take two matrix names
function multiplyMatrices(matrixName1, matrixName2) {
  const matrixA = matrices[matrixName1];
  const matrixB = matrices[matrixName2];

  if (!matrixA || !matrixB) {
    alert('Selected matrices must be defined for multiplication.');
    return;
  }

  if (matrixA[0].length !== matrixB.length) {
    alert('Number of columns in Matrix A must be equal to the number of rows in Matrix B for multiplication.');
    return;
  }

  const resultMatrix = [];

  for (let i = 0; i < matrixA.length; i++) {
    resultMatrix.push([]);
    for (let j = 0; j < matrixB[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < matrixA[0].length; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      resultMatrix[i][j] = sum;
    }
  }

  // Assuming you want to store the result in a new matrix C
  matrices['C'] = resultMatrix;

  // Refresh the matrices display
  displayMatrices();
}



function updateMatrix(matrixName, rowIndex, colIndex, value) {
  matrices[matrixName][rowIndex][colIndex] = value;
}

function loadMatrixFromFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please choose a file to upload.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const loadedMatrix = JSON.parse(e.target.result);

      if (typeof loadedMatrix === 'object' && Object.keys(loadedMatrix).length > 0) {
        matrices = { ...matrices, ...loadedMatrix };
      } else {
        // Check if matrix with the same name already exists
        if (matrices[matrixName]) {
          // If exists, update the existing matrix
          matrices[matrixName] = loadedMatrix;
        } else {
          // If doesn't exist, create a new matrix with the specified name
          matrices[matrixName] = loadedMatrix;
        }
      }

      displayMatrices();
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  reader.readAsText(file);
}



function downloadMatrices() {
  const data = JSON.stringify(matrices, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'matrix.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', function () {
  displayMatrices();
});