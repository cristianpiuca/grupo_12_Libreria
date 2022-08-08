console.log("register.js success");

window.addEventListener('load', function() {

    let regExLetter = /^[A-Z]+$/i,
        onlyNumbers = /^[0-9]+$/i,
        errors,
        edit = document.querySelector('.userInfo'),
        name = document.getElementById('name'),
        errorName =document.getElementById('errorName'),
        lastname = document.getElementById('lastname'),
        errorLastname = document.getElementById('errorLastname'),
        birth = document.getElementById('birth'),
        errorBirth = document.getElementById('errorBirth'),
        address = document.getElementById('address'),
        errorAddress = document.getElementById('errorAddress')
        state = document.getElementById('state'),
        errorState = document.getElementById('errorState'),
        phone = document.getElementById('phone'),
        errorPhone = document.getElementById('errorPhone'),
        image = document.getElementById('image'),
        errorForm = document.getElementById('errorForm'),


        name.addEventListener("blur", () => {
            switch (true) {
              case name.value.trim() == '':
                errorName.innerHTML = 'Debes ingresar un nombre';
                name.classList.add('is-invalid');
                errors = true;
                break;
              case name.value.trim().length < 3:
                errorName.innerHTML = 'Debe tener al menos 3 caracteres';
                name.classList.add('is-invalid');
                errors = true;
                break;
              case !regExLetter.test(name.value.trim()):
                errorName.innerHTML = 'Solo puedes ingresar letras';
                name.classList.add('is-invalid');
                errors = true;
                break;
              default:
                name.classList.remove('is-invalid');
                name.classList.add('is-valid');
                errorName.innerHTML = '';
                errors = false;
                break;
            }
          });

          lastname.addEventListener("blur", () => {
            switch (true) {
              case lastname.value.trim() == '':
                errorLastname.innerHTML = 'Debes ingresar un apellido';
                lastname.classList.add('is-invalid');
                errors = true;
                break;
              case lastname.value.trim().length < 3:
                errorLastname.innerHTML = 'Debe tener al menos 3 caracteres';
                lastname.classList.add('is-invalid');
                errors = true;
                break;
              case !regExLetter.test(lastname.value.trim()):
                errorLastname.innerHTML = 'Solo puedes ingresar letras';
                lastname.classList.add('is-invalid');
                errors = true;
                break;
              default:
                lastname.classList.remove('is-invalid');
                lastname.classList.add('is-valid');
                errorLastname.innerHTML = '';
                errors = false;
                break;
            }
          });

          birth.addEventListener("blur", () => {
            switch (true) {
              case !birth.value:
                errorBirth.innerHTML = 'Debes ingresar tu fecha de nacimiento';
                birth.classList.add('is-invalid');
                errors = true;
                break;
              default:
                birth.classList.remove('is-invalid');
                birth.classList.add('is-valid');
                errorBirth.innerHTML = '';
                errors = false;
                break;
            }
          });

          phone.addEventListener("blur", () => {
            switch (true) {
              case phone.value.trim().length >= 10 && !onlyNumbers.test(phone.value.trim()):
                errorPhone.innerHTML = 'Solo puedes ingresar números';
                phone.classList.add('is-invalid');
                errors = true;
                break;
              case !phone.value:
                errorPhone.innerHTML = 'Debes ingresar un número de teléfono';
                phone.classList.add('is-invalid');
                errors = true;
                break;
              case phone.value.trim().length < 10:
                errorPhone.innerHTML = 'Debes ingresar un número válido';
                phone.classList.add('is-invalid');
                errors = true;
                break;
              default:
                phone.classList.remove('is-invalid');
                phone.classList.add('is-valid');
                errorPhone.innerHTML = '';
                errors = false;
                break;
            }
          });


          address.addEventListener("blur", () => {
            switch (true) {
              case !address.value:
                errorAddress.innerHTML = 'Debes ingresar una dirección';
                address.classList.add('is-invalid');
                errors = true;
                break;
              case address.value.trim().length < 5:
                errorAddress.innerHTML = 'Debes ingresar una dirección válida';
                address.classList.add('is-invalid');
                errors = true;
                break;
              default:
                address.classList.remove('is-invalid');
                address.classList.add('is-valid');
                errorAddress.innerHTML = '';
                errors = false;
                break;
            }
          });

          state.addEventListener("blur", () => {
            switch (true) {
              case !state.value:
                errorState.innerHTML = 'Debes seleccionar una provincia';
                state.classList.add('is-invalid');
                errors = true;
                break;
              default:
                state.classList.remove('is-invalid');
                state.classList.add('is-valid');
                errorState.innerHTML = '';
                errors = false;
                break;
            }
          });


          edit.addEventListener('submit',  (e) => {
            let errors;
            e.preventDefault();
         
            let elements =  edit.elements;
            for (let i = 0; i < elements.length - 1; i++) {
                if(elements[i].classList.contains('is-invalid')){
                    elements[i].classList.add('is-invalid');
                    errorForm.innerHTML = 'Revisa los campos';
                   errors = true
                }else{
                    errors = false;
                }
            };
        if (errors == false) {
            edit.submit()
        }
           
        }) 
        
    })