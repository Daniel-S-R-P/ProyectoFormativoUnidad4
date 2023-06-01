const form = document.querySelector('.form');
let id;
let id_ingreso;
window.onload = function () {
    informacion();
    listar();
};
const informacion = () => {
    const encodedData = localStorage.getItem('userData');
    data = JSON.parse(decodeURIComponent(encodedData));
    //console.log(data);
    id = data.id_usuario;
    document.getElementById('usuario').innerHTML = data.usuario;
}
// Agregar un evento de envío al formulario
form.addEventListener('submit', submitHandler = (event) => {
    event.preventDefault(); // Evitar que se envíe el formulario

    // Obtener los valores de los campos del formulario
    const fecha = form.querySelector('input[name="fecha"]').value;
    const cuenta = form.querySelector('select[name="cuenta"]').value;
    const categoria = form.querySelector('select[name="categoria"]').value;
    const importe = form.querySelector('input[name="importe"]').value;
    const nota = form.querySelector('input[name="nota"]').value;

    // Crear un objeto con los datos capturados
    const data = {
        id,
        fecha: fecha,
        cuenta: cuenta,
        categoria: categoria,
        importe: importe,
        nota: nota
    };
    fetch('http://localhost/contify-back/ingresos/create.php', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(result => {
            // Manejar la respuesta del servidor si es necesario
            Swal.fire('Ingreso Guardado');
            listar();
        })
        .catch(error => {
            // Manejar errores en caso de que ocurra alguno
            console.error('Error:', error);
        });

});

function listar() {
    const encodedData = localStorage.getItem('userData');
    dato = JSON.parse(decodeURIComponent(encodedData));
    const id = dato.id_usuario;
    fetch('http://localhost/contify-back/ingresos/consultar.php?id=' + id, {
        method: "GET"
    }).then(response => response.text()).then((response) => {
        /* console.log(response); */
        let = document.getElementById("result").innerHTML = response;
    }).catch((err) => {
        console.log(err)
    });
}

function eliminar(id) {
    Swal.fire({
        title: '¿Estás seguro de Eliminar el Registro?',
        text: "Los Cambios realizados no se revertirán",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('http://localhost/contify-back/ingresos/eliminar.php?id=' + id, {
                method: "POST",
                body: id
            }).then(response => response.text()).then(response => {
                if (response == "ok") {
                    Swal.fire(
                        'Registro eliminado',
                        'Has eliminado un registro',
                        'success'
                    );
                }
                listar();

            })
        }
    })
}

function editar(id) {
    fetch('http://localhost/contify-back/ingresos/mod.php?id=' + id, {
        method: "POST",
        body: id
    }).then(response => response.json()).then(response => {
        form.removeEventListener('submit', submitHandler);
        console.log(response);
        id_ingreso = response.id_ingreso;
        form.querySelector('input[name="tmp"]').value = id_ingreso
        const fecha = form.querySelector('input[name="fecha"]').value = response.fecha;
        const cuenta = form.querySelector('select[name="cuenta"]').value = response.tipo_ingreso;
        const categoria = form.querySelector('select[name="categoria"]').value = response.categoria;
        const importe = form.querySelector('input[name="importe"]').value = response.importe;
        const nota = form.querySelector('input[name="nota"]').value = response.descripcion;
    })
    form.addEventListener('submit', editarSubmitHandler = (event) => {
        event.preventDefault();
        const fecha = form.querySelector('input[name="fecha"]').value;
        const cuenta = form.querySelector('select[name="cuenta"]').value;
        const categoria = form.querySelector('select[name="categoria"]').value;
        const importe = form.querySelector('input[name="importe"]').value;
        const nota = form.querySelector('input[name="nota"]').value;
        const dataI = {
            id_ingreso,
            fecha: fecha,
            cuenta: cuenta,
            categoria: categoria,
            importe: importe,
            nota: nota
        };
        fetch('http://localhost/contify-back/ingresos/update.php', {
            method: 'POST',
            body: JSON.stringify(dataI),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(result => {
                // Manejar la respuesta del servidor si es necesario
                Swal.fire('Actualizacion Completada');
                listar();
            })
            .catch(error => {
                // Manejar errores en caso de que ocurra alguno
                console.error('Error:', error);
            });
    });
} 