console.log("contactUs.js success");
const qs = (selector) => document.querySelector(selector);
window.addEventListener("load", () => {
    regExEmail =
      /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/,
    email = qs("#email"),
    nameUser = qs("#name"),
    message = qs("#message"),
    subject = qs("#subject");


 



  nameUser.addEventListener("blur", () => {
    switch (true) {
      case !nameUser.value.trim():
        errorName.innerHTML = "Debes ingresar tu nombre";
        nameUser.classList.add("is-invalid");

        break;
      case nameUser.value.length < 3:
        errorName.innerHTML = "Minimo 3 caracteres";
        nameUser.classList.add("is-invalid");

        break;
      default:
        nameUser.classList.remove("is-invalid");
        nameUser.classList.add("is-valid");
        errorName.innerHTML = "";

        break;
    }
  });

  email.addEventListener("blur", () => {
    switch (true) {
      case !email.value:
        errorEmail.innerHTML = "Debes ingresar tu email";
        email.classList.add("is-invalid");

        break;
      case !regExEmail.test(email.value):
        errorEmail.innerHTML = "El email no es válido";
        email.classList.add("is-invalid");

        break;
      default:
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
        errorEmail.innerHTML = "";

        break;
    }
  });
  message.addEventListener("blur", () => {
    switch (true) {
      case !message.value:
        errorMessage.innerHTML = "Debes ingresar un mensaje";
        message.classList.add("is-invalid");

        break;

      default:
        message.classList.remove("is-invalid");
        message.classList.add("is-valid");
        errorMessage.innerHTML = "";

        break;
    }
  });
  subject.addEventListener("blur", () => {
    switch (true) {
      case !subject.value:
        errorSubject.innerHTML = "Debes ingresar un asunto";
        subject.classList.add("is-invalid");

        break;
      case subject.value.length < 3:
        errorSubject.innerHTML = "Minimo 3 caracteres";
        subject.classList.add("is-invalid");

        break;
      default:
        subject.classList.remove("is-invalid");
        subject.classList.add("is-valid");
        errorSubject.innerHTML = "";

        break;
    }
  });
});

const btn = document.getElementById('button');
document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  let formData = {
    email : email.value,
    nameUser : nameUser.value,
    message: message.value,
    subject : subject.value
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
  
});
