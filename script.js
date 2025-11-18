const colores = {
    "Reaction": "bg-[#f16e7718]",
    "Memory": "bg-[#F7BA5318]",
    "Verbal": "bg-[#51C3A418]",
    "Visual": "bg-[#777EE718]"
};

const textosVisibles = {
    "Reaction": "Reacción",
    "Memory": "Memoria",
    "Verbal": "Verbal",
    "Visual": "Visión"
};

fetch('./data.json')
    .then(res => res.json())
    .then(data => {

        const contenedor = document.getElementById("lista-resultados");

        data.forEach(item => {
            const li = document.createElement("li");

            li.innerHTML = `
        <div class="flex flex-row justify-between p-5 rounded-xl text-xl ${colores[item.categoria]}">
          <div class="flex flex-row gap-3 items-center">
            <img class="w-7 h-7" src="${item.icono}">
            <span class="text-xl font-bold">${textosVisibles[item.categoria]}</span>
          </div>
          <p class="font-extrabold">${item.puntaje} <span class="text-black/30 font-bold">/ 100</span></p>
        </div>
      `;

            contenedor.appendChild(li);
        });

        const total = data.reduce((acum, item) => acum + item.puntaje, 0);
        const promedio = total / data.length;
        const promedioRedondo = Math.round(promedio);

        document.getElementById("resultado-final").textContent = promedioRedondo;

        if (promedioRedondo > 65) {
            document.getElementById("texto-resultado").textContent =
                "Obtuviste una puntuación más alta que la mayoría de las personas que realizaron estas pruebas.";
        } else if (promedioRedondo <= 65 && promedioRedondo >= 50) {
            document.getElementById("texto-resultado").textContent =
                "Tu rendimiento está por encima del promedio general. Buen trabajo.";
        } else if (promedioRedondo <= 50 && promedioRedondo >= 30) {
            document.getElementById("texto-resultado").textContent =
                "Te encontraste dentro de la media general. Muchas personas obtuvieron resultados similares a los tuyos.";
        } else {
            document.getElementById("texto-resultado").textContent =
                "Tus resultados están por debajo del promedio. No te preocupes, esto solo marca un punto de partida para seguir mejorando.";
        }
    });
