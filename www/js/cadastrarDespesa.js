document.addEventListener("deviceready", listarDespesas, false);
document.getElementById("idBotaoAdicionar").addEventListener("click", addDespesas, false);
//document.getElementById("listarDespesas").addEventListener("click", listarDespesas, false);
popularSelectCategoria();
document.getElementById("listarDespesas").addEventListener("click", listarDespesas, false);

function getIndice() {
  indiceJson = window.localStorage.getItem("indiceDespesa");
  indiceArray = JSON.parse(indiceJson);

  return indiceArray;
}

function GerarChave() {
  indiceArray = getIndice();

  if (indiceArray == null) {
    window.localStorage.setItem("indiceDespesa", '[0]');
    novo = 0;
  }
  else {
    novo = indiceArray.length;
    indiceArray.push(novo);
    indiceJson = JSON.stringify(indiceArray);
    window.localStorage.setItem("indiceDespesa", indiceJson);
  }

  return "d" + novo;
}

function addDespesas() {

  var categoriaDespesa = document.getElementById('idCategoriaNome').value;
  var dataDespesa = document.getElementById('idDataDespesa').value;
  var nomeDespesa = document.getElementById('idNomeDespesa').value;
  var valorDespesa = document.getElementById('idValorDespesa').value;

  if (categoriaDespesa == 'Selecione...') {
    alert("O campo categoria é necessário!");
  } else if (dataDespesa == '') {
    alert("O campo data despesa é necessário!");
  } else if (nomeDespesa == '') {
    alert("O campo nome da despesa é necessário!");
  } else if (valorDespesa == '') {
    alert("O campo valor é necessário!");
  } else {
    var despesaJson = MontarJson();
    var chave = GerarChave();

    window.localStorage.setItem(chave, despesaJson);
    alert("Despesa cadastrada com sucesso");
    listarDespesas();
  }
}

function MontarJson() {
  var categoriaDespesa = document.getElementById('idCategoriaNome');
  var dataDespesa = document.getElementById('idDataDespesa').value;
  var nomeDespesa = document.getElementById('idNomeDespesa').value;
  var valorDespesa = document.getElementById('idValorDespesa').value;

  // Formatando a data YYYY-MM-DD para DD-MM-YYYY
  var dataFormatada = dataDespesa.split("-").reverse().join("-");

  var despesaJson = JSON.stringify({
    CategoriaDespesaCbo: retornaJson(categoriaDespesa.value),
    DataDespesa: dataFormatada,
    NomeDespesa: nomeDespesa,
    ValorDespesa: valorDespesa
  });
  return despesaJson;
}

function retornaJson(chave) {
  despesaJson = window.localStorage.getItem(chave);
  return despesaJson;
}

function listarDespesas() {

  indiceArray = getIndice();

  var lista = '<table class="table table-striped" id="page" style="width: 100%;">';
  lista = lista + '<thead>';
  lista = lista + '<tr>';
  lista = lista + '<th scope="col">Categoria</th>';
  lista = lista + '<th scope="col">Data</th>';
  lista = lista + '<th scope="col">Nome</th>';
  lista = lista + '<th scope="col">Valor</th>';
  lista = lista + '<th scope="col"></th>'
  lista = lista + '</tr>';
  lista = lista + '</thead>';

  var chave2;
  for (var i = 0; i < indiceArray.length; i++) {
    chave = indiceArray[i];

    if (chave != null) {
      chave2 = "d" + indiceArray[i];

      despesaJson = window.localStorage.getItem(chave2);

      despesaArray = JSON.parse(despesaJson);

      var objJsonCategoria = JSON.parse(despesaArray.CategoriaDespesaCbo);

      var nomeCategoria = objJsonCategoria.nomeCategoria;

      lista = lista + '<tbody><tr>';
      lista = lista + '<td>' + nomeCategoria + '</td>';
      lista = lista + '<td>' + despesaArray.DataDespesa + '</td>';
      lista = lista + '<td>' + despesaArray.NomeDespesa + '</td>';
      lista = lista + '<td>' + despesaArray.ValorDespesa + '</td>';
      lista = lista + "<td><a href='atualizarDespesa.html?id=" + chave2 + "'><img src='img/desenhar.png'/></a></td>";
      lista = lista + "<td><a href='#' id='" + chave2 + "' class='apagar' data-atributo='" + chave + "'/><img src='img/icon.png'/></td>";
      lista = lista + '</tr></tbody>'

    }
  }

  lista = lista + "</table>";

  lbDespesas.innerHTML = lista;
  a = document.getElementsByClassName("apagar");
  for (i = 0; i < a.length; i++) {
    a[i].addEventListener("click", function () {
      apagar(this.getAttribute("data-atributo"));
    });
  }

}

function apagar(chave) {
  window.localStorage.removeItem("d" + chave);

  ApagarChave(chave);

  alert("Despesa removida com sucesso");

  listarDespesas();

}

function ApagarChave(chave) {
  indiceArray = getIndice();

  indiceArray[chave] = null;

  indiceJson = JSON.stringify(indiceArray);
  window.localStorage.setItem("indiceDespesa", indiceJson);

}


function getIndiceCategorias() {
  indiceJson = window.localStorage.getItem("indiceCategoria");
  indiceArray = JSON.parse(indiceJson);
  return indiceArray;
}

function popularSelectCategoria() {
  var select = document.getElementById('idCategoriaNome');
  select.length = 0;

  var opcaoPadrao = document.createElement('option');
  opcaoPadrao.text = 'Selecione...';

  select.add(opcaoPadrao);
  select.selectedIndex = 0;

  indiceArray = getIndiceCategorias();

  var opcao;
  for (var i = 0; i < indiceArray.length; i++) {
    chave = indiceArray[i];
    if (chave != null) {
      chave = "c" + indiceArray[i];
      categoriaJson = window.localStorage.getItem(chave);
      categoriaArray = JSON.parse(categoriaJson);
      opcao = document.createElement('option');

      opcao.text = categoriaArray.nomeCategoria;
      opcao.value = chave;

      select.add(opcao);

    }
  }
}