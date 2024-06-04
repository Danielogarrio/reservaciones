
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

  // Mostrar el mensaje de éxito//

        mensajeExito.classList.remove('oculto');
        setTimeout(() => {
            mensajeExito.classList.add('oculto');
        }, 3000);
    

  // se muestran las reservaciones al cargar la página //

  mostrarReservaciones();
});

