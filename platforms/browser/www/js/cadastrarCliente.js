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
      //console.log("Indice Json "+indiceJson);
      window.localStorage.setItem("indice", indiceJson);
    }

    return "c"+novo;
}

function AddValue(){
  var chave = GerarChave();
  var contatoJson = MontarJson(chave);

  window.localStorage.setItem(chave, contatoJson);


  listarRegistros();

}

function MontarJson(chaveCliente){
  var nome = document.getElementById('idNomeCliente').value;
  var peso = document.getElementById('idPesoCliente').value;
  var altura = document.getElementById('idAlturaCliente').value;

  var contatoJson = JSON.stringify({
    id : chaveCliente,
    nomeCliente : nome,
    pesoCliente : peso,
    alturaCliente : altura

  });

  return contatoJson;

}

function listarRegistros(){


  indiceArray = getIndice();

  var lista = '<table class="table table-striped">';
      lista = lista + '<thead>';
      lista = lista + '<tr>';
      lista = lista + '<th scope="col">Nome</th>';

      lista = lista + '<th scope="col"></th>';
      lista = lista + '<th scope="col"></th>';
      lista = lista + '<th scope="col"></th>';
      lista = lista + '</tr>';
      lista = lista + '</thead>';

  var chave2;
  for(var i=0;i < indiceArray.length; i++){
     chave = indiceArray[i];

    if (chave != null) {
      chave2 = "c"+indiceArray[i];      
      contatoJson = window.localStorage.getItem(chave2);

      contatoArray = JSON.parse(contatoJson);

      //lista = lista + '<tr><td>' + chave2 + '</td><td>' + contatoArray.nomeCliente + '</td><td>' + contatoArray.pesoCliente + '</td><td>' + contatoArray.alturaCliente + '</td>';
      //lista = lista + "<td><a href='atualizarCliente.html?id=" + chave2 + "'>Editar</a></td>";
      //lista = lista + "<td><a href='#' id='" + chave2 + "' class='apagar' data-atributo='" + chave + "' >Apagar</a></td></tr>";                 
      //lista = lista + "<td><a href='relatorioClienteTreino.html?id=" + chave + "'>Ver relatório</a></td>";

      lista = lista + '<tbody><tr>';
      lista = lista + '<td>'+contatoArray.nomeCliente+'</td>';
      lista = lista + '<td></td>';
      lista = lista + '<td></td>';
      lista = lista + "<td><a href='atualizarCliente.html?id="+chave2+"'><img src='img/desenhar.png'/></a></td>";
      lista = lista + "<td><a href='#' id='" + chave2 + "' class='apagar' data-atributo='" + chave + "'/><img src='img/icon.png'/></td>";
      lista = lista + "<td><a href='relatorioClienteTreino.html?id=" + chave + "'><img src='img/prancheta.png'/></a></td>"; 
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
  window.localStorage.removeItem("c"+chave);

  ApagarChave(chave);

  listarRegistros();

}

function ApagarChave(chave){
  indiceArray = getIndice();

  indiceArray[chave] = null;

  indiceJson = JSON.stringify(indiceArray);
  window.localStorage.setItem("indice", indiceJson);

}