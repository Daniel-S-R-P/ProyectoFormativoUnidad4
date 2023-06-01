let ingreso = 0;
let egreso = 0;
let saldo = 0;
let user;


window.onload = function () {
    informacion();
    obtenerDatosGrafica();
    obtenerDatosGraficaE();
    obtenerI();
    obtenerE();
};

const statusG = () => {
    let ing = 0;
    let egr = 0;
    let sald = 0;
    ing = parseInt(ingreso);
    egr = parseInt(egreso);
    sald = parseFloat(saldo);

    const stat = (ing + sald) - egr;
    if (sald == NaN) {
        document.getElementById('Status').innerHTML = '$' + stat;
    } else if (sald > 0) {
        document.getElementById('Status').innerHTML = '$' + stat;
    } else {
        document.getElementById('Status').innerHTML = '$0';
    }

}

const informacion = () => {
    usuario()
        .then(() => ingresos())
        .then(() => egresos())
        .then(() => grafica())
        .catch(error => {
            console.error('Error:', error);
        });
}

const usuario = () => {
    return new Promise((resolve, reject) => {
        const encodedData = localStorage.getItem('userData');
        const data = JSON.parse(decodeURIComponent(encodedData));
        console.log(data);
        saldo = data.ingresos;
        user = data.id_usuario;
        document.getElementById('usuario').innerHTML = data.usuario;
        resolve();
    });
};

const ingresos = () => {
    return new Promise((resolve, reject) => {
        const encodedData = localStorage.getItem('userData');
        const data = JSON.parse(decodeURIComponent(encodedData));
        const usuario = data.id_usuario;

        fetch('http://localhost/contify-back/ingresos/contar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error al contar registros:', data.error);
                    reject(data.error);
                } else {
                    ingreso = data.total;
                    console.log(ingreso);
                    if (ingreso == NaN) {
                        document.getElementById('ingresos').innerHTML = '$' + ingreso;
                    } else if (ingreso > 0) {
                        document.getElementById('ingresos').innerHTML = '$' + ingreso;
                    } else {
                        document.getElementById('ingresos').innerHTML = '$0';
                    }
                    resolve();
                }
            })
            .catch(error => {
                console.error('Error al contar registros:', error);
                reject(error);
            });
    });
};

// ...

const grafica = () => {
    // Verifica si se han obtenido los valores de ingreso y egreso antes de crear la gráfica
    if (ingreso !== undefined && egreso !== undefined) {
        // Crear los datos del gráfico
        const data = {
            labels: ['Ingresos', 'Egresos'],
            datasets: [{
                data: [ingreso, egreso],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)']
            }]
        };

        // Crear el gráfico de pastel
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'pie',
            data: data
        });
    }
    statusG();
};

const egresos = () => {
    return new Promise((resolve, reject) => {
        const encodedData = localStorage.getItem('userData');
        const data = JSON.parse(decodeURIComponent(encodedData));
        const usuario = data.id_usuario;
        fetch('http://localhost/contify-back/egresos/contar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error al contar registros:', data.error);
                    reject(data.error);
                } else {
                    egreso = data.total;
                    if (egreso == NaN) {
                        document.getElementById('egresos').innerHTML = '$' + egreso;
                    } else if (egreso > 0) {
                        document.getElementById('egresos').innerHTML = '$' + egreso;

                    } else {
                        document.getElementById('egresos').innerHTML = '$0';
                    }
                    resolve();
                }
            })
            .catch(error => {
                console.error('Error al contar registros:', error);
                reject(error);
            });
    });
};


const obtenerDatosGrafica = () => {
    fetch('http://localhost/contify-back/ingresos/categorias.php?usuario=' + encodeURIComponent(user))
        .then(response => response.json())
        .then(data => {
            // Obtén las categorías y los totales de los datos
            const categorias = data.map(item => item.categoria);
            const totales = data.map(item => item.total);

            // Genera la gráfica utilizando Chart.js
            generarGrafica(categorias, totales);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
};

const generarGrafica = (categorias, totales) => {
    // Obtén el elemento canvas donde se mostrará la gráfica
    const canvas = document.getElementById('grafica');

    // Crea la gráfica utilizando Chart.js
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categorias,
            datasets: [{
                data: totales,
                backgroundColor: generarColoresDinamicos(categorias.length),
            }]
        },
        options: {
            responsive: true
        }
    });
};

const generarColoresDinamicos = (cantidad) => {
    // Genera una lista de colores aleatorios utilizando valores RGB
    const colores = [];
    for (let i = 0; i < cantidad; i++) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        colores.push(`rgb(${r}, ${g}, ${b})`);
    }
    return colores;
};

//Egresos por categoria
const obtenerDatosGraficaE = () => {
    fetch('http://localhost/contify-back/egresos/categorias.php?usuario=' + encodeURIComponent(user))
        .then(response => response.json())
        .then(data => {
            // Obtén las categorías y los totales de los datos
            const categorias = data.map(item => item.categoria);
            const totales = data.map(item => item.total);

            // Genera la gráfica utilizando Chart.js
            generarGraficaE(categorias, totales);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
};

const generarGraficaE = (categorias, totales) => {
    // Obtén el elemento canvas donde se mostrará la gráfica
    const canvas = document.getElementById('graficaEgreso');

    // Crea la gráfica utilizando Chart.js
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categorias,
            datasets: [{
                data: totales,
                backgroundColor: generarColoresDinamicosE(categorias.length),
            }]
        },
        options: {
            responsive: true
        }
    });
};

const generarColoresDinamicosE = (cantidad) => {
    // Genera una lista de colores aleatorios utilizando valores RGB
    const colores = [];
    for (let i = 0; i < cantidad; i++) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        colores.push(`rgb(${r}, ${g}, ${b})`);
    }
    return colores;
};

//Datos por tipo de ingresos
const obtenerI = () => {
    fetch('http://localhost/contify-back/ingresos/tipo.php?usuario=' + encodeURIComponent(user))
        .then(response => response.json())
        .then(data => {
            // Obtén las categorías y los totales de los datos
            console.log(data)
            const labels = data.map(ingreso => ingreso.tipo_ingreso);
            const counts = data.map(ingreso => ingreso.total);

            // Genera la gráfica utilizando Chart.js
            generarI(labels, counts);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
};
const obtenerE = () => {
    fetch('http://localhost/contify-back/egresos/tipo.php?usuario=' + encodeURIComponent(user))
        .then(response => response.json())
        .then(data => {
            // Obtén las categorías y los totales de los datos
            const labels = data.map(ingreso => ingreso.tipo_egreso);
            const counts = data.map(ingreso => ingreso.total);

            // Genera la gráfica utilizando Chart.js
            generarE(labels, counts);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
};
const generarE = (labels, counts) => {
    // Obtén el elemento canvas donde se mostrará la gráfica
    const canvas = document.getElementById('graficaTipoE');
    console.log(labels)
    // Crea la gráfica utilizando Chart.js
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: counts,
                backgroundColor: generarColoresE(counts.length),
            }]
        },
        options: {
            responsive: true
        }
    });
};
const generarColoresE = (cantidad) => {
    // Genera una lista de colores aleatorios utilizando valores RGB
    const colores = [];
    for (let i = 0; i < cantidad; i++) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        colores.push(`rgb(${r}, ${g}, ${b})`);
    }
    return colores;
};

const generarI = (labels, counts) => {
    // Obtén el elemento canvas donde se mostrará la gráfica
    const canvas = document.getElementById('graficaTipoI');
    console.log(labels)
    // Crea la gráfica utilizando Chart.js
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: counts,
                backgroundColor: generarColoresI(counts.length),
            }]
        },
        options: {
            responsive: true
        }
    });
};

const generarColoresI = (cantidad) => {
    // Genera una lista de colores aleatorios utilizando valores RGB
    const colores = [];
    for (let i = 0; i < cantidad; i++) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        colores.push(`rgb(${r}, ${g}, ${b})`);
    }
    return colores;
};
const cerrar = () => {
    localStorage.removeItem('userData');
    window.location.href = '../index.html'
}