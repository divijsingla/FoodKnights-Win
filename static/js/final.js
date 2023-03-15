const submitbtn = document.getElementById('submitButton')
submitbtn.addEventListener('click',()=>{
    console.log("hi")
    const phone = document.getElementById('phone').value
    const address = document.getElementById('address').value
    const name = document.getElementById('name').value
    
    localStorage.setItem('userdetails',JSON.stringify({'name':name,'phone':phone,'address':address}))
})


submitbtn.addEventListener('click',()=>{
  var data = {};
  var dishlist=[]
  price=localStorage.getItem('totprice')
  if(price==null) {
    if(restid!=null) window.location.href=`/restaurant/${restid}`
    else window.location.href=`/`
}
  restid=localStorage.getItem('restid')
  userdetails=localStorage.getItem('userdetails')
for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if(!(key.charAt(0)<='9' && key.charAt(0)>='0') ) continue;
    var value = localStorage.getItem(key);
    dishlist.push(value)
}
data['user']=userdetails
data['restid']=restid
data['dishlist']=dishlist
data['finalprice']=price
// Send data to server
fetch('/save_data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => {
    console.log(response);
})
.catch(error => {
    console.error(error);
});
if (/Mobi/.test(navigator.userAgent)) {
    // Perform actions specific to mobile devices
    window.location.href=`upi://pay?pn=with%20Upilink.in&pa=divijsingla1000@okaxis&cu=INR&am=${price}`
    console.log("User is using a mobile device");
  } else {
    // Perform actions specific to laptops
    window.location.href=`https://pay.upilink.in/pay/divijsingla1000@okaxis?am=${price}`
    console.log("User is using a laptop");
  }
})

const altpay = document.getElementById('altpay')
altpay.addEventListener('click',()=>{
    window.location.href=`https://pay.upilink.in/pay/divijsingla1000@okaxis?am=${price}`
})