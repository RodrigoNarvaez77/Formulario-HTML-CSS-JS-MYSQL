async function mostrar() {
    try{
        const mostrarbasededatos = await fetch("Modificar.php");
        const data = await mostrarbasededatos.json();
        console.log(data);
        const tbody = document.getElementById("tmostrar");
        tbody.innerHTML='';

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.nombre}</td>
                <td>${item.correo}</td>
                <td>${item.telefono}</td>
                <td><a href="modificar.html?id=${item.id};"><span class="bi bi-pencil"></span></a></td>
                <td><a href="#" data-href="Eliminar.php?id=${item.id}" data-toggle="modal" data-target="#confirm-delete"><span class="bi bi-trash"></span></a></td>
            `;
            tbody.appendChild(row);
        });
    }catch (error) {
        console.error("Error:", error);
    } 
}
mostrar();

$(document).ready(function() {
    var deleteUrl;

    // Manejar el clic en el enlace de eliminación
    $(document).on('click', 'a[data-toggle="modal"]', function(e) {
        e.preventDefault(); // Prevenir la acción predeterminada del enlace
        deleteUrl = $(this).data('href'); // Obtener la URL de eliminación del atributo data-href
        $('#confirm-delete').modal('show'); // Mostrar el modal
    });

    // Manejar el clic en el botón de eliminar dentro del modal
    $('#btn-delete').on('click', function() {
        if (deleteUrl) {
            window.location.href = deleteUrl; // Redirigir a la URL de eliminación
        }
    });
});