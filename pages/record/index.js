'use strict';

async function loadHistory() {
  const records = await fetchRecords();
  const recordsList = document.querySelector('#recordTableBody');
  
  records.forEach((record, index) => {
    const recordElement = document.createElement('tr');  
    
    const positionSpan = document.createElement('span');
    positionSpan.textContent = index + 1;

    const nameSpan = document.createElement('span');
    nameSpan.textContent = record.name;

    const scoreSpan = document.createElement('span');
    scoreSpan.textContent = record.score;

    const modeSpan = document.createElement('span');
    modeSpan.textContent = record.mode;

    const position = document.createElement('td');
    position.appendChild(positionSpan);

    const name = document.createElement('td');
    name.appendChild(nameSpan);

    const score = document.createElement('td');
    score.appendChild(scoreSpan);
    
    const mode = document.createElement('td');
    mode.appendChild(modeSpan);
    
    recordElement.appendChild(position);
    recordElement.appendChild(name);
    recordElement.appendChild(score);
    recordElement.appendChild(mode);

    recordsList.appendChild(recordElement);
  });
}

loadHistory();