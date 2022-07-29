console.log('register.js success');
const $ = (element) => document.getElementById(element);

const regExLetter = /^[A-Z]+$/i;
const regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
const regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

const verifyEmail = async (email) => {
    try {
        let response = await fetch('/users/api/check-email', {
            method : 'POST',
            body : JSON.stringify({
                email : email
            }),
            headers : {
                'Content-Type': 'application/json' 
            }
            
        })
        let result = await response.json();
        return result.data;
       
    } catch (error) {
        console.error
    }
}


$('name').addEventListener('blur', function(){

    switch (true) {
        case !this.value.trim():
            $('errorName').innerHTML = "Debes ingresar tu nombre";
            this.classList.add('is-invalid')
            break;
        case !regExLetter.test(this.value.trim()):
            $('errorName').innerHTML = "Solo letras";
            this.classList.add('is-invalid')
            break
        case this.value.trim().length < 2 || this.value.trim().length > 255 :
            $('errorName').innerHTML = "Nombre muy corto";
            this.classList.add('is-invalid')
            break
        default:
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
            $('errorName').innerHTML = null;
            break;
    }
});


$('lastname').addEventListener('blur', function(){

    switch (true) {
        case !this.value.trim():
            $('errorLastname').innerHTML = "Debes ingresar apellido";
            this.classList.add('is-invalid')
            break;
        case !regExLetter.test(this.value.trim()):
            $('errorLastname').innerHTML = "Solo letras";
            this.classList.add('is-invalid')
            break
        case this.value.trim().length < 2 || this.value.trim().length > 255 :
            $('errorLastname').innerHTML = "El apellido es muy corto";
            this.classList.add('is-invalid')
            break
        default:
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
            $('errorLastname').innerHTML = null;
            break;
    }
});


$('email').addEventListener('blur', async function(){

    switch (true) {
        case !this.value.trim():
            $('errorEmail').innerHTML = "Debes ingresar tu email";
            this.classList.add('is-invalid')
            break;
        case !regExEmail.test(this.value.trim()):
            $('errorEmail').innerHTML = "El email no es válido";
            this.classList.add('is-invalid')
            break
        case await verifyEmail(this.value.trim()) :
            $('errorEmail').innerHTML = "¡El email ya existe!";
            this.classList.add('is-invalid')
            break
        default:
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
            $('errorEmail').innerHTML = null;
            break;
    }
});

$('password').addEventListener('blur', async function(){

    switch (true) {
        case !this.value.trim():
            $('errorPassword').innerHTML = "Debes ingresar una contraseña";
            this.classList.add('is-invalid')
            break;
        case !regExPass.test(this.value.trim()):
            $('errorPassword').innerHTML = "La contraseña debe tener entre 6 y 12 caracteres e incluir una mayuscula";
            this.classList.add('is-invalid')
            break
        default:
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
            $('errorPassword').innerHTML = null;
            break;
    }
})


$('password2').addEventListener('blur', async function(){

    switch (true) {
        case !this.value.trim():
            $('errorPassword2').innerHTML = "Debes repetir tu contraseña";
            this.classList.add('is-invalid')
            break;
        case this.value.trim() !== $('password').value.trim():
            $('errorPassword2').innerHTML = "Las contraseñas no coinciden";
            this.classList.add('is-invalid')
            break
        default:
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
            $('errorPassword2').innerHTML = null;
            break;
    }
});


$('terminos').addEventListener('click', function() {
    this.classList.remove('is-invalid');
    $('errorTerms').innerHTML = null

})



$('form-register').addEventListener('submit',(e) =>{
    e.preventDefault()
    
    let elements = e.target.elements /* accedo a los elementos del form */
   let error = false
   
    for (let i = 0; i < elements.length -2; i++) {
       if (!elements[i].value) {
        elements[i].classList.add('is-invalid')
        error = true
        $('errorPassword').innerHTML = "Debe llenar todos los campos"
       }
        
    }
    for (let i = 0; i < elements.length -2; i++) {
        if (elements[i].classList.contains('is-invalid')) {
       
         error = true
        }
         
     }
     if(!error){
        e.target.submit();
    } 
})





