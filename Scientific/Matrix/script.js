let matrices = {};

function createMatrix() {
  const rows = document.getElementById('rows').value;
  const cols = document.getElementById('cols').value;

  const matrixName = prompt('Enter a name for the matrix (e.g., A, B, C):');
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
  matrixContainer.innerHTML = '';

  for (const [name, matrix] of Object.entries(matrices)) {
    const matrixElement = document.createElement('div');
    matrixElement.classList.add('matrix');
    matrixElement.textContent = name;

    const table = createEditableTable(matrix, name);
    matrixElement.appendChild(table);

    matrixContainer.appendChild(matrixElement);
  }
}

function createEditableTable(matrix, matrixName) {
  const table = document.createElement('table');

  // Create table headers
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  for (let i = 0; i < matrix[0].length; i++) {
    const th = document.createElement('th');
    th.textContent = `Column ${i + 1}`;
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
      input.type = 'number';
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
  matrices[matrixName][rowIndex][colIndex] = parseInt(value) || 0;
}

function loadMatricesFromFile(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      matrices = JSON.parse(e.target.result);
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
  a.download = 'matrices.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}