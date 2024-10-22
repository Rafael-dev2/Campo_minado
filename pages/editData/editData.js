'use strict';

window.onload = function() {
    const nome = document.getElementById('nome');
    const cpf = document.getElementById('cpf');
    const dataNascimento = document.getElementById('dataNascimento');
    const telefone = document.getElementById('telefone');
    const email = document.getElementById('email');

    const user = JSON.parse(localStorage.getItem('user'));

    nome.value = user.name;
    cpf.value = user.cpf;
    dataNascimento.value = new Date(user.birthdate).toLocaleDateString('pt-BR');
    telefone.value = user.phone;
    email.value = user.email;    
    
    document.getElementById('confirmSenha').parentElement.style.display = 'none'; 
    document.getElementById('botaoLogin').style.display = 'none'; 
};

document.getElementById('registerLink').addEventListener('click', function(event) {
    event.preventDefault(); 

    const nome = document.getElementById('nome');
    const cpf = document.getElementById('cpf');
    const dataNascimento = document.getElementById('dataNascimento');
    const telefone = document.getElementById('telefone');
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');

    nome.placeholder = "Digite seu novo nome";
    cpf.placeholder = "Digite seu novo CPF";
    dataNascimento.placeholder = "Digite a sua nova data de nascimento";
    telefone.placeholder = "Digite seu novo telefone";
    email.placeholder = "Digite seu novo email";

    nome.removeAttribute('disabled');
    cpf.removeAttribute('disabled');
    dataNascimento.removeAttribute('disabled');
    telefone.removeAttribute('disabled');
    email.removeAttribute('disabled');
    senha.removeAttribute('disabled');

    document.getElementById('senha').placeholder = "Digite sua nova senha";
    document.getElementById('confirmSenha').placeholder = "Confirme sua nova senha";

    document.getElementById('botaoLogin').style.display = 'block';
    document.getElementById('registerLink').style.display = 'none';

    document.getElementById('confirmSenha').parentElement.style.display = 'block';
});

document.getElementById('dataForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome');
    const cpf = document.getElementById('cpf');
    const dataNascimento = document.getElementById('dataNascimento');
    const telefone = document.getElementById('telefone');
    const email = document.getElementById('email');
    
    const senha = document.getElementById('senha');
    const confirmSenha = document.getElementById('confirmSenha');

    if (senha.value !== confirmSenha.value) {
        alert('As senhas não conferem');
        return;
    }

    const data = {
        name: nome.value,
        cpf: cpf.value,
        birthdate: dataNascimento.value,
        phone: telefone.value,
        email: email.value,
        password: senha.value
    };

    localStorage.setItem('user', JSON.stringify(data));

    window.location.reload();
});