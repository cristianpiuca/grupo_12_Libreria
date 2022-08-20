console.log('login success');
const $ = (element) => document.getElementById(element);
const regExLetter = /^[A-Z]+$/i;
const regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
const regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;


$('email').addEventListener('blur',function(){
    switch (true) {
        case !this.value.trim():
            this.classList.add('is-invalid')
            $('errorEmail').innerHTML = "Debes ingresar email"
            break;
        case !regExEmail.test(this.value.trim()):
            this.classList.add('is-invalid')
            $('errorEmail').innerHTML = "Debes ingresar email valido"
        break;
        default:
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
            $('errorEmail').innerHTML = null
            break;
    }
})


$('password').addEventListener('blur',function(){
    switch (true) {
        case !this.value.trim():
            this.classList.add('is-invalid')
            $('errorPassword').innerHTML = "Debes ingresar contraseña"
            break;
        default:
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
            $('errorPassword').innerHTML = null
            break;
    }
})
$('form-control').addEventListener('submit', (e) => {
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
     !error && e.target.submit();
})

/* ************** */




