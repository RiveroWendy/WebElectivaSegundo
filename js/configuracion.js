document.addEventListener("DOMContentLoaded", () => {
    // Referencias a los elementos del DOM
    const voiceSelect = document.getElementById("voiceSelect");
    const voiceSpeed = document.getElementById("voiceSpeed");
    const testConfigBtn = document.getElementById("testConfigBtn");
    const selectConstraste = document.getElementById("contrastSelect");

    // Array para almacenar las voces disponibles
    let voices = [];

    // Función para cargar las voces disponibles
    const loadVoices = () => {
        voices = speechSynthesis.getVoices();
        voiceSelect.innerHTML = ""; // Limpiar las opciones previas
        voices.forEach((voice, index) => {
            const option = document.createElement("option");
            option.value = index; // Almacenar el índice de la voz
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });

        // Cargar las opciones previas guardadas en localStorage
        const savedConfig = JSON.parse(localStorage.getItem("speechConfig"));
        if (savedConfig) {
            voiceSelect.value = savedConfig.voiceIndex;
            voiceSpeed.value = savedConfig.speed;
        }
    };

    // Evento para cargar voces cuando estén disponibles
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    } else {
        loadVoices();
    }

    // Evento al hacer clic en el botón "Probar Voz"
    testConfigBtn.addEventListener("click", () => {
        const selectedVoiceIndex = voiceSelect.value; // Índice de la voz seleccionada
        const selectedSpeed = parseFloat(voiceSpeed.value); // Velocidad seleccionada

        // Crear una nueva instancia de SpeechSynthesisUtterance
        const utterance = new SpeechSynthesisUtterance("Este es un texto de prueba para la configuración de la voz.");
        utterance.voice = voices[selectedVoiceIndex]; // Asignar la voz seleccionada
        utterance.rate = selectedSpeed; // Asignar la velocidad seleccionada

        // Reproducir la voz
        speechSynthesis.speak(utterance);

        // Guardar la configuración en localStorage
        const config = {
            voiceIndex: selectedVoiceIndex,
            speed: selectedSpeed
        };
        localStorage.setItem("speechConfig", JSON.stringify(config));
    });

    // CONSTRASTE
    // selectConstraste.addEventListener("change", function() {
    //     const selectedContrast = selectConstraste.value;

    //     //localStorage.setItem("contrastConfig", selectedContrast);

    //     if (selectedContrast === "" || selectedContrast === "light") {
    //         document.documentElement.removeAttribute("data-theme");
    //     } else if (selectedContrast === "dark") {
    //         document.documentElement.setAttribute("data-theme", "dark");
    //     } else if (selectedContrast === "high-contrast") {
    //         document.documentElement.setAttribute("data-theme", "high-contrast");
    //     }
    // });


});
