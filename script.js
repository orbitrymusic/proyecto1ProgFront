const columnas = { //Objeto de objetos (entiendase con objetos anidados).Cada objeto anidado tiene propiedades 
  B: { min: 1, max: 15, cantidad: 5 },
  I: { min: 16, max: 30, cantidad: 5 },
  N: { min: 31, max: 45, cantidad: 4 },
  G: { min: 46, max: 60, cantidad: 5 },
  O: { min: 61, max: 75, cantidad: 5 }
};

function generarNumerosUnicos(min, max, cantidad) { //se generan numeros aleatorios dentro de rango especifico
  const numeros = new Set();
  while (numeros.size < cantidad) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    numeros.add(num);
  }
  return Array.from(numeros);
}

function generarCarton() {  //Selecciona todas las celdas del cartón y recorre las columnas en orden.
  const celdas = document.querySelectorAll('.element');
  const columnasOrden = ['B', 'I', 'N', 'G', 'O'];

  for (let col = 0; col < columnasOrden.length; col++) {
    const letra = columnasOrden[col];
    const { min, max, cantidad } = columnas[letra];
    const numeros = generarNumerosUnicos(min, max, cantidad);

    let numIndex = 0;

    for (let fila = 0; fila < 5; fila++) {
      const index = fila * 5 + col;

      if (letra === 'N' && fila === 2) {//dice si la letra de la columna es n y el indice es 2 ,--> mete el contenido del text: GRATIS
        const celdaGratis = celdas[index];
        celdaGratis.textContent = 'GRATIS';
        celdaGratis.classList.add('element-free');
        celdaGratis.classList.remove('marked');
        continue;
      }

      const celda = celdas[index];
      celda.textContent = numeros[numIndex];
      celda.classList.remove('marked', 'element-free');
      numIndex++;
    }
  }
}

function manejarClics() {
  document.querySelectorAll('.element').forEach(celda => {
    celda.addEventListener('click', () => {
      if (celda.classList.contains('element-free')) return;
      celda.classList.toggle('marked');
    });
  });
}

document.getElementById('generate-btn').addEventListener('click', () => {
  generarCarton();
});

window.addEventListener('DOMContentLoaded', () => {//Cuando la pagina termina de cargar dispara  funciones generarCarton() y manejarClics()
  generarCarton();
  manejarClics();
});
