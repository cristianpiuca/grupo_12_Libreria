console.log("categoryAdd.js success");
const qs = (selector) => document.querySelector(selector)
window.addEventListener('load', () => {
    let categoryAdd = qs('#form-categoryAdd'),
        name = qs('#name'),
        errorName = qs('#errorName'),
        nameExp = /^[a-zA-ZÀ-ÿ\s]{5,15}$/,
        errors;
    name.addEventListener('blur', (e) => {
        switch (true) {
            case !name.value:
                errorName.innerHTML = 'Debes poner una categoria'
                name.classList.add('product-invalid')
                errors = true
                break;
            case !nameExp.test(name.value.trim()):
                errorName.innerHTML = 'La categoria debe tener 5 caracteres minimo'
                name.classList.add('product-invalid')
                errors = true
                break;
            default:
                name.classList.remove('product-invalid')
                name.classList.add('product-valid')
                errorName.innerHTML = ''
                errors = false
                break;
        }
    })

    categoryAdd.addEventListener('submit', (e) => {
        e.preventDefault()
        switch (true) {
            case !name.value:
                errorName.innerHTML = 'Debes poner una categoria'
                name.classList.add('product-invalid')
                errors = true
                break;
            case !nameExp.test(name.value.trim()):
                errorName.innerHTML = 'La categoria debe tener 5 caracteres minimo'
                name.classList.add('product-invalid')
                errors = true
                break;

            default:
                if (!errors) {
                    categoryAdd.submit()
                    errors = false
                } else {
                    errors = true
                }
                break;
        }
    })

})