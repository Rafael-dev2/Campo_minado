async function loadHistory() {
  const records = await fetchHistory();
  const recordsList = document.querySelector('#historyTableBody');
  
  records.forEach(record => {
    const recordElement = document.createElement('tr');  
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = record.name;

    const date = document.createElement('span');
    const dateObject = new Date(record.date);
    date.textContent = dateObject.toLocaleDateString('pt-BR');

    const dimensionSpan = document.createElement('span');
    dimensionSpan.textContent = record.dimension;

    const bombsSpan = document.createElement('span');
    bombsSpan.textContent = record.bombs;

    const modeSpan = document.createElement('span');
    modeSpan.textContent = record.mode;

    const timeSpan = document.createElement('span');
    const minutes = Math.floor(record.time / 60);
    const seconds = record.time % 60;
    timeSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    const resultSpan = document.createElement('span');
    resultSpan.textContent = record.win ? 'Vitória' : 'Derrota';

    const name = document.createElement('td');
    name.appendChild(nameSpan);

    const dateElement = document.createElement('td');
    dateElement.appendChild(date);

    const dimension = document.createElement('td');
    dimension.appendChild(dimensionSpan);

    const bombs = document.createElement('td');
    bombs.appendChild(bombsSpan);

    const mode = document.createElement('td');
    mode.appendChild(modeSpan);

    const time = document.createElement('td');
    time.appendChild(timeSpan);

    const result = document.createElement('td');
    result.appendChild(resultSpan);

    recordElement.appendChild(name);
    recordElement.appendChild(dateElement);
    recordElement.appendChild(dimension);
    recordElement.appendChild(bombs);
    recordElement.appendChild(mode);
    recordElement.appendChild(time);
    recordElement.appendChild(result);

    recordsList.appendChild(recordElement);
  });
}

loadHistory();