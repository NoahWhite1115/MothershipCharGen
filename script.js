const FAST = 20;
const MEDIUM = 50;
const SLOW = 100;

document.getElementById("new-employee-button").addEventListener("click", function () {
    const charClassNumber = rollDie(4)
    const charClass = classData[charClassNumber - 1]

    addClassName(charClass)

    const strength = addMainStat("strength", charClass)
    addMainStat("speed", charClass)
    addMainStat("intelligence", charClass)
    addMainStat("combat", charClass)

    addSave("sanity", charClass)
    addSave("fear", charClass)
    addSave("body", charClass)
    addSave("armor", charClass)

    addId(charClass)

    addHealth(strength)

    addPsychProfile(charClass)

    generateSkills(charClass)

    addEquipment()

    addContract()

    addPersonal()

    function addClassName(charClass) {
        field = document.getElementById("className")
        typeText(charClass["name"], field, MEDIUM)
    }

    function addMainStat(statName, charClass) {
        num = rollStats()
        field = document.getElementById(statName)
        typeText((num + charClass["modifiers"][statName]).toString(), field, SLOW)

        return (num + charClass["modifiers"][statName])
    }

    function addSave(saveName, charClass) {
        field = document.getElementById(saveName)
        typeText((charClass["saves"][saveName]).toString(), field, SLOW)
    }

    function addId(charClass) {
        field = document.getElementById("empoyeeId")
        typeText((charClass["code"]).toString() + Math.random().toString(36).slice(2).toUpperCase().substring(0, 7), field, MEDIUM)
    }

    function addHealth(strength) {
        const field = document.getElementById("health")
        typeText((strength * 2).toString(), field, SLOW)
    }

    function addPsychProfile(charClass) {
        var psychProfile = document.getElementById("psych");

        psychProfile.innerHTML = "";

        var fearResponse = document.createElement("li");
        psychProfile.appendChild(fearResponse);

        typeText(charClass["fear"], fearResponse, FAST)
    }

    function addContract() {
        field = document.getElementById("contract")
        const index = Math.floor(Math.random() * contractInfoList.length);
        var contract = contractInfoList[index];
        typeText(rollDie(15).toString() + contract, field, FAST)
    }

    function addEquipment() {
        field = document.getElementById("equipment")
        const equipmentNumber = rollDie(4)
        const equipment = equipmentList[equipmentNumber - 1]
        typeText(equipment, field, MEDIUM)
    }

    function addPersonal() {
        var personal = document.getElementById("personal")

        personal.innerHTML = "";

        const trinketIndex = Math.floor(Math.random() * trinkets.length);
        var trinket = trinkets[trinketIndex];

        var trinketField = document.createElement("li");
        personal.appendChild(trinketField);
        typeText(trinket, trinketField, FAST)
    }

    function generateSkills(charClass) {
        var skillsList = document.getElementById("skills");

        skillsList.innerHTML = "";

        // generate class skills
        var coreSkillsList = charClass["coreSkills"]

        for (skill in coreSkillsList) {
            var skillField = document.createElement("li");
            skillsList.appendChild(skillField);
            typeText(coreSkillsList[skill], skillField, FAST);
        }

        var choiceSkillsData = charClass["choiceSkills"];
        var choiceSkills = [...choiceSkillsData["list"]];

        for (let i = 0; i < choiceSkillsData["num"]; i++) {
            const index = Math.floor(Math.random() * choiceSkills.length);
            var skill = choiceSkills[index];

            choiceSkills.splice(index, index);

            var skillField = document.createElement("li");
            skillsList.appendChild(skillField);
            typeText(skill, skillField, FAST);
        }

        // pick skills using points

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

const contractInfoList = [
    " YEARS LEFT ON CONTRACT",
    " YEARS OF SERVICE (SALARIED)",
    " YEARS OF SERVICE (PART-TIME)",
    "M CREDIT QUOTA REMAINING",
    " JOBS REMAINING",
]

const equipmentList = [
    "EXCAVATION",
    "EXAMINATION",
    "EXTERMINATION",
    "EXPLORATION"
]

const classData = [
    {
        "name": "TEAMSTER",
        "fear": "ONCE PER SESSION, A TEAMSTER MAY RE-ROLL A ROLL ON THE PANIC EFFECT TABLE",
        "saves": {
            "sanity": 30,
            "fear": 35,
            "body": 30,
            "armor": 35
        },
        "code": "TM-",
        "points": 4,
        "modifiers": {
            "strength": 5,
            "speed": 5,
            "intelligence": 0,
            "combat": 0
        },
        "coreSkills": [
            "ZERO-G",
            "MECHANICAL REPAIR",
        ],
        "choiceSkills": {
            "num": 1,
            "list": [
                "HEAVY MACHINERY",
                "PILOTING"
            ]
        }
    },
    {
        "name": "ANDROID",
        "fear": "FEAR SAVES MADE IN THE PRESENCE OF ANDROIDS HAVE DISADVANTAGE",
        "saves": {
            "sanity": 20,
            "fear": 85,
            "body": 40,
            "armor": 25
        },
        "code": "AN-",
        "points": 3,
        "modifiers": {
            "strength": 0,
            "speed": 5,
            "intelligence": 5,
            "combat": 0
        },
        "coreSkills": [
            "COMPUTERS",
            "LINGUISTICS",
            "MATHEMATICS"
        ],
        "choiceSkills": {
            "count": 0,
            "list": []
        }
    },
    {
        "name": "SCIENTIST",
        "fear": "WHENEVER A SCIENTIST FAILS A SANITY SAVE, EVERY FRIENDLY PLAYER NEARBY GAINS 1 STRESS",
        "saves": {
            "sanity": 40,
            "fear": 25,
            "body": 25,
            "armor": 30
        },
        "code": "SC-",
        "points": 3,
        "modifiers": {
            "strength": 0,
            "speed": 0,
            "intelligence": 10,
            "combat": 0
        },
        "coreSkills": [],
        "choiceSkills": {
            "num": 2,
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
        "fear": "WHENEVER A MARINE PANICS, EVERY FRIENDLY PLAYER NEARBY MUST MAKE A FEAR SAVE",
        "saves": {
            "sanity": 25,
            "fear": 30,
            "body": 35,
            "armor": 40
        },
        "code": "MN-",
        "points": 3,
        "modifiers": {
            "strength": 0,
            "speed": 0,
            "intelligence": 0,
            "combat": 5
        },
        "coreSkills": [
            "MILITARY TRAINING"
        ],
        "choiceSkills": {
            "count": 0,
            "list": []
        }
    }
]

const trinkets = [
    "PAMPHLET: BEING A GOOD ALLY TO THE UPLIFT RIGHTS MOVEMENT",
    "HALF-EMPTY HOT SAUCE BOTTLE (MILD)",
    "WATERDAMAGED ENGLISH-HINDI PHRASEBOOK.",
    "DEFUSED LANDMINE CONVERTED INTO LUNCHBOX",
    "PACKET OF DRIED MEALWORMS, PEANUT FLAVOR",
    "BOTTLE OF MELATONIN GUMMIES",
    "T-SHIRT: GOURMET STREET SUMMER PUB CRAWL",
    "DENTED METAL WATER BOTTLE",
    "BLOOD SUGAR MONITOR",
    "PET ROCK (ACTUAL SILICON-BASED XENOFAUNA)",
    "VIBRANT BLUE TURBAN",
    "BOX OF MUSHROOM WINE",
    "COLLECTION OF MESSAGES FROM COLONIAL PEN-PAL",
    "NOISE-CANCELLING HEADPHONES",
    "INCENSE STICKS",
    "HUMAN FEMUR, SCRIMSHAWED",
    "CAN OF SPRAYPAINT (FULIGIN)",
    "PROTRACTOR, COMPASS, SLIDE RULE",
    "GLASS BEAD BRACELET (14 PRIME COLONIES)",
    "PAMPHLET: ZUG FACTS",
    "MUMMIFIED MONKEY PAW, TWO FINGERS CURLED",
    "ENCRYPTED HARD DRIVE (PERSONAL)",
    "BAG OF PLANT-PROTEIN JERKY ",
    "BOOK: PLAINSPEAK PROGRAMMING LANGUAGE FOR BEGINNERS",
    "UNINSTALLED CYBER-EYE (FUNCTIONAL)",
    "SOLID DIAMOND CHESS PIECE (ROOK)",
    "PRAYER RUG",
    "SHIP MODEL (RECOMBINATION ERA SHIP-OF-THE-LINE)",
    "LOGIC CORE WITH PARTIALLY-WRITTEN AI",
    "ALIEN INSECT PRESERVED IN AMBER",
    "SHARD OF THE GREAT GARBAGE REEF",
    "COLLECTABLE HOLOCARDS (EXTINCT ANIMALS)",
    "SHAKY HANDHELD VIDEO OF A LIVE THYLACINE",
    "BOOK: THE CARVERS: MEMORIES OF SUNNY SMILES UNICORN FARM",
    "BAG OF PLASTIC DINOSAURS ",
    "MINIATURE CRAB DRONE",
    "TICKET STUB: KING IN YELLOW (ALDRIN STATION COMMUNITY THEATER)",
    "POTTED TOMATO PLANT",
    "T-SHIRT: I HAD A BLAST AT THE ISS MEMORIAL MUSEUM!",
    "ONE-TIME ENCRYPTED PAD",
    "DOLLOP OF INERT GREY GOO IN VIAL NECKLACE",
    "BASEBALL CAP (GANYMEDE HAMMERHEADS)",
    "BOGO COUPON (THE CHOP SHOP)",
    "PROP CHAINSWORD",
    "NOVA TIERRA ENVIRONMENT RECLAMATION VOLUNTEER CREW JACKET",
    "DOG TAGS (NOT YOURS)",
    "HRT SUPPLIES",
    "NECKLACE OF INHUMAN TEETH",
    "PAMPHLET: DO WHAT YOU NEED, NOT WHAT YOU'RE TOLD",
    "EMERGENCY FLARE",
    "BOOTLEG POCKET AI",
    "CATNIP TOY",
    "SILK HANDKERCHIEF (STOLEN)",
    "SKETCHBOOK WITH AMATEUR PORNOGRAPHY",
    "HAND-DRAWN MAP OF THE CORE WORLDS",
    "BLANKET, VERY WARM (CARTOON MONSTER)",
    "ACTION FIGURE (SPACE MARINE)",
    "HIGH-GLARE SUNGLASSES",
    "SNACK BAG (HEIRLOOM CARROTS)",
    "BOOK: YOKAI OF THE HIGH FRONTIER",
    "BOOK: FUNGI OF THE FAR REALMS",
    "PAMPHLET: COMMON OCCULT VECTORS AND DANGERS",
    "PLAYING CARDS (CLASSIC SHIPS)",
    "WIKIPEDIA LIFETIME SERVICE AWARD",
    "SMART-LEMUR COMPANION",
    "SQUISHY KAIJU STRESS TOY",
    "ADMIRALTY BLUES GUNPLA MODEL KIT (HARDBOILED AMAZON)",
    "YOUNG CHILD'S ART PROJECT",
    "USPS MAIL BAG",
    "MYSTERIOUS ORB",
    "SOLARIAN CHURCH COMIC TRACTS (BUNDLE)",
    "NUDIBRANCH PLUSHIE",
    "ALPHA GAUNT ACTION FIGURE (RECALLED)",
    "PAMPHLET: THE TRUTH ABOUT TERRAFORMING - A LONG AND DANGEROUS SCAM",
    "BANJO",
    "CAMO PONCHO (FOREST)",
    "PENDANT OCARINA",
    "UNLABELED VHS TAPE, CONTENTS UNKNOWN",
    "SPACEPORT DINER REWARDS PUNCHCARD, 6/10",
    "BOOK: THE ILLUSTRATED UPANISHADS",
    "HILT OF BROKEN SWORD",
    "JAGGED CHUNK OF RED ROCK",
    "JAPAMALA",
    "ONCE-FASHIONABLE SHOULDER CAPE",
    "WOODEN BOX OF LOOSE-LEAF TEA",
    "HANDHELD GAME CONSOLE",
    "ELEPHANT FIGURINE (WOOD)",
    "COMFY KNIT SCARF",
    "HYMN-BOOK (REFORMED TRAPPIST CATHOLIC CHURCH)",
    "BAPHOMET BOBBLEHEAD",
    "ANTIQUE POCKETWATCH",
    "FUNERAL MASK OF UNIDENTIFIED WOMAN",
    "JOURNAL FULL OF RPG NOTES",
    "MARIJUANA CIGARETTES ",
    "POCKET OF WEATHERED COINS (ASSORTED MAKE, ALL WORTHLESS)",
    "T-SHIRT: BORN TO DIE WORLD IS A FUCK",
    "OCTOPUS SIGNET RING ",
    "BOOK: ENCOUNTERS WITH THE ZETIANS",
    "GOLD LOOTBOX, UNOPENED",
    "TICKET STUB: ESCHATOLOGY AND GENESIS",
    "HORRIFICALLY LOUD FLORAL-PRINT SHIRT",
    "PORNOGRAPHIC MAGAZINE (CHIMERA MORPHS)",
    "BOOK: LANGUAGE CONSTRUCTION FOR UTTER BUFFOONS",
    "BLOOD-STAINED VOUCHER (1 HUMAN SOUL)",
    "ENGRAVED BULLET ('MERRY CHRISTMAS, ASSHOLE')",
    "CENTURION'S HELMET",
    "LEOPARD PELT (GENUINE)",
    "LIBRARY CARD",
    "OFFICER'S DRESS UNIFORM",
    "CAN OF BEANS",
    "VINYL FIGURE (GANESHA)",
    "MEAD-HORN",
    "ICON AMULET (TRIPLE EMPRESS)",
    "COMIC BOOK: THE COMPLETE INFERNO GIRL",
    "BOOK: AND SO THEY SOUGHT GOD",
    "FLASK OF KOUMIS",
    "HANAFUDA CARDS",
    "TRICORN HAT",
    "SPACER'S TAROCCA DECK",
    "SATCHEL BAG (RED PENTAGRAM)",
    "SHARK-TOOTH NECKLACE",
    "ARCHAIC VHS TAPE ('THE FAT LADY SINGS')",
    "GOLDENROD CARDIGAN",
    "PLAGUE DOCTOR MASK (FUNCTIONAL)",
    "MATCHA HARD CANDIES",
    "DOGŪ FIGURINE",
    "BOX OF TOOTHPICK-FLOSSERS",
    "MINI ICE-CREAM MAKER",
    "BEAD ANIMAL (LIZARD)",
    "SPRIG OF LILAC (HAIRPIN)",
    "SANY RUNGAL CASSETTE PLAYER",
    "MANGA: MY LIFE WITH THE GHOSTS, VOL 4",
    "PAMPHLET: ABDUCTED!",
    "OBSIDIAN KNIFE W/ SHOULDER HARNESS",
    "BAG OF PROTEIN CRISPS (CHILI & CHOCOLATE)",
    "AUDIT PAPERWORK",
    "PLUSH HODAG",
    "CAT EAR HEADBAND",
    "EVA HELMET (RHINOCEROS BEETLE)",
    "HANDHELD ATUM-MONITOR (COUNTERFEIT)",
    "BLURRY PHOTO OF A TRUE CLOWN",
    "PORTABLE DRIVE (FIREBIRD FORK)",
    "BOOMERANG",
    "BOOK: POETRY OF THE GREAT WHALES",
    "BAG OF TRAIL MIX",
    "MUSHROOM-CAP HAT",
    "VENUSIAN FLY TRAP",
    "T-SHIRT: ASTROGOTHIC",
    "NOSE-RING (DIAMOND)",
    "CAT CAFÉ CUSTOMER APPRECIATION CARD",
    "BOTTLE OF VODKA W/ SEA SLUG",
    "MACHETE WITH A CHIPPED BLADE",
    "HOG-HUNTING LICENSE",
    "CASSETTE TAPE: HANA BURAKA'S LO-FI MIX VOL. 2",
    "CLOAK OF HUMAN SKIN (WILLINGLY GIVEN)",
    "POCKET OF ASSORTED SAUCE PACKETS",
    "PAMPHLET: MORE THAN YOU COULD EVER EARN",
    "A LOVER'S NOTE YOU CANNOT READ",
    "BOOK: ON THE ATÛMAIC MYSTERIES",
    "BOOK: ART OF THE NEO-MUIRAITE MOVEMENT",
    "EXORCISM KIT (HOME-MADE)",
    "BOOK: ATLAS OF THE LATTER EARTH",
    "MAKEUP CASE",
    "EMPLOYEE OF THE MONTH AWARD (WEAPONIZED)",
    "PACKET OF CRICKETS (SOUR CREAM AND ONION FLAVOR)",
    "SPORTS BETTING BOOKLET (CHEATER'S LEAGUE)",
    "PERSONAL DRAWING TABLET",
    "BOUNTY PARDON DOCUMENTATION",
    "CLUB NOVA VIP CARD",
    "GREAT GOOGLY MOOGLY'S MENU",
    "BUSINESS CARD (GRETA VON GOORT, ATTORNEY AT LAW)",
    "BOOK: 1001 NUTRIENT PASTE RECIPES",
    "HANDHELD AI THERAPIST",
    "SPRAY HAIR COLOR (NEON BLUE)",
    "T-SHIRT: RED WITH SINGLE WHITE STAR",
    "CENTIPEDE BRACELET",
    "PORTABLE DRIVE (DETAILED SPECULATIVE EVOLUTION PROJECT)",
    "T-SHIRT: FUCK YOU I SURVIVED DEATHWORLD",
    "TIN OF FERMENTED EEL",
    "MAP-YOUR-OWN-GENOME KIT",
    "NOTEPAD WITH COMPUTER PASSWORDS",
    "RUBBER MOSQUITO MASK",
    "LAST WILL OF DECEASED RELATIVE",
    "STICKERS (CHIBI DEITIES, X100)",
    "TIME CAPSULE (STOLEN)",
    "WAITLIST FOR CYBERNETICS CLINIC",
    "LUCKY PENNY (BULLET-DENTED)",
    "AI ASSISTANT (HISTORICAL PERSONAGE)",
    "ARCHAIC MEMORY CARD",
    "NOVELTY CEREAL CUP",
    "BURNER PHONE",
    "DOG COLLAR ('HARRIET')",
    "BOTTLE OF SOY SAUCE",
    "WATER-SMOOTHED PEBBLE",
    "A KEY TO THE VAULTS OF GHLODARA",
    "BRINESHRIMP CAKES",
    "VACCSUIT PATCH KIT",
    "DECORATIVE HORN IMPLANTS",
    "FRACTAL-PATTERN HEADSCARF",
    "PRESERVED INSECTILE ABERRATION",
    "ALIEN PRESSED FLOWER (COMMON)  CORRODED ANDROID LOGIC CORE",
    "MANUAL: TREAT YOUR RIFLE LIKE A LADY  CALENDAR: ALIEN PIN-UP ART",
    "HOLOGRAPHIC SERPENTINE DANCER",
    "MEDICAL CONTAINER, PURPLE POWDER  CASINO PLAYING CARDS",
    "MOONSTONE RING",
    "BARTENDER’S CERTIFICATION (EXPIRED)  PROSPECTING MUG, DENTED",
    "VANTABLACK MARBLE",
    "ASHES (A RELATIVE)",
    "CIGARETTES (GRINNING SKULL)",
    "REJECTED APPLICATION (COLONY SHIP)",
    "PHOSPHORESCENT STICKS, NEON",
    "CALENDAR: MILITARY BATTLES",
    "CAMPAIGN POSTER (HOME PLANET)",
    "TITANIUM TOOTHPICK",
    "BRASS KNUCKLES",
    "JOURNAL OF GRUDGES",
    "BALL OF ASSORTED GAUGE WIRE  SWITCHBLADE, ORNAMENTAL",
    "BONSAI TREE",
    "TRILOBITE FOSSIL",
    "PATCHED OVERALLS, PERSONALIZED  SPIKED BRACELET",
    "SPRAY PAINT",
    "LOCKET, HAIR BRAID",
    "BLANKET, FIRE RETARDANT  BB GUN",
    "USHANKA",
    "MENTHOL BALM",
    "X TARP",
    "KUKRI",
    "SHIV, SHARPENED BUTTER KNIFE",
    "OPERA GLASSES",
    "FADED GREEN POKER CHIP",
    "ANTIQUE COMPANY SCRIPT (ASTEROID MINE)",
    "DESSICATED HUSK DOLL",
    "PAMPHLET: ANDROID OVERLORDS",
    "SMUT (SEDITIOUS):",
    "THE CAPTAIN, ORDERED",
    "KEY (CHILDHOOD HOME)",
    "MANUAL: PANIC: HARBINGER OF CATASTROPHE",
    "TOKEN: “IS YOUR MORALE IMPROVING?”",
    "NECKLACE OF SHELL CASINGS",
    "PAMPHLET: SIGNS OF PARASITICAL INFECTION",
    "PAMPHLET: THE INDIFFERENT STARS",
    "WANTED POSTER, WEATHERED",
    "BONE KNIFE",
    "MANUAL: RICH CAPTAIN, POOR CAPTAIN",
    "PICK, MINIATURE",
    "DOG TAGS (HEIRLOOM)",
    "PENDANT: SHELL FRAGMENTS SUSPENDED IN PLASTIC",
    "HOODED PARKA, FLEECE-LINED",
    "SNAKE WHISKEY",
    "GLOVES, LEATHER (XENOMORPH HIDE)",
    "PAMPHLET: ZEN AND THE ART OF CARGO ARRANGEMENT",
    "PICTORIAL PORNOGRAPHY, DOGEARED, WELL THUMBED",
    "FLINT HATCHET",
    "PENDANT: TWO ASTRONAUTS FORM A SKULL",
    "RUBIK'S CUBE",
    "MANUAL: SURVIVAL: EAT SOUP WITH A KNIFE",
    "SPUTNIK PIN",
    "PILLS: MALE ENHANCEMENT, SHODDY",
    "LAGOMORPH FOOT",
    "FUZZY HANDCUFFS",
    "MANUAL: MINING SAFETY AND YOU",
    "PAMPHLET: AGAINST HUMAN SIMULACRUM",
    "ANIMAL SKULL,  EYES, CURLED HORNS",
    "STYLIZED CIGARETTE CASE",
    "TRUCKER CAP, MESH, GREY ALIEN LOGO",
    "SPANNER",
    "PITH HELMET",
    "BENT WRENCH",
    "POWDERED XENOMORPH HORN",
    "I CHING, MISSING STICKS",
    "EERIE MASK",
    "GOLF CLUB (PUTTER)",
    "TRENCH SHOVEL",
    "IVORY DICE",
    "TAROT CARDS, WORN, PYRITE GILDED EDGES",
    "BAG OF ASSORTED TEETH",
    "PAMPHLET: A GIRL IN EVERY PORT",
    "TAXIDERMIED CAT",
    "PAMPHLET: INTERPRETING SHEEP DREAMS",
    "PAIR OF SHOT GLASSES, SPENT SHOTGUN SHELLS",
    "FLESHY THING SEALED IN A MURKY JAR",
    "DNR BEACON NECKLACE",
    "HARMONICA",
    "MANUAL: SPACEFARER’S ALMANAC (OUT OF DATE)",
    "PAMPHLET: THE RELIC OF FLESH",
    "MINIATURE CHESS SET, BONE, PIECES MISSING",
]

const patches = [,

]