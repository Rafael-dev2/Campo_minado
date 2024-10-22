document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');
    const cpfInput = document.querySelector('input[placeholder="Digite seu CPF"]');
    const birthdateInput = document.querySelector('input[placeholder="Digite sua data de nascimento"]');
    const phoneInput = document.querySelector('input[placeholder="Digite seu telefone"]');

    function formatCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); 
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return cpf;
    }

    function formatBirthdate(birthdate) {
        birthdate = birthdate.replace(/\D/g, ''); 
        birthdate = birthdate.replace(/(\d{2})(\d)/, '$1/$2');
        birthdate = birthdate.replace(/(\d{2})(\d)/, '$1/$2'); 
        return birthdate;
    }

    function formatPhone(phone) {
        phone = phone.replace(/\D/g, ''); 
        phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2'); 
        phone = phone.replace(/(\d{5})(\d)/, '$1-$2');
        return phone;
    }

    cpfInput.addEventListener('input', () => {
        cpfInput.value = formatCPF(cpfInput.value);
    });

    birthdateInput.addEventListener('input', () => {
        birthdateInput.value = formatBirthdate(birthdateInput.value);
    });

    phoneInput.addEventListener('input', () => {
        phoneInput.value = formatPhone(phoneInput.value);
    });

    phoneInput.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && phoneInput.value.length <= 4) {
            phoneInput.value = '';
        }
    });

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const name = document.querySelector('input[placeholder="Digite seu nome completo"]').value;
        const cpf = document.querySelector('input[placeholder="Digite seu CPF"]').value;
        const birthdate = document.querySelector('input[placeholder="Digite sua data de nascimento"]').value;
        const phone = document.querySelector('input[placeholder="Digite seu telefone"]').value;
        const email = document.querySelector('input[placeholder="Digite seu email"]').value;
        const password = document.querySelector('input[placeholder="Digite sua senha"]').value;
        const confirmPassword = document.querySelector('input[placeholder="Digite sua senha novamente"]').value;
    
        if (!name || !cpf || !birthdate || !phone || !email || !password || !confirmPassword) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
    
        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }
    
        const userData = {
            name,
            cpf,
            birthdate,
            phone,
            email,
            password
        };
    
        localStorage.setItem('user', JSON.stringify(userData));
    
        window.open('../successSignup/sucessSignup.html', '_self');
    }); 
});
