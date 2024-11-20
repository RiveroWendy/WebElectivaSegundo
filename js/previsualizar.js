fontSizeSelect.addEventListener("change", () => {
    const selectedSize = fontSizeSelect.value; 

    let fontSize;
    switch (selectedSize) {
        case "small":
            fontSize = "12px";
            break;
        case "medium":
            fontSize = "16px";
            break;
        case "large":
            fontSize = "20px";
            break;
        default:
            fontSize = "16px"; 
    }

    previewText.style.fontSize = fontSize;
});
