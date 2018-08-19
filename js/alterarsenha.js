// Buttons
var resetEmailButtonButton = document.getElementById('resetEmailButton');

// Inputs
var emailInput = document.getElementById('emailInput');

// Displays
var displayName = document.getElementById('displayName');

// firebase
var auth = firebase.auth();

// Autenticar com E-mail e Senha
resetEmailButton.addEventListener('click', function () {
    auth.sendPasswordResetEmail(emailInput.value).then(function() {
        // Email sent.
        alert('Verificar caixa de e-mail.');
        console.log(emailInput.value);
      }).catch(function(error) {
        // An error happened.
        alert('Dados inválidos.');
        console.log('erro');
      })
    }
);