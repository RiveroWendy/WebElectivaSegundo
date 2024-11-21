document.addEventListener("DOMContentLoaded", () => {
    const fontSelect = document.getElementById("fontSelect");
    const fontSizeSelect = document.getElementById("fontSizeSelect");
    const previewText = document.getElementById("previewText");
    const body = document.body;
    const saveButton = document.getElementById("btn-guardar");
    const contrastSelect = document.getElementById("contrastSelect"); 


    const saveFontConfig = () => {
        const fontConfig = {
            fontFamily: fontSelect.value,
            fontSize: fontSizeSelect.value
        };
        localStorage.setItem("fontConfig", JSON.stringify(fontConfig));
    };

    const saveContrastConfig = () => {
        const contrastConfig = contrastSelect.value;
        localStorage.setItem("contrastConfig", contrastConfig);
    };

    // Función para cargar las configuraciones desde localStorage
    const loadFontConfig = () => {
        const savedConfig = JSON.parse(localStorage.getItem("fontConfig"));
        if (savedConfig) {
            // Aplicar configuraciones al cuerpo del documento
            body.style.fontFamily = savedConfig.fontFamily;
            body.style.fontSize = getFontSizeInPixels(savedConfig.fontSize);

            if (fontSelect) fontSelect.value = savedConfig.fontFamily;
            if (fontSizeSelect) fontSizeSelect.value = savedConfig.fontSize;

            // Actualizar previsualización (si existe el elemento)
            if (previewText) {
                previewText.style.fontFamily = savedConfig.fontFamily;
                previewText.style.fontSize = getFontSizeInPixels(savedConfig.fontSize);
            }
        }
    };

    const loadContrastConfig = () => {
        const savedContrastConfig = localStorage.getItem("contrastConfig");
        if (savedContrastConfig) {
            document.body.setAttribute("data-theme", savedContrastConfig);
            if (contrastSelect) contrastSelect.value = savedContrastConfig;
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
    const showSaveAlert = () => {
        const alert = document.getElementById("saveAlert");
        if (alert) {
            alert.classList.remove("d-none"); // Muestra la alerta
            setTimeout(() => {
                alert.classList.add("d-none"); // Oculta la alerta después de 3 segundos
            }, 3000);
        }
    };
    const saveConfig = () => {
        saveFontConfig();
        saveContrastConfig();
        showSaveAlert();
    };

    if (saveButton) {
        saveButton.addEventListener("click", () => {
            saveConfig();
            loadFontConfig();
            loadContrastConfig();
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
    loadContrastConfig();

    if (contrastSelect) {
        contrastSelect.addEventListener("change", () => {
            const selectedTheme = contrastSelect.value;
            if (selectedTheme === "" || selectedTheme === "light") {
                document.documentElement.removeAttribute("data-theme");
            } else {
                document.documentElement.setAttribute("data-theme", selectedTheme); 
            }
        });
    }
});
