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

    frasesCategoria.forEach(frase => {
        const seccionFrase = document.createElement('section');
        const divFrase = document.createElement('div');
        const fraseP = document.createElement('p');
        const divIcono = document.createElement('div');
        const iconoParlante = document.createElement('i');

        seccionFrase.classList.add("btn", "btn-primary", "size-categoria", "d-flex", "flex-column", "flex-md-row", "justify-content-between", "p-3", "align-items-md-center", "mt-2");
        divFrase.classList.add("d-flex", "align-items-center");

        fraseP.classList.add("h3", "frase");
        fraseP.textContent = frase;

        divIcono.classList.add("m-2", "size-icono-grande", "d-flex", "justify-content-md-end", "alinear-icono");
        iconoParlante.classList.add("bi", "bi-volume-up-fill");

        seccionFrase.appendChild(divFrase);
        divFrase.appendChild(fraseP);
        seccionFrase.appendChild(divIcono);
        divIcono.appendChild(iconoParlante);
        frasesContainer.appendChild(seccionFrase);


        iconoParlante.addEventListener('click', function() {
            const textoFrase = fraseP.textContent;
            const synth = window.speechSynthesis;

            if (synth.speaking) {
                synth.cancel(); 
            }
            
            if (textoFrase !== '') {
                const utterance = new SpeechSynthesisUtterance(textoFrase);
                synth.speak(utterance); 
            }
        });
    });
});
