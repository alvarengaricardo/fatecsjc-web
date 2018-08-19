// Buttons
var enviarmensagemButton = document.getElementById('enviarmensagemButton');
var apagarmensagemButton = document.getElementById('apagarmensagemButton');
var solicitacoesButton = document.getElementById('solicitacoesButton');
var logOutButton = document.getElementById('logOutButton');

// enviar mensagens
enviarmensagemButton.addEventListener('click', function () {
    window.location = "mensagem.html";
});

// requerimento
solicitacoesButton.addEventListener('click', function () {
    window.location = "requerimento.html";
});

// logout
logOutButton.addEventListener('click', function () {
    firebase
    .auth()
    .signOut()
    .then(function () {
        //displayName.innerText = 'Você não está autenticado';
        //alert('Você se deslogou');
    }, function (error) {
        console.error(error);
    });
    window.location = "index.html";
});