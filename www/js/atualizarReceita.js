document.getElementById("AtualizarRegistro").addEventListener("click", AtualizarRegistro, false);
document.getElementById("VoltarReceita").addEventListener("click", VoltarReceita, false);

function _GET(name) {
  var url = window.location.search.replace("?", "");
  var itens = url.split("&");

  for (n in itens) {
    if (itens[n].match(name)) {
      return decodeURIComponent(itens[n].replace(name + "=", ""));
    }
  }
  return null;
}

//document.addEventListener("deviceready", montarFormulario, false);

function montarFormulario() {
  var chave = _GET('id');

  if (chave != null)
    contatoJson = window.localStorage.getItem(chave);

  let receitaArray = JSON.parse(contatoJson);

  document.getElementById('idNomeReceita').value = receitaArray.nomeReceita;
  document.getElementById('idValorReceita').value = receitaArray.valorReceita;

  //document.getElementById('idValorMensalReceita').value = receitaArray.flagValorMensal;

  if(receitaArray.flagValorMensal == true){
    document.getElementById('idValorMensalReceita').checked = true;
    document.getElementById('idDiaPagamentoReceita').removeAttribute("style");
    document.getElementById('idDiaPagamentoReceita').setAttribute("style", "border-radius: 10px; width: 225px; text-align: center;");
  }
  
  document.getElementById('idDiaPagamentoReceita').value = receitaArray.diaPagamentoReceita;
}

function AtualizarRegistro() {

  let nomeReceita = document.getElementById('idNomeReceita').value;
  let valorReceita = document.getElementById('idValorReceita').value;
  let diaPagamentoReceita = document.getElementById('idDiaPagamentoReceita').value;

  if (document.getElementById('idValorMensalReceita').checked == true) {
    let controleFlagValorMensal = true;
    if (nomeReceita == '') {
      alert("O campo da descrição é necessário!");
    } else if (valorReceita == '') {
      alert("O campo do valor é necessário!");
    } else if (diaPagamentoReceita == '') {
      alert("O campo do dia do pagamento é necessário!");
    } else {
      var chave = _GET('id');
      var contatoJson = MontarJson(chave,controleFlagValorMensal);
      window.localStorage.setItem(chave, contatoJson);
      alert("Cliente Atualizado com sucesso");
      VoltarReceita();
    }
  } else {
    let controleFlagValorMensal = false;
    if (nomeReceita == '') {
      alert("O campo da descrição é necessário!");
    } else if (valorReceita == '') {
      alert("O campo do valor é necessário!");
    } else {
      var chave = _GET('id');
      var contatoJson = MontarJson(chave,controleFlagValorMensal);
      window.localStorage.setItem(chave, contatoJson);
      alert("Cliente Atualizado com sucesso");
      VoltarReceita();
    }
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

function VoltarReceita() {
  location.href = "cadastroReceitas.html";
}