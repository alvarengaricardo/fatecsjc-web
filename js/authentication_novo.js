// 18-09-17

// Buttons
var authEmailPassButton = document.getElementById('authEmailPassButton');
var logOutButton = document.getElementById('logOutButton');
var menuButton = document.getElementById('menuButton');

// Inputs
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');

// Displays
var displayName = document.getElementById('displayName');

// Autenticar com E-mail e Senha
authEmailPassButton.addEventListener('click', function () {
    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function (result) {
            if (checkIfUserExists(emailInput.value)){
                displayName.innerText = 'Bem vindo, ' + emailInput.value;
                window.location = "menu.html";
            } else {
                alert('Usuário não Autorizado!')
            }
            console.log(result);
            
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao autenticar.')
        });     
});

// Logout

function signout(){
 firebase
            .auth()
            .signOut()
            .then(function () {
                displayName.innerText = 'Você não está Logado.';
                alert('Você se deslogou.');
            }, function (error) {
                console.error(error);
            });
}

function signIn(provider) {
    firebase.auth()
        .signInWithPopup(provider)
        .then(function (result) {
            console.log(result);
            var token = result.credential.accessToken;
            displayName.innerText = 'Bem vindo, ' + result.user.displayName;
        }).catch(function (error) {
            console.log(error);
            alert('Falha na autenticação.');
        });
}

function checkIfUserExists(userId) {
    var ref;
    ref = firebase.database().ref().child("secretaria");
    ref.orderByChild("email").equalTo(userId).once("value",snapshot => {
        const userData = snapshot.val();
        if (userData){
          console.log("usuário ok");
          return TRUE;
        } else {
            console.log("erro!");
            console.log(ref);
            return FALSE;
        }
    });
  }