document.addEventListener("deviceready", listarRegistros, false);
document.getElementById("AddValue").addEventListener("click", AddValue, false);
document.getElementById("listarRegistros").addEventListener("click", listarRegistros, false);

function getIndice() {
  indiceJson = window.localStorage.getItem("indiceCategoria");
  indiceArray = JSON.parse(indiceJson);

  return indiceArray;
}

function GerarChave() {
  indiceArray = getIndice();

  if (indiceArray == null) {
    window.localStorage.setItem("indiceCategoria", '[0]');
    novo = 0;
  }
  else {
    novo = indiceArray.length;
    indiceArray.push(novo);
    indiceJson = JSON.stringify(indiceArray);
    //console.log("Indice Json "+indiceJson);
    window.localStorage.setItem("indiceCategoria", indiceJson);
  }

  return "c" + novo;
}

function AddValue() {

  var nomeCat = document.getElementById('idNomeCategoria').value;

  if (nomeCat == '') {
    alert("O campo nome categoria é necessário!")
  } else {
    var chave = GerarChave();
    var categoriaJson = MontarJson(chave);

    window.localStorage.setItem(chave, categoriaJson);
    alert("Categoria cadastrada com sucesso");
    listarRegistros();
  }

}

function MontarJson(chaveCategoria) {
  var nomeCat = document.getElementById('idNomeCategoria').value;
  var categoriaJson = JSON.stringify({
    id: chaveCategoria,
    nomeCategoria: nomeCat
  });

  return categoriaJson;

}

function listarRegistros() {


  indiceArray = getIndice();

  var lista = '<table class="table table-striped">';
  lista = lista + '<thead>';
  lista = lista + '<tr>';
  lista = lista + '<th scope="col">Nome</th>';
  lista = lista + '</tr>';
  lista = lista + '</thead>';

  var chave2;
  for (var i = 0; i < indiceArray.length; i++) {
    chave = indiceArray[i];

    if (chave != null) {
      chave2 = "c" + indiceArray[i];
      categoriaJson = window.localStorage.getItem(chave2);

      categoriaArray = JSON.parse(categoriaJson);
      lista = lista + '<tbody><tr>';
      lista = lista + '<td>' + categoriaArray.nomeCategoria + '</td>';
      lista = lista + "<td><a href='atualizarCategoria.html?id=" + chave2 + "'><img src='img/desenhar.png'/></a></td>";
      lista = lista + "<td><a href='#' id='" + chave2 + "' class='apagar' data-atributo='" + chave + "'/><img src='img/icon.png'/></td>";
      lista = lista + '</tr></tbody>'
    }
  }

  lista = lista + "</table>";

  lbCategorias.innerHTML = lista;
  a = document.getElementsByClassName("apagar");
  for (i = 0; i < a.length; i++) {
    a[i].addEventListener("click", function () {
      apagar(this.getAttribute("data-atributo"));
    });
  }

}

function apagar(chave) {
  window.localStorage.removeItem("c" + chave);

  ApagarChave(chave);

  alert("Categoria apagado com sucesso");

  listarRegistros();
}

function ApagarChave(chave) {
  indiceArray = getIndice();

  indiceArray[chave] = null;

  indiceJson = JSON.stringify(indiceArray);
  window.localStorage.setItem("indiceCategoria", indiceJson);
}