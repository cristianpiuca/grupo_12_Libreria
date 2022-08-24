console.log("popupOnLoad.js success");

const popup = document.querySelector('.popup')
const close = document.querySelector('#close')
window.onload = function(){
    setTimeout(function(){
        popup.style.display = "block"
    },1500)
  
}
close.addEventListener('click', function(){
    popup.style.display = "none"
})
