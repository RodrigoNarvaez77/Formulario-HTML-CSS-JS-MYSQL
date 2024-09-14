async function modificar() {
    //console.log("hola");
    try{
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const mostrarbasededatos = await fetch(`Formulario.php?id=${id}`);
        const data = await mostrarbasededatos.json();
       // console.log(data);
        const tbody = document.getElementById("tmostrar");
        tbody.innerHTML='';

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="text" class="form-control" id="id" name="id" value=${item.id} required></td>
                <td><input type="text" class="form-control" id="nombre" name="nombre" value=${item.nombre} required></td>
                <td><input type="text" class="form-control" id="correo" name="correo" value=${item.correo} required></td>
                <td><input type="text" class="form-control" id="telefono" name="telefono" value=${item.telefono} required></td>
                <td><div style="width: 120%; background-color: lightblue;">
						<select class="form-control" id="estado_civil" name="estado_civil">
							<option value= ${item.estado_civil}>${item.estado_civil}</option>
							<option value="SOLTERO">SOLTERO</option>
							<option value="CASADO">CASADO</option>
							<option value="OTRO">OTRO</option>
						</select>
					</div></td>
                <td>
                    <div class="col-sm-10">
                        <label class="radio-inline">
                            <input type="radio"  name="hijos-${item.id}" value="1" ${item.hijos == '1' ? 'checked' : ''}> SI
                        </label>
                        <label class="radio-inline">
                            <input type="radio"   name="hijos-${item.id}" value="0" ${item.hijos == '0' ? 'checked' : ''}> NO
                        </label>
                    </div>
                </td>
                <td>   
                    <div class="col-sm-10">
                            <label class="checkbox-inline">
                                <input type="checkbox" id="intereses-libros-${item.id}" name="intereses-${item.id}[]" value="Libros" ${item.intereses.includes('Libros') ? 'checked' : ''}> Libros
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" id="intereses-musica-${item.id}" name="intereses-${item.id}[]" value="Musica" ${item.intereses.includes('Musica') ? 'checked' : ''}> Musica
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" id="intereses-deportes-${item.id}" name="intereses-${item.id}[]" value="Deportes" ${item.intereses.includes('Deportes') ? 'checked' : ''}> Deportes
                            </label>
                                <label class="checkbox-inline">
                                <input type="checkbox" id="intereses-otros-${item.id}" name="intereses-${item.id}[]" value="Otros" ${item.intereses.includes('Otros') ? 'checked' : ''}> Otros
                            </label>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }catch (error) {
        console.error("Error:", error);
    } 
}
modificar()

function volver() {
    window.history.back();
}

async function cambio(){
    try{ 
        const capturarid = document.getElementById('id').value;
        const capturarnombre = document.getElementById('nombre').value;
        const capturarcorreo = document.getElementById('correo').value;
        const capturartelefono = document.getElementById('telefono').value;
        const capturarestado_civil = document.querySelector('#estado_civil').value;
        const capturarradio = document.querySelectorAll('input[type="radio"]');
        const capturarcheck = document.querySelectorAll('input[type="checkbox"]');
       // console.log(capturarestado_civil);
        let seleccioncheck = [];
        let seleccionradio = [];


        capturarradio.forEach(radio =>{
            if(radio.checked){
                if(!seleccionradio.includes(radio.value)){
                    seleccionradio.push(radio.value);
                }
            }
            else{
                seleccionradio = seleccionradio.filter(value => value !==radio.value);//eliminar los que no estan seleccionados
            }

        })

        capturarcheck.forEach(check => { 
            if(check.checked){
                if(!seleccioncheck.includes(check.value)){
                    seleccioncheck.push(check.value);
                }
            }
            else {
                seleccioncheck = seleccioncheck.filter(value => value !== check.value);
            }

        });
        
        //console.log(seleccioncheck);
        //console.log(seleccionradio);
        
        //console.log(capturarid,capturarnombre,capturarcorreo,capturartelefono,seleccionradio);
        //&estado_civil=${encodeURIComponent(capturarestado_civil)}
        const enviar = await fetch(`Mostrar.php?id=${capturarid}&nombre=${encodeURIComponent(capturarnombre)}&correo=${encodeURIComponent(capturarcorreo)}&telefono=${encodeURIComponent(capturartelefono)}&hijos=${encodeURIComponent(seleccionradio)}&intereses=${encodeURIComponent(seleccioncheck)}&estado_civil=${encodeURIComponent(capturarestado_civil)}`);
        //console.log(enviar);
        const data = await enviar.json();
        alert(JSON.stringify(data));
    }catch(error){
        console.error("Error:", error);
    }

    
}


document.getElementById("boton2").addEventListener("click",volver);
document.getElementById("boton").addEventListener("click",cambio);