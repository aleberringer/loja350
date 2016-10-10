// Modelo Padrão FastCommerce [08/2014] //

var iQtdProds=0;
var iItensCesta=0;
ImgLoadingFC=FC$.PathImg+"loading.gif";
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

//remover esta função?????????????
  function fnShowCartButtons(bShowTopBottom){
    //fnGetID("idContinueBuyFC").style.display="none";
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
    popup=window.open("indiqueproduto.asp?idloja="+ FC$.IDLoja +"&idproduto="+ProductID,"Indique","top=10,left=10,width=400,height=450,scrollbars=auto");
    popup.focus();
    return void(0);
  }

  var iPL=0;
  function fnShowPrice(Price,OriginalPrice,Cod,iMaxParcels,ProductID){
    iPL++;
    //console.log(ProductID+ " iPL="+ iPL +" Price="+Price +" OriginalPrice="+ OriginalPrice +" Cod="+ Cod);
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
      if(iMaxParcels>1)sPrice+="  <div class=\"installments\"><strong><span class=\"installment-count\">"+ iMaxParcels +"</span>x</strong> de <strong><span class=\"installment-price\">"+FormatPrecoReais(CalculaParcelaJurosCompostos(Price,iMaxParcels))+"</span></strong>"+ sInterest +"</div>";
      sPrice+="</div>";
    }
    else{
      sPrice+="<div class=\"prices\">";
      sPrice+="  <div class=\"old-price\"><span>&nbsp;</span><div class=\"por\">Por</div></div>";
      sPrice+="  <div class=\"price\"><strong><span class=\"currency\">R$ </span><span class=\"int\">"+ fnFormatNumber(iPriceInt) +"</span><span class=\"dec\">,"+ PriceDecimal +"</span></strong></div>";
      if(iMaxParcels>1)sPrice+="  <div class=\"installments\"><strong><span class=\"installment-count\">"+ iMaxParcels +"</span>x</strong> de <strong><span class=\"installment-price\">"+FormatPrecoReais(CalculaParcelaJurosCompostos(Price,iMaxParcels))+"</span></strong>"+ sInterest +"</div>";
      sPrice+="</div>";
    }

    if(idPrice)idPrice.innerHTML=sPrice;

  }

  function fnShowButtonCart(IDProd,Estoque,PrecoOri){
    var idButton=fnGetID("idButtonProd"+IDProd);
    var sButton="";
    if(idButton){
      if(Estoque>0 && PrecoOri>0){
        sButton="<button type='button' class='ButtonBuy' onclick='Compra"+ IDProd +"(this);'>Comprar</button>";
      }
      else {
        sButton="<button type='button' class='ButtonDisp' onclick='sF$.fnShowDisp("+ IDProd +");'>Produto não disponível</button><div class=TxtDisp><a href='#disp' onclick='sF$.fnShowDisp("+ IDProd +");'>Avise-me</a> quando estiver disponível</div>";
      }
      idButton.innerHTML=sButton;
    }
  }

  function fnShowDisp(IDProd){
    popup=window.open("AvisaDispProduto.asp?IDLoja="+ FC$.IDLoja +"&IDProduto="+ IDProd,"Disp","top=10,left=10,height=480,width=450,scrollbars=no");
    popup.focus();
    return void(0);
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

  function fnCustomizeIconsSocialNetworks(isProd){
  //se isProd personaliza ícones do detalhe do produto, caso contrário do rodapé
    if(isProd)var oContentHTML=document.getElementById("idShareProd");
    else var oContentHTML=document.getElementById("idShareFooter");
    if(oContentHTML)var aImgsShare=oContentHTML.getElementsByTagName('img');
    if(aImgsShare)
      for(var i=0;i<aImgsShare.length;i++){
        if(aImgsShare[i].className=='EstImgShareFacebook'){
          aImgsShare[i].setAttribute('data-src',FC$.PathImg +'IconProdFacebook.svg');
          aImgsShare[i].src=FC$.PathImg +'IconProdFacebook.svg';
        }
        else if(aImgsShare[i].className=='EstImgShareTwitter'){
          aImgsShare[i].setAttribute('data-src',FC$.PathImg +'IconProdTwitter.svg');
          aImgsShare[i].src=FC$.PathImg+ 'IconProdTwitter.svg';
        }
        else if(aImgsShare[i].className=='EstImgShareGooglePlus'){
          aImgsShare[i].setAttribute('data-src',FC$.PathImg +'IconProdGooglePlus.svg');
          aImgsShare[i].src=FC$.PathImg+ 'IconProdGooglePlus.svg';
        }
        else if(aImgsShare[i].className=='EstImgSharePinterest'){
          aImgsShare[i].setAttribute('data-src',FC$.PathImg +'IconProdPinterest.svg');
          aImgsShare[i].src=FC$.PathImg+ 'IconProdPinterest.svg';
        }
        if(isProd){ //produto
          aImgsShare[i].style.width="25px";
          aImgsShare[i].style.height="25px";
        }
        else{ //rodapé
          aImgsShare[i].style.width="20px";
          aImgsShare[i].style.height="20px";
        }
    }
  }

  function fnAdjustdevicePixelRatio(){
    if(devicePixelRatio>=2){
      fnGetID("StoreLogo").src=FC$.PathImg+"LogoXtremeStore_2x.png";
    } 
  }
  
  function fnShowCart(bShow,ItensCesta){
   oTabItensCart=document.getElementById('TabItensCart');
   if(bShow){
      oTabItensCart.className="EstTabItensCartOn";
      document.getElementById('DivItensCart').style.display="";
    }
   else{
      oTabItensCart.className="EstTabItensCart";
      document.getElementById('DivItensCart').style.display="none";
    }
  }
  
  function fnGoCart(){
    document.location.href="addproduto.asp?idloja="+FC$.IDLoja;
  }
  
  function fnUpdateCart(IsAdd,IsSpy){
    if (window.XMLHttpRequest){var oXMLHTTP=new XMLHttpRequest();}
    else{var oXMLHTTP=new ActiveXObject("Microsoft.XMLHTTP");}
    oXMLHTTP.open("GET","XMLCart.asp?IDLoja="+FC$.IDLoja+"",false);
    oXMLHTTP.send();
    oXMLDoc=oXMLHTTP.responseXML; 
    var oItems=oXMLDoc.getElementsByTagName("item");
    var oCarts=oXMLDoc.getElementsByTagName("cart");
    try{currencyProdCart=(oCarts[0].getElementsByTagName("currency")[0].childNodes[0].nodeValue);}catch(e){currencyProdCart="R$"}
    try{TotalQtyProdCart=(oCarts[0].getElementsByTagName("TotalQty")[0].childNodes[0].nodeValue);}catch(e){TotalQtyProdCart="0"}
    try{subtotalProdCart=(oCarts[0].getElementsByTagName("subtotal")[0].childNodes[0].nodeValue);}catch(e){subtotalProdCart="0,00"}
    iItensCesta=TotalQtyProdCart;
    var sProdutosNaCesta="";
    for (i=0;i<oItems.length;i++)
      { 
        var sCestaFC=document.getElementById("idMostraDadosCestaFC");
        var ImgProdCart=(oItems[i].getElementsByTagName("image")[0].childNodes[0].nodeValue);
        var NomeProdCart=(oItems[i].getElementsByTagName("prod")[0].childNodes[0].nodeValue);
        var qtyProdCart=(oItems[i].getElementsByTagName("qty")[0].childNodes[0].nodeValue);
        var priceProdCart=(oItems[i].getElementsByTagName("price")[0].childNodes[0].nodeValue);
        var idProdCart=(oItems[i].getElementsByTagName("id")[0].childNodes[0].nodeValue);
        if(i>0)sProdutosNaCesta+="<tr><td colspan='4'><div id='CartLine'></div></td></tr>";
        sProdutosNaCesta+="<tr>";
        sProdutosNaCesta+="<td class=ImgProdCart><a href='listaprodutos.asp?idloja="+ FC$.IDLoja+"&idproduto="+ idProdCart +"'><img src='"+ImgProdCart+"'></a></td>";
        sProdutosNaCesta+="<td class=NomeProdCart><a href='listaprodutos.asp?idloja="+ FC$.IDLoja+"&idproduto="+ idProdCart +"'>"+ NomeProdCart.substring(0,35) + "...</a></td>";
        sProdutosNaCesta+="<td class=QtdProdCart>(" + qtyProdCart + ")</td>";
        sProdutosNaCesta+="<td align=right class=PrecoProdCart nowrap>" + currencyProdCart + " " + priceProdCart + "</td>";
        sProdutosNaCesta+="</tr>";
      }
  
    if(sProdutosNaCesta==""){
      sProdutosNaCesta+="<tr height=40><td width=250 align=center class=NomeProdCart>Seu carrinho está vazio.</td></tr>";
    }
    else{
      if(IsSpy)var oReferrer=window.parent;
      if(IsAdd){
        if(!IsSpy){ //se não for espiadinha, altera cor do design da cesta no topo
          fnGetID("TopCart").className="TopCartContentActive";
          if(iItensCesta>0)setTimeout("document.getElementById('TopCart').className='TopCartContentOn';",1000);
        }
      }
      else {
        if(iItensCesta>0)fnGetID("TopCart").className="TopCartContentOn";
      }
      ValCesta=subtotalProdCart.replace(".","").replace(",",".");
      sProdutosNaCesta+="<tr><td colspan=4 align=center><div class=ParcProdCart>"+ sF$.fnMaxParcelaCart(ValCesta) +"</div></td></tr>";
      if(FC$.Page!="Cart"){
        sProdutosNaCesta+="<tr><td colspan=4 align=center><div class=VerCarrinho><a href='AddProduto.asp?IDLoja="+ FC$.IDLoja +"'>";
        if(i==5)sProdutosNaCesta+="Ver todos os itens"; else sProdutosNaCesta+="Ver carrinho"; 
        sProdutosNaCesta+="</a></div></td></tr>";
      }
    }
    if(IsSpy){
      try{oReferrer.document.getElementById("idCartItemsTop").innerHTML=iItensCesta;}catch(e){}
      try{oReferrer.document.getElementById("idCartTotalTop").innerHTML=currencyProdCart +" "+ subtotalProdCart;}catch(e){}
      try{oReferrer.document.getElementById("DivItensCart").innerHTML="<table onmouseover='sF$.fnShowCart(true)' onmouseout='sF$.fnShowCart(false)' id='TabItensCart' class='EstTabItensCart'>"+ sProdutosNaCesta +"</table>";}catch(e){}
    }else{
      try{document.getElementById("idCartItemsTop").innerHTML=iItensCesta;}catch(e){}
      try{document.getElementById("idCartTotalTop").innerHTML=currencyProdCart +" "+ subtotalProdCart;}catch(e){}
      try{document.getElementById("DivItensCart").innerHTML="<table onmouseover='sF$.fnShowCart(true)' onmouseout='sF$.fnShowCart(false)' id='TabItensCart' class='EstTabItensCart'>"+ sProdutosNaCesta +"</table>";}catch(e){}
    }
  }
  
  function fnMaxParcelaCart(Valor){
    return("Em até 10x de "+FormatPrecoReais(CalculaParcelaJurosCompostos(Valor,10)));
  }

  //Histórico de navegação
  
  function fnLoadXMLPageHistory(){
    if (window.XMLHttpRequest){var oXMLHTTP=new XMLHttpRequest();}
    else {var oXMLHTTP=new ActiveXObject("Microsoft.XMLHTTP");}
    oXMLHTTP.open("GET","xmlpagehistory.asp?idloja="+FC$.IDLoja,false);
    oXMLHTTP.send();
    var oXMLDoc=oXMLHTTP.responseXML; 
    return(oXMLDoc.getElementsByTagName("item"));
  }
  
  function fnShowPageHistory(oHistoryPages){
    var oPageHistory=document.getElementById("idPageHistory");
    if(oPageHistory){
      var sPageHistory="";
      try{var sBar=(oHistoryPages[0].getElementsByTagName("title")[0].childNodes[0].nodeValue);}
      catch(e){var sBar="";}
      if(sBar!=""){sPageHistory+="<div id='idDivPageHistory'><div id='idPageHistoryFC'><div id='idTitPageHistory'>Histórico de navegação:</div><ul id='idListPageHistoryFC'>";}  
      for (i=0;i<oHistoryPages.length;i++){
        sTitleProd=oHistoryPages[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
        sLinkProd=oHistoryPages[i].getElementsByTagName("link")[0].childNodes[0].nodeValue;
        try{sImageProd=oHistoryPages[i].getElementsByTagName("image")[0].childNodes[0].nodeValue;}
        catch(e){sImageProd=FC$.PathImg+"nd0.gif";}
        try{sPriceProd=(oHistoryPages[i].getElementsByTagName("price")[0].childNodes[0].nodeValue);}
        catch(e){sPriceProd="";}
        sTitleProd=sTitleProd.substring(0,20);
        sPageHistory+="<li>";
        sPageHistory+="<div class='EstImagePageHistory'><a href='"+ sLinkProd +"'><img src='"+ sImageProd +"'  title='"+ sTitleProd +"' border=0 class=EstFotoPageHistory onError=MostraImgOnError(this,0)></a></div>";
        sPageHistory+="<div class='EstNamePageHistory'><a href='"+ sLinkProd +"'>"+ sTitleProd +"</a></div>";
        sPageHistory+="<div class=EstPricePageHistory>"+ sPriceProd +"</div>";
        sPageHistory+="</li>";
      }
      oPageHistory.innerHTML=sPageHistory+"</ul></div></div>";
    }
  }

  function fnFooterMenu(iMenu){
    var oMenu=document.getElementById("idLiFooter"+iMenu);
    if(oMenu.style.display=="block"){
      oMenu.style.display="none";
    }
    else{
      oMenu.style.display="block";
      oMenu.style.marginTop="20px"
      oMenu.style.marginLeft="-11px"
      oMenu.style.width="105%"
      oMenu.style.backgroundColor="#353b44";
      var aLinks=oMenu.getElementsByTagName("a");
      for(var j=0;j<aLinks.length;j++){
        aLinks[j].style.color="#fcfcfc";
        aLinks[j].style.padding="15px";
        aLinks[j].style.borderTop="1px solid #6d727b";
      }
    }
  }

  function fnInsertVideo(ProductID,CodVideo){
    var oVideo=document.getElementById("VideoProd"+ProductID);
    if(oVideo){
      oVideo.innerHTML="<iframe class=\"VideoProd\" src=\"//www.youtube.com/embed/"+ CodVideo +"?controls=1&showinfo=0&rel=0&modestbranding=1&theme=light&modestbranding=1\" frameborder=0 allowfullscreen></iframe>"
    }
  }
  
  function fnAdjustsFilters(){ 
    var bTemPathQts=false;
    var oUlPathCatQt=document.getElementById("idUlPathCatQtFC");
    if(oUlPathCatQt){bTemPathQts=true;}else{document.getElementById('idListaProdCategoriasFC').style.display='none';}
    var oUlAdic1Qt=document.getElementById("idUlAdic1QtFC");
    if(oUlAdic1Qt){bTemPathQts=true;}else{document.getElementById('idListaProdAdicional1FC').style.display='none';}
    var oUlAdic2Qt=document.getElementById("idUlAdic2QtFC");
    if(oUlAdic2Qt){bTemPathQts=true;}else{document.getElementById('idListaProdAdicional2FC').style.display='none';}
    var oUlAdic3Qt=document.getElementById("idUlAdic3QtFC");
    if(oUlAdic3Qt){bTemPathQts=true;}else{document.getElementById('idListaProdAdicional3FC').style.display='none';}
    //Caso não tenha produtos em categorias/adicionais encontrados, remove div
    if(!bTemPathQts)document.getElementById("idDivPath").style.display='none';
    //Caso não tenha filtros de busca, remove div com filtros
    var oUlPathSearch=document.getElementById("idUlPathSearchFC");
    if(oUlPathSearch==null)document.getElementById("idDivSearch").style.display='none';
  }


  function fnCopyContentTop(){
    var oBannerTop=sF$.fnGetID("BannerTop");
    if(oBannerTop){
      var oBannerTopHome=sF$.fnGetID("BannerTopHome");
      if(oBannerTopHome)oBannerTop.innerHTML=oBannerTopHome.innerHTML;
    }
  }


  return{
    sCurrentPage:sCurrentPage,
    fnGetID:fnGetID,
    fnCustomizeIconsSocialNetworks:fnCustomizeIconsSocialNetworks,
    fnPreloadImages:fnPreloadImages,
    fnShowEconomy:fnShowEconomy,
    fnSecurity:fnSecurity,
    fnShowCartButtons:fnShowCartButtons,
    fnBuyImage:fnBuyImage,
    fnStoreFit:fnStoreFit, 
    fnLogout:fnLogout,
    fnGoHome:fnGoHome,
    fnShowSharing:fnShowSharing,
    fnShowPrice:fnShowPrice,
    fnShowButtonCart:fnShowButtonCart,
    fnShowDisp:fnShowDisp,
    fnSearchSubmit:fnSearchSubmit,
    fnFormatNumber:fnFormatNumber,
    fnAdjustdevicePixelRatio:fnAdjustdevicePixelRatio,
    fnShowCart:fnShowCart,
    fnGoCart:fnGoCart,
    fnUpdateCart:fnUpdateCart,
    fnMaxParcelaCart:fnMaxParcelaCart,
    fnLoadXMLPageHistory:fnLoadXMLPageHistory,
    fnShowPageHistory:fnShowPageHistory,
    fnFooterMenu:fnFooterMenu,
    fnInsertVideo:fnInsertVideo,
    fnAdjustsFilters:fnAdjustsFilters,
    fnCopyContentTop:fnCopyContentTop
  }

})();




// Pré-carregamento de imagens

//sF$.fnPreloadImages(
// FC$.PathImg +'ajaxLoader.gif',
// FC$.PathImg +'bg.gif'
//);





//Funções para o carrinho

var oDivShowCartOnPage=null;
var iLastCartOnPage=0;

function ShowCartOnPage(IDLoja,iErr,sMsg,sCartText,sCheckoutText,este){
  //console.log('function ShowCartOnPage de LojaLib.js #####');
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
  var iW=238;
  var iH=100;
  var oPosPrice=document.getElementById('PosPrice');
  if(oPosPrice){
    iW=oPosPrice.offsetWidth;
    iH=oPosPrice.offsetHeight;
  }
  if(iErr==0)sBackColor="3187e6"; else sBackColor="949494"
  var sHTML="<table id=idTabShowCartOnPageFC width='"+iW +"' height='"+ iH +"' cellpadding=3 cellspacing=3>";
     sHTML+="<tr onclick=window.location.href='addproduto.asp?idloja="+ IDLoja +"'><td id=idTDTitShowCartOnPageFC colspan=2 align=center style='background-color:#"+ sBackColor +";color:#ffffff;border-width:1px;border-color:#3b6e22;font-weight:bold;font-size:12px;cursor:pointer'><div style='padding:5px;'>"+ sMsg +"</div></td></tr>";
     if(iErr==0){
       sHTML+="<tr height=45>";
       sHTML+="<td valign=top align=center style=cursor:pointer onclick=window.location.href='addproduto.asp?idloja="+ IDLoja +"'><a href='addproduto.asp?idloja="+ IDLoja +"' style='color:#444444;text-decoration:none;font-size:14px;font-weight:bold;'>Ir para o carrinho</a></td>";
       sHTML+="<td align=left><img src='"+ FC$.PathImg +"close.svg' width=20 height=20 hspace=5 style='cursor:pointer;margin-top:10px' onclick=oDivShowCartOnPage.style.visibility='hidden'></td>";
       sHTML+="</tr>";
       sF$.fnUpdateCart(true,false);
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
  oDivShowCartOnPage.style.visibility="visible";
  //jQuery(oDivShowCartOnPage).fadeIn(200);
  iLastCartOnPage++;
  setTimeout("if(iLastCartOnPage=="+ iLastCartOnPage +")oDivShowCartOnPage.style.visibility='hidden';",6000);
  //setTimeout("if(iLastCartOnPage=="+ iLastCartOnPage +")jQuery(oDivShowCartOnPage).fadeOut(200);",4000);
}


//Resize

function fnAddELResize(){
  window.addEventListener("resize",fnResize);
}

function fnResize() {
  iWid=document.getElementsByTagName("body")[0].offsetWidth;
  if(iWid>550)fnDefault();
  else{
    fnMobile();
  }
}

function fnDefault(){
  for(i=1;i<4;i++){
    var oMenu=document.getElementById("idLiFooter"+i);
    oMenu.style.display="block";
    oMenu.style.marginTop="0px"
    oMenu.style.marginLeft="0px"
    oMenu.style.backgroundColor="#f7f7f7";
    var aLinks=oMenu.getElementsByTagName("a");
    for(var j=0;j<aLinks.length;j++){
      aLinks[j].style.color="#333333";
      aLinks[j].style.padding="";
      aLinks[j].style.borderTop="0";
    }
  }
}

function fnMobile(){
  for(i=1;i<4;i++){
    var oMenu=document.getElementById("idLiFooter"+i);
    oMenu.style.display="none";
  }
}


// Frete - CEP

function fnShowCEP(IDProd){
  if(FC$.TypeFrt==3){ //Simulação apenas por CEP
    var sNumCEP=fnGetCookie('CEP'+FC$.IDLoja);
    if(sNumCEP==null)sNumCEP="";
    sCEP="<div id='idDivCEPFC'>";
    sCEP+="  <div id='idDivTitCEP'>Simule o valor do frete</div>";
    sCEP+="  <div id='idDivContentCEP'>";
    sCEP+="    <div id='idDivContentFieldsCEP'>";
    sCEP+="      <div id='idDivCEPNum'>";
    sCEP+="        <div class='LabelFieldCEP'>Digite seu CEP:</div>";
    sCEP+="        <div class='FieldCEP'><input type='text' id='idZip"+ IDProd +"' value='"+ sNumCEP +"' maxlength='9'></div>";
    sCEP+="      </div>";
    sCEP+="      <div id='idDivCEPQty'>";
    sCEP+="        <div class='LabelFieldCEP'>Quantidade:</div>";
    sCEP+="        <div class='FieldCEP'><input type='number' id='idQtdZip"+ IDProd +"' value='1' maxlength='4'></div>";
    sCEP+="      </div>";
    sCEP+="      <div id='idDivCEPButton'>";
    sCEP+="        <div><button type='button' id='idCEPButton' onclick='fnGetShippingValuesProd("+ IDProd +")'>Simular</button></div>";
    sCEP+="      </div>";
    sCEP+="    </div>";
    sCEP+="    <div id='idDivImgLoadingCEPFC'><img src='"+ FC$.PathImg +"loadingCEP.gif' vspace=3 style='display:none;' id=ImgLoadingCEP></div>";
    sCEP+="    <div id='idShippingValues"+ IDProd +"'></div></div>";
    sCEP+="  </div>";
    sCEP+="</div>";
    var oShowCEP=document.getElementById("ShowCEP"+IDProd);
    if(oShowCEP)oShowCEP.innerHTML=sCEP;
  }
}

function fnGetShippingValuesProd(IDProd){
  sCEP=document.getElementById("idZip"+ IDProd).value;
  fnSetCookie('CEP'+FC$.IDLoja,sCEP);
  if(sCEP==""){document.getElementById("idShippingValues"+IDProd).innerHTML="<span style=color:#990000;>Informe o CEP</span>";return;}
  document.getElementById("idShippingValues"+IDProd).innerHTML="";
  document.getElementById("ImgLoadingCEP").style.display='';
  var iQty=document.getElementById("idQtdZip"+IDProd).value;
  if(IDProd)var sParamProd="&idproduto="+ IDProd;
  else var sParamProd="";
  AjaxExecFC("/XMLShippingCEP.asp","IDLoja="+ FC$.IDLoja +"&qty="+ iQty +"&cep="+ sCEP + sParamProd,false,processXMLCEP,IDProd);
}

function processXMLCEP(obj,IDProd){
  var sShipping="";
  var oShippingValues=document.getElementById("idShippingValues"+IDProd);
  var iErr=ReadXMLNode(obj,"err");if(iErr==null)return;
  if(iErr!="0"){
    document.getElementById("ImgLoadingCEP").style.display='none';
    oShippingValues.innerHTML="<span style=color:#990000;>"+ ReadXMLNode(obj,"msg") +"</span>";
    return;
  }
  oShippingValues.innerHTML="";
  var UseCart=ReadXMLNode(obj,"UseCart");
  if(UseCart=="False"){
    var ProdName=ReadXMLNode(obj,"ProdName");
    var ProdRef=ReadXMLNode(obj,"ProdRef");  
  }
  sShipping+="<div class='ZipOptions'>";
  var iOpt=ReadXMLNode(obj,"OptQt");
  for(var i=1;i<=iOpt;i++){
    var OptName=ReadXMLNode(obj,"Opt"+ i +"Name");
    var OptImage=ReadXMLNode(obj,"Opt"+ i +"Image");
    var OptObs=ReadXMLNode(obj,"Opt"+ i +"Obs");
    if(OptObs==null)OptObs="";
    sValorFrete=ReadXMLNode(obj,"Opt"+ i +"Value");
    if(sValorFrete=="R$ 0,00")sValorFrete="FRETE GRÁTIS";
    sShipping+="<div class='ZipOption'>";
    sShipping+="  <div class='ZipNameObs'>";
    sShipping+="    <div class='ZipName'>"+ OptName +"</div>";
    sShipping+="    <div class='ZipObsVal'>"+ OptObs +"</div>";
    sShipping+="  </div>";
    sShipping+="  <div class='ZipValue'>"+ sValorFrete +"</div>";
    sShipping+="</div>";
  }
  oShippingValues.innerHTML=sShipping;
  oShippingValues.style.display="block"; 
  sShipping+="</div>";
  document.getElementById("ImgLoadingCEP").style.display='none';
}

function fnGetCookie(name){
  var arg=name+"=";
  var alen=arg.length;
  var clen=document.cookie.length;
  var i=0;
  while (i<clen){
    var j=i+alen;
    if(document.cookie.substring(i,j)==arg)return fnGetCookieVal(j);
    i=document.cookie.indexOf(" ",i)+1;
    if(i==0)break;
  }
  return null;
}

function fnGetCookieVal(offset){
  var endstr=document.cookie.indexOf(";",offset);
  if (endstr==-1)endstr=document.cookie.length;
  return unescape(document.cookie.substring(offset,endstr));
}

function fnSetCookie(name,value){
  var argv=fnSetCookie.arguments;
  var argc=fnSetCookie.arguments.length;
  var expires=(argc>2)?argv[2]:null;
  var path=(argc>3)?argv[3]:null;
  var domain=(argc>4)?argv[4]:null;
  var secure=(argc>5)?argv[5]:false;
  document.cookie=name+"="+escape(value)+((expires==null)?"":(";expires=" + expires.toGMTString()))+((path==null)?"":(";path="+path))+((domain==null)?"":(";domain="+domain))+((secure==true)?"; secure":"");
}

// Frete - CEP - End



// Funções executadas no rodapé

function fnFooter(){

  //TESTE de botões na cesta
  //sF$.fnShowCartButtons();

  sF$.fnLogout("<NomeCliente>");
  sF$.fnAdjustdevicePixelRatio();

  if(FC$.Page!="Checkout"){fnAddELResize();}

  if(FC$.Page=="Products"){
    if(iQtdProds>2){
      var oScript=document.createElement('script');
      oScript.type='text/javascript';
      oScript.async=true;
      oScript.src=FC$.PathHtm+'IncPaginacaoOrder.js';
      var sAddScript=document.getElementsByTagName('script')[0];
      sAddScript.parentNode.insertBefore(oScript,sAddScript);
    }
  }

  //fancybox
  jQuery(document).ready(function() {
    jQuery('.fancybox').fancybox({maxWidth:700,	maxHeight: 500});
    var oHistoryPages=sF$.fnLoadXMLPageHistory();
    sF$.fnShowPageHistory(oHistoryPages);
  });

}

// Funções executadas no rodapé





if(FC$.ClientID==0)FCLib$.onReady(fnShowGlobalSignin);

function fnShowGlobalSignin(){
  var oImgGlobalSign=FCLib$.GetID("idImgGlobalSignFC");
  if(oImgGlobalSign){
    var bFacebookLogin=false;
    var bGoogleLogin=false;
    var sImgs="";
    if(typeof FC$.FacebookSigninID!="undefined"){
      sImgs+="<img src='"+ FC$.PathImg +"FacebookLogin.svg' class='FacebookSigninClass' data-loginsuccess='fnLoginShowUserName'>";
      bFacebookLogin=true;
    } 
    if(typeof FC$.GoogleSigninID!="undefined"){
      sImgs+="<img src='"+ FC$.PathImg +"GoogleLogin.svg' class='GoogleSigninClass' data-loginsuccess='fnLoginShowUserName'>";
      bGoogleLogin=true;
    }
    if(bFacebookLogin||bGoogleLogin)oImgGlobalSign.innerHTML=sImgs;
    if(bFacebookLogin)FCLib$.signinFacebook();
    if(bGoogleLogin)FCLib$.signinGoogle();
  }
}

function fnLoginShowUserName(user){
  fnLoginUserName(user.fullName,user.pictureURL);
}

function fnLoginUserName(NameUser,PicUser){
  var oImgGlobalSign=FCLib$.GetID("idImgGlobalSignFC");
  var oLoginInfo=FCLib$.GetID("idLoginInfoFC");
  if(oLoginInfo){
    if(NameUser==""){
      oLoginInfo.innerHTML="<span>Olá, <b>visitante</b> | Faça seu <a href='/cadastro.asp?idloja="+FC$.IDLoja+"&pp=3&passo=1&sit=1'><b>Login</b></a></span>";
      if(oImgGlobalSign){oImgGlobalSign.style.display="";}
    }
    else{
      oLoginInfo.innerHTML="<span>Olá, <b>"+NameUser+"</b>, <a href='#Logout' onclick=FCLib$.fnClientLogout('',fnCliLogout)>(sair)</a></span>";
      if(oImgGlobalSign){oImgGlobalSign.style.display="none";}
    }
  }
  var oFoto=FCLib$.GetID("UserImage");
  if(oFoto){
    if(PicUser==undefined || PicUser==""){oFoto.src=FC$.PathImg+"iconuser.svg";}
    else{oFoto.src=PicUser;}   
  } 
}

function fnCliLogout(obj,sPag){
  fnLoginUserName("","");
  FC$.ClientID==0;
  fnShowGlobalSignin();
}

