
//Ordenação dos produtos

if(sF$.sCurrentPage.indexOf("/PROD,")==-1){sConcat="&";sCharSep="=";} else {sConcat=",";sCharSep=",";}

var oPagProdTop=document.getElementById('idPagProdTop');

if(oPagProdTop){
  var sOrderBy="<div id='idOrderByFC'>";
  sOrderBy+="<div id='idTxtOrderByFC'>Ordenar por:</div>";
  sOrderBy+="<div id='idSelOrderByFC'>";
  sOrderBy+="<select id=OrderProd class=smSelect onchange=fnNewOrder()>";
  sOrderBy+="<option value=-1>Selecione</option>";
  sOrderBy+="<option value=0>Padrão</option>";
  sOrderBy+="<option value=1>Lançamentos</option>";
  sOrderBy+="<option value=2>Destaques</option>";
  sOrderBy+="<option value=3>Nomes das categorias</option>";
  sOrderBy+="<option value=4>Nomes dos produtos</option>";
  sOrderBy+="<option value=5>Avaliações dos clientes</option>";
  sOrderBy+="<option value=7>Preços menores</option>";
  sOrderBy+="<option value=8>Preços maiores</option>";
  sOrderBy+="</select>";
  sOrderBy+="</div></div>";
  oPagProdTop.innerHTML=sOrderBy;
}

var oOrder=document.getElementById('OrderProd');
var posOrder=sF$.sCurrentPage.indexOf("ORDER"+sCharSep);

if(posOrder!=-1){
  var iOrderCurrent=sF$.sCurrentPage.substr(posOrder+6,1);
  if(!isNaN(iOrderCurrent))if(iOrderCurrent>=0){
    var i=0;
    while(i<oOrder.length && oOrder.options[i].value!=iOrderCurrent)i++;
    if(i<oOrder.length)oOrder.selectedIndex=i;
  }
}

function fnNewOrder(){
  var iOrder=oOrder.options[oOrder.selectedIndex].value;
  if(iOrder>=0){
    if(posOrder!=-1){document.location.href=document.location.href.replace(new RegExp('order'+sCharSep+iOrderCurrent),'order'+sCharSep+iOrder);}
    else{document.location.href=document.location.href.replace(new RegExp('idloja'+sCharSep+FC$.IDLoja,'gi'),'idloja'+sCharSep+FC$.IDLoja+sConcat+'order'+sCharSep+iOrder);}
  }
}