console.log("categoriesAdmin.js success");
let edit = document.querySelectorAll('#form-categoryEdit');
for (let i = 0; i < edit.length; i++) {
    edit[i].addEventListener('submit', event => {
           
        Swal.fire({
            title: 'Categoría actualizada con éxito',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff',
            backdrop: `
              rgba(0,0,123,0.4)
              url("/images/nyanCatGif.gif")
              left top
              no-repeat
            `
          })
    })
}
let add = document.querySelectorAll('#form-categoryAdd');
for (let i = 0; i < add.length; i++) {
    add[i].addEventListener('submit', event => {
           
        Swal.fire({
            title: 'Categoría agregada con éxito',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff',
            backdrop: `
              rgba(0,0,123,0.4)
              url("/images/nyanCatGif.gif")
              left top
              no-repeat
            `
          })
    })
}
