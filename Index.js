document.addEventListener('DOMContentLoaded', () => {//esperar que carge el doom
    document.getElementById('boton').addEventListener('click', async () => {
        await capturar();
    });
});

async function capturar() {
   // alert("paso por aqui");
   //console.log("Función capturar iniciada");
    try {
        //console.log("paso por aqui 2");

        function nuevaPersona(nombre, email, telefono,estado_civil,hijos,intereses) {
            this.nombre = nombre;
            this.email = email;
            this.telefono = telefono;
            this.estado_civil = estado_civil;
            this.hijos = hijos;
            this.intereses = intereses;
        }

        // Captura los valores del formulario
        const nombreCapturar = document.getElementById("nombre").value;
        const emailCapturar = document.getElementById("email").value;
        const telefonoCapturar = document.getElementById("telefono").value;
        const hijosCapturar = document.querySelector('input[type="radio"][name="hijos"]:checked').value;
        const interesesCapturar = document.querySelectorAll('input[type="checkbox"]:checked');
        const estado_civil = document.querySelector('option[value]:checked').value;
        let interesesvarios = [];
        
        interesesCapturar.forEach(check => { 
            if(check.checked){
                if(!interesesvarios.includes(check.value)){
                    interesesvarios.push(check.value);
                }
            }
            else {
                interesesvarios = interesesvarios.filter(value => value !== check.value);
            }

        });

        console.log(interesesvarios);
        console.log(estado_civil);
        console.log(hijosCapturar);

        // Crea una nueva instancia de persona
        const Personas = new nuevaPersona(nombreCapturar, emailCapturar, telefonoCapturar);
       // console.log(Personas);

        // Envía los datos al servidor
        await fetch('Index.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Personas)
        });

    } catch (error) {
        console.error("Error:", error);
    }
}