'use strict';

function loadPlayerChart() {
  const playerChart = document.querySelector('div.playerChart');
  if (!playerChart) {
    return;
  }

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    playerChart.setAttribute('hidden', '');
    return;
  }

  playerChart.removeAttribute('hidden');
}

function handleLogout() {
  localStorage.removeItem('user');
  window.open('../login/TelaLogin.html', '_self');
}

loadPlayerChart();