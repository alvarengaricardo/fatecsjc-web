window.onload = inicializar;
var formMensagem;
var refMensagem;
var tbodyTabelaMensagens;
var CREATE = "Enviar Mensagem";
var UPDATE = "Editar Mensagem";
var modo = CREATE;
var refEditarMensagem;

function inicializar(){
    formMensagem = document.getElementById("form-mensagem");
    formMensagem.addEventListener("submit", gravarMensagemFirebase, false);
    tbodyTabelaMensagens = document.getElementById("tbody-tabela-mensagens");
    refMensagem = firebase.database().ref().child("mensagem");
    mostrarMensagemFirebase();
}

function mostrarMensagemFirebase(){
    refMensagem.on("value", function(snap){
        var dados = snap.val();
        var filaMostrar = "";
        for (var key in dados){
            filaMostrar += "<tr>" +   // gera a lista de dados gravada no firebase
                                "<td>" + dados[key].tituloMensagem + "</td>" +
                                "<td>" + dados[key].corpoMensagem + "</td>" +
                                '<td> '+
                                    '<button class = "btn btn-default editar" dado-mensagem = "' + key + '">' + // botao editar
                                        '<span class="glyphicon glyphicon-pencil"></span>' +
                                    '</button>'+
                                '</td>'+
                                '<td> '+
                                    '<button class = "btn btn-danger apagar" dado-mensagem = "' + key + '">' + // botao apagar
                                        '<span class="glyphicon glyphicon-trash"></span>' +
                                        '</button>'+
                                '</td>'+
                             "</tr>";
        }
        tbodyTabelaMensagens.innerHTML = filaMostrar;
        if (filaMostrar != ""){
            var elementosEditar = document.getElementsByClassName("editar");
            for (var i = 0; i < elementosEditar.length; i++){
                elementosEditar[i].addEventListener("click", editarMensagemFirebase, false);
            }
            var elementosApagar = document.getElementsByClassName("apagar");
            for (var i = 0; i < elementosApagar.length; i++){
                elementosApagar[i].addEventListener("click", apagarMensagemFirebase, false);
            }
        }
    });
}

function editarMensagemFirebase(){
    var keyEditarMensagem = this.getAttribute("dado-mensagem");
    refEditarMensagem = refMensagem.child(keyEditarMensagem);
    refEditarMensagem.once("value", function(snap){
        var dados = snap.val();
        document.getElementById("inputtitulomensagem").value = dados.tituloMensagem; 
        document.getElementById("inputcorpomensagem").value = dados.corpoMensagem;
    });
    document.getElementById("botao-enviar-mensagem").value = UPDATE;
    modo = UPDATE;
}

function apagarMensagemFirebase(){
    var apaga = confirm ("A mensagem será apagada. Confirma?");
    if (apaga == true){
        var keyApagarMensagem = this.getAttribute("dado-mensagem");
        var refApagarMensagem = refMensagem.child(keyApagarMensagem);
        refApagarMensagem.remove();
    }
}

function gravarMensagemFirebase(event){
    event.preventDefault();
    if ((inputtitulomensagem.value != "") && (inputcorpomensagem.value != "")){ // verifica se vazios
        var envia = confirm ("Confirma o envio da mensagem: "+inputtitulomensagem.value+"  -  "+inputcorpomensagem.value);
        if (envia == true){
            switch(modo){
                case CREATE:
                    refMensagem.push({
                        tituloMensagem: event.target.tituloMensagem.value, 
                        corpoMensagem: event.target.corpoMensagem.value,
                    });
                    break;
                case UPDATE:
                    refEditarMensagem.update({
                        tituloMensagem: event.target.tituloMensagem.value, 
                        corpoMensagem: event.target.corpoMensagem.value,
                    });
                    modo = CREATE;
                    document.getElementById("botao-enviar-mensagem").value = CREATE;
                    break;
            }
            enviarFCM(event.target.tituloMensagem.value, event.target.corpoMensagem.value); // envia notificação
            formMensagem.reset();
        } else{
            formMensagem.reset();
        } 
    }
}

function enviarFCM(titulo, corpo){
    // criar objeto json para enviar ao php
    var msgObj = {};
    //alimentar o objeto
    msgObj.titulo = inputtitulomensagem.value;
    msgObj.corpo = inputcorpomensagem.value; 
    // ajax para executar php
    $.ajax({
        type: 'POST',
        url: 'php/fcm.php',
        data: {"mensagem": JSON.stringify(msgObj)},
    });
    // fim do ajax
}
