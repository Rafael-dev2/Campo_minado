'use strict';

function loadScreen() {
  const loginBtn = document.getElementById('loginBtn');

  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    loginBtn.setAttribute('hidden', '');
    return;
  }

  loginBtn.removeAttribute('hidden');
}

function handlePlay() {
  if (!localStorage.getItem('user')) {
    window.open('../login/TelaLogin.html', '_self');
    return;
  }

  window.open('../modeSelection/modeSelection.html', '_self');
}

loadScreen();