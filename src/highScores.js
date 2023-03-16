function getHighScores() {
  return JSON.parse(localStorage.getItem("highScores")) || [];
}

function updateHighScoresTable() {
  const highScoresTableBody = document.getElementById("high-scores-table-body");
  const highScores = getHighScores();

  let tableRows = "";
  highScores.forEach((entry, index) => {
    tableRows += `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${entry.name}</td>
        <td>${entry.score}</td>
      </tr>
    `;
  });

  highScoresTableBody.innerHTML = tableRows;
}

document.getElementById("show-high-scores").addEventListener("click", () => {
  updateHighScoresTable();
  $("#highScoresModal").modal("show");
});
