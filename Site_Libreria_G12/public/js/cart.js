console.log('cart.js success');

const $ = (element) => document.getElementById(element);

$('btnAddCart') && $('btnAddCart').addEventListener('click',async({target})=> {
    console.log('agregando al carrito', target.value);
    try {
        let response = await fetch('/api/carts/add-item',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body :JSON.stringify({
                id : target.value
            })
        })
        let result = await response.json()
        console.log(result);
    } catch (error) {
        console.log(error);
    }
})