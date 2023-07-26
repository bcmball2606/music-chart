// Sample data for the music chart (you can replace this with your actual data)
const chartData = [
    [1, 2, 'up', 5, 1, 'Song A', 'Artist X', 'Label 1'],
    [2, 1, 'down', 8, 1, 'Song B', 'Artist Y', 'Label 2'],
    // Add more rows for the rest of the chart data
  ];
  
  // Function to populate the table with chart data
  function populateChart() {
    const tableBody = document.querySelector('tbody');
    let html = '';
    for (const row of chartData) {
      html += '<tr>';
      for (const cell of row) {
        html += `<td>${cell}</td>`;
      }
      html += '</tr>';
    }
    tableBody.innerHTML = html;
  }
  
  document.addEventListener('DOMContentLoaded', populateChart);