

var delCartButtons = document.querySelectorAll('.delfromcart');
delCartButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
      console.log("del is called")
      parent = button.parentNode
      let addbutton = parent.querySelector('a')

      let obj=JSON.parse(localStorage.getItem(addbutton.dataset.id))
      let curqty = obj.quantity[0]
      if(parseInt(curqty)==1) {
        addbutton.innerText='Add to Cart'
        parent.querySelector('span').innerText=''
        button.setAttribute('hidden', '');
        localStorage.removeItem(addbutton.dataset.id)
      }
      else {

        obj.quantity[0]=curqty-1;
        parent.querySelector('span').innerText =`  ${obj.quantity[0]}  `
        if(obj.opt1.length==0 && obj.opt2.length==0){
        }
        else{
          obj.opt1.pop()
          obj.opt2.pop()
          obj.itemPrice.pop()
        }
        localStorage.setItem(addbutton.dataset.id,JSON.stringify(obj))
      }
    })
  
} )

const changebutton =(button,qty)=>{
  button.innerText='+'
  firstp=button.parentNode;
  txt = firstp.querySelectorAll('span')[0].innerText; 
  firstp.querySelectorAll('span')[0].innerText =`  ${qty}  `;
  
  firstp.querySelectorAll('.delfromcart')[0].innerText='-'
  firstp.querySelectorAll('.delfromcart')[0].removeAttribute('hidden')
  // else firstp.querySelectorAll('span')[0].innerText =txt+1;
  // firstp.innerHTML+=`<a class="btn btn-outline-dark mt-auto" data-id="{{ dish.id }}" data-name="{{ dish.name }}" data-price="{{ dish.price }}" data-restid="{{restid}}" data-addons="{{ dish.addons }}" data-variants="{{dish.variants}}" >-</a>`

}

var addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(function(button) {
  
if(localStorage.getItem('restid')!=null && parseInt(localStorage.getItem('restid'))==parseInt(button.dataset.restid)){
      if(localStorage.getItem(button.dataset.id)!=null) {
        let qanty = JSON.parse(localStorage.getItem(button.dataset.id)).quantity

        changebutton(button,qanty)
      }
  }
  
  // ----------xxxxxxxxxxxxx------------- //

  button.addEventListener('click', function() {
    console.log("add to cart button was clicked");
    variants=button.dataset.variants //kitne group windows khulenge
    addons=button.dataset.addons 
    let restid=button.dataset.restid
    let delfee=button.dataset.fee
    var item = {
        'itemId' : button.dataset.id,
        'itemName' : button.dataset.name,
        'itemPrice' : [parseInt(button.dataset.price)],
        'quantity': [1],
        'opt1':[],
        'opt2':[],
        'addons':[],
        'variant':variants
      }

// check ki kisi or restaurant se hai kya:::
if(localStorage.getItem("restid")!=null){
  if(parseInt(localStorage.getItem("restid"))!=parseInt(restid)) {
    // console.log("HI IDIOPT")
      //ask user :
      button.setAttribute('data-toggle','modal')
    button.setAttribute('data-target','#exampleModal')
    let body=document.getElementsByClassName('modal-body')[0]
    let footer=document.getElementsByClassName('modal-footer')[0]
    body.innerHTML='Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?'
    footer.innerHTML=`<button type="button" class="btn btn-secondary" id="yes">Yes, Start Afresh</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="no">No</button>`
    const yes= document.getElementById("yes")
    const no= document.getElementById("no")
    yes.addEventListener('click',()=>{
      console.log("clickyes")
      button.removeAttribute('data-toggle')
      button.removeAttribute('data-target')
      // if yes: start afresh
      localStorage.clear()
      localStorage.setItem('restid',restid)
      localStorage.setItem('restfee',delfee)
      if(variants==0){
        footer.querySelector('#yes').setAttribute('data-dismiss','modal')
  let qty=1
    if(localStorage.getItem(item.itemId)!=null) {
      prevdata = JSON.parse(localStorage.getItem(item.itemId))
      qty = parseInt(prevdata.quantity[0])+1
      prevdata.quantity[0]=qty
      localStorage.setItem(item.itemId,JSON.stringify(prevdata))

    }
    else localStorage.setItem(item.itemId, JSON.stringify(item));
    changebutton(button,qty)
      }
      else{
        var element = document.querySelector('.modal-footer');
        if (element) {
        element.remove();
        }
    localStorage.setItem('temp', JSON.stringify(item));
    
    // console.log(variants)
    let body=document.getElementsByClassName('modal-body')[0]
    const myData = { 'restid': restid, 'itemid':item.itemId,'variants':variants };
const myDataString = JSON.stringify(myData);

// create XHR object and send request
const xhr = new XMLHttpRequest();
xhr.open('POST', '/variantintro');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
  if (xhr.status === 200) {
    
    body.innerHTML=xhr.responseText

  }
};
xhr.send(myDataString);
button.setAttribute('data-toggle','modal')
button.setAttribute('data-target','#exampleModal')
    // window.location.href = `/restaurant/${restid}/${item.itemId}/${variants}`
  
      }
    })
    $('#exampleModal').on('hide.bs.modal', function (e) {
  console.log("hi")
  button.removeAttribute('data-toggle')
  button.removeAttribute('data-target')
})

    
  }
  else{
      //dont start afresh
      if(variants==0){
  let qty=1
    if(localStorage.getItem(item.itemId)!=null) {
      prevdata = JSON.parse(localStorage.getItem(item.itemId))
      qty = parseInt(prevdata.quantity[0])+1
      prevdata.quantity[0]=qty
      localStorage.setItem(item.itemId,JSON.stringify(prevdata))

    }
    else localStorage.setItem(item.itemId, JSON.stringify(item));
    changebutton(button,qty)
      }
      else{
        var element = document.querySelector('.modal-footer');
        if (element) {
        element.remove();
        }
    localStorage.setItem('temp', JSON.stringify(item));
    
    // console.log(variants)
    let body=document.getElementsByClassName('modal-body')[0]
    const myData = { 'restid': restid, 'itemid':item.itemId,'variants':variants };
const myDataString = JSON.stringify(myData);

// create XHR object and send request
const xhr = new XMLHttpRequest();
xhr.open('POST', '/variantintro');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
  if (xhr.status === 200) {
    
    body.innerHTML=xhr.responseText

  }
};
xhr.send(myDataString);
button.setAttribute('data-toggle','modal')
button.setAttribute('data-target','#exampleModal')
    // window.location.href = `/restaurant/${restid}/${item.itemId}/${variants}`
  
      }
  }
}

else{
  //start afresh
      localStorage.setItem("restid",restid)
      localStorage.setItem("restfee",delfee)
      if(variants==0){
  let qty=1
    if(localStorage.getItem(item.itemId)!=null) {
      prevdata = JSON.parse(localStorage.getItem(item.itemId))
      qty = parseInt(prevdata.quantity[0])+1
      prevdata.quantity[0]=qty
      localStorage.setItem(item.itemId,JSON.stringify(prevdata))

    }
    else localStorage.setItem(item.itemId, JSON.stringify(item));
    changebutton(button,qty)
      }
      else{
        var element = document.querySelector('.modal-footer');
        if (element) {
        element.remove();
        }
    localStorage.setItem('temp', JSON.stringify(item));
    
    // console.log(variants)
    let body=document.getElementsByClassName('modal-body')[0]
    const myData = { 'restid': restid, 'itemid':item.itemId,'variants':variants };
const myDataString = JSON.stringify(myData);

// create XHR object and send request
const xhr = new XMLHttpRequest();
xhr.open('POST', '/variantintro');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
  if (xhr.status === 200) {
    
    body.innerHTML=xhr.responseText

  }
};
xhr.send(myDataString);
button.setAttribute('data-toggle','modal')
button.setAttribute('data-target','#exampleModal')
    // window.location.href = `/restaurant/${restid}/${item.itemId}/${variants}`
  
      }

}
    })

  })

// ----------xxxxxxxxxxxxx------------------//

const cartbutton = document.getElementById('cart');
cartbutton.addEventListener('click',(event)=>{
  event.preventDefault()
  console.log("Hii");
  window.location.href = '/cart';
})

// ----------xxxxxxxxxxxxx------------------//

  const submit = () =>{
    const selectedOption = document.querySelector('input[name="same"]:checked').value;
    const optnum = document.querySelector('input[name="same"]:checked').dataset.optnum;
    const price = parseInt(document.querySelector('input[name="same"]:checked').dataset.price)/100;
    obj = JSON.parse(localStorage.getItem('temp'))
    
    let restid = localStorage.getItem('restid')
    let dep= parseInt(obj['variant'])-1
    console.log("depis",dep)
    if(dep==0){
        // variants are done.
      let obj  = JSON.parse(localStorage.getItem('temp'));
      obj.opt2.push({'name': selectedOption,'id':optnum})
      obj.itemPrice[0] = parseInt(price)
    //   obj.price.push()
      localStorage.setItem('temp',JSON.stringify(obj))

      if(obj.opt1.length==0){
        obj.opt1.push('None')
        localStorage.setItem('temp',JSON.stringify(obj))
        const myData = { 'restid': restid, 'itemid':obj.itemId,'opt2':{'name': selectedOption,'id':optnum}};
        const myDataString = JSON.stringify(myData);
        let body=document.getElementsByClassName('modal-body')[0]
  // create XHR object and send request
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/hiaddons2');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      
      body.innerHTML=xhr.responseText
      // console.log(xhr.responseText);
      // submit()
    }
  };
  xhr.send(myDataString);
        
        // window.location.href = `/restaurant/${restid}/${dishid}/${selectedOption}/addons`
      }
      else{

        let opt1 = obj.opt1[0]
        let body=document.getElementsByClassName('modal-body')[0]
        const myData = { 'restid': restid, 'itemid':obj.itemId,'opt1': opt1,'opt2':{'name': selectedOption,'id':optnum}};
        const myDataString = JSON.stringify(myData);

  // create XHR object and send request
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/hiaddons');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      
      body.innerHTML=xhr.responseText
      // console.log(xhr.responseText);
      // submit()
    }
  };
  xhr.send(myDataString);
        


        // window.location.href = `/restaurant/${restid}/${dishid}/${opt1}/${selectedOption}/addons`
      }
    }
    
    else {
        let obj= JSON.parse(localStorage.getItem('temp'))
        obj.opt1.push({'name': selectedOption,'id':optnum})
        obj.variant=parseInt(obj.variant)-1
        localStorage.setItem('temp',JSON.stringify(obj))
        let body=document.getElementsByClassName('modal-body')[0]
        const myData = { 'restid': restid, 'itemid':obj.itemId,'variants':obj.variant,'opt1':{'name': selectedOption,'id':optnum}};
        const myDataString = JSON.stringify(myData);

  // create XHR object and send request
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/variantintro2');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      
      body.innerHTML=xhr.responseText
      // console.log(xhr.responseText);
      // submit()
    }
  };
  xhr.send(myDataString);

        // window.location.href = `/restaurant/${restid}/${dishid}/${dep}/${selectedOption}`
    }
 
  }


  ///-------xxxxxx--------xxxx---------ADDONS-------xxxxxx--------xxxxx------///
  const submit2 = () =>{
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    // Loop through each checked checkbox
    let item = localStorage.getItem('temp')
    let restid = localStorage.getItem('restid')


        newitem=JSON.parse(item)
        localStorage.removeItem('temp')
        let myaddons=[]
        addonsprice=0
        checkboxes.forEach((checkbox) => {
            // Do something with the checked checkbox
            myaddons.push(checkbox.value)
            addonsprice+=parseInt(checkbox.dataset.price)
            console.log(`Checkbox with value ${checkbox.value} is checked.`);
        });

        if(localStorage.getItem(newitem.itemId)!=null){
            let obj= JSON.parse(localStorage.getItem(newitem.itemId))
            localStorage.removeItem(newitem.itemId)
            obj.quantity=parseInt(obj.quantity)+1
            obj.opt1.push(newitem.opt1[0])
            obj.opt2.push(newitem.opt2[0])
            obj.addons.push(myaddons)
            // console.log(obj.itemPrice)
            obj.itemPrice.push(parseInt(addonsprice)+parseInt(newitem.itemPrice[0]))
            localStorage.setItem(newitem.itemId,JSON.stringify(obj))
        }
        else {
            newitem.addons.push(myaddons)
            newitem.itemPrice=[parseInt(addonsprice)+parseInt(newitem.itemPrice)]
            localStorage.setItem(newitem.itemId,JSON.stringify(newitem))}

    window.location.href = `/restaurant/${restid}`
}



function doit(list){
  for (var i = 0; i < list.length; i++) {
    var inputs = list[i].querySelectorAll('.list-group-item');
    let input = inputs[0].querySelectorAll('input')
    let min =input[0].dataset.min
    if(min=='None') min=0 
    console.log(min)
    for (var j = 0; j < min; j++) {
        inputs[j].querySelectorAll('input')[0].checked=true
    }
    
  }
}

function limitCheckboxes(grpname) {
    var checkboxes = document.querySelectorAll(`input[type=checkbox][data-grp='${grpname}']:checked`);
    if(checkboxes.length< document.querySelectorAll(`input[type=checkbox][data-grp='${grpname}']`)[0].dataset.min ){
        event.target.checked = true;
        return;
    }
    let maxLimit=checkboxes[0].dataset.max;
    if(maxLimit=='None' || maxLimit<0) maxLimit=100 
    maxLimit=parseInt(maxLimit)
    let minLimit=checkboxes[0].dataset.min;
    if(minLimit=='None') minLimit=0 
    minLimit=parseInt(minLimit)
    console.log(minLimit, maxLimit)
    if (checkboxes.length > maxLimit) {
        if(checkboxes[0].value==event.target.value){
            if(checkboxes.length>1) {checkboxes[1].checked=false;}
            return
        } 
        checkboxes[0].checked=false
      
    } else if (checkboxes.length == maxLimit) {
        disableUncheckedCheckboxes();
    } else if (checkboxes.length < minLimit) {
        alert("You must select at least " + minLimit + " checkbox(es).");
        event.target.checked = true;
    } else {
        enableUncheckedCheckboxes();
    }
}

function disableUncheckedCheckboxes(value) {
    var checkboxes = document.querySelectorAll('input[type=checkbox][value="' + value + '"]:not(:checked)');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].disabled = true;
    }
}

function enableUncheckedCheckboxes(value) {
    var checkboxes = document.querySelectorAll('input[type=checkbox][value="' + value + '"]:not(:checked)');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].disabled = false;
    }
}

let mainlist = document.querySelector('.modal-body')

// Get a reference to the div tag

// Define the observer configuration
const config = { childList: true };

// Create a new observer and attach it to the div tag

// Define the observer callback function
const callback = function(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList' ) {
      ul=mainlist.querySelector('#addons')
      if(ul!=null) {
        let a  = ul.dataset.length
        if(parseInt(a)==parseInt(0)) {
          submit2()
        
      button = document.querySelector('.navbar-toggler')
      button.style.display = 'none';
      mainlist.textContent='Adding to Cart...'
        }
        else{
          var list = document.querySelectorAll(`.groups`)
          doit(list)
        }
        
      }
      // The div is empty, do something
      // Perform any action you want here, such as adding content to the div or displaying a message
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(mainlist, config);

const stickycart=document.getElementById('stickycart')
stickycart.addEventListener('click',()=>{
  window.location.href='/cart'
})


function replaceImage(image) {
  image.onerror = null; // remove the onerror event to avoid an infinite loop
  image.src = "https://media.discordapp.net/attachments/1060989317180301363/1085273513067298827/d5142e80-de9b-4477-bbc1-7c5dbaeb3d22.jpg?width=1026&height=1026"; // replace the image source with a new image
  image.style.width=508
  image.style.height=320
}