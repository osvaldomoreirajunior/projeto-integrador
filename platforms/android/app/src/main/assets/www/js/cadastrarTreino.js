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

return novo;
}

function addTreino(){
  var treinoJson = MontarJson();
  var chave = GerarChave();

  window.localStorage.setItem(chave, treinoJson);

  alert("Treino cadastrado com sucesso");

  listarTreinos();

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

  var lista = '<table>';

  for(var i=0;i < indiceArray.length; i++){
    chave = indiceArray[i];

    if (chave != null) {
      treinoJson = window.localStorage.getItem(chave);

      treinoArray = JSON.parse(treinoJson);

      lista = lista + '<tr><td>' + treinoArray.NomeClienteCbo + '</td><br><td>' + treinoArray.NomeExercicioCbo + '</td><br><td>' + treinoArray.DataTreino + '</td> <td> ' + treinoArray.HoraInicioTreino + '</td> <td>'+ treinoArray.HoraFimTreino +'</td>';
      lista = lista + "<td><a href='atualizarTreino.html?id=" + chave + "'>Editar</a></td>";
      lista = lista + "<td><a href='#' id='" + chave + "' class='apagar' data-atributo='" + chave + "' >Apagar</a></td></tr>";                 
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
  window.localStorage.removeItem(chave);

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