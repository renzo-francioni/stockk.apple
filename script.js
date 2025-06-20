const carrito = {};

const precios = {
  "airpods pro|transferencia": 34000,
  "airpods pro|efectivo": 31000,
  "bateria inalambrica|transferencia": 32000,
  "bateria inalambrica|efectivo": 30000,
  "cargador completo|transferencia": 22000,
  "cargador completo|efectivo": 20000,
  "cajita de cargador|transferencia": 19000,
  "cajita de cargador|efectivo": 17000,
  "cable tipo lighting|transferencia": 6000,
  "cable tipo lighting|efectivo": 6000,
};

function actualizarCarritoVisual() {
  const lista = document.getElementById("lista-carrito");
  const totalCarrito = document.getElementById("total-carrito");
  lista.innerHTML = "";

  let total = 0;

  Object.keys(carrito).forEach(key => {
    const cantidad = carrito[key];
    const [producto, pago] = key.split("|");
    const precio = precios[key] || 0;
    const li = document.createElement("li");
    li.innerHTML = `
      ${producto} - ${pago} (x${cantidad}) 
      <button onclick="eliminarProducto('${key}')">X</button>
      <span style="margin-left: 10px;">$${(precio * cantidad).toLocaleString("es-AR")}</span>
    `;
    lista.appendChild(li);

    total += precio * cantidad;
  });

  if (totalCarrito) {
    totalCarrito.textContent = `Total: $${total.toLocaleString("es-AR")}`;
  }
}

function eliminarProducto(key) {
  delete carrito[key];
  actualizarCarritoVisual();
}

document.querySelectorAll('.agregar-carrito').forEach(btn => {
  btn.addEventListener('click', () => {
    const producto = btn.getAttribute('data-producto');
    const productoDiv = btn.closest('.producto');
    const selectPago = productoDiv.querySelector('.tipo-pago');
    const pagoSeleccionado = selectPago.value;

    const key = `${producto}|${pagoSeleccionado}`;
    carrito[key] = (carrito[key] || 0) + 1;
    actualizarCarritoVisual();
  });
});

function enviarPedido() {
  if (Object.keys(carrito).length === 0) {
    return;
  }

  let mensaje = "Hola, quiero pedir:%0A";
  for (let key in carrito) {
    const cantidad = carrito[key];
    const [producto, pago] = key.split("|");
    mensaje += `- ${producto} - ${pago} (x${cantidad})%0A`;
  }

  const numero = "543472620734";
  const url = `https://wa.me/${numero}?text=${mensaje}`;
  window.open(url, "_blank");
}

// Slider funcional (igual que tu código)
document.querySelectorAll('.slider').forEach(slider => {
  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');
  let index = 0;

  function showSlide(i) {
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === i);
    });
  }

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  });
});
