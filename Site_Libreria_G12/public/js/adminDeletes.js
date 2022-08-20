console.log("admin.js success");
const $ = (element) => document.getElementById(element);

$('delete').addEventListener('click',function(){
    window.confirm('¿Quieres acceder a la eliminación?')
})
