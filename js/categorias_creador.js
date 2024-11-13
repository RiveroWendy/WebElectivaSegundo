
function seleccionarCategoria(categoria) {
    localStorage.setItem('categoriaSeleccionada', categoria);
    window.location.href = '../frases_creador.html';

}
