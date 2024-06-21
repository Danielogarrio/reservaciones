
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

//objecto restaurat//

  
class Restaurante {
  constructor(nombre, direccion, telefono, especialidades) {
      this.nombre = nombre;
      this.direccion = direccion;
      this.telefono = telefono;
      this.especialidades = especialidades;
  }

  mostrarInfo() {
      console.log(`Nombre: ${this.nombre}, Dirección: ${this.direccion}`);
  }
}

const restaurante1 = new Restaurante("sazon oaxaqueño", "3 priv. 5 de mayo,col centro,oaxaca", "9511234589", ["Mole", "Tlayudas", "pozole"]);

delete restaurante1.telefono;

restaurante1.mostrarInfo(); 

for (let propiedad in restaurante1) {
  console.log(`${propiedad}: ${restaurante1[propiedad]}`);
}


  // array de reservaciones://

  const reservaciones = [
    { id: 1, nombre: 'Daniel', mesas: 2, hora: '18:00', confirmada: true },
    { id: 2, nombre: 'Juan', mesas: 1, hora: '19:00', confirmada: false },
    { id: 3, nombre: 'Luis', mesas: 3, hora: '20:00', confirmada: true },
    { id: 4, nombre: 'pedro', mesas: 1, hora: '18:30', confirmada: true },
    { id: 5, nombre: 'Mario', mesas: 2, hora: '19:00', confirmada: false }
  ];

  const reservacionDeJuan = reservaciones.find(reserva => reserva.nombre === 'Juan');
console.log(reservacionDeJuan);

//calcula numero de mesas reservadas//

const totalMesasReservadas = reservaciones.reduce((total, reserva) => total + reserva.mesas, 0);
console.log(totalMesasReservadas); 


const nombresDeClientes = reservaciones.map(reserva => reserva.nombre);
console.log(nombresDeClientes); 

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
  

  // se muestran las reservaciones al cargar la página //

  mostrarReservaciones();
});

