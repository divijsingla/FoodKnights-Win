let giveprompt=()=>{
    console.log("your previous order will be deleted")
    return 1;
  }

const submit = ()=>{
    const selectedOption = document.querySelector('input[name="same"]:checked').value;
    const optnum = document.querySelector('input[name="same"]:checked').dataset.optnum;
    console.log(selectedOption,optnum)
    let price = document.querySelector('input[name="same"]:checked').dataset.price;
    
    console.log(price)
    const url = window.location.href;
    const segments = url.split('/');
    const stringsBetweenSlashes = [];
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        if (segment !== '' && segment !== 'http:' && segment !== 'https:' && segment !== '') {
          stringsBetweenSlashes.push(segment);
        }
      }
      
    let restid = stringsBetweenSlashes[2]
    let dishid= stringsBetweenSlashes[3]
    let dep= parseInt(stringsBetweenSlashes[4])-1
    if(dep==0){
        // variants are done.
      let obj  = JSON.parse(localStorage.getItem('temp'));
      obj.opt2.push(selectedOption)
      obj.itemPrice[0] = parseInt(price)/100
    //   obj.price.push()
      localStorage.setItem('temp',JSON.stringify(obj))
      if(obj.opt1.length==0){
        obj.opt1.push('None')
        window.location.href = `/restaurant/${restid}/${dishid}/${selectedOption}/addons`
      }
      else{
        let opt1 = obj.opt1[0]
        window.location.href = `/restaurant/${restid}/${dishid}/${opt1}/${selectedOption}/addons`
      }
    }
    
    else {
        let obj= JSON.parse(localStorage.getItem('temp'))
        obj.opt1.push(selectedOption)
        localStorage.setItem('temp',JSON.stringify(obj))
        

        window.location.href = `/restaurant/${restid}/${dishid}/${dep}/${selectedOption}`
    }
    
}