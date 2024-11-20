document.addEventListener('DOMContentLoaded', function() {
    const nombreCat = localStorage.getItem('categoriaSeleccionada');
    const tituloCat = document.getElementById('nombre-categoria');
    tituloCat.textContent = nombreCat;

    let frasesCategoria = [];

    const datosLocales = localStorage.getItem(nombreCat);
    if (datosLocales) {
        frasesCategoria = JSON.parse(datosLocales);
        renderFrases(frasesCategoria);
    } else {
        fetch("categorias.json")
            .then(response => response.json())
            .then(data => {
                if (data[nombreCat]) {
                    frasesCategoria = data[nombreCat];
                    localStorage.setItem(nombreCat, JSON.stringify(frasesCategoria));
                    renderFrases(frasesCategoria);
                } else {
                    console.error('Categoría no encontrada en el JSON');
                }
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
            });
    }

    function renderFrases(frases) {
        const frasesContainer = document.getElementById('frases-container');
        frasesContainer.innerHTML = '';
        frases.forEach(frase => {
            agregarFrase(frase, frasesContainer);
        });
    }


    let voices = [];

    const loadVoices = () => {
        voices = speechSynthesis.getVoices();
    };

    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    } else {
        loadVoices();
    }

    function agregarFrase(frase, frasesContainer) {
        const seccionFrase = document.createElement('section');
        const divFrase = document.createElement('div');
        const fraseP = document.createElement('p');
        const divIcono = document.createElement('div');
        const iconoParlante = document.createElement('i');

        const savedConfig = JSON.parse(localStorage.getItem("speechConfig"));

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

                
                if (savedConfig) {
                    utterance.voice = voices[savedConfig.voiceIndex];
                    utterance.rate = parseFloat(savedConfig.speed);
                }

                synth.speak(utterance); 
            }
        });
    }

    const buscarFraseBtn = document.getElementById('buscar-frase');
    const inputBusqueda = document.getElementById('input-busqueda');

    inputBusqueda.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            const ingreso = inputBusqueda.value.trim().toLowerCase();
            const ingresoNormalizado = normalizeString(ingreso);

            if (ingreso) {
                const frasesFiltradas = frasesCategoria.filter(frase => normalizeString(frase).includes(ingresoNormalizado));
                renderFrases(frasesFiltradas);
            } else {
                renderFrases(frasesCategoria);
            }
        }
    });

    buscarFraseBtn.addEventListener('click', function() {
        const ingreso = inputBusqueda.value.trim().toLowerCase();
        const ingresoNormalizado = normalizeString(ingreso);

        if (ingreso) {
            const frasesFiltradas = frasesCategoria.filter(frase => normalizeString(frase).includes(ingresoNormalizado));
            renderFrases(frasesFiltradas);
        } else {
            renderFrases(frasesCategoria);
        }
    });

    function normalizeString(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

});
