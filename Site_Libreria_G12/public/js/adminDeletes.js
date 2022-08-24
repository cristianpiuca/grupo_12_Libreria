console.log("admin.js success");

/* popup for delete a product */
let forms = document.querySelectorAll('#adminDelete');
for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', event => {
            event.preventDefault();
            Swal.fire({
            customClass: {
                confirmButton: 'swalBtnColor',
                cancelButton: 'swalBtnColor'
            },

            title: '¿Seguro que quieres eliminar?',
            text: "No podrás revertirlo",
            icon: 'warning',
            background: "#ebebeb",
            showCancelButton: true,
            confirmButtonColor: '#269900',
            cancelButtonColor: '#b30000',
            cancelButtonText: 'Volver',
            confirmButtonText: 'Eliminar',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },

            }).then((result) => {

                if (result.isConfirmed) {
                    forms[i].submit();
                }

            })
    })
}



/* popup for edit a product */

let edit = document.querySelectorAll('#form-productEdit');
for (let i = 0; i < edit.length; i++) {
    edit[i].addEventListener('submit', event => {
           
        Swal.fire({
            title: 'Producto editado con éxito',
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
let add = document.querySelectorAll('#form-productAdd');
for (let i = 0; i < add.length; i++) {
    add[i].addEventListener('submit', event => {
           
        Swal.fire({
            title: 'Producto agregado con éxito',
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

