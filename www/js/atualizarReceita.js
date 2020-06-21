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

  var dataFormatada = receitaArray.diaPagamentoReceita.split("-").reverse().join("-");
  document.getElementById('idDiaPagamentoReceita').value = dataFormatada;

}

function AtualizarRegistro() {

  let nomeReceita = document.getElementById('idNomeReceita').value;
  let valorReceita = document.getElementById('idValorReceita').value;
  let diaPagamentoReceita = document.getElementById('idDiaPagamentoReceita').value;

    if (nomeReceita == '') {
      alert("O campo da descrição é necessário!");
    } else if (valorReceita == '') {
      alert("O campo do valor é necessário!");
    } else if (diaPagamentoReceita == '') {
      alert("O campo do dia do pagamento é necessário!");
    } else {
      var chave = _GET('id');
      var contatoJson = MontarJson(chave);
      window.localStorage.setItem(chave, contatoJson);
      alert("Receita atualizada com sucesso");
      VoltarReceita();
  }
}

function MontarJson(chaveCliente) {
  var nome = document.getElementById('idNomeReceita').value;
  var valor = document.getElementById('idValorReceita').value;
  var diaPagamento = document.getElementById('idDiaPagamentoReceita').value;
  var dataFormatada = diaPagamento.split("-").reverse().join("-");

  var contatoJson = JSON.stringify({
    id: chaveCliente,
    nomeReceita: nome,
    valorReceita: valor,
    diaPagamentoReceita: dataFormatada
  });
  return contatoJson;
}

function VoltarReceita() {
  location.href = "cadastroReceitas.html";
}