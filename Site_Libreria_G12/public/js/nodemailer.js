const qs = (selector) => document.querySelector(selector);

let email = qs("#email");
let confirmForm = qs(".confirmForm");


confirmForm.addEventListener('submit', (e)=>{
    e.preventDefault();

let formData = {
    nombre : nombre.value
  }
  
  let xhr = new XMLHttpRequest();
  xhr.open('POST','/users/send-email')
  xhr.setRequestHeader('content-type','application/json');
  xhr.onload = function(){
    console.log(xhr.responseText);
    if (responseText === 'sucess') {
      alert('email enviado')
      nombre.value = '';
      lastname.value = '';
      email.value = '';
    }else{
      alert('algo salio mal')
    }
  }
  xhr.send(JSON.stringify(formData))
  

})
