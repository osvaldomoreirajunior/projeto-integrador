document.addEventListener("deviceready", listarRegistros, false);
document.getElementById("AddValue").addEventListener("click", AddValue, false);
document.getElementById("listarRegistros").addEventListener("click", listarRegistros, false);

function getIndice(){
  indiceJson = window.localStorage.getItem("indice");
  indiceArray = JSON.parse(indiceJson);

  return indiceArray;
}

function GerarChave(){
    indiceArray = getIndice();

    if(indiceArray == null) {
       window.localStorage.setItem("indice", '[0]');
       novo = 0;
    }
    else{
      novo = indiceArray.length;
      indiceArray.push(novo);
      indiceJson = JSON.stringify(indiceArray);
      window.localStorage.setItem("indice", indiceJson);
    }

    return novo;
}

function AddValue(){
  var contatoJson = MontarJson();
  var chave = GerarChave();

  window.localStorage.setItem(chave, contatoJson);

  alert("Cliente cadastrado com sucesso");

  listarRegistros();

}

function MontarJson(){
  var nome = document.getElementById('idNomeCliente').value;
  var peso = document.getElementById('idPesoCliente').value;
  var altura = document.getElementById('idAlturaCliente').value;
  // var sexo = document.getElementById('idSexoCliente').value;

  var contatoJson = JSON.stringify({
    nomeCliente : nome,
    pesoCliente : peso,
    alturaCliente : altura
    // idSexoCliente : sexo
  });

  return contatoJson;

}

function listarRegistros(){


  indiceArray = getIndice();

  var lista = '<table class="table table-striped">';
      lista = lista + '<thead>';
      lista = lista + '<tr>';
      lista = lista + '<th scope="col">ID</th>';
      lista = lista + '<th scope="col">Nome</th>';
      lista = lista + '<th scope="col">Peso</th>';
      lista = lista + '<th scope="col">Altura</th>';
      lista = lista + '</tr>';
      lista = lista + '</thead>';

  for(var i=0;i < indiceArray.length; i++){
    chave = indiceArray[i];

    if (chave != null) {
      contatoJson = window.localStorage.getItem(chave);

      contatoArray = JSON.parse(contatoJson);
      
      lista = lista + '<tbody><tr>';
      lista = lista + '<td>'+chave+'</td>';
      lista = lista + '<td>'+contatoArray.nomeCliente+'</td>';
      lista = lista + '<td>'+contatoArray.pesoCliente+'</td>';
      lista = lista + '<td>'+contatoArray.alturaCliente+'</td>';
      lista = lista + "<td><a href='atualizarCliente.html?id="+chave+"'><img src='img/desenhar.png'/></a></td>";
      lista = lista + "<td><a href='#' id='" + chave + "' class='apagar' data-atributo='" + chave + "'/><img src='img/icon.png'/></td>"; 
      lista = lista + '</tr></tbody>'

               }
  }

  lista = lista + "</table>";

  lbClientes.innerHTML = lista;
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

  alert("Cliente apagado com sucesso");

  listarRegistros();

}

function ApagarChave(chave){
  indiceArray = getIndice();

  indiceArray[chave] = null;

  indiceJson = JSON.stringify(indiceArray);
  window.localStorage.setItem("indice", indiceJson);

}