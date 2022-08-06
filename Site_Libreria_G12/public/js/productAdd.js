/* console.log("productAdd.js success");
const qs = (selector) => document.querySelector(selector)
window.addEventListener('load', () => {
    let productAdd = qs('#form-productAdd'),
        title = qs('#title'),
        author = qs('#author'),
        price = qs('#price'),
        category = qs('#categoryId'),
        year = qs('#year'),
        language = qs('#language'),
        pages = qs('#pages'),
        format = qs('#format'),
        editorial = qs('#editorial'),
        description = qs('#description'),
        img = qs('#img'),
        errorTitle = qs('#errorTitle'),
        errorAuthor = qs('#errorAuthor'),
        errorPrice = qs('#errorPrice'),
        errorCategory = qs('#errorCategory'),
        errorYear = qs('#errorYear'),
        errorLanguage = qs('#errorLanguage'),
        errorPages = qs('#errorPages'),
        errorFormat = qs('#errorFormat'),
        errorEditorial = qs('#errorEditorial'),
        errorDescription = qs('#errorDescription'),
        errorImg = qs('#errorImg'),
        titleExp = /^[a-zA-ZÀ-ÿ\s\-\0-9]{3,50}$/, // Letras, guion, acentos, numeros
        authorExp = /^[a-zA-ZÀ-ÿ\s]{4,30}$/, // Letras, acentos
        numbersExp = /^\d{4}$/, // Números
        pagesExp = /^\d{2,4}$/, // Números
        descriptionExp = /^[a-zA-ZÀ-ÿ\s\0-9]{20,200}$/, // Letras, acentos y numeros
        errors;

    title.addEventListener('blur', (e) => {
        switch (true) {
            case !title.value:
                errorTitle.innerHTML = 'Debes poner un titulo'
                title.classList.add('product-invalid')
                errors = true
                break;
            case !titleExp.test(title.value.trim()):
                errorTitle.innerHTML = 'El titulo tiene que ser de 3 a 50 caracteres'
                title.classList.add('product-invalid')
                errors = true
                break;
            default:
                title.classList.remove('product-invalid')
                title.classList.add('product-valid')
                errorTitle.innerHTML = ''
                errors = false
                break;
        }
    })

    author.addEventListener('blur', (e) => {
        switch (true) {
            case !author.value:
                errorAuthor.innerHTML = 'Debes poner un autor'
                author.classList.add('product-invalid')
                errors = true
                break;
            case !authorExp.test(author.value.trim()):
                errorAuthor.innerHTML = 'El autor tiene que ser de 4 a 30 caracteres, solo letras, puede contener acentos'
                author.classList.add('product-invalid')
                errors = true
                break;
            default:
                author.classList.remove('product-invalid')
                author.classList.add('product-valid')
                errorAuthor.innerHTML = ''
                errors = false
                break;
        }
    })

    price.addEventListener('blur', (e) => {
        switch (true) {
            case !price.value:
                errorPrice.innerHTML = 'Debes poner un precio'
                price.classList.add('product-invalid')
                errors = true
                break;
            case !numbersExp.test(price.value.trim()):
                errorPrice.innerHTML = 'El precio tiene que contener 4 caracteres, solo números.'
                price.classList.add('product-invalid')
                errors = true
                break;
            default:
                price.classList.remove('product-invalid')
                price.classList.add('product-valid')
                errorPrice.innerHTML = ''
                errors = false
                break;
        }
    })

    category.addEventListener('blur', () => {
        switch (true) {
            case !category.value:
                errorCategory.innerHTML = 'Debes seleccionar una categoria'
                category.classList.add('product-invalid')
                errors = true
                break;
            default:
                category.classList.remove('product-invalid')
                category.classList.add('product-valid')
                errorCategory.innerHTML = ''
                errors = false
                break;
        }
    })

    year.addEventListener('blur', (e) => {
        switch (true) {
            case !year.value:
                errorYear.innerHTML = 'Debes poner el año'
                year.classList.add('product-invalid')
                errors = true
                break;
            case !numbersExp.test(year.value.trim()):
                errorYear.innerHTML = 'El año tiene que contener 4 caracteres, solo números.'
                year.classList.add('product-invalid')
                errors = true
                break;
            default:
                year.classList.remove('product-invalid')
                year.classList.add('product-valid')
                errorYear.innerHTML = ''
                errors = false
                break;
        }
    })

    language.addEventListener('blur', (e) => {
        switch (true) {
            case !language.value:
                errorLanguage.innerHTML = 'Debes poner un idioma'
                language.classList.add('product-invalid')
                errors = true
                break;
            case !authorExp.test(language.value.trim()):
                errorLanguage.innerHTML = 'El idioma tiene que contener solo letras'
                language.classList.add('product-invalid')
                errors = true
                break;
            default:
                language.classList.remove('product-invalid')
                language.classList.add('product-valid')
                errorLanguage.innerHTML = ''
                errors = false
                break;
        }
    })

    pages.addEventListener('blur', (e) => {
        switch (true) {
            case !pages.value:
                errorPages.innerHTML = 'Debes llenar el campo'
                pages.classList.add('product-invalid')
                errors = true
                break;
            case !pagesExp.test(pages.value.trim()):
                errorPages.innerHTML = 'El número de paginas tiene que de contener de 2 a 4 caracteres, solo números.'
                pages.classList.add('product-invalid')
                errors = true
                break;
            default:
                pages.classList.remove('product-invalid')
                pages.classList.add('product-valid')
                errorPages.innerHTML = ''
                errors = false
                break;
        }
    })

    format.addEventListener('blur', () => {
        switch (true) {
            case !format.value:
                errorFormat.innerHTML = 'Debes seleccionar un formato'
                format.classList.add('product-invalid')
                errors = true
                break;
            default:
                format.classList.remove('product-invalid')
                format.classList.add('product-valid')
                errorFormat.innerHTML = ''
                errors = false
                break;
        }
    })

    editorial.addEventListener('blur', (e) => {
        switch (true) {
            case !editorial.value:
                errorEditorial.innerHTML = 'Debes poner una editorial'
                editorial.classList.add('product-invalid')
                errors = true
                break;
            case !authorExp.test(editorial.value.trim()):
                errorEditorial.innerHTML = 'La editorial tiene que contener de 4 a 30 caracteres, solo letras.'
                editorial.classList.add('product-invalid')
                errors = true
                break;
            default:
                editorial.classList.remove('product-invalid')
                editorial.classList.add('product-valid')
                errorEditorial.innerHTML = ''
                errors = false
                break;
        }
    })

    description.addEventListener('blur', (e) => {
        switch (true) {
            case !description.value:
                errorDescription.innerHTML = 'Debes poner una descripción'
                description.classList.add('product-invalid')
                errors = true
                break;
            case !descriptionExp.test(description.value.trim()):
                errorDescription.innerHTML = 'La descripción tiene que contener 20 a 200 caracteres.'
                description.classList.add('product-invalid')
                errors = true
                break;
            default:
                description.classList.remove('product-invalid')
                description.classList.add('product-valid')
                errorDescription.innerHTML = ''
                errors = false
                break;
        }
    })

    img.addEventListener('blur', () => {
        switch (true) {
            case !img.value:
                errorImg.innerHTML = 'Debes seleccionar una imagen'
                img.classList.add('product-invalid')
                errors = true
                break;
            default:
                img.classList.remove('product-invalid')
                img.classList.add('product-valid')
                errorImg.innerHTML = ''
                errors = false
                break;
        }
    })


    productAdd.addEventListener('submit', (e) => {
        e.preventDefault()
        switch (true) {
            case !title.value:
                errorTitle.innerHTML = 'Debes poner un titulo'
                title.classList.add('product-invalid')
                errors = true
                break;
            case !titleExp.test(title.value.trim()):
                errorTitle.innerHTML = 'El titulo tiene que ser de 3 a 50 caracteres'
                title.classList.add('product-invalid')
                errors = true
                break;
            case !author.value:
                errorAuthor.innerHTML = 'Debes poner un autor'
                author.classList.add('product-invalid')
                errors = true
                break;
            case !authorExp.test(author.value.trim()):
                errorAuthor.innerHTML = 'El autor tiene que ser de 4 a 30 caracteres, solo letras, puede contener acentos'
                author.classList.add('product-invalid')
                errors = true
                break;
            case !price.value:
                errorPrice.innerHTML = 'Debes poner un precio'
                price.classList.add('product-invalid')
                errors = true
                break;
            case !category.value:
                errorCategory.innerHTML = 'Debes seleccionar una categoria'
                category.classList.add('product-invalid')
                errors = true
                break;
            case !numbersExp.test(price.value.trim()):
                errorPrice.innerHTML = 'El precio tiene que contener 4 caracteres, solo números.'
                price.classList.add('product-invalid')
                errors = true
                break;
            case !year.value:
                errorYear.innerHTML = 'Debes poner el año'
                year.classList.add('product-invalid')
                errors = true
                break;
            case !numbersExp.test(year.value.trim()):
                errorYear.innerHTML = 'El año tiene que contener 4 caracteres, solo números.'
                year.classList.add('product-invalid')
                errors = true
                break;
            case !language.value:
                errorLanguage.innerHTML = 'Debes poner un idioma'
                language.classList.add('product-invalid')
                errors = true
                break;
            case !authorExp.test(language.value.trim()):
                errorLanguage.innerHTML = 'El idioma tiene que contener solo letras'
                language.classList.add('product-invalid')
                errors = true
                break;
            case !pages.value:
                errorPages.innerHTML = 'Debes llenar el campo'
                pages.classList.add('product-invalid')
                errors = true
                break;
            case !pagesExp.test(pages.value.trim()):
                errorPages.innerHTML = 'El número de paginas tiene que de contener de 2 a 4 caracteres, solo números.'
                pages.classList.add('product-invalid')
                errors = true
                break;
            case !format.value:
                errorFormat.innerHTML = 'Debes seleccionar un formato'
                format.classList.add('product-invalid')
                errors = true
                break;
            case !editorial.value:
                errorEditorial.innerHTML = 'Debes poner una editorial'
                editorial.classList.add('product-invalid')
                errors = true
                break;
            case !authorExp.test(editorial.value.trim()):
                errorPages.innerHTML = 'La editorial tiene que contener de 4 a 30 caracteres, solo letras.'
                editorial.classList.add('product-invalid')
                errors = true
                break;
            case !description.value:
                errorDescription.innerHTML = 'Debes poner una descripción'
                description.classList.add('product-invalid')
                errors = true
                break;
            case !descriptionExp.test(description.value.trim()):
                errorDescription.innerHTML = 'La descripción tiene que contener 20 a 200 caracteres.'
                description.classList.add('product-invalid')
                errors = true
                break;
            case !img.value:
                errorImg.innerHTML = 'Debes seleccionar una imagen'
                img.classList.add('product-invalid')
                errors = true
                break;
            default:
                if (!errors) {
                    productAdd.submit
                    errors = false
                } else {
                    errors = true
                }
                break;
        }
    })
}) */