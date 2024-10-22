document.addEventListener('DOMContentLoaded', () => {
    const recoverForm = document.getElementById('recoverForm');
    
    recoverForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const emailInput = document.querySelector('input[type="email"]');
        const email = emailInput.value;

        if (email) {
            alert(`Instruções para recuperar a senha foram enviadas para: ${email}`);
        } else {
            alert('Por favor, insira um email válido.');
        }
    });
});
