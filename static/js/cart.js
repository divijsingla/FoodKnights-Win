let box = document.getElementsByClassName('cartWrap')[0];
let totalprice= parseInt(0);

let restid= localStorage.getItem('restid')

let con=document.getElementById('continuetorest')
con.addEventListener('click',()=>{
    event.preventDefault();
    window.location.href = `/restaurant/${restid}`
})

for (var i = 0; i < localStorage.length; i++) {
  var key = localStorage.key(i);
  if( !(key.charAt(0)<='9' && key.charAt(0)>='0') ) continue;
  var value = localStorage.getItem(key);
  value = JSON.parse(value);
  console.log(value);

  for(let i=0;i<value.itemPrice.length;i++){
    totalprice=parseInt(totalprice)+parseInt(value.itemPrice[i])
  }
  if(value.opt1.length==0 && value.opt2.length==0){
    totalprice=parseInt(totalprice)+parseInt(value.itemPrice[0])*(parseInt(value.quantity)-1)
  }
  box.innerHTML+=`<li class="items odd">
  <div class="infoWrap"> 
<div class="cartSection">
 
<img src="" alt="" class="itemImg" />
<p class="itemNumber">Price is cumulative of extras or addons (if any)</p>
<h3>${value.itemName}</h3>

<p> <input type="text"  class="qty" placeholder="${value.quantity}" readonly/> Rs. ${value.itemPrice}</p>


</div>  


<div class="prodTotal cartSection">
<p></p>
</div>
   </div>
</li>`

}




let delfee=localStorage.getItem('restfee')
let total = document.getElementById('totalprice')
let ship = document.getElementById('shippingprice')
let tax = document.getElementById('taxprice')
ship.innerText='Rs.' + parseFloat(delfee).toFixed(2)
let subtotal = document.getElementById('subtotalprice')
subtotal.innerText='Rs. '+ totalprice.toFixed(2);
let finaleprice = Number(totalprice.toFixed(2)) + Number(parseFloat(delfee).toFixed(2))
console.log(finaleprice)
tax.innerText='Rs. ' + parseFloat(parseFloat(finaleprice)*0.05).toFixed(2)
finaleprice=parseFloat(parseFloat(finaleprice)*1.05).toFixed(2)
total.innerText= 'Rs. ' + finaleprice


const checkout = document.getElementById('checkout')
checkout.addEventListener('click',()=>{
    if(totalprice.toFixed(2)<150) {
        event.preventDefault()
        checkout.innerText='Minimum Order value is 150'
    } 
    else{
        localStorage.setItem('totprice',parseFloat(finaleprice).toFixed(2))
    }
})

