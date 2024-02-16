let matrices = {};

function autoScaleInput() {
  console.log("autoScaleInput: Not Completed");
  // // Get the input element
  // var inputArea = document.querySelectorAll('input');
  // // Get the width of the text in the input
  // var textWidth = inputArea.scrollWidth;
  // // Set the input width
  // inputArea.style.width = textWidth + 'px';
}

function logMessage(message, type) {
  const logBox = document.getElementById('log');
  
  // Clear previous logs
  logBox.innerHTML = '';

  // Create log item
  const logItem = document.createElement('div');
  logItem.textContent = message;
  logItem.classList.add('log-item', type);
  
  // Append log item to log box
  logBox.appendChild(logItem);
}

function logAns(message, type) {
  const logBox = document.getElementById('Ans');
  
  // Clear previous logs
  logBox.innerHTML = '';

  // Create log item
  const logItem = document.createElement('div');
  logItem.textContent = message;
  logItem.classList.add('log-item', type);
  
  // Append log item to log box
  logBox.appendChild(logItem);
}



function createMatrix() {
  const rows = document.getElementById('rows').value;
  const cols = document.getElementById('cols').value;

  const matrixNameInput = document.getElementById('matrixName');
  const matrixName = matrixNameInput.value.trim().toUpperCase();

  if (!matrixName) {
    logMessage('Matrix name cannot be empty.', 'error');
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
    matrixElement.classList.add('dark:bg-gray-700', 'p-4', 'rounded-lg', 'max-w-md', 'mx-auto', 'my-4', 'text-center'); // Tailwind classes for background, padding, and rounded corners

    const table = createEditableTable(matrix, name);
    matrixElement.appendChild(table);

    matrixContainer.appendChild(matrixElement);
  }

  updateMatrixSelectOptions(); // Add this line
}

function createEditableTable(matrix, matrixName) {
  const table = document.createElement('table');
  table.className = 'dark:bg-gray-700 p-4 rounded-lg max-w-md my-4 mx-auto';

  // Check if matrix is undefined or does not have valid length
  if (!matrix || !matrix.length || !matrix[0] || !matrix[0].length) {
    console.error('Invalid matrix data:', matrix);
    return table;
  }

  // Create table headers
  const thead = document.createElement('thead');
  thead.className = 'output-matrix-thead table-head bg-[#285272]';
  const headerRow = document.createElement('tr');
  for (let i = 0; i < matrix[0].length; i++) {
    const th = document.createElement('th');
    th.className = 'border-solid border-2 border-gray-700';
    th.innerHTML = `C<sub>${i + 1}</sub>`;
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body with editable cells
  const tbody = document.createElement('tbody');
  tbody.className = 'table-body bg-slate-600';
  for (let i = 0; i < matrix.length; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < matrix[i].length; j++) {
      const cell = document.createElement('td');
      cell.className = 'border-solid border-2 border-gray-700';
      const input = document.createElement('input');
      input.type = 'number';
      input.value = matrix[i][j];
      // Add classes to the input element
      input.className = 'matrix-input border-solid border-2 border-gray-700 focus:border-blue-500 outline-none dark:bg-gray-700 p-2 rounded-lg text-center w-16 m-2 mx-2';
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
    logMessage('Please select two matrices and an operation.', 'error');
    return;
  }

  switch (selectedOperation) {
    case 'multiply':
      multiplyMatrices(selectedMatrixName1, selectedMatrixName2);
      break;
    case 'transpose':
      transposeMatrix(selectedMatrixName1)
      break;
    case 'determinant':
      determinant(selectedMatrixName1); // Pass the selected matrix name to the determinant function
      break;
    case 'add':
      addMatrices(selectedMatrixName1, selectedMatrixName2);
      break;
    case 'subtract':
      subtractMatrices(selectedMatrixName1, selectedMatrixName2);
      break;
    default:
      logMessage('Invalid operation.', 'error');
  }
}


// Modify the multiplyMatrices function to take two matrix names
function multiplyMatrices(matrixName1, matrixName2) {
  const matrixA = matrices[matrixName1];
  const matrixB = matrices[matrixName2];

  if (!matrixA || !matrixB) {
    logMessage('Selected matrices must be defined for multiplication.', 'error');
    return;
  }

  if (matrixA[0].length !== matrixB.length) {
    logMessage('Number of columns in Matrix A must be equal to the number of rows in Matrix B for multiplication.', 'error');
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

// Function to transpose a matrix
function transposeMatrix(matrixName) {
  const matrix = matrices[matrixName];

  if (!matrix) {
    logMessage('Selected matrix must be defined for transposition.', 'error');
    return;
  }

  const transposedMatrix = [];

  // Create an empty matrix with swapped dimensions
  for (let i = 0; i < matrix[0].length; i++) {
    transposedMatrix.push([]);
  }

  // Fill the transposed matrix with values from the original matrix
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      transposedMatrix[j][i] = matrix[i][j];
    }
  }

  // Store the transposed matrix with a new name, assuming you want to prefix 'T' to the original matrix name
  matrices[`T${matrixName}`] = transposedMatrix;

  // Refresh the matrices display
  displayMatrices();
}


function determinant(matrixName) {
  const matrix = matrices[matrixName];
  const resultElement = document.getElementById('Ans');

  if (!matrix || !resultElement) {
    console.error('Matrix or result element not found.');
    return;
  }

  const n = matrix.length;

  // Check if the matrix is square
  if (n !== matrix[0].length) {
    logAns('The matrix must be square (n x n) for finding the determinant.', 'warning');
    return;
  }

  // Base case: for 1x1 matrix, determinant is the only element
  if (n === 1) {
    logAns('Determinant of a 1x1 matrix is the only element: ' + matrix[0][0], 'info');
    return;
  }

  let det = 0;

  // Recursive function to find determinant by Laplace expansion
  const determinantByLaplace = (matrix, n) => {
    // Base case: for 2x2 matrix, use the formula ad - bc
    if (n === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let result = 0;

    for (let j = 0; j < n; j++) {
      const sign = (j % 2 === 0) ? 1 : -1;
      const submatrix = [];
      for (let i = 1; i < n; i++) {
        submatrix.push(matrix[i].filter((_, index) => index !== j));
      }
      result += sign * matrix[0][j] * determinantByLaplace(submatrix, n - 1);
    }

    return result;
  };

  det = determinantByLaplace(matrix, n);

  // Update the determinant result element
  logAns('Determinant: ' +  det, 'success');
}


// Function to add two matrices
function addMatrices(matrixNameA, matrixNameB) {
  const matrixA = matrices[matrixNameA];
  const matrixB = matrices[matrixNameB];

  if (!matrixA || !matrixB || matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
    logMessage('Matrices A and B must be defined and have the same dimensions for addition.', 'error');
    return;
  }

  const resultMatrix = [];

  for (let i = 0; i < matrixA.length; i++) {
    resultMatrix.push([]);
    for (let j = 0; j < matrixA[0].length; j++) {
      resultMatrix[i][j] = matrixA[i][j] + matrixB[i][j];
    }
  }

  // Store the result in a new matrix C
  matrices['C'] = resultMatrix;

  // Refresh the matrices display
  displayMatrices();
}

// Function to subtract matrix B from matrix A
function subtractMatrices(matrixNameA, matrixNameB) {
  const matrixA = matrices[matrixNameA];
  const matrixB = matrices[matrixNameB];

  if (!matrixA || !matrixB || matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
    logMessage('Matrices A and B must be defined and have the same dimensions for subtraction.', 'error');
    return;
  }

  const resultMatrix = [];

  for (let i = 0; i < matrixA.length; i++) {
    resultMatrix.push([]);
    for (let j = 0; j < matrixA[0].length; j++) {
      resultMatrix[i][j] = matrixA[i][j] - matrixB[i][j];
    }
  }

  // Store the result in a new matrix C
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
    logMessage('Please choose a file to upload.', 'error');
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