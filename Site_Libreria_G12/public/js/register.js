console.log("register.js success");
const qs = (selector) => document.querySelector(selector);

window.addEventListener("load", () => {
  let regExLetter = /^[A-Z]+$/i,
    regExEmail =
      /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/,
    regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/,
    email = qs("#email"),
    password = qs("#password"),
    password2 = qs("#password2"),
    errorEmail = qs("#errorEmail"),
    errorPassword = qs("#errorPassword"),
    errorPassword2 = qs("#errorPassword2"),
    errorName = qs("#errorName"),
    errorTerms = qs("#errorTerms"),
    register = qs("#formRegister"),
    nombre = qs("#name"),
    lastname = qs("#lastname"),
    msgError = qs("#msgError"),
    terminos = qs("#terminos")
   


    const nodemailerEmail = async (email) => {
      try {
          let response = await fetch("/users/send-email", {
              method: "POST",
              body: JSON.stringify({
                  email: email,
              }),
              headers: {
                  "Content-Type": "application/json",
              },
          });
          let result = await response.json();
          return result.data;
      } catch (error) {
          console.error;
      }
  };





  nombre.addEventListener("blur", () => {
    switch (true) {
      case !nombre.value.trim():
        errorName.innerHTML = "Debes ingresar tu nombre";
        nombre.classList.add("is-invalid");
        errors = true;
        break;
      case nombre.value.length < 3:
        errorName.innerHTML = "Minimo 3 caracteres";
        nombre.classList.add("is-invalid");
        errors = true;
        break;
      default:
        nombre.classList.remove("is-invalid");
        nombre.classList.add("is-valid");
        errorName.innerHTML = "";
        errors = false;
        break;
    }
  });

  email.addEventListener("blur", () => {
    switch (true) {
      case !email.value:
        errorEmail.innerHTML = "Debes ingresar tu email";
        email.classList.add("is-invalid");
        errors = true;
        break;
      case !regExEmail.test(email.value):
        errorEmail.innerHTML = "El email no es válido";
        email.classList.add("is-invalid");
        errors = true;
        break;
      default:
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
        errorEmail.innerHTML = "";
        errors = false;
        break;
    }
  });

  password.addEventListener("blur", () => {
    switch (true) {
      case !password.value:
        errorPassword.innerHTML = "Debes ingresar una contraseña";
        password.classList.add("is-invalid");
        errors = true;
        break;
      case !regExPass.test(password.value):
        errorPassword.innerHTML =
          "La contraseña debe tener entre 6 y 12 caracteres e incluir una mayuscula";
        password.classList.add("is-invalid");
        errors = true;
        break;
      default:
        password.classList.remove("is-invalid");
        password.classList.add("is-valid");
        errorPassword.innerHTML = "";
        errors = false;
        break;
    }
  });

  lastname.addEventListener("blur", () => {
    switch (true) {
      case !lastname.value.trim():
        errorLastname.innerHTML = "Debes ingresar apellido";
        lastname.classList.add("is-invalid");
        errors = true;
        break;
      case !regExLetter.test(lastname.value.trim()):
        errorLastname.innerHTML = "Solo letras";
        lastname.classList.add("is-invalid");
        errors = true;
        break;
      case lastname.value.trim().length < 3 ||
        lastname.value.trim().length > 255:
        errorLastname.innerHTML = "Minimo 3 caracteres";
        lastname.classList.add("is-invalid");
        errors = true;
        break;
      default:
        lastname.classList.remove("is-invalid");
        lastname.classList.add("is-valid");
        errorLastname.innerHTML = "";
        errors = false;
        break;
    }
  });

 

  password2.addEventListener("blur", () => {
    switch (true) {
      case !password2.value.trim():
        errorPassword2.innerHTML = "Debes repetir tu contraseña";
        password2.classList.add("is-invalid");
        break;
      case password2.value.trim() !== password.value.trim():
        errorPassword2.innerHTML = "Las contraseñas no coinciden";
        password2.classList.add("is-invalid");
        break;
      default:
        password2.classList.remove("is-invalid");
        password2.classList.add("is-valid");
        errorPassword2.innerHTML = '';
        errors = false;
        break;
    }
  });
  password.addEventListener("change", () => {
    /* validate when password changes */
    switch (true) {
      case password2.value.trim() !== password.value.trim():
        errorPassword2.innerHTML = "Las contraseñas no coinciden";
        password2.classList.add("is-invalid");
        break;
      default:
        password2.classList.remove("is-invalid");
        password2.classList.add("is-valid");
        errorPassword2.innerHTML = '';
        errors = false;
        break;
    }
  });

   if (!terminos.checked) {
    errorTerms.innerHTML = "Obligatorio";
    errors = true;
  }
  terminos.addEventListener("click", function () {
    errorTerms.innerHTML = "";
    errors = false;
  }); 

  register.addEventListener('submit', function (e) {
    e.preventDefault();
    let error = false;
    let elements = this.elements;
  
    console.log(elements);

    for (let i = 0; i < elements.length - 2; i++) {
        if (!elements[i].value) {
            elements[i].classList.add('is-invalid');

            error = true
        }
    }

    for (let i = 0; i < elements.length - 2; i++) {

        if (elements[i].classList.contains('is-invalid')) {
            error = true
        }
    }
   
  

    if (!terminos.checked) {
        terminos.classList.add('is-invalid')
        errorTerms.innerHTML = "Debes aceptar las bases y condiciones"
        error = true
    }else{
        errorTerms.innerHTML = ""
    }

    if (error == false) {
     
      e.target.submit();
      nodemailerEmail();
      msgError.innerHTML = null
  } else {
      msgError.innerHTML = "Todos los campos son obligatorios";
  }
})

});




