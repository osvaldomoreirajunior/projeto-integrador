document.getElementById("AtualizarDespesa").addEventListener("click", AtualizarDespesa, false);
document.getElementById("VoltarDespesa").addEventListener("click", VoltarDespesa, false);

function _GET(name)
{
  var url   = window.location.search.replace("?", "");
  var itens = url.split("&");

  for(n in itens)
  {
    if( itens[n].match(name) )
    {
      return decodeURIComponent(itens[n].replace(name+"=", ""));
    }
  }
  return null;
}

//document.addEventListener("deviceready", montarFormulario, false);

function montarFormulario(){
  var chave = _GET('id');

  if (chave != null)
    despesaJson = window.localStorage.getItem(chave);
    despesaArray = JSON.parse(despesaJson);

    var categoriaJson = JSON.parse(despesaArray.CategoriaDespesaCbo);
    var nomeCategoria = categoriaJson.nomeCategoria;
    
    var dataFormatada = despesaArray.DataDespesa.split("-").reverse().join("-");

    document.getElementById('idNomeCategoria').value = nomeCategoria;
    document.getElementById('idDataDespesa').value = dataFormatada;
    document.getElementById('idNomeDespesa').value = despesaArray.NomeDespesa;
    document.getElementById('idValorDespesa').value = despesaArray.ValorDespesa;
}

function AtualizarDespesa(){

  var chave = _GET('id');
  var despesaJson = MontarJson();

  window.localStorage.setItem(chave, despesaJson);

  alert("Despesa Atualizada com sucesso");

  VoltarDespesa();
}

function MontarJson(){

  var chave = _GET('id');
  console.log(chave);
  if (chave != null)
    despesaJson = window.localStorage.getItem(chave);
    despesaArray = JSON.parse(despesaJson);

    var categoriaJson = JSON.parse(despesaArray.CategoriaDespesaCbo);
    alert(categoriaJson);

    var dataDespesa = document.getElementById('idDataDespesa').value;
    var dataDespesa = document.getElementById('idDataDespesa').value;
    var nomeDespesa = document.getElementById('idNomeDespesa').value;
    var valorDespesa = document.getElementById('idValorDespesa').value;

// Formatando a data YYYY-MM-DD para DD-MM-YYYY
var dataFormatada = dataDespesa.split("-").reverse().join("-");

var despesaJson = JSON.stringify({
  CategoriaDespesaCbo : retornaJson(categoriaJson.id),
  DataDespesa : dataFormatada,
  NomeDespesa : nomeDespesa,
  ValorDespesa : valorDespesa
});
alert(categoriaJson.id);
alert(despesaJson);
return despesaJson;
}


function VoltarDespesa(){
  location.href="cadastroDespesa.html";
}


function retornaJson(chave) {
  var json = window.localStorage.getItem(chave);
  return json;
}