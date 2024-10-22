'use strict';

async function handleLogin(event) {
  event.preventDefault();

  const user = document.getElementById('user').value;
  const password = document.getElementById('password').value;

  console.log(user, password)

  const { data, statusCode } = await login(user, password);
  if (statusCode >= 400) {
    alert('Usuário ou senha inválidos');
    return;
  }

  localStorage.setItem('user', JSON.stringify(data));
  window.open('../home/TelaInicial.html', '_self');
}

document.querySelector('form').addEventListener('submit', handleLogin);
