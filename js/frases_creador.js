document.addEventListener('DOMContentLoaded', function() {
    const nombreCat = localStorage.getItem('categoriaSeleccionada');
    const tituloCat = document.getElementById('nombre-categoria');
    tituloCat.textContent = nombreCat;

    const frases = {
        "Saludos y despedidas": ["Hola", "Adiós", "Buenos días", "Buenas noches"],
        "Preguntas": ["¿Cómo estás?", "¿Qué tal?", "¿Qué haces?"],
        "Respuestas rapidas": ["Sí", "No", "Tal vez", "Perfecto"],
        "Social": ["Podemos hablar más tarde", "¿Te gustaría hablar en este momento?"],
        "Tareas y proyectos": ["Voy a empezar con mis tareas"]
    };

    const frasesContainer = document.getElementById('frases-container');
    const frasesCategoria = frases[nombreCat];

    function agregarFrase(frase) {
        const seccionFrase = document.createElement('section');
        const divFrase = document.createElement('div');
        const fraseP = document.createElement('p');
        const divIcono = document.createElement('div');
        const iconoEditar = document.createElement('i');
        const iconoEliminar = document.createElement('i');
        const iconoVoz = document.createElement('i');

        seccionFrase.classList.add("btn", "btn-primary", "size-categoria", "d-flex", "flex-column", "flex-md-row", "justify-content-between", "p-3", "align-items-md-center", "mt-2");
        divFrase.classList.add("d-flex", "align-items-center");

        fraseP.classList.add("h3", "frase");
        fraseP.textContent = frase;

        divIcono.classList.add("m-2", "d-flex", "justify-content-md-end", "alinear-icono");
        iconoEditar.classList.add("bi", "bi-pencil", "me-5","size-icono");
        iconoEliminar.classList.add("bi", "bi-trash3-fill","size-icono");
    

        seccionFrase.appendChild(divFrase);
        divFrase.appendChild(fraseP);
        seccionFrase.appendChild(divIcono);
        divIcono.appendChild(iconoEditar);
        divIcono.appendChild(iconoEliminar);
        frasesContainer.appendChild(seccionFrase);


        iconoEliminar.addEventListener('click', function() {
            seccionFrase.remove();
        });

    }

    frasesCategoria.forEach(frase => {
        agregarFrase(frase);
    });

    const crearFrase = document.getElementById('crear-frase');
    crearFrase.addEventListener('click', function() {
        const divInput = document.getElementById("div-input");
        divInput.classList.remove("d-none");  
        const guardarFrase = document.getElementById("guardar-frase");
        const divBuscador = document.getElementById("div-buscador");
        divBuscador.classList.add("d-none");
        
        guardarFrase.addEventListener("click", function() {
            const nuevaFraseInput = document.getElementById("input-frase");
            const nuevaFrase = nuevaFraseInput.value.trim();
            
            if (nuevaFrase) {
                frasesCategoria.push(nuevaFrase);
                agregarFrase(nuevaFrase);
                nuevaFraseInput.value = '';
            }

            divBuscador.classList.remove("d-none");
            divInput.classList.add("d-none");  
        });
    });
});
