document.getElementById("idBotaoRelatorio").addEventListener("click", teste, false);
popularSelectCategoria();

function getIndiceDespesa() {
  indiceJson = window.localStorage.getItem("indiceDespesa");
  indiceArray = JSON.parse(indiceJson);

  return indiceArray;
}

function getIndiceReceita() {
  indiceJson = window.localStorage.getItem("indiceReceita");
  indiceArray = JSON.parse(indiceJson);

  return indiceArray;
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

function teste() {
  let despesa = ValorDespesaPeriodo();
  let receita = ValorReceitaPeriodo();
  console.log(receita - despesa);
  //fazer o grafico com o chart.js
}

function ValorDespesaPeriodo() {

  indiceArray = getIndiceDespesa();
  dataInicial = document.getElementById('idDataInicio').value;
  dataFinal = document.getElementById('idDataFinal').value;
  selectCategoria = document.getElementById('idCategoriaNome').value;

  valorDespesa = 0.00;

  for (var i = 0; i < indiceArray.length; i++) {
    chave = indiceArray[i];

    if (chave != null) {

      chave2 = "d" + indiceArray[i];
      despesaJson = window.localStorage.getItem(chave2);
      despesaObj = JSON.parse(despesaJson);
      dataDespesaJson = despesaObj.DataDespesa;

      categoriaDespesa = JSON.parse(despesaObj.CategoriaDespesaCbo);
      var idCategoria = categoriaDespesa.id;

      // Formatando a data YYYY-MM-DD para DD-MM-YYYY
      var dataFormatada = dataDespesaJson.split("-").reverse().join("-");

      if (selectCategoria == idCategoria) {
        if (dataFormatada >= dataInicial && dataFormatada <= dataFinal) {
          valorDespObj = Number(despesaObj.ValorDespesa);
          valorDespesa += valorDespObj;

          console.log(selectCategoria);
          console.log(idCategoria);
          console.log('valorDespesa:' + valorDespObj);
          console.log('nome despesa: ' + despesaObj.NomeDespesa);
          console.log('total:' + valorDespesa);
        }
      } else if (selectCategoria == "Selecione...") {
        if (dataFormatada >= dataInicial && dataFormatada <= dataFinal) {
          valorDespObj = Number(despesaObj.ValorDespesa);
          valorDespesa += valorDespObj;

          console.log(selectCategoria);
          console.log(idCategoria);
          console.log('valorDespesa:' + valorDespObj);
          console.log('nome despesa: ' + despesaObj.NomeDespesa);
          console.log('total:' + valorDespesa);
        }
      }
    }
  }
  console.log(valorDespesa);
  return valorDespesa;
}

function ValorReceitaPeriodo() {

  indiceArray = getIndiceReceita();
  dataInicial = document.getElementById('idDataInicio').value;
  dataFinal = document.getElementById('idDataFinal').value;

  valorReceita = 0.00;

  for (var i = 0; i < indiceArray.length; i++) {
    chave = indiceArray[i];

    if (chave != null) {

      chave2 = "r" + indiceArray[i];
      ReceitaJson = window.localStorage.getItem(chave2);
      ReceitaObj = JSON.parse(ReceitaJson);
      dataReceitaJson = ReceitaObj.diaPagamentoReceita;

      // Formatando a data YYYY-MM-DD para DD-MM-YYYY
      var dataFormatada = dataReceitaJson.split("-").reverse().join("-");

      if (dataFormatada >= dataInicial && dataFormatada <= dataFinal) {
        valorReceitaObj = Number(ReceitaObj.valorReceita);
        valorReceita += valorReceitaObj;

        console.log('valorReceita:' + valorReceita);
        console.log('nome receita: ' + ReceitaObj.nomeReceita);
        console.log('total:' + valorReceita);
      }
    }
  }
  console.log(valorReceita);
  return valorReceita;
}