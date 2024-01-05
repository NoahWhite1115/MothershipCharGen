document.getElementById("new-employee-button").addEventListener("click", function () {
    const charClassNumber = rollDie(4)
    const charClass = classData[charClassNumber - 1]

    addClassName(charClass)

    addMainStat("strength", charClass)
    addMainStat("speed", charClass)
    addMainStat("intelligence", charClass)
    addMainStat("combat", charClass)

    addSave("sanity", charClass)
    addSave("fear", charClass)
    addSave("body", charClass)
    addSave("armor", charClass)

    function addClassName(charClass) {
        field = document.getElementById("className")
        typeText(charClass["name"], field, 50)
    }

    function addMainStat(statName, charClass) {
        num = rollStats()
        field = document.getElementById(statName)
        typeText((num + charClass["modifiers"][statName]).toString(), field, 100)
    }

    function addSave(saveName, charClass) {
        field = document.getElementById(saveName)
        typeText((charClass["saves"][saveName]).toString(), field, 100)
    }

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
                const char = String.fromCharCode(0x0021 + Math.random() * (0x007E - 0x0021 + 1));
                const coloredChar = `<span class="typed-char">${char}</span>`;
                element.innerHTML = text.substring(0, index) + coloredChar;
                index++;
            } else {
                clearInterval(typingInterval);
                element.innerHTML = text;
            }
        }, speed);
    }
});

function rollDie(die) {
    return Math.floor(Math.random() * (die) + 1)
}

var classData = [
    {
        "name": "TEAMSTER",
        "saves": {
            "sanity": 30,
            "fear": 35,
            "body": 30,
            "armor": 35
        },
        "code": "SC",
        "points": 3,
        "modifiers": {
            "strength": 5,
            "speed": 5,
            "intelligence": 0,
            "combat": 0
        },
        "core": {
            "count": 2,
            "list": [
                "GEOLOGY",
                "COMPUTERS",
                "MATHEMATICS",
                "CHEMISTRY",
                "BIOLOGY",
                "HYDROPONICS"
            ]
        }

    },
    {
        "name": "ANDROID",
        "saves": {
            "sanity": 20,
            "fear": 85,
            "body": 40,
            "armor": 25
        },
        "code": "SC",
        "points": 3,
        "modifiers": {
            "strength": 0,
            "speed": 5,
            "intelligence": 5,
            "combat": 0
        },
        "core": {
            "count": 2,
            "list": [
                "GEOLOGY",
                "COMPUTERS",
                "MATHEMATICS",
                "CHEMISTRY",
                "BIOLOGY",
                "HYDROPONICS"
            ]
        }

    },
    {
        "name": "SCIENTIST",
        "saves": {
            "sanity": 40,
            "fear": 25,
            "body": 25,
            "armor": 30
        },
        "code": "SC",
        "points": 3,
        "modifiers": {
            "strength": 0,
            "speed": 0,
            "intelligence": 10,
            "combat": 0
        },
        "core": {
            "count": 2,
            "list": [
                "GEOLOGY",
                "COMPUTERS",
                "MATHEMATICS",
                "CHEMISTRY",
                "BIOLOGY",
                "HYDROPONICS"
            ]
        }

    },
    {
        "name": "MARINE",
        "saves": {
            "sanity": 25,
            "fear": 30,
            "body": 35,
            "armor": 40
        },
        "code": "SC",
        "points": 3,
        "modifiers": {
            "strength": 0,
            "speed": 0,
            "intelligence": 0,
            "combat": 5
        },
        "core": {
            "count": 2,
            "list": [
                "GEOLOGY",
                "COMPUTERS",
                "MATHEMATICS",
                "CHEMISTRY",
                "BIOLOGY",
                "HYDROPONICS"
            ]
        }
    }
]