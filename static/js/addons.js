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
var list = document.querySelectorAll(`.groups`)
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


function limitCheckboxes(grpname) {
    console.log(grpname)
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
    if (checkboxes.length > maxLimit) {
        if(checkboxes[0].value==event.target.value){
            if(checkboxes.length>1) {checkboxes[1].checked=false;}
            return
        } 
        checkboxes[0].checked=false
        //   alert("You can only select a maximum of " + maxLimit + " checkboxes.");
        //   event.target.checked = false;
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

let mainlist = document.querySelector('.list-group')
if(mainlist.childElementCount==0){
    submit()
    button = document.querySelector('.navbar-toggler')
    button.style.display = 'none';
    mainlist.textContent='Processing'
}