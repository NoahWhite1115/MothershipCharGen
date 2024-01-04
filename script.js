document.addEventListener("DOMContentLoaded", function () {
    const commandInput = document.getElementById("commandInput");

    // Simulate typing effect
    const welcomeText = "";
    const screen = document.querySelector(".screen");
    typeText(welcomeText, screen);

    function typeText(text, element) {
        presenttext = element.innerHTML
        let index = 0;
        const typingInterval = setInterval(function () {
            if (index < text.length) {
                const code = 0x0100 + Math.random() * (0x1ff - 0x0100 + 1)
                const char = String.fromCharCode(0x0100 + Math.random() * (0x1ff - 0x0100 + 1));
                console.log(code)
                const coloredChar = `<span class="typed-char">${char}</span>`;
                element.innerHTML = presenttext + text.substring(0, index) + coloredChar;
                index++;
            } else {
                clearInterval(typingInterval);
                element.innerHTML = presenttext + text;
            }
        }, 50); // Adjust the typing speed (milliseconds per character) as needed
    }
});

document.getElementById("new-employee-button").addEventListener("click", function () {
    const strength = rollStats()
    const speed = rollStats()
    const intelligence = rollStats()
    const combat = rollStats()

    const strength_field = document.getElementById("strength")
    const speed_field = document.getElementById("speed")
    const int_field = document.getElementById("intelligence")
    const com_field = document.getElementById("combat")
    const health_field = document.getElementById("health")

    typeText(strength.toString(), strength_field, 70)
    typeText(speed.toString(), speed_field, 70)
    typeText(intelligence.toString(), int_field, 70)
    typeText(combat.toString(), com_field, 70)
    typeText((2 * strength).toString(), health_field, 70)

    function rollStats() {
        const rollTimes = 6
        const dice = 10

        let roll = 0;
        for (let i = 0; i < rollTimes; i++) {
            roll += rollDie(dice)
        }

        return roll;
    }

    function typeText(text, element, speed) {
        let index = 0;
        const typingInterval = setInterval(function () {
            if (index < text.length) {
                const char = String.fromCharCode(0x0100 + Math.random() * (0x1ff - 0x0100 + 1));
                const coloredChar = `<span class="typed-char">${char}</span>`;
                element.innerHTML = text.substring(0, index) + coloredChar;
                index++;
            } else {
                clearInterval(typingInterval);
                element.innerHTML = text;
            }
        }, speed); // Adjust the typing speed (milliseconds per character) as needed
    }
});

function rollDie(die) {
    return Math.floor(Math.random() * (die) + 1)
}