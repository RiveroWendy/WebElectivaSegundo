document.addEventListener("DOMContentLoaded", () => {
    const fontSelect = document.getElementById("fontSelect");
    const fontSizeSelect = document.getElementById("fontSizeSelect");
    const previewText = document.getElementById("previewText");
    const body = document.body;
    const saveButton = document.getElementById("btn-guardar");

    // Función para guardar las configuraciones en localStorage
    const saveFontConfig = () => {
        const fontConfig = {
            fontFamily: fontSelect.value,
            fontSize: fontSizeSelect.value
        };
        localStorage.setItem("fontConfig", JSON.stringify(fontConfig));
    };

    // Función para cargar las configuraciones desde localStorage
    const loadFontConfig = () => {
        console.log(localStorage.getItem("fontConfig"));
        const savedConfig = JSON.parse(localStorage.getItem("fontConfig"));
        if (savedConfig) {
            // Aplicar configuraciones al cuerpo del documento
            body.style.fontFamily = savedConfig.fontFamily;
            body.style.fontSize = getFontSizeInPixels(savedConfig.fontSize);

            // Preseleccionar las opciones en el modal (si existen los elementos)
            if (fontSelect) fontSelect.value = savedConfig.fontFamily;
            if (fontSizeSelect) fontSizeSelect.value = savedConfig.fontSize;

            // Actualizar previsualización (si existe el elemento)
            if (previewText) {
                previewText.style.fontFamily = savedConfig.fontFamily;
                previewText.style.fontSize = getFontSizeInPixels(savedConfig.fontSize);
            }
        }
    };

    // Función para obtener el tamaño en píxeles basado en la selección
    const getFontSizeInPixels = (size) => {
        switch (size) {
            case "small":
                return "12px";
            case "medium":
                return "16px";
            case "large":
                return "20px";
            default:
                return "16px"; // Valor por defecto
        }
    };

     // Verificar si los elementos de configuración existen antes de asignar eventos
     if (saveButton) {
        saveButton.addEventListener("click", () => {
            saveFontConfig();
            loadFontConfig();
        });
    }

    if (fontSelect) {
        fontSelect.addEventListener("change", () => {
            const selectedFont = fontSelect.value;
            if (previewText) previewText.style.fontFamily = selectedFont;
        });
    }

    if (fontSizeSelect) {
        fontSizeSelect.addEventListener("change", () => {
            const selectedSize = fontSizeSelect.value;
            if (previewText) previewText.style.fontSize = getFontSizeInPixels(selectedSize);
        });
    }

    // Cargar configuraciones guardadas al iniciar la página
    loadFontConfig();
});
