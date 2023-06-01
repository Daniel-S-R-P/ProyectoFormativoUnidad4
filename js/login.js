const login = (event) => {
    const usuario = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    event.preventDefault();
    fetch("http://localhost/contify-back/user/read-one.php?user=" + usuario + "&password=" + password)
        .then(response => response.json())
        .then(data => {
            const encodedData = encodeURIComponent(JSON.stringify(data));
            localStorage.setItem('userData', encodedData); // Almacenar data en localStorage
            const url = './dashboard.html?data=' + encodedData;
            window.location.href = url;
        })
        .catch(error => {
            document.getElementById('response').innerHTML = 'Credenciales no encontradas';
        });
}
let isForgotPasswordFormVisible = false;

const toggleForgotPasswordForm = () => {
    if (isForgotPasswordFormVisible) {
        hideForgotPasswordForm();
    } else {
        showForgotPasswordForm();
    }
}

const showForgotPasswordForm = () => {
    document.getElementById('credenciales').style.display = 'none'
    document.getElementById('response').innerHTML = '';
    document.getElementById('forgotPasswordForm').style.display = 'block';
    document.getElementById('user').value = ''; // Limpiar el campo de usuario en el formulario de inicio de sesión
    document.getElementById('password').value = ''; // Limpiar el campo de contraseña en el formulario de inicio de sesión
    isForgotPasswordFormVisible = true;
}

const hideForgotPasswordForm = () => {
    document.getElementById('credenciales').style.display = 'flex'
    document.getElementById('forgotPasswordForm').style.display = 'none';
    isForgotPasswordFormVisible = false;
}

const resetPassword = (event) => {
    const usuario = document.getElementById('forgotUser').value;
    const telefono = document.getElementById('phoneNumber').value;
    event.preventDefault();
    fetch("http://localhost/contify-back/user/remember.php?user=" + usuario + "&telefono=" + telefono)
        .then(response => response.json())
        .then(data => {
            const encodedData = encodeURIComponent(JSON.stringify(data));
            localStorage.setItem('userData', encodedData); // Almacenar data en localStorage
            document.getElementById('resetPass').style.display = 'block'
            document.getElementById('forgotPasswordForm').style.display = 'none';
        })
        .catch(error => {
            document.getElementById('responseP').innerHTML = 'Usuario no encontrado';
        });
}
const resetPass = (event) => {
    const encodedData = localStorage.getItem('userData');
    const data = JSON.parse(decodeURIComponent(encodedData));
    const id = data.id_usuario;
    event.preventDefault();
    const contraseña = document.getElementById('newPassword').value;
    const datos = { id, contraseña }
    fetch('http://localhost/contify-back/user/updatePassword.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    }).then(response => {
        localStorage.removeItem('userData');
        window.location.href = '../pages/login.html'
    })
        .then(data => console.log(data))
        .catch(error => console.error(error));
}
