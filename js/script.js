const formCategoria = document.getElementById('formCategoria');
        const listaCategorias = document.getElementById('listaCategorias');

        document.addEventListener('DOMContentLoaded', cargarCategorias);

        formCategoria.addEventListener('submit', function(event) {
            event.preventDefault();
            const nombreCategoria = document.getElementById('nombreCategoria').value.trim();
            if (nombreCategoria) {
                agregarCategoria(nombreCategoria);
                guardarCategoria(nombreCategoria);
                document.getElementById('nombreCategoria').value = ''; 
            }
        });

        function agregarCategoria(nombre) {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span>${nombre}</span>
                <div>
                    <button class="btn btn-sm btn-warning me-2" onclick="editarCategoria('${nombre}')">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarCategoria('${nombre}')">Eliminar</button>
                </div>
            `;
            listaCategorias.appendChild(li);
        }

        function editarCategoria(nombre) {
            const nuevoNombre = prompt("Editar nombre de la categoría:", nombre);
            if (nuevoNombre) {
               
                const items = listaCategorias.querySelectorAll('li');
                items.forEach(item => {
                    if (item.querySelector('span').innerText === nombre) {
                        item.querySelector('span').innerText = nuevoNombre;
                    }
                });
                
                actualizarCategoriaEnStorage(nombre, nuevoNombre);
            }
        }

        function eliminarCategoria(nombre) {
            if (confirm(`¿Estás seguro de eliminar la categoría "${nombre}"?`)) {
                const items = listaCategorias.querySelectorAll('li');
                items.forEach(item => {
                    if (item.querySelector('span').innerText === nombre) {
                        item.remove();
                    }
                });
                
                eliminarCategoriaDeStorage(nombre);
            }
        }

        function guardarCategoria(nombre) {
            let categorias = JSON.parse(localStorage.getItem('categorias')) || [];
            categorias.push(nombre);
            localStorage.setItem('categorias', JSON.stringify(categorias));
        }

        function cargarCategorias() {
            let categorias = JSON.parse(localStorage.getItem('categorias')) || [];
            categorias.forEach(categoria => agregarCategoria(categoria));
        }

        function actualizarCategoriaEnStorage(viejoNombre, nuevoNombre) {
            let categorias = JSON.parse(localStorage.getItem('categorias')) || [];
            const index = categorias.indexOf(viejoNombre);
            if (index !== -1) {
                categorias[index] = nuevoNombre;
                localStorage.setItem('categorias', JSON.stringify(categorias));
            }
        }

        function eliminarCategoriaDeStorage(nombre) {
            let categorias = JSON.parse(localStorage.getItem('categorias')) || [];
            categorias = categorias.filter(categoria => categoria !== nombre);
            localStorage.setItem('categorias', JSON.stringify(categorias));
        }