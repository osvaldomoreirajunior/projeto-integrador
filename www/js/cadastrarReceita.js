document.addEventListener("deviceready", listarRegistros, false);
document.getElementById("AddValue").addEventListener("click", AddValue, false);
document.getElementById("listarRegistros").addEventListener("click", listarRegistros, false);

function getIndice() {
  indiceJson = window.localStorage.getItem("indiceReceita");
  indiceArray = JSON.parse(indiceJson);

  return indiceArray;
}

function GerarChave() {
  indiceArray = getIndice();

  if (indiceArray == null) {
    window.localStorage.setItem("indiceReceita", '[0]');
    novo = 0;
  }
  else {
    novo = indiceArray.length;
    indiceArray.push(novo);
    indiceJson = JSON.stringify(indiceArray);
    //console.log("Indice Json "+indiceJson);
    window.localStorage.setItem("indiceReceita", indiceJson);
  }

  return "r" + novo;
}

function AddValue() {
  let nomeReceita = document.getElementById('idNomeReceita').value;
  let valorReceita = document.getElementById('idValorReceita').value;
  let diaPagamentoReceita = document.getElementById('idDiaPagamentoReceita').value;

  if (document.getElementById('idValorMensalReceita').checked == true) {
    let controleFlagValorMensal = true;
    if (nomeReceita == '') {
      alert("O campo da descrição é necessário!");
    } else if (valorReceita == '') {
      alert("O campo do valor é necessário!");
    } else if(diaPagamentoReceita == ''){
      alert("O campo do dia do pagamento é necessário!");
    } else {
      var chave = GerarChave();
      var contatoJson = MontarJson(chave, controleFlagValorMensal);
      window.localStorage.setItem(chave, contatoJson);
      listarRegistros();
      limparCampos();
    }
  } else {
    let controleFlagValorMensal = false;
    if (nomeReceita == '') {
      alert("O campo da descrição é necessário!");
    } else if (valorReceita == '') {
      alert("O campo do valor é necessário!");
    } else {
      var chave = GerarChave();
      var contatoJson = MontarJson(chave, controleFlagValorMensal);
      window.localStorage.setItem(chave, contatoJson);
      listarRegistros();
      limparCampos();
    }
  }
}

function limparCampos() {
  document.getElementById('idNomeReceita').value = '';
  document.getElementById('idValorReceita').value = '';
  document.getElementById('idValorMensalReceita').checked = false;
  document.getElementById('idDiaPagamentoReceita').value = '';
  habilitarDiaPagamento();
}

function habilitarDiaPagamento() {
  let valorMensal = document.getElementById('idValorMensalReceita');
  if (valorMensal.checked == true) {
    document.getElementById('idDiaPagamentoReceita').removeAttribute("style");
    document.getElementById('idDiaPagamentoReceita').setAttribute("style", "border-radius: 10px; width: 225px; text-align: center;");
  } else {
    document.getElementById('idDiaPagamentoReceita').setAttribute("style", "display: none;");
  }
}

function MontarJson(chaveCliente, controleFlagValorMensal) {
  var nome = document.getElementById('idNomeReceita').value;
  var valor = document.getElementById('idValorReceita').value;
  var valorMensal = controleFlagValorMensal;
  var diaPagamento = document.getElementById('idDiaPagamentoReceita').value;

  var contatoJson = JSON.stringify({
    id: chaveCliente,
    nomeReceita: nome,
    valorReceita: valor,
    flagValorMensal: valorMensal,
    diaPagamentoReceita: diaPagamento
  });
  return contatoJson;
}

function listarRegistros() {


  indiceArray = getIndice();

  var lista = '<table class="table table-striped">';
  lista = lista + '<thead>';
  lista = lista + '<tr>';
  lista = lista + '<th scope="col">Nome</th>';
  lista = lista + '<th scope="col">Valor</th>';
  lista = lista + '<th scope="col">Mensal</th>';
  lista = lista + '<th scope="col"></th>';
  lista = lista + '</tr>';
  lista = lista + '</thead>';

  var chave2;
  for (var i = 0; i < indiceArray.length; i++) {
    chave = indiceArray[i];

    if (chave != null) {
      chave2 = "r" + indiceArray[i];
      contatoJson = window.localStorage.getItem(chave2);

      contatoArray = JSON.parse(contatoJson);

      lista = lista + '<tbody><tr>';
      lista = lista + '<td>' + contatoArray.nomeReceita + '</td>';
      lista = lista + '<td>' + contatoArray.valorReceita + '</td>';
      lista = lista + '<td>' + contatoArray.diaPagamentoReceita + '</td>';
      lista = lista + "<td><a href='atualizarReceitas.html?id=" + chave2 + "'><img src='img/desenhar.png'/></a></td>";
      lista = lista + "<td><a href='#' id='" + chave2 + "' class='apagar' data-atributo='" + chave + "'/><img src='img/icon.png'/></td>";
      lista = lista + '</tr></tbody>'
    }
  }

  lista = lista + "</table>";

  lbClientes.innerHTML = lista;
  a = document.getElementsByClassName("apagar");
  for (i = 0; i < a.length; i++) {
    a[i].addEventListener("click", function () {
      apagar(this.getAttribute("data-atributo"));
    });
  }

}

function apagar(chave) {
  window.localStorage.removeItem("r" + chave);

  ApagarChave(chave);

  listarRegistros();

}

function ApagarChave(chave) {
  indiceArray = getIndice();

  indiceArray[chave] = null;

  indiceJson = JSON.stringify(indiceArray);
  window.localStorage.setItem("indiceReceita", indiceJson);

}