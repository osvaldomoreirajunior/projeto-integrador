document.getElementById("idBotaoRelatorio").addEventListener("click", relatorio, false);
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

function relatorio() {
  let despesa = ValorDespesaPeriodo();
  let receita = ValorReceitaPeriodo();
  let statusAtual = receita - despesa;

  dataInicial = document.getElementById('idDataInicio').value;
  dataFinal = document.getElementById('idDataFinal').value;
  if (dataInicial == '') {
    alert("A data Inicial é obrigatória!");
  } else if (dataFinal == '') {
    alert("A data Final é obrigatória!");
  } else {
    listarStatus();
    gerarGrafico(despesa, receita, statusAtual);
  }
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
        }
      } else if (selectCategoria == "Selecione...") {
        if (dataFormatada >= dataInicial && dataFormatada <= dataFinal) {
          valorDespObj = Number(despesaObj.ValorDespesa);
          valorDespesa += valorDespObj;
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
      }
    }
  }
  console.log(valorReceita);
  return valorReceita;
}

function listarStatus() {

  let totalReceita = ValorReceitaPeriodo();
  let totalDespesa = ValorDespesaPeriodo();
  let status = totalReceita - totalDespesa;

  var lista = '<table class="table table-striped">';
  lista = lista + '<thead>';
  lista = lista + '<tr>';
  lista = lista + '<th scope="col">Receita Total</th>';
  lista = lista + '<th scope="col">Despesa Total</th>';
  lista = lista + '<th scope="col">Status</th>';
  lista = lista + '</tr>';
  lista = lista + '</thead>';

  lista = lista + '<tbody><tr>';
  lista = lista + '<td>' + "R$ " + totalReceita + '</td>';
  lista = lista + '<td>' + "R$ " + totalDespesa + '</td>';

  lista = iconeFelizTriste(lista, status);

  lista = lista + '</tr></tbody>'
  lista = lista + "</table>";

  lbRelatorio.innerHTML = lista;
}

function iconeFelizTriste(lista, status){
  if(status > 0){
    lista = lista + "<td>" + "R$ " +  status + "  " + "<img src='img/happy_face.png'/></td>";
  } else {
    lista = lista + "<td>" + "R$ " + status + "  " + "<img src='img/sad_face.png'/></td>";
  }
  return lista;
}

function gerarGrafico(despesa, receita, statusAtual) {

  document.getElementById("chart-test").innerHTML = '<canvas id="myChart"></canvas>';

  let ctx = document.getElementById('myChart').getContext('2d');
  let labels = ['Despesa', 'Receita', 'Status Atual'];
  let colorHex = ['#FB3640', '#00FF7F', '#EFCA08'];

  let myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      datasets: [{
        data: [despesa, receita, statusAtual],
        backgroundColor: colorHex
      }],
      labels: labels
    },
    options: {
      responsive: true,
      legend: {
        position: 'bottom'
      },
      plugins: {
        datalabels: {
          color: '#fff',
          anchor: 'end',
          align: 'start',
          offset: -10,
          borderWidth: 2,
          borderColor: '#fff',
          borderRadius: 25,
          backgroundColor: (context) => {
            return context.dataset.backgroundColor;
          },
          font: {
            weight: 'bold',
            size: '12'
          },
          formatter: (value) => {
            return 'R$ ' + value;
          }
        }
      }
    }
  })
}