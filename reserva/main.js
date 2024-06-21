
document.addEventListener('DOMContentLoaded', () => {
  const formularioReservacion = document.getElementById('formularioReservacion');
  const listaReservaciones = document.getElementById('listaReservaciones');

  // aqui se usa una función para guardar una reservación en localStorage //

  const guardarReservacion = (reservacion) => {
      let reservaciones = JSON.parse(localStorage.getItem('reservaciones')) || [];
      reservaciones.push(reservacion);
      localStorage.setItem('reservaciones', JSON.stringify(reservaciones));
  };

  // aqui se usa una función para mostrar las reservaciones en la lista //

  const mostrarReservaciones = () => {
      listaReservaciones.innerHTML = '';
      let reservaciones = JSON.parse(localStorage.getItem('reservaciones')) || [];
      reservaciones.forEach((reservacion, indice) => {
          let li = document.createElement('li');
          li.innerHTML = `
              <strong>${reservacion.nombre}</strong> reservó para <strong>${reservacion.personas}</strong> personas el <strong>${reservacion.fecha}</strong> a las <strong>${reservacion.hora}</strong> en la mesa <strong>${reservacion.mesa}</strong>
              <button onclick="eliminarReservacion(${indice})">Eliminar</button>
          `;
          listaReservaciones.appendChild(li);
      });
  };

  // aqui se usa una función para eliminar una reservación del localStorage //

  window.eliminarReservacion = (indice) => {
      let reservaciones = JSON.parse(localStorage.getItem('reservaciones')) || [];
      reservaciones.splice(indice, 1);
      localStorage.setItem('reservaciones', JSON.stringify(reservaciones));
      mostrarReservaciones();
  };

  // se Maneja el evento de envío del formulario //

  formularioReservacion.addEventListener('submit', (event) => {
      event.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const fecha = document.getElementById('fecha').value;
      const hora = document.getElementById('hora').value;
      const personas = document.getElementById('personas').value;
      const mesa = document.getElementById('mesa').value;

      const reservacion = {
          nombre,
          fecha,
          hora,
          personas,
          mesa
      };

      guardarReservacion(reservacion);
      mostrarReservaciones();
      formularioReservacion.reset();
  });

  document.getElementById('reserva').addEventListener('click', function() {
    Swal.fire({
        title: '¡Reservación exitosa!',
        text: 'Su reservación ha sido realizada con éxito.',
        icon: 'success',
        confirmButtonText: 'OK'
    });
});


    
 //  uso de Fetch API para obtener datos externos tipo simulaciin //
        

let url='https://b561547d86a6404c9b49f378d1bd6616.api.mockbin.io/'
fetch(url)
  .then(respuesta => {
    if (!respuesta.ok) {
      throw new Error('Respuesta de red no fue ok ' + respuesta.statusText);
    }
    return respuesta.json(); // analizar los datos JSON de la respuesta
  })
  .then(datos => {
    console.log(datos); // manejar los datos recibidos del servidor
  })
  .catch(error => {
    console.error('Hubo un problema con la operación fetch:', error);
  });


  fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      clave1: 'valor1',
      clave2: 'valor2'
    })
  })
  .then(respuesta => {
    if (!respuesta.ok) {
      throw new Error('Respuesta de red no fue ok ' + respuesta.statusText);
    }
    return respuesta.json();
  })
  .then(datos => {
    console.log(datos);
  })
  .catch(error => {
    console.error('Hubo un problema con la operación fetch:', error);
  });
  

  // se muestran las reservaciones al cargar la página //

  mostrarReservaciones();
});

