document.addEventListener("deviceready", listarExercicios, false);
document.getElementById("AddExercicio").addEventListener("click", addExercicio, false);
document.getElementById("listarExercicios").addEventListener("click", listarExercicios, false);

function getIndice(){
  indiceJson = window.localStorage.getItem("indiceExercicio");
  indiceArray = JSON.parse(indiceJson);

  return indiceArray;
}

function GerarChave(){
    indiceArray = getIndice();

    if(indiceArray == null) {
       window.localStorage.setItem("indiceExercicio", '[0]');
       novo = 0;
    }
    else{
      novo = indiceArray.length;
      indiceArray.push(novo);
      indiceJson = JSON.stringify(indiceArray);
      window.localStorage.setItem("indiceExercicio", indiceJson);
    }

    return novo;
}

function addExercicio(){
  var exercicioJson = MontarJson();
  var chave = GerarChave();

  window.localStorage.setItem(chave, exercicioJson);

  alert("Exercício cadastrado com sucesso");

  listarExercicios();

}

function MontarJson(){
  var nomeExercicio = document.getElementById('idNomeExercicio').value;
  var areaExercicio = document.getElementById('idAreaTrabalhada').value;
  var equipamentoExercicio = document.getElementById('idEquipamentoUtilizado').value;
  var calGastasHora = document.getElementById('idCalGastasHora').value;

  var exercicioJson = JSON.stringify({
    NomeExercicio : nomeExercicio,
    AreaExercicio : areaExercicio,
    EquipamentoExercicio : equipamentoExercicio,
    CaloriasGastas : calGastasHora
  });

  return exercicioJson;

}

function listarExercicios(){


  indiceArray = getIndice();

  var lista = '<table>';

  for(var i=0;i < indiceArray.length; i++){
    chave = indiceArray[i];

    if (chave != null) {
      exercicioJson = window.localStorage.getItem(chave);

      exercicioArray = JSON.parse(exercicioJson);
      console.log(window.localStorage.getItem(chave));

      lista = lista + '<tr><td>' + chave + '</td><td>' + exercicioArray.NomeExercicio + '</td><td>' + exercicioArray.AreaExercicio + '</td><td>' + exercicioArray.EquipamentoExercicio +
       '</td><td>' + exercicioArray.CaloriasGastas + '</td>';
      lista = lista + "<td><a href='atualizaExercicio.html?id=" + chave + "'>atualizar</a></td>";
      lista = lista + "<td><img src='img/delete.png' id='" + chave + "' class='apagar' data-atributo='" + chave + "' /></td></tr>";                 }
  }

  lista = lista + "</table>";

  lbExercicios.innerHTML = lista;
  a = document.getElementsByClassName("apagar");
  for(i = 0; i < a.length; i++){
    a[i].addEventListener("click", function(){
      apagar(this.getAttribute("data-atributo"));
    });
  }
console.log(exercicioJson);
}

function apagar(chave){
  window.localStorage.removeItem(chave);

  ApagarChave(chave);

  alert("Exercício apagado com sucesso");

  listarExercicios();

}

function ApagarChave(chave){
  indiceArray = getIndice();

  indiceArray[chave] = null;

  indiceJson = JSON.stringify(indiceArray);
  window.localStorage.setItem("indiceExercicio", indiceJson);

}