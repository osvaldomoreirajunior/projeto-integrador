document.getElementById("AtualizarRegistro").addEventListener("click", AtualizarRegistro, false);
document.getElementById("VoltarIndex").addEventListener("click", VoltarIndex, false);

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

document.addEventListener("deviceready", montarFormulario, false);

function montarFormulario(){
  var chave = _GET('id');
  console.log(chave);
  if (chave != null)
    categoriaJson = window.localStorage.getItem(chave);

  categoriaArray = JSON.parse(categoriaJson);
  console.log(categoriaArray);

  document.getElementById('idNomeCategoria').value = categoriaArray.nomeCategoria;

}

function AtualizarRegistro(){

  var chave = _GET('id');
  var contatoJson = MontarJson();

  window.localStorage.setItem(chave, contatoJson);

  alert("Cliente Atualizado com sucesso");

  VoltarIndex();
}

function MontarJson(chaveCategoria){
  var nomeCat = document.getElementById('idNomeCategoria').value;
  var chaveCategoria = _GET('id');

  var categoriaJson = JSON.stringify({
    id : chaveCategoria,
    nomeCategoria : nomeCat
  });
  return categoriaJson;
}

function VoltarIndex(){
  location.href="cadastroCategorias.html";
}