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

    return "e"+novo;
}

function addExercicio(){
  var chave = GerarChave();
  var exercicioJson = MontarJson(chave);

  window.localStorage.setItem(chave, exercicioJson);


  listarExercicios();

}

function MontarJson(chaveExercicio){

  var nomeExercicio = document.getElementById('idNomeExercicio').value;
  var areaExercicio = document.getElementById('idAreaTrabalhada').value;
  var equipamentoExercicio = document.getElementById('idEquipamentoUtilizado').value;
  var calGastasHora = document.getElementById('idCalGastasHora').value;

  var exercicioJson = JSON.stringify({
    id : chaveExercicio,
    NomeExercicio : nomeExercicio,
    AreaExercicio : areaExercicio,
    EquipamentoExercicio : equipamentoExercicio,
    CaloriasGastas : calGastasHora
  });

  return exercicioJson;

}

function listarExercicios(){


  indiceArray = getIndice();

  var lista = '<table class="table table-striped">';
      lista = lista + '<thead>';
      lista = lista + '<tr>';
      lista = lista + '<th scope="col">Exercício</th>';
      lista = lista + '<th scope="col">Cal/h</th>';
      lista = lista + '<th scope="col"></th>';
      lista = lista + '<th scope="col"></th>';
      lista = lista + '</tr>';
      lista = lista + '</thead>';

  var chave2;
  for(var i=0;i < indiceArray.length; i++){
    chave = indiceArray[i];

    if (chave != null) {
      chave2 = "e"+indiceArray[i];
      exercicioJson = window.localStorage.getItem(chave2);

      exercicioArray = JSON.parse(exercicioJson);
      console.log(window.localStorage.getItem(chave2));

      lista = lista + '<tbody><tr>';
      lista = lista + '<td>'+exercicioArray.NomeExercicio+'</td>';
      lista = lista + '<td>'+exercicioArray.CaloriasGastas+'</td>';
      lista = lista + '<td></td>';
      lista = lista + '<td></td>';
      lista = lista + "<td><a href='atualizaExercicio.html?id="+chave2+"'><img src='img/desenhar.png'/></a></td>";
      lista = lista + "<td><a href='#' id='" + chave2 + "' class='apagar' data-atributo='" + chave + "'/><img src='img/icon.png'/></td>"; 
      lista = lista + '</tr></tbody>'

      //lista = lista + '<tr><td>' + chave2 + '</td><td>' + exercicioArray.NomeExercicio + '</td><td>' + exercicioArray.AreaExercicio + '</td><td>' + exercicioArray.EquipamentoExercicio +
      // '</td><td>' + exercicioArray.CaloriasGastas + '</td>';
      //lista = lista + "<td><a href='atualizaExercicio.html?id=" + chave2 + "'>atualizar</a></td>";
      //lista = lista + "<td><a href='#' id='" + chave2 + "' class='apagar' data-atributo='" + chave + "' >Apagar</a></td></tr>";                 
      
    }
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
  window.localStorage.removeItem("e"+chave);

  ApagarChave(chave);


  listarExercicios();

}

function ApagarChave(chave){
  indiceArray = getIndice();

  indiceArray[chave] = null;

  indiceJson = JSON.stringify(indiceArray);
  window.localStorage.setItem("indiceExercicio", indiceJson);

}