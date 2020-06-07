document.addEventListener("deviceready", listarTreinos, false);
document.getElementById("idBotaoAdicionar").addEventListener("click", addTreino, false);
document.getElementById("idListarTreinos").addEventListener("click", listarTreinos, false);
popularSelectExercicio();
popularSelectCliente();

function getIndice(){
  indiceJson = window.localStorage.getItem("indiceTreino");
  indiceArray = JSON.parse(indiceJson);

  return indiceArray;
}

function GerarChave(){
  indiceArray = getIndice();

  if(indiceArray == null) {
   window.localStorage.setItem("indiceTreino", '[0]');
   novo = 0;
 }
 else{
  novo = indiceArray.length;
  indiceArray.push(novo);
  indiceJson = JSON.stringify(indiceArray);
  window.localStorage.setItem("indiceTreino", indiceJson);
}

return "t"+novo;
}

function atualizarClientePeso(chaveCliente, chaveExercicio) {
  var dataHoraInicio = document.getElementById('idHoraInicialTreino').value;
  var dataHoraFinal = document.getElementById('idHoraFinalTreino').value;

  var s = dataHoraInicio.split(':');
  var e = dataHoraFinal.split(':');

  var end = parseInt(e[0])* 60+ parseInt(e[1]);
  var start = parseInt(s[0])*60 + parseInt(s[1]);

  var minutos = end - start;

  var horas = parseInt(minutos/60);

  treinoExercicioJson = window.localStorage.getItem(chaveExercicio);
  treinoExercicioArray = JSON.parse(treinoExercicioJson);
  var objJsonExercicio = JSON.parse(treinoExercicioArray.NomeExercicioCbo);
  var caloriaExercicio = objJsonExercicio.CaloriasGastas;

  treinoClienteJson = window.localStorage.getItem(chaveCliente);
  treinoClienteArray = JSON.parse(treinoClienteJson);
  var pesoAtualCliente = objJsonCliente.pesoCliente;

  var caloriasEmPeso = caloriaExercicio * 0.00012959782;

  var caloriasPerdidas = caloriasEmPeso * horas;

  var novoPesoCliente = (pesoAtualCliente - caloriasPerdidas);

  var nome = treinoClienteArray.nomeCliente;
  var altura = treinoClienteArray.alturaCliente;

  var clienteJson = JSON.stringify({
    nomeCliente : nome,
    pesoCliente : novoPesoCliente,
    alturaCliente : altura  
  });

  window.localStorage.setItem(chaveCliente, clienteJson);
}

function addTreino(){
  var treinoJson = MontarJson();
  var chave = GerarChave();

  window.localStorage.setItem(chave, treinoJson);

  var clienteChave = document.getElementById('idNomeCliente').value;
  var exercicioChave = document.getElementById('idNomeExercicio').value;
  atualizarClientePeso(clienteChave,exercicioChave);


  listarTreinos();

}


function atualizarClientePeso(chaveCliente, chaveExercicio) {
  var dataHoraInicio = document.getElementById('idHoraInicialTreino').value;
  var dataHoraFinal = document.getElementById('idHoraFinalTreino').value;

  var s = dataHoraInicio.split(':');
  var e = dataHoraFinal.split(':');

  var end = parseInt(e[0])* 60+ parseInt(e[1]);
  var start = parseInt(s[0])*60 + parseInt(s[1]);

  var minutos = end - start;

  var horas = parseInt(minutos/60);

  treinoExercicioJson = window.localStorage.getItem(chaveExercicio);
  
  var objJsonExercicio = JSON.parse(treinoExercicioJson);
  var caloriaExercicio = objJsonExercicio.CaloriasGastas;

  treinoClienteJson = window.localStorage.getItem(chaveCliente);
  treinoClienteObj = JSON.parse(treinoClienteJson);
  var pesoAtualCliente = treinoClienteObj.pesoCliente;

  var caloriasEmPeso = caloriaExercicio * 0.00012959782;

  var caloriasPerdidas = caloriasEmPeso * horas;

  var novoPesoCliente = (pesoAtualCliente - caloriasPerdidas);
  
  var nome = treinoClienteObj.nomeCliente;
  var altura = treinoClienteObj.alturaCliente;
  var id = treinoClienteObj.id;

  var clienteJson = JSON.stringify({
    id : id,
    nomeCliente : nome,
    pesoCliente : novoPesoCliente,
    alturaCliente : altura  
  });

  window.localStorage.setItem(chaveCliente, clienteJson);
}


function MontarJson(){
  var nomeCliente = document.getElementById('idNomeCliente');
  var nomeExercicio = document.getElementById('idNomeExercicio');
  var data = document.getElementById('idDataTreino').value;
  var dataHoraInicio = document.getElementById('idHoraInicialTreino').value;
  var dataHoraFinal = document.getElementById('idHoraFinalTreino').value;

// Formatando a data YYYY-MM-DD para DD-MM-YYYY
var dataFormatada = data.split("-").reverse().join("-");

var treinoJson = JSON.stringify({
  NomeClienteCbo : retornaJson(nomeCliente.value),
  NomeExercicioCbo : retornaJson(nomeExercicio.value),
  DataTreino : dataFormatada,
  HoraInicioTreino : dataHoraInicio,
  HoraFimTreino : dataHoraFinal,
});

return treinoJson;

}

function listarTreinos(){


  indiceArray = getIndice();

  var lista = '<table class="table table-striped">';
      lista = lista + '<thead>';
      lista = lista + '<tr>';
      lista = lista + '<th scope="col">Nome</th>';
      lista = lista + '<th scope="col">Treino</th>';
      lista = lista + '<th scope="col">Data</th>';
      lista = lista + '<th scope="col"></th>';
      lista = lista + '<th scope="col"></th>'
      lista = lista + '</tr>';
      lista = lista + '</thead>';

  var chave2;
  for(var i=0;i < indiceArray.length; i++){
    chave = indiceArray[i];

    if (chave != null) {
      chave2 = "t"+indiceArray[i];
      treinoJson = window.localStorage.getItem(chave2);

      treinoArray = JSON.parse(treinoJson);
      
      var objJsonCliente = JSON.parse(treinoArray.NomeClienteCbo);
      var novoNomeCliente = objJsonCliente.nomeCliente;

      var objJsonExercicio = JSON.parse(treinoArray.NomeExercicioCbo);
      var novoNomeExercicio = objJsonExercicio.NomeExercicio;
      

      //lista = lista + '<tr><td>' + novoNomeCliente + '</td><td>' + novoNomeExercicio + '</td><td>' + treinoArray.DataTreino + '</td> <td> ' + treinoArray.HoraInicioTreino + '</td> <td>'+ treinoArray.HoraFimTreino +'</td>';
      //lista = lista + "<td><a href='atualizarTreino.html?id=" + chave2 + "'>Editar</a></td>";
      //lista = lista + "<td><a href='#' id='" + chave2 + "' class='apagar' data-atributo='" + chave + "' >Apagar</a></td></tr>";

      lista = lista + '<tbody><tr>';
      lista = lista + '<td>'+novoNomeCliente+'</td>';
      lista = lista + '<td>'+novoNomeExercicio+'</td>';
      lista = lista + '<td>'+treinoArray.DataTreino+'</td>';
      lista = lista + "<td><a href='atualizarTreino.html?id="+chave2+"'><img src='img/desenhar.png'/></a></td>";
      lista = lista + "<td><a href='#' id='" + chave2 + "' class='apagar' data-atributo='" + chave + "'/><img src='img/icon.png'/></td>"; 
      lista = lista + '</tr></tbody>'                 
      
    }
  }

  lista = lista + "</table>";

  lbTreinos.innerHTML = lista;
  a = document.getElementsByClassName("apagar");
  for(i = 0; i < a.length; i++){
    a[i].addEventListener("click", function(){
      apagar(this.getAttribute("data-atributo"));
    });
  }
  
}

function apagar(chave){
  window.localStorage.removeItem("t"+chave);

  ApagarChave(chave);

  alert("Treino apagado com sucesso");

  listarTreinos();

}

function ApagarChave(chave){
  indiceArray = getIndice();

  indiceArray[chave] = null;

  indiceJson = JSON.stringify(indiceArray);
  window.localStorage.setItem("indiceTreino", indiceJson);

}

function getIndiceCliente(){
  indiceJson = window.localStorage.getItem("indice");
  indiceArray = JSON.parse(indiceJson);
  return indiceArray;
}

function getIndiceExercicio(){
  indiceJson = window.localStorage.getItem("indiceExercicio");
  indiceArray = JSON.parse(indiceJson);
  return indiceArray;
}

function popularSelectCliente() {
  var select = document.getElementById('idNomeCliente');
  select.length = 0;

  var opcaoPadrao = document.createElement('option');
  opcaoPadrao.text = 'Selecione...';

  select.add(opcaoPadrao);
  select.selectedIndex = 0;

  indiceArray = getIndiceCliente();
  
  var opcao;
  for(var i=0;i < indiceArray.length; i++){
    chave = indiceArray[i];
    if (chave != null) {
      chave = "c"+indiceArray[i];
      contatoJson = window.localStorage.getItem(chave);
      contatoArray = JSON.parse(contatoJson);
      opcao = document.createElement('option');
      
      opcao.text = contatoArray.nomeCliente;
      opcao.value = chave;

      select.add(opcao);

    }
  }
}

function popularSelectExercicio() {
  var select = document.getElementById('idNomeExercicio');
  select.length = 0;

  var opcaoPadrao = document.createElement('option');
  opcaoPadrao.text = 'Selecione...';

  select.add(opcaoPadrao);
  select.selectedIndex = 0;

  indiceArray = getIndiceExercicio();
  var opcao;
  for(var i=0;i < indiceArray.length; i++){
    chave = indiceArray[i];
    if (chave != null) {
      chave = "e"+indiceArray[i];
      contatoJson = window.localStorage.getItem(chave);
      contatoArray = JSON.parse(contatoJson);
      opcao = document.createElement('option');
      opcao.text = contatoArray.NomeExercicio;
      opcao.value = chave;

      select.add(opcao);

    }
  }
}


function retornaJson(chave) {
  contatoJson = window.localStorage.getItem(chave);
  return contatoJson;
}