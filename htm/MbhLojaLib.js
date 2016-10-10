// Modelo Padrão FastCommerce [08/2014] //

ImgOnError=FC$.PathImg+"nd";

var sF$=(function(){

  var sCurrentPage=document.location.href.toUpperCase();

  function fnGetID(id){
    return document.getElementById(id);
  }

  //Função que faz pré-load das imagens
  function fnPreloadImages() { //v3.0
    var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=fnPreloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
  }

 
  //Função para mostrar valor economizado em produtos em promoção
  function fnShowEconomy(ProdPrice,ProdPriceOri){
    if(ProdPrice!=ProdPriceOri)document.write("<br><font color=#6f9e45>Economize <b>"+FormatPrice(ProdPriceOri-ProdPrice,'R$')+"</b> ("+fnFormatNumber(((ProdPriceOri-ProdPrice)/ProdPriceOri)*100)+"%)</font>");
  }
  
  function fnFormatNumber(num){
    num=num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))num="0";
    sign=(num==(num=Math.abs(num)));
    num=Math.floor(num*100+0.50000000001);
    num=Math.floor(num/100).toString();
    for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)num=num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
    return ((sign)?'':'-')+num;
  }

  function fnSecurity(){window.open('custom.asp?idloja='+ FC$.IDLoja +'&arq=SiteSeguro.htm&int=1','SiteSeguro',"toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=365,height=610");}

  function fnShowCartButtons(bShowTopBottom){
    fnGetID("idContinueBuyFC").style.display="none";
    if(fnGetID("idColPesoFC"))var iColSpan=5; else var iColSpan=4; 
    var oTableItems=fnGetID("TabItens");
    if(bShowTopBottom){
      var oRow=oTableItems.insertRow(0);
      var oCell=oRow.insertCell(-1);
      oCell.colSpan=iColSpan;
      var sCel1="<table cellspacing='0' cellpadding='0' width='100%'><tr>";
            //sCel1+="<td width='33%' align='left'><a href='home.asp?IDLoja="+ FC$.IDLoja +"'><img src='"+ FC$.PathImg +"BotContComprando.png' title='Continuar comprando' border='0'></a></td>";
            //sCel1+="<td width='34%' align='center'><a href='#R' onclick='document.Lista.submit()'><img src='"+ FC$.PathImg +"BotRecalcular.png' title='Recalcular' border='0'></a></td>";
            //sCel1+="<td width='100%' align='right'><a href='#C' onclick='sF$.fnBuyImage()'><img src='"+ FC$.PathImg +"BotComprar.png' title='Comprar' border='0'></a></td>";
            //sCel1+="<td width='33%' align='left'><div class='ContinuarComprando' onclick='sF$.fnGoHome()'>Continuar comprando</div></td>";
            //sCel1+="<td width='34%' align='center'><div class='Recalcular' onclick='document.Lista.submit()'>Recalcular</div></td>";
            sCel1+="<td width='100%' align='right'><div class='ComprarCesta' onclick='sF$.fnBuyImage()'>Concluir compra</div></td>";
          sCel1+="</tr></table>";
      oCell.innerHTML=sCel1;
    }
    var oRow=oTableItems.insertRow(-1);
    var oCell=oRow.insertCell(-1);
    oCell.colSpan=iColSpan;
    var sCel2="<table cellspacing='0' cellpadding='0' width='100%'><tr>";
//          sCel2+="<td width='33%' align='left'><a href='home.asp?IDLoja="+ FC$.IDLoja +"'><img src='"+ FC$.PathImg +"BotContComprando.png' title='Continuar comprando' border='0'></a></td>";
//          sCel2+="<td width='34%' align='center'><a href='#R' onclick='document.Lista.submit()'><img src='"+ FC$.PathImg +"BotRecalcular.png' title='Recalcular' border='0'></a></td>";
//          sCel2+="<td width='33%' align='right'><a href='#C' onclick='sF$.fnBuyImage()'><img src='"+ FC$.PathImg +"BotComprar.png' title='Comprar' border='0'></a></td>";
            sCel2+="<td width='33%' align='left'><div class='ContinuarComprando' onclick='sF$.fnGoHome()'>Continuar comprando</div></td>";
            sCel2+="<td width='34%' align='center'><div class='Recalcular' onclick='document.Lista.submit()'>Recalcular</div></td>";
            sCel2+="<td width='33%' align='right'><div class='ComprarCesta' onclick='sF$.fnBuyImage()'>Concluir compra</div></td>";

        sCel2+="</tr></table>";
    oCell.innerHTML=sCel2;
    fnGetID("TabBotoes").style.display='none';
  }

  function fnGoHome(){
    document.location.href="home.asp?IDLoja="+ FC$.IDLoja
  }

  function fnBuyImage(){
    document.getElementsByName("Comprar")[0].click();
  }

  function fnStoreFit(){
    if(FC$.Page=="Home"){
      fnGetID("idHomeFC").className="large-12 columns";
      fnGetID("idLeftBarFC").style.display="none";
    }
    else if(FC$.Page=="Products"){
      fnGetID("idProductsFC").className="large-12 columns";
      fnGetID("idLeftBarFC").style.display="none";
      fnGetID("idTitTextoFC").style.display="none";
    }
    else if(FC$.Page=="Categories"){
      //document.getElementById("idULCategoryListFC").className+=" large-block-grid-6";
    }
  }

  function fnLogout(ClientName){
    if(ClientName!=""){
      var oLinkLogin=fnGetID("idLinkLoginFC");
      if(oLinkLogin){
        oLinkLogin.innerHTML="Logout";
        oLinkLogin.href="cadastro.asp?idloja="+ FC$.IDLoja +"&logoff=true";
      }
    }
  }

  function fnShowSharing(ProductID){
    popup=window.open("indiqueproduto.asp?idloja="+ FC$.IDLoja +"&idproduto="+ProductID,"Indique","top=10,left=10,width=600,height=750,scrollbars=auto");
    popup.focus();
    return void(0);
  }

  var iPL=0;
  function fnShowPrice(Price,OriginalPrice,Cod,iMaxParcels,ProductID){
    iPL++;
    console.log(ProductID+ " iPL="+ iPL +" Price="+Price +" OriginalPrice="+ OriginalPrice +" Cod="+ Cod);
    var idPrice=fnGetID("idProdPrice"+ProductID);
    var sPrice="";
    if(Price==0 && OriginalPrice==0){
      if(idPrice)idPrice.innerHTML="<span class=price><strong><span class=currency><a href=/faleconosco.asp?idloja="+FC$.IDLoja+"&assunto=Consulta%20sobre%20produto%20(Código%20"+Cod+")>Consulte-nos</a></span></strong></span>";
      return void(0);
    }
    var iPrice=Price.toString().split(".");
    if(iPrice.length==2){
      var iPriceInt=iPrice[0];
      var PriceDecimal=iPrice[1];
      if(PriceDecimal.length=1)PriceDecimal+="0";
      }
      else{
      var iPriceInt=iPrice;
      var PriceDecimal="00";
    }    

    var sInterest;
    if(Price==0||iMaxParcels==1||Juros.length==0){return void(0);}
    if(iMaxParcels==0||iMaxParcels>Juros.length)iMaxParcels=Juros.length;
    if(Juros[iMaxParcels-1]>0)sInterest=""; else sInterest=" sem juros";

    if(Price!=OriginalPrice){
      sPrice+="<div class=\"prices\">";
      sPrice+="  <div class=\"old-price\">De: <span>"+FormatPrice(OriginalPrice,'R$')+"</span><div class=\"por\">Por</div></div>";
      sPrice+="  <div class=\"price\"><strong><span class=\"currency\">R$ </span><span class=\"int\">"+ fnFormatNumber(iPriceInt) +"</span><span class=\"dec\">,"+ PriceDecimal +"</span></strong></div>";
      sPrice+="  <div class=\"installments\"><strong><span class=\"installment-count\">"+ iMaxParcels +"</span>x</strong> de <strong><span class=\"installment-price\">"+FormatPrecoReais(CalculaParcelaJurosCompostos(Price,iMaxParcels))+"</span></strong>"+ sInterest +"</div>";
      sPrice+="</div>";
    }
    else{
      sPrice+="<div class=\"prices\">";
      sPrice+="  <div class=\"old-price\"><span>&nbsp;</span><div class=\"por\">Por</div></div>";
      sPrice+="  <div class=\"price\"><strong><span class=\"currency\">R$ </span><span class=\"int\">"+ fnFormatNumber(iPriceInt) +"</span><span class=\"dec\">,"+ PriceDecimal +"</span></strong></div>";
      sPrice+="  <div class=\"installments\"><strong><span class=\"installment-count\">"+ iMaxParcels +"</span>x</strong> de <strong><span class=\"installment-price\">"+FormatPrecoReais(CalculaParcelaJurosCompostos(Price,iMaxParcels))+"</span></strong>"+ sInterest +"</div>";
      sPrice+="</div>";
    }

    if(idPrice)idPrice.innerHTML=sPrice;

  }
  

  //FUNÇÃO VELHA
  function fnShowPrice0(Price,OriginalPrice,Cod,iMaxParcels){
    if(Price==0 && OriginalPrice==0){
      document.write("<span class=EstPrecoPOR><a href=/faleconosco.asp?idloja="+FC$.IDLoja+"&assunto=Consulta%20sobre%20produto%20(Código%20"+Cod+")>Consulte-nos</a></span>");
      return void(0);
    }
    var iPrice=Price.toString().split(".");
    if(iPrice.length==2){
      var iPriceInt=iPrice[0];
      var PriceDecimal=iPrice[1];
      if(PriceDecimal.length=1)PriceDecimal+="0";
      }
      else{
      var iPriceInt=iPrice;
      var PriceDecimal="00";
    }    

    var sInterest;
    if(Price==0||iMaxParcels==1||Juros.length==0)return;
    if(iMaxParcels==0||iMaxParcels>Juros.length)iMaxParcels=Juros.length;
    if(Juros[iMaxParcels-1]>0)sInterest=""; else sInterest=" sem juros";


    if(Price!=OriginalPrice){
      //document.write("<span class=EstPrecoDE>de "+FormatPrice(OriginalPrice,'R$')+"</span><br><span class=EstPrecoPOR>por "+FormatPrice(Price,'R$')+"</span>");
      document.write("<div class=\"prices\">");
      document.write("  <div class=\"old-price\">De: <span>"+FormatPrice(OriginalPrice,'R$')+"</span><div class=\"por\">Por</div></div>");
      document.write("  <div class=\"old-price-padding\" style=\"display: none;\"></div>");
      document.write("  <div class=\"price\"><strong><span class=\"currency\">R$ </span><span class=\"int\">"+ fnFormatNumber(iPriceInt) +"</span><span class=\"dec\">,"+ PriceDecimal +"</span></strong></div>");
      document.write("  <div class=\"installments\"><strong><span class=\"installment-count\">"+ iMaxParcels +"</span>x</strong> de <strong><span class=\"installment-price\">"+FormatPrecoReais(CalculaParcelaJurosCompostos(Price,iMaxParcels))+"</span></strong>"+ sInterest +"</div>");
      document.write("  <div class=\"no-installments\" style=\"display: none;\">à vista</div>");
      document.write("</div>");
    }
    else{
      //document.write("<span class=EstPrecoPOR>por "+FormatPrice(Price,'R$')+"</span>");
      document.write("<div class=\"prices\">");
      document.write("  <div class=\"old-price\"><span>&nbsp;</span><div class=\"por\">Por</div></div>");
      document.write("  <div class=\"old-price-padding\" style=\"display: none;\"></div>");
      document.write("  <div class=\"price\"><strong><span class=\"currency\">R$ </span><span class=\"int\">"+ fnFormatNumber(iPriceInt) +"</span><span class=\"dec\">,"+ PriceDecimal +"</span></strong></div>");
      document.write("  <div class=\"installments\"><strong><span class=\"installment-count\">"+ iMaxParcels +"</span>x</strong> de <strong><span class=\"installment-price\">"+FormatPrecoReais(CalculaParcelaJurosCompostos(Price,iMaxParcels))+"</span></strong>"+ sInterest +"</div>");
      document.write("  <div class=\"no-installments\" style=\"display: none;\">à vista</div>");
      document.write("</div>");
    }
  }

  //Função que mostra o máximo de parcela na home e na listagem principal de produtos
  function fnShowMaxParcels(ProdPrice,iMaxParcels){
    var sInterest;
    if(ProdPrice==0||iMaxParcels==1||Juros.length==0)return;
    if(iMaxParcels==0||iMaxParcels>Juros.length)iMaxParcels=Juros.length;
    if(Juros[iMaxParcels-1]>0)sInterest=""; else sInterest="<font color=#990000> sem juros</font>";
    document.write(" ou <b>"+iMaxParcels+"x</b>"+sInterest+" de <b>"+FormatPrecoReais(CalculaParcelaJurosCompostos(ProdPrice,iMaxParcels))+"</b>");
  }

  //Função que mostra tabela de parcelas
  function fnShowParcels(ProdPrice,iMaxParcels){
    var sInterest,EstiloLinha;
    if(ProdPrice==0||iMaxParcels==1||Juros.length==0)return;
    if(iMaxParcels==0||iMaxParcels>Juros.length)iMaxParcels=Juros.length;
    document.write("<br><table align=center cellpadding=2 cellspacing=2 width=100% style='border-radius: 5px;-moz-border-radius: 5px;-webkit-border-radius:5px;background-color:#CECECE'><tr bgcolor=#DCDCDC><td colspan=3 height=22 class=TitTabParc align=center><b>Opções de parcelamento</td></tr><tr bgcolor=#FFFFFF><td class=TitTabParc>Parcelas</td><td align=right class=TitTabParc>Valor</td><td align=right class=TitTabParc>Total</td></tr>");
    for(var i=0;i<iMaxParcels;i++){
      if(Juros[i]>0)sInterest="com juros"; else sInterest="<font color=#990000>sem&nbsp;juros</font>";
      if((i%2)==0)EstiloLinha='EstParcPar'; else EstiloLinha='EstParcImpar';
      document.write("<tr class="+EstiloLinha+"><td class="+EstiloLinha+">"+(i+1)+"x "+sInterest+"</td><td class="+EstiloLinha+" align=right>"+FormatPrecoReais(CalculaParcelaJurosCompostos(ProdPrice,i+1))+"</td><td class="+EstiloLinha+" align=right>"+FormatPrecoReais(CalculaParcelaJurosCompostos(ProdPrice,i+1)*(i+1))+"</td></tr>");
    }
    document.write("</table><br>");
  }

  function fnSearchSubmit(oForm){
    var oSearch=oForm.Texto;
    if(oSearch){
      var sSearch=oSearch.value;
      if(sSearch.length<2){
        alert("Preencha a busca corretamente");
        oSearch.focus();
        return false;
       }
      return true;
    }
  }

  function fnCustomizeIconsSocialNetworks(){
    var oContentHTML=document.getElementById("idShareProd");
    if(oContentHTML)var aImgsShare=oContentHTML.getElementsByTagName('img');
    if(aImgsShare)
      for(var i=0;i<aImgsShare.length;i++){
        if(aImgsShare[i].className=='EstImgShareFacebook'){
          aImgsShare[i].src=FC$.PathImg +'IcFacebook.svg';
          FCLib$.AddEvent(aImgsShare[i],"mouseover", function(){this.src=FC$.PathImg +'IcFacebookOff.svg';});
          FCLib$.AddEvent(aImgsShare[i],"mouseout", function(){this.src=FC$.PathImg +'IcFacebook.svg';});
        }
        else if(aImgsShare[i].className=='EstImgShareTwitter'){
          aImgsShare[i].src=FC$.PathImg+ 'IcTwitter.svg';
          FCLib$.AddEvent(aImgsShare[i],"mouseover", function(){this.src=FC$.PathImg +'IcTwitterOff.svg';});
          FCLib$.AddEvent(aImgsShare[i],"mouseout", function(){this.src=FC$.PathImg +'IcTwitter.svg';});
        }
        aImgsShare[i].style.width="25px";
    }
  }

  function fnAdjustdevicePixelRatio(){
    if(devicePixelRatio>=2){
      fnGetID("StoreLogo").src=FC$.PathImg+"LogoXtremeStore_2x.png";
    } 
  }

  return{
    sCurrentPage:sCurrentPage,
    fnGetID:fnGetID,
    fnCustomizeIconsSocialNetworks:fnCustomizeIconsSocialNetworks,
    fnPreloadImages:fnPreloadImages,
    fnShowMaxParcels:fnShowMaxParcels,
    fnShowParcels:fnShowParcels,
    fnShowEconomy:fnShowEconomy,
    fnSecurity:fnSecurity,
    fnShowCartButtons:fnShowCartButtons,
    fnBuyImage:fnBuyImage,
    fnStoreFit:fnStoreFit, 
    fnLogout:fnLogout,
    fnGoHome:fnGoHome,
    fnShowSharing:fnShowSharing,
    fnShowPrice:fnShowPrice,
    fnSearchSubmit:fnSearchSubmit,
    fnFormatNumber:fnFormatNumber,
    fnAdjustdevicePixelRatio:fnAdjustdevicePixelRatio
  }

})();



// Pré-carregamento de imagens

//sF$.fnPreloadImages(
// FC$.PathImg +'ajaxLoader.gif',
// FC$.PathImg +'bg.gif'
//);






var oDivShowCartOnPage=null;
var iLastCartOnPage=0;

function ShowCartOnPage(IDLoja,iErr,sMsg,sCartText,sCheckoutText,este){
  var oPos=getPos(este);
  if(oDivShowCartOnPage==null){
    var oNewElement=document.createElement("div");
    oNewElement.setAttribute("id","DivShowCartOnPage"); 
    oDivShowCartOnPage=este.parentNode.insertBefore(oNewElement,este);
  }
  oDivShowCartOnPage.style.backgroundColor="#fcfcfc";
  oDivShowCartOnPage.style.borderColor="#cdcdcd";
  oDivShowCartOnPage.style.color="#555555";
  oDivShowCartOnPage.style.border="1px solid #cdcdcd";
  oDivShowCartOnPage.style.marginTop="-110px";
  oDivShowCartOnPage.style.marginLeft="0px";
  oDivShowCartOnPage.style.position="absolute";
  oDivShowCartOnPage.style.zIndex="1";
  oDivShowCartOnPage.style.visibility="visible";

  var iW=238;
  var iH=100;

  var oPosPrice=document.getElementById('PosPrice');
  if(oPosPrice){
    iW=oPosPrice.offsetWidth;
    iH=oPosPrice.offsetHeight;
  }

  if(iErr==0)sBackColor="3187e6"; else sBackColor="949494"
  var sHTML="<table id=idTabShowCartOnPageFC width='"+iW +"' height='"+ iH +"' cellpadding=3 cellspacing=3>";
     sHTML+="<tr><td id=idTDTitShowCartOnPageFC colspan=2 align=center style='background-color:#"+ sBackColor +";color:#ffffff;border-width:1px;border-color:#3b6e22;font-weight:bold;font-size:12px;font-family:arial;cursor:pointer'><div style='padding:8px;'>"+ sMsg +"</div></td></tr>";
     if(iErr==0){
       sHTML+="<tr height=45>";
       sHTML+="<td valign=top align=center style=cursor:pointer onclick=window.location.href='addproduto.asp?idloja="+ IDLoja +"'><a href='addproduto.asp?idloja="+ IDLoja +"' style='color:#444444;text-decoration:none;font-size:14px;font-weight:bold;font-family:arial;'>Ir para o carrinho</a></td>";
       sHTML+="<td align=left><img src='"+ FC$.PathImg +"close.svg' width=20 height=20 hspace=5 style='cursor:pointer;margin-top:10px' onclick=oDivShowCartOnPage.style.visibility='hidden'></td>";
       sHTML+="</tr>";
       AtualizaCarrinho();
     }
     else{
       sHTML+="<tr height=20>";
       sHTML+="<td colspan=2 align=center><img src='"+ FC$.PathImg +"close.svg' width=20 height=20 hspace=5 style='cursor:pointer' onclick=oDivShowCartOnPage.style.visibility='hidden'></td>";
       sHTML+="</tr>";
     }
     sHTML+="</table>";
  oDivShowCartOnPage.style.top=oPos.y+"px";
  oDivShowCartOnPage.style.left=oPos.x+"px";
  oDivShowCartOnPage.innerHTML=sHTML;
  iLastCartOnPage++;
  setTimeout("if(iLastCartOnPage=="+ iLastCartOnPage +")oDivShowCartOnPage.style.visibility='hidden';",4000);

}


function GoCart(){
  document.location.href="addproduto.asp?idloja="+FC$.IDLoja;
}

var iItensCesta=0;

function AtualizaCarrinho(){
  if (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
  else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
  xmlhttp.open("GET","XMLCart.asp?IDLoja="+FC$.IDLoja+"",false);
  xmlhttp.send();
  xmlDoc=xmlhttp.responseXML; 
  var x=xmlDoc.getElementsByTagName("item");
  var z=xmlDoc.getElementsByTagName("cart");
  try{currencyProdCart=(z[0].getElementsByTagName("currency")[0].childNodes[0].nodeValue);}catch(e){currencyProdCart="R$"}
  try{TotalQtyProdCart=(z[0].getElementsByTagName("TotalQty")[0].childNodes[0].nodeValue);}catch(e){TotalQtyProdCart="0"}
  try{subtotalProdCart=(z[0].getElementsByTagName("subtotal")[0].childNodes[0].nodeValue);}catch(e){subtotalProdCart="0,00"}
  iItensCesta=TotalQtyProdCart;
  try{document.getElementById("x1").innerHTML=iItensCesta;}catch(e){}
  try{document.getElementById("x2").innerHTML=currencyProdCart + " " + subtotalProdCart;}catch(e){}
  try{document.getElementById("DivItensCart").innerHTML="<table onmouseover='ShowCart(true)' onmouseout='ShowCart(false)' id='TabItensCart' class='EstTabItensCart'>"+ sProdutosNaCesta +"</table>";}catch(e){}  
}


function MontaMaxParcelaCart(Valor){
  return("Em até 10x de "+FormatPrecoReais(CalculaParcelaJurosCompostos(Valor,10)));
}










