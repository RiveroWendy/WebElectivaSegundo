document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("#categorias-listadas");

    // Obtener las categorías del Local Storage
    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];

    // Limpiar el contenedor actual (opcional)
    container.innerHTML = "";

    // Generar las secciones dinámicamente
    categorias.forEach((categoria) => {
        const section = document.createElement("section");
        section.className =
            "btn btn-primary size-categoria d-flex flex-column flex-md-row justify-content-between p-3 align-items-md-center mt-2";
        section.onclick = () => seleccionarCategoria(categoria);

        section.innerHTML = `
            <div class="d-flex align-items-center">
                <p class="frase h3">${categoria}</p>
            </div>
            <div class="m-2 size-icono d-flex justify-content-md-end alinear-icono">
                <i class="bi bi-pencil me-5"></i>
                <i class="bi bi-trash3-fill"></i>
            </div>
        `;

        container.appendChild(section);
    });
});

// Función para manejar la selección de categorías
function seleccionarCategoria(nombre) {
    alert(`Seleccionaste la categoría: ${nombre}`);
}
