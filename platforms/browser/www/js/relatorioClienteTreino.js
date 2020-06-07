document.getElementById("VoltarRelatorio").addEventListener("click", VoltarIndex, false);

function _GET(name)
{
  var url = window.location.search.replace("?", "");
  var itens = url.split("&");

  for(n in itens)
  {
    if( itens[n].match(name) )
    {
      return decodeURIComponent(itens[n].replace(name+"=", ""));
    }
  }
  return null;
}

document.addEventListener("deviceready", montarRelatorio, false);

function montarRelatorio(){
  var chave = _GET('id');

  if (chave != null) {
    chave = _GET('id');    
    clienteJson = window.localStorage.getItem("c"+chave);
    chave = "c"+chave;
    clienteArray = JSON.parse(clienteJson);
  } 

  indiceTreinoJson = window.localStorage.getItem("indiceTreino");
  indiceTreinoArray = JSON.parse(indiceTreinoJson);
  var treinoJson;
  var chaveTreino;
  var lista = lista = '<table class="table table-striped">';
      lista = lista + '<thead>';
      lista = lista + '<tr>';
      lista = lista + '<th scope="col">Exercício</th>';
      lista = lista + '<th scope="col">Data</th>';
      lista = lista + '<th scope="col">Duração</th>';
      lista = lista + '</tr>';
      lista = lista + '</thead>';

  var objJsonCliente;
  var idCliente;
  var novoNomeCliente;
  var objJsonExercicio;
  var novoNomeExercicio;
  var pesoCliente;
  var alturaCliente;
  var tempoDeTreino;

  novoNomeCliente = clienteArray.nomeCliente;
  pesoCliente =clienteArray.pesoCliente;
  alturaCliente =clienteArray.alturaCliente;

  for(var i=0;i < indiceTreinoArray.length; i++){
    chaveTreino = indiceTreinoArray[i];

    if (chaveTreino != null) {
    chaveTreino = "t"+indiceTreinoArray[i];
      treinoJson = window.localStorage.getItem(chaveTreino);

      treinoObj = JSON.parse(treinoJson);
      
      objJsonCliente = JSON.parse(treinoObj.NomeClienteCbo);
      idCliente = objJsonCliente.id;    

      if(idCliente == chave) {
        
        objJsonExercicio = JSON.parse(treinoObj.NomeExercicioCbo);
        novoNomeExercicio = objJsonExercicio.NomeExercicio;
        tempoDeTreino = converterEmHoras(treinoObj.HoraInicioTreino, treinoObj.HoraFimTreino);

      lista = lista + '<tbody><tr>';
      lista = lista + '<td>'+novoNomeExercicio+'</td>';
      lista = lista + '<td>'+treinoObj.DataTreino+'</td>';
      lista = lista + '<td>'+tempoDeTreino+" Hora(s)"+'</td>';
      lista = lista + '</tr></tbody>'

      //lista = lista + '<tr><br><td> Nome Exercicio:' + novoNomeExercicio + '</td><br><td> Data do Treino: ' + treinoObj.DataTreino + '</td> <td> Duração do Treino (hora)' + tempoDeTreino + '</td>';
      }
      
    }
  }

  lista = lista + "</table>";

  document.getElementById("idNomeCliente").innerHTML = "<b>Cliente</b>: " + novoNomeCliente;
  document.getElementById("idPesoCliente").innerHTML = "<b>Peso</b>: " + pesoCliente;
  document.getElementById("idAlturaCliente").innerHTML ="<b>Altura</b>: " + alturaCliente;
  document.getElementById("idSituacaoIMC").innerHTML = "<b>IMC</b>: " +calcularImc(pesoCliente,alturaCliente);

  idRelatorio.innerHTML = lista;
  a = document.getElementsByClassName("apagar");
  for(i = 0; i < a.length; i++){
    a[i].addEventListener("click", function(){
      apagar(this.getAttribute("data-atributo"));
    });
  }


}

function calcularImc(peso,altura) {
  var imc =peso/(altura*altura);

  if(imc < 18.5) {
    return "Abaixo do peso";
  }
  if(imc >= 18.5 && imc <= 24.9) {
    return "Peso Normal";
  }
  if(imc >= 25 && imc <= 29.9) {
    return "Sobrepeso";
  }
  if(imc >= 30 && imc <= 34.9) {
    return "Obesidade Grau I";
  }
  if(imc >= 35 && imc <= 39.9) {
    return "Obesidade Grau II";
  }
  if(imc >= 40) {
    return "Obesidade Grau III";
  }
  return "";
}


function converterEmHoras(dataHoraInicio,dataHoraFinal) {

  var s = dataHoraInicio.split(':');
  var e = dataHoraFinal.split(':');

  var end = parseInt(e[0])* 60+ parseInt(e[1]);
  var start = parseInt(s[0])*60 + parseInt(s[1]);

  var minutos = end - start;

  var horas = parseInt(minutos/60);

  return horas;
}
function VoltarIndex(){
  location.href="index.html";
}