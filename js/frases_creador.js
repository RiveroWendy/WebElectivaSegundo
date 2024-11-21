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

    function agregarFrase(frase, frasesContainer) {
        const seccionFrase = document.createElement('section');
        const divFrase = document.createElement('div');
        const fraseP = document.createElement('p');
        const divIcono = document.createElement('div');
        const iconoEditar = document.createElement('button');
        const iconoEliminar = document.createElement('button');

        seccionFrase.classList.add("btn", "btn-primary", "size-categoria", "d-flex", "flex-column", "flex-md-row", "justify-content-between", "p-3", "align-items-md-center", "mt-2");
        divFrase.classList.add("d-flex", "align-items-center");

        fraseP.classList.add("h3", "frase");
        fraseP.textContent = frase;

        divIcono.classList.add("m-2", "d-flex", "justify-content-md-end", "alinear-icono");
        iconoEditar.innerHTML= '<i class="bi bi-pencil size-icono icon-secundario"></i>';
        iconoEditar.classList.add("btn", "me-5");
        iconoEliminar.innerHTML= '<i class="bi bi-trash3-fill size-icono icon-secundario"></i>';
        iconoEliminar.classList.add("btn");

        seccionFrase.appendChild(divFrase);
        divFrase.appendChild(fraseP);
        seccionFrase.appendChild(divIcono);
        divIcono.appendChild(iconoEditar);
        divIcono.appendChild(iconoEliminar);
        frasesContainer.appendChild(seccionFrase);

        
        iconoEliminar.addEventListener('click', function() {
            if(confirm("¿Estás seguro de eliminar esta frase?"))
            seccionFrase.remove();
            const index = frasesCategoria.indexOf(frase);
            if (index >= 0) {
                frasesCategoria.splice(index, 1);
                localStorage.setItem(nombreCat, JSON.stringify(frasesCategoria)); 
            }
        });

        
        iconoEditar.addEventListener('click', function() {
            
            const inputFrase = document.createElement('input');
            inputFrase.classList.add("input-frase", "h3", "frase","me-3","d-flex","m-2");
            inputFrase.type = "text";
            inputFrase.value = frase; 
            
            divFrase.replaceChild(inputFrase, fraseP);
            
            const guardarEdicion = document.createElement('button');
            guardarEdicion.classList.add("btn","boton-guardar","size-icono-mediano");
            guardarEdicion.innerHTML = "<i class='bi bi-check-circle icon-secundario'></i>"; 
            divFrase.appendChild(guardarEdicion);

            const cancelarEdicion = document.createElement('button');
            cancelarEdicion.classList.add("btn","boton-edicion","size-icono-mediano");
            cancelarEdicion.innerHTML = "<i class='bi bi-x-circle icon-secundario'></i>"; 
            divFrase.appendChild(cancelarEdicion);

            guardarEdicion.addEventListener('click', function() {
                const nuevaFrase = inputFrase.value.trim();
                if (nuevaFrase) {
                    const index = frasesCategoria.indexOf(frase);
                    if (index >= 0) {
                        frasesCategoria[index] = nuevaFrase; 
                        localStorage.setItem(nombreCat, JSON.stringify(frasesCategoria)); 
                    }
                    inputFrase.replaceWith(fraseP); 
                    fraseP.textContent = nuevaFrase; 
                    guardarEdicion.remove(); 
                    cancelarEdicion.remove(); 
                }
            });

            cancelarEdicion.addEventListener('click', function() {
                
                    inputFrase.replaceWith(fraseP); 
                    guardarEdicion.remove(); 
                    cancelarEdicion.remove(); 
                
            });
        });
    }

    const crearFrase = document.getElementById('crear-frase');
    crearFrase.addEventListener('click', function() {
        const divInput = document.getElementById("div-input");
        divInput.classList.remove("d-none");
        const guardarFrase = document.getElementById("guardar-frase");
        const divBuscador = document.getElementById("div-buscador");
        divBuscador.classList.add("d-none");
        const nuevaFraseInput = document.getElementById("input-frase");

        guardarFrase.addEventListener("click", function() {

            const nuevaFraseInput = document.getElementById("input-frase");
            const nuevaFrase = nuevaFraseInput.value.trim();

            if (nuevaFrase) {
                frasesCategoria.push(nuevaFrase);
                agregarFrase(nuevaFrase, document.getElementById('frases-container'));
                nuevaFraseInput.value = '';

                localStorage.setItem(nombreCat, JSON.stringify(frasesCategoria));
            }

            divBuscador.classList.remove("d-none");
            divInput.classList.add("d-none");
            
        });

        nuevaFraseInput.addEventListener("keydown", function(e) {
            if(e.key === "Enter")
            {
            const nuevaFraseInput = document.getElementById("input-frase");
            const nuevaFrase = nuevaFraseInput.value.trim();

            if (nuevaFrase) {
                frasesCategoria.push(nuevaFrase);
                agregarFrase(nuevaFrase, document.getElementById('frases-container'));
                nuevaFraseInput.value = '';

                localStorage.setItem(nombreCat, JSON.stringify(frasesCategoria));
            }

            divBuscador.classList.remove("d-none");
            divInput.classList.add("d-none");
            }
        });
    });


    const buscarFraseBtn = document.getElementById('buscar-frase');
    const inputBusqueda = document.getElementById('input-busqueda');

    inputBusqueda.addEventListener("keydown", function(e) {
        if(e.key === "Enter")
        {
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
        const inputBusqueda = document.getElementById('input-busqueda');
        const ingreso = inputBusqueda.value.trim().toLowerCase();

        const ingresoNormalizado = normalizeString(ingreso);

        if (ingreso) {
            const frasesFiltradas = frasesCategoria.filter(frase => normalizeString(frase).includes(ingresoNormalizado));
            renderFrases(frasesFiltradas); 
        } else {
            renderFrases(frasesCategoria); 
        }
    });

    function normalizeString(ingreso) {
        return ingreso.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

});
