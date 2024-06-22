let jugadores = [];

function generarJugadores() {
  const cantidadJugadores = parseInt(document.getElementById('cantidadJugadores').value);
  jugadores = [];

  for (let i = 1; i <= cantidadJugadores; i++) {
    let nombre = '';
    while (true) {
      nombre = prompt(`Ingrese el nombre para el Jugador ${i} (solo letras):`); // Pedir nombre al usuario
      if (/^[A-Za-z]+$/.test(nombre)) {
        break;
      } else {
        alert('El nombre debe contener solo letras.');
      }
    }

    let habilidad = 0;
    while (true) {
      habilidad = parseInt(prompt(`Ingrese la habilidad para ${nombre} (1-10):`)); // Pedir habilidad al usuario
      if (!isNaN(habilidad) && habilidad >= 1 && habilidad <= 10) {
        break;
      } else {
        alert('La habilidad debe ser un número entre 1 y 10. Inténtelo de nuevo.');
      }
    }

    jugadores.push({ nombre, habilidad });
  }

  mostrarJugadores();
}

function mostrarJugadores() {
  const listaJugadores = document.getElementById('jugadores');
  listaJugadores.innerHTML = '';
  jugadores.forEach((jugador, index) => {
    listaJugadores.innerHTML += `<li>${jugador.nombre} - Habilidad: ${jugador.habilidad}</li>`;
  });
}

function formarEquipos() {
  const cantidadEquipos = parseInt(document.getElementById('cantidadEquipos').value);

  if (jugadores.length < cantidadEquipos) {
    alert('No puedes formar más equipos que jugadores disponibles.');
    return;
  }

  jugadores.sort((a, b) => b.habilidad - a.habilidad);

  const contenedorEquipos = document.getElementById('contenedorEquipos');
  contenedorEquipos.innerHTML = '';

  const equipos = new Array(cantidadEquipos).fill().map(() => []);

  for (let i = 0; i < jugadores.length; i++) {
    const equipoIndex = i % cantidadEquipos;
    equipos[equipoIndex].push(jugadores[i]);
  }

  equipos.forEach((equipo, index) => {
    const promedioHabilidad = calcularPromedioHabilidades(equipo);
    mostrarEquipos(equipo, index + 1, promedioHabilidad);
  });
}

function calcularPromedioHabilidades(equipo) {
  if (equipo.length === 0) return 0;
  const totalHabilidad = equipo.reduce((total, jugador) => total + jugador.habilidad, 0);
  return totalHabilidad / equipo.length;
}

function mostrarEquipos(equipo, numeroEquipo, promedioHabilidad) {
  const contenedorEquipos = document.getElementById('contenedorEquipos');

  const equipoHTML = document.createElement('div');
  equipoHTML.classList.add('equipo');
  equipoHTML.innerHTML = `
    <h2>Equipo ${numeroEquipo}</h2>
    <h3>Promedio de Habilidad: ${promedioHabilidad.toFixed(2)}</h3>
    <ul>
      ${equipo.map(jugador => `<li>${jugador.nombre} - Habilidad: ${jugador.habilidad}</li>`).join('')}
    </ul>
  `;

  contenedorEquipos.appendChild(equipoHTML);
}
