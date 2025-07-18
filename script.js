const productos = [
  "Hamburguesa cq", "Hamburguesa sq", "Doble con queso", "Triple con queso", "Mc pollo",
  "Cuarto de libra", "Doble cuarto de libra", "Gand bbq doble", "Grand BBQ triple",
  "Bacón deluxe doble", "Bacón deluxe triple", "Krispy cajun", "Krispy classic",
  "Krispy deluxe", "Krispy spicy", "Gourmet 1c", "Gourmet 2c", "Gourmet 3c",
  "BBQ chedar", "Mc tocino", "Nuggets 4", "Nuggets 6", "Nuggets 10", "Nuggets 20",
  "Clubhouse 1c", "Clubhouse 2c", "BBQ crispy onion 1c", "BBQ crispy onion 2c",
  "Cbo 1c", "Cbo 2c", "Mcnifica", "Mcnifica doble",
  "Hamburguesa BBQ sencilla", "Hamburguesa BBQ doble", "Hamburguesa BBQ triple"
];

let ordenes = [];
let eliminadas = [];
let indexLlamado = -1;

function generarOrden() {
  const maxTotal = parseInt(document.getElementById("limite").value) || 10;
  const seleccionados = [...productos].sort(() => 0.5 - Math.random());
  const orden = [];
  let total = 0;
  let index = 0;

  while (orden.length < 4 && index < seleccionados.length) {
    const maxCantidad = Math.min(maxTotal - total, 10);
    if (maxCantidad <= 0) break;
    const cantidad = Math.floor(Math.random() * maxCantidad) + 1;
    if (total + cantidad > maxTotal) break;
    orden.push(`${cantidad}x ${seleccionados[index]}`);
    total += cantidad;
    index++;
    if (total >= maxTotal) break;
  }

  return orden;
}


function renderOrdenes() {
  const cont = document.getElementById("ordenes");
  cont.innerHTML = "";
  ordenes.forEach((orden, idx) => {
    const div = document.createElement("div");
    div.className = "orden";
    div.innerHTML = `<strong>Orden ${idx + 1}:</strong><br>` + orden.join("<br>");
    cont.appendChild(div);
  });
}

function servido() {
  if (ordenes.length === 0) return;
  eliminadas.unshift(ordenes.shift());
  indexLlamado = 0;
  renderOrdenes();
}

function llamarOrden() {
  if (eliminadas.length === 0) return;
  indexLlamado = 0;
  mostrarLlamada();
}

function siguienteOrden() {
  if (indexLlamado + 1 < eliminadas.length) {
    indexLlamado++;
    mostrarLlamada();
  }
}

function mostrarLlamada() {
  const div = document.getElementById("orden-llamada");
  if (indexLlamado < 0 || indexLlamado >= eliminadas.length) {
    div.style.display = "none";
    return;
  }
  div.style.display = "block";
  div.innerHTML = `<strong>Llamando orden:</strong><br>` + eliminadas[indexLlamado].join("<br>");
}

function generarOrdenes() {
  ordenes = Array.from({ length: 5 }, generarOrden);
  eliminadas = [];
  indexLlamado = -1;
  document.getElementById("orden-llamada").style.display = "none";
  renderOrdenes();
}

window.onload = generarOrdenes;