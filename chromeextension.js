/*var buttons = document.getElementsByClassName('button-bar')[0].getElementsByTagName('a');

for( var i=0; i< buttons.length; i++ )
{
	if(buttons[i].innerText=="Edit Order"){
		buttons[i].href = '//' + location.host + location.pathname+"/edit";
	}else if(buttons[i].innerText=="Export CSV"){
		buttons[i].href = '//' + location.host + location.pathname+"/export";
	}
	var childDiv = buttons[i];
}*/

let btn = document.createElement("button");
btn.innerHTML = "DISABLED";
btn.style.background = "none";
btn.style.border = "none";
btn.style.width = "100%"
btn.style.textAlign= "center";
document.body.prepend(btn);
//document.getElementsByClassName("nv-topnav-header nv-topnav-header--mobile vd-nav-item")[0].appendChild(btn);

//var oldPrices = {};

function setPrice(el, text) {
    //var el = document.getElementsByClassName("li-input--price");
    el.value = text;
    var evt = document.createEvent("Events");
    evt.initEvent("change", true, true);
    el.dispatchEvent(evt);
}

btn.onclick = function(){
    const prices = document.getElementsByClassName("li-input--price");
    if(btn.innerHTML == "ENABLED"){
        btn.innerHTML = "DISABLED"
        for( var i=0; i< prices.length; i++ ){
         //alert(prices[i].value);
         setPrice(prices[i], (prices[i].value * 1) + 1);
        }
    }else{
        btn.innerHTML = "ENABLED";
        for( var i=0; i< prices.length; i++ ){
         //alert(prices[i].value);
         setPrice(prices[i], prices[i].value - 1);
        }
    }
};

/*window.addEventListener('message', event => {
  let eventData
  try {
    eventData = JSON.parse(event.data)
  } catch (e) {
    // @todo handle/log error
    return
  }

  if (eventData.event_name === 'sale:update') {
    const saleData = eventData.data.sale;
    // @todo do stuff with saleData
    const lineItems = saleData.line_items;
    for( var k in lineItems){
        //alert(lineItems[i].unit_price);
        if(oldPrices[lineItems[k].product_id] == null){
            //oldPrices[lineItems[k].product_id] = lineItems[k].unit_price;
            //window.postMessage(JSON.stringify({method: 'add-product',params: {product_id: lineItems[k].product_id,quantity: lineItems[k].quantity, unit_price: lineItems[k].unit_price-1}}), window.location.origin);
        }else{
            console.log("We know about this price...");
        }
    }
    for( var i=0; i< oldPrices.length; i++ ){
        
    }
    console.log(oldPrices);
  }
});*/

console.log("Loaded LXPlus JS");
