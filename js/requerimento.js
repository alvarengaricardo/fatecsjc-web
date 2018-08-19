window.onload = inicializar;
var formRequerimento;
var refRequerimento;
var tbodyTabelaRequerimentos;
var UPDATE = "Atualizar Status";
var modo = UPDATE;
var refEditarRequerimento;

function inicializar(){
    formRequerimento = document.getElementById("form-requerimento");
    formRequerimento.addEventListener("submit", gravarRequerimentoFirebase, false);
    tbodyTabelaRequerimentos = document.getElementById("tbody-tabela-requerimentos");
    refRequerimento = firebase.database().ref().child("requerimentos");
    mostrarRequerimentoFirebase();
}

function mostrarRequerimentoFirebase(){
    refRequerimento.on("value", function(snap){
        var dados = snap.val();
        var filaMostrar = "";
        for (var key in dados){
            filaMostrar += "<tr>" +   // gera a lista de dados gravada no firebase
                                "<td>" + dados[key].tipo + "</td>" +
                                "<td>" + dados[key].ra + "</td>" +
                                "<td>" + dados[key].identificacao + "</td>" +
                                "<td>" + dados[key].complemento + "</td>" +
                                "<td>" + dados[key].data + "</td>" +
                                "<td>" + dados[key].status + "</td>" +
                                '<td> '+
                                    '<button class = "btn btn-default editar" dado-requerimento = "' + key + '">' + // botao editar
                                        '<span class="glyphicon glyphicon-pencil"></span>' +
                                    '</button>'+
                                '</td>'+
                                '<td> '+
                                    '<button class = "btn btn-danger apagar" dado-requerimento = "' + key + '">' + // botao apagar
                                        '<span class="glyphicon glyphicon-trash"></span>' +
                                        '</button>'+
                                '</td>'+
                             "</tr>";
        }
        tbodyTabelaRequerimentos.innerHTML = filaMostrar;
        if (filaMostrar != ""){
            var elementosEditar = document.getElementsByClassName("editar");
            for (var i = 0; i < elementosEditar.length; i++){
                elementosEditar[i].addEventListener("click", editarRequerimentoFirebase, false);
            }
            var elementosApagar = document.getElementsByClassName("apagar");
            for (var i = 0; i < elementosApagar.length; i++){
                elementosApagar[i].addEventListener("click", apagarRequerimentoFirebase, false);
            }
        }
    });
}

function apagarRequerimentoFirebase(){
	console.log('apagar requerimento');
    var apaga = confirm ("O requerimento será apagado. Confirma?");
    if (apaga == true){
        var keyApagarRequerimento = this.getAttribute("dado-requerimento");
        var refApagarRequerimento = refRequerimento.child(keyApagarRequerimento);
        refApagarRequerimento.remove();
    }
}


function gravarRequerimentoFirebase(event){
	console.log('gravar requerimento');
    event.preventDefault();
    if (inputstatus.value != ""){ // verifica se vazio
        var atualiza = confirm ("Confirma atualização de Status: "+inputstatus.value);
        if (atualiza == true){
            refEditarRequerimento.update({
                status: event.target.status.value, 
            });
            document.getElementById("botao-atualizar-requerimento").value = UPDATE;
        }
        formRequerimento.reset();
    }
}

function editarRequerimentoFirebase(){
	console.log('editar requerimento');
    var keyEditarRequerimento = this.getAttribute("dado-requerimento");
    refEditarRequerimento = refRequerimento.child(keyEditarRequerimento);
    refEditarRequerimento.once("value", function(snap){
        var dados = snap.val();
        document.getElementById("inputstatus").value = dados.status; 
    });
    document.getElementById("botao-atualizar-requerimento").value = UPDATE;
    modo = UPDATE;
}