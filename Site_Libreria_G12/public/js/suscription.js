
const btn = document.getElementById("button");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  btn.value = "Espera";

  const serviceID = "default_service";
  const templateID = "template_vi80fgm";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.value = "Enviar";
      alert("Enviado!");
    },
    (err) => {
      btn.value = "Enviar";
      alert(JSON.stringify(err));
    }
  );
});