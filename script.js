document.addEventListener("DOMContentLoaded", function () {
    const commandInput = document.getElementById("commandInput");

    // Simulate typing effect
    const welcomeText = "Welcome to the Old CRT Terminal";
    const screen = document.querySelector(".screen");
    typeText(welcomeText, screen);

    function typeText(text, element) {
        let index = -1;
        const typingInterval = setInterval(function () {
            if (index < text.length) {
                const char = text.charAt(index);
                const coloredChar = `<span class="typed-char">${char}</span>`;
                element.innerHTML += coloredChar;
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50); // Adjust the typing speed (milliseconds per character) as needed
    }
});
