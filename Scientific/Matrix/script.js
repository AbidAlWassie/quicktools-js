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