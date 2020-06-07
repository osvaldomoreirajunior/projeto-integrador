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

  if (chave != null)
    contatoJson = window.localStorage.getItem(chave);

  contatoArray = JSON.parse(contatoJson);

  var nome = document.getElementById('idNomeCliente').value = contatoArray.nomeCliente;
  var peso = document.getElementById('idPesoCliente').value = contatoArray.pesoCliente;
  var altura = document.getElementById('idAlturaCliente').value = contatoArray.alturaCliente;

}

function AtualizarRegistro(){

  var chave = _GET('id');
  var contatoJson = MontarJson();

  window.localStorage.setItem(chave, contatoJson);

  alert("Cliente Atualizado com sucesso");

  VoltarIndex();
}

function MontarJson(){
  var nome = document.getElementById('idNomeCliente').value;
  var peso = document.getElementById('idPesoCliente').value;
  var altura = document.getElementById('idAlturaCliente').value;

  var contato = JSON.stringify({
    nomeCliente : nome,
    pesoCliente : peso,
    alturaCliente : altura
  });

  return contato;
}

function VoltarIndex(){
  location.href="index.html";
}