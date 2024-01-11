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

    generateName()

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

        if (charClass["name"] == "MARINE") {
            var teamwork = document.createElement("li");
            psychProfile.appendChild(teamwork);

            typeText(teamworkText, teamwork, FAST)
        }
    }

    function addContract() {
        field = document.getElementById("contract")
        const index = Math.floor(Math.random() * contractInfoList.length);
        var contract = contractInfoList[index];
        typeText((rollDie(14) + 1).toString() + contract, field, FAST)
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

        const patchIndex = Math.floor(Math.random() * patches.length);
        var patch = patches[patchIndex];

        var patchField = document.createElement("li");
        personal.appendChild(patchField);
        typeText(patch + " PATCH", patchField, FAST)
    }

    function generateSkills(charClass) {
        var skillsList = document.getElementById("skills");

        skillsList.innerHTML = "";

        var chosenSkills = [];

        // Generate class-given skills
        var coreSkillsList = charClass["coreSkills"]

        for (skill in coreSkillsList) {
            chosenSkills.push(coreSkillsList[skill]);
            var skillField = document.createElement("li");
            skillsList.appendChild(skillField);

            const skillText = levelToBonusMap[skillData[coreSkillsList[skill]]["level"]] + " " + coreSkillsList[skill]

            typeText(skillText, skillField, FAST);
        }

        var choiceSkillsData = charClass["choiceSkills"];
        var choiceSkills = [...choiceSkillsData["list"]];

        for (let i = 0; i < choiceSkillsData["num"]; i++) {
            const index = Math.floor(Math.random() * choiceSkills.length);
            var skill = choiceSkills[index];
            chosenSkills.push(skill);

            choiceSkills.splice(index, index);

            var skillField = document.createElement("li");
            skillsList.appendChild(skillField);

            const skillText = levelToBonusMap[skillData[skill]["level"]] + " " + skill

            typeText(skillText, skillField, FAST);
        }

        // Pick skills using points
        var points = charClass["points"]

        while (points > 0) {
            var eligiblePointSkills = [...trainedSkills];

            if (points > 1) {
                for (skillIndex in chosenSkills) {
                    const skill = chosenSkills[skillIndex]
                    // Sophontology is the only 3-point skill available at level 1, through linguisitcs path
                    if (skill == "LINGUISTICS" && points < 3) {
                        continue
                    }

                    eligiblePointSkills = eligiblePointSkills.concat(skillData[skill]["prereqFor"])
                }
            }

            eligiblePointSkills = eligiblePointSkills.filter(value => !chosenSkills.includes(value));

            const index = Math.floor(Math.random() * eligiblePointSkills.length);
            var skill = eligiblePointSkills[index];

            chosenSkills.push(skill);
            const skillInfo = skillData[skill]
            points -= skillInfo["level"]

            var skillField = document.createElement("li");
            skillsList.appendChild(skillField);

            const skillText = levelToBonusMap[skillData[skill]["level"]] + " " + skill

            typeText(skillText, skillField, FAST);
        }
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

    function generateName() {
        const firstNameIndex = Math.floor(Math.random() * firstNamesList.length);
        var firstName = firstNamesList[firstNameIndex];

        const lastNameIndex = Math.floor(Math.random() * lastNamesList.length);
        var lastName = lastNamesList[lastNameIndex];

        field = document.getElementById("charName")
        typeText(firstName + " " + lastName, field, MEDIUM)
    }
});

function rollDie(die) {
    return Math.floor(Math.random() * (die) + 1)
}

const teamworkText = "TEAMWORK TRAINING: MARINE HAS +5 TO COMBAT ROLLS WHEN OTHER MARINES ARE NEARBY"

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
        "points": 2,
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
    "GLASS BEAD BRACELET ( PRIME COLONIES)",
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
    "SPACEPORT DINER REWARDS PUNCHCARD, 2 PUNCHES",
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
    "BLOOD-STAINED VOUCHER ( HUMAN SOUL)",
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
    "MANGA: MY LIFE WITH THE GHOSTS, VOL ",
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
    "CASSETTE TAPE: HANA BURAKA'S LO-FI MIX VOL. ",
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
    "BOOK:  NUTRIENT PASTE RECIPES",
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
    "STICKERS (CHIBI DEITIES, X)",
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
    "ALIEN PRESSED FLOWER (COMMON)",
    "CORRODED ANDROID LOGIC CORE",
    "MANUAL: TREAT YOUR RIFLE LIKE A LADY",
    "CALENDAR: ALIEN PIN-UP ART",
    "HOLOGRAPHIC SERPENTINE DANCER",
    "MEDICAL CONTAINER, PURPLE POWDER",
    "CASINO PLAYING CARDS",
    "MOONSTONE RING",
    "BARTENDER’S CERTIFICATION (EXPIRED)",
    "PROSPECTING MUG, DENTED",
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
    "BALL OF ASSORTED GAUGE WIRE",
    "SWITCHBLADE, ORNAMENTAL",
    "BONSAI TREE",
    "TRILOBITE FOSSIL",
    "PATCHED OVERALLS, PERSONALIZED",
    "SPIKED BRACELET",
    "SPRAY PAINT",
    "LOCKET, HAIR BRAID",
    "BLANKET, FIRE RETARDANT",
    "BB GUN",
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
    "ANIME BODY PILLOW",
    "A 48 PACK OF LIMITED EDITION SODA"
]

const patches = [
    "'#1 WORKER'",
    "BLOOD TYPE",
    "BIOHAZARD SYMBOL",
    "NUCLEAR SYMBOL",
    "“BE SURE: DOUBLETAP“",
    "SMILEY FACE (GLOW IN THE DARK)",
    "JOLLY ROGER",
    "QUEEN OF HEARTS",
    "PIN-UP (RIDING MISSILE)",
    "“I’M A (LOVE) MACHINE”",
    "HELLO MY NAME IS:",
    "“TAKE ME TO YOUR LEADER” (UFO)",
    "“TAKE MY LIFE (PLEASE)”",
    "“FIX ME FIRST” (CADUCEUS)",
    "NASA LOGO",
    "DOVE IN CROSSHAIRS",
    "“WELCOME TO THE DANGER ZONE”",
    "PIN-UP (SUCCUBUS)",
    "“DRINK / FIGHT / FUCK”",
    "MUDFLAP GIRL",
    "“GAME OVER” (BRIDE & GROOM)",
    "“IMPROVE / ADAPT / OVERCOME”",
    "“KEEP WELL LUBRICATED”",
    "“PLAYS WELL WITH OTHERS”",
    "“I AM NOT A ROBOT”",
    "“I CAN’T FIX STUPID”",
    "ALL SEEING EYE",
    "“NOMAD”",
    "“LONER”",
    "“MAMA TRIED”",
    "“MY OTHER RIDE MARRIED YOU”",
    "GRIM REAPER BACK",
    "“SMOOTH OPERATOR”",
    "“FOR SCIENCE!”",
    "“HELP WANTED”",
    "DICE (SNAKE EYES)  “GOOD” (BRAIN)",
    "“TOO PRETTY TO DIE”",
    "ICARUS",
    "RISK OF ELECTROCUTION SYMBOL",
    "DOUBLE CHERRY",
    "“SOLVE ET COAGULA” (BAPHOMET)",
    "SECURITY GUARD",
    "“UPSTANDING CITIZEN”",
    "“I’M NOT A ROCKET SCIENTIST / BUT YOU’RE AN IDIOT”",
    "RED SHIRT LOGO",
    "“DON’T RUN YOU’LL ONLY DIE TIRED”",
    "POKER HAND: DEAD MAN’S HAND",
    "“COWBOY UP” (CROSSED REVOLVERS)",
    "“I AM MY BROTHER’S KEEPER”",
    "CHIBI CTHULHU",
    "BLACK WIDOW SPIDER",
    "SKULL AND CROSSED WRENCHES",
    "MR. YUCK",
    "“ONE SIZE FITS ALL” (GRENADE)",
    "“DILLIGAF?”",
    "“EAT THE RICH”",
    "ОТЪЕБИСЬ (GET FUCKED, RUSSIAN)",
    "“WORK HARD / PARTY HARDER”",
    "FLAME EMOJI",
    "ATOM SYMBOL",
    "FUN METER (READING: BAD TIME)",
    "“SMILE: BIG BROTHER IS WATCHING”",
    "“ACTUALLY, I AM A ROCKET SCIENTIST”",
    "HEART",
    "VIKING SKULL",
    "“APEX PREDATOR”",
    "(SABERTOOTH SKULL)",
    "PIN-UP (ACE OF SPADES)",
    "PRINCESS",
    "“I LIKE MY TOOLS CLEAN / AND MY LOVERS DIRTY”",
    "“GOOD BOY”",
    "“SUCK IT UP”",
    "“TROUBLESHOOTER”",
    "“IF I’M RUNNING KEEP UP” BACK",
    "CROSSED HAMMERS WITH WINGS",
    "PIN-UP (MECHANIC)",
    "“TRAVEL TO DISTANT EXOTIC PLACES / MEET UNUSUAL THINGS / GET EATEN”",
    "FRONT TOWARDS ENEMY",
    "(CLAYMORE MINE)",
    "“BAD BITCH”",
    "SOVIET HAMMER & SICKLE",
    "FUBAR",
    "“FUCK FOREVER” (ROSES)",
    "“LIVE FREE AND DIE”",
    "PIN-UP (NURSE): “THE LOUDER YOU SCREAM THE FASTER I COME”",
    "“MEAT BAG”",
    "MEDIC",
    "(SKULL AND CROSSBONES ON LOGO)",
    "”GIRL’S BEST FRIEND” (DIAMOND)",
    "INVERTED CROSS",
    "“DO YOU SIGN MY PAYCHECKS?”",
    "“I ♥ MYSELF”",
    "'POWERED BY COFFEE'",
    "RED GEAR",
    "“DO YOUR JOB”",
    "“SPACE IS MY HOME” (SAD ASTRONAUT)",
    "“ALL OUT OF FUCKS TO GIVE”",
    "(ASTRONAUT WITH TURNED OUT POCKETS)",
    "ALLERGIC TO BULLSHIT - MEDICAL STYLE",
    "ANY LANDING IS A GOOD LANDING",
    "”OWO WHAT'S THIS?” (CATGIRL)",
    "“BORN TO SHIT / FORCED TO WIPE“",
    "”CAN I GET UUUUUUUUHHH...”"
]

const skillData = {
    "LINGUISTICS": {
        "level": 1,
        "prereqFor": [
            "SOPHONTOLOGY"
        ]
    },
    "BIOLOGY": {
        "level": 1,
        "prereqFor": [
            "PSYCHOLOGY",
            "GENETICS"
        ]
    },
    "FIRST AID": {
        "level": 1,
        "prereqFor": [
            "PATHOLOGY",
        ]
    },
    "HYDROPONICS": {
        "level": 1,
        "prereqFor": [
            "BOTANY"
        ]
    },
    "GEOLOGY": {
        "level": 1,
        "prereqFor": [
            "PLANETOLOGY",
            "ASTEROID MINING"
        ]
    },
    "ZERO-G": {
        "level": 1,
        "prereqFor": [
            "ASTEROID MINING"
        ]
    },
    "SCAVENGING": {
        "level": 1,
        "prereqFor": [
            "JURY RIGGING",
            "ASTEROID MINING"
        ]
    },
    "HEAVY MACHINERY": {
        "level": 1,
        "prereqFor": [
            "ENGINEERING",
            "ASTEROID MINING"
        ]
    },
    "COMPUTERS": {
        "level": 1,
        "prereqFor": [
            "ENGINEERING",
            "HACKING"
        ]
    },
    "MECHANICAL REPAIR": {
        "level": 1,
        "prereqFor": [
            "ASTEROID MINING",
            "VEHICLE SPECIALIZATION"
        ]
    },
    "DRIVING": {
        "level": 1,
        "prereqFor": [
            "VEHICLE SPECIALIZATION"
        ]
    },
    "PILOTING": {
        "level": 1,
        "prereqFor": [
            "VEHICLE SPECIALIZATION",
            "ASTROGATION"
        ]
    },
    "MATHEMATICS": {
        "level": 1,
        "prereqFor": [
            "PHYSICS"
        ]
    },
    "ART": {
        "level": 1,
        "prereqFor": [
            "MYSTICISM"
        ]
    },
    "ARCHAEOLOGY": {
        "level": 1,
        "prereqFor": [
            "MYSTICISM"
        ]
    },
    "THEOLOGY": {
        "level": 1,
        "prereqFor": [
            "MYSTICISM"
        ]
    },
    "MILITARY TRAINING": {
        "level": 1,
        "prereqFor": [
            "TACTICS",
            "GUNNERY",
            "FIREARMS",
            "CLOSE-QUARTERS COMBAT",
            "EXPLOSIVES"
        ]
    },
    "RIMWISE": {
        "level": 1,
        "prereqFor": [
            "FIREARMS",
            "CLOSE-QUARTERS COMBAT"
        ]
    },
    "ATHLETICS": {
        "level": 1,
        "prereqFor": [
            "CLOSE-QUARTERS COMBAT"
        ]
    },
    "CHEMISTRY": {
        "level": 1,
        "prereqFor": [
            "EXPLOSIVES"
        ]
    },
    "PSYCHOLOGY": {
        "level": 2,
        "prereqFor": []
    },
    "GENETICS": {
        "level": 2,
        "prereqFor": []
    },
    "PATHOLOGY": {
        "level": 2,
        "prereqFor": []
    },
    "BOTANY": {
        "level": 2,
        "prereqFor": []
    },
    "PLANETOLOGY": {
        "level": 2,
        "prereqFor": []
    },
    "ASTEROID MINING": {
        "level": 2,
        "prereqFor": []
    },
    "JURY RIGGING": {
        "level": 2,
        "prereqFor": []
    },
    "ENGINEERING": {
        "level": 2,
        "prereqFor": []
    },
    "HACKING": {
        "level": 2,
        "prereqFor": []
    },
    "VEHICLE SPECIALIZATION": {
        "level": 2,
        "prereqFor": []
    },
    "ASTROGATION": {
        "level": 2,
        "prereqFor": []
    },
    "PHYSICS": {
        "level": 2,
        "prereqFor": []
    },
    "MYSTICISM": {
        "level": 2,
        "prereqFor": []
    },
    "TACTICS": {
        "level": 2,
        "prereqFor": []
    },
    "GUNNERY": {
        "level": 2,
        "prereqFor": []
    },
    "FIREARMS": {
        "level": 2,
        "prereqFor": []
    },
    "CLOSE-QUARTERS COMBAT": {
        "level": 2,
        "prereqFor": []
    },
    "EXPLOSIVES": {
        "level": 2,
        "prereqFor": []
    },
    "SOPHONTOLOGY": {
        "level": 3,
        "prereqFor": []
    }
}

const trainedSkills = [
    "LINGUISTICS",
    "BIOLOGY",
    "FIRST AID",
    "HYDROPONICS",
    "GEOLOGY",
    "ZERO-G",
    "SCAVENGING",
    "HEAVY MACHINERY",
    "COMPUTERS",
    "MECHANICAL REPAIR",
    "DRIVING",
    "PILOTING",
    "MATHEMATICS",
    "ART",
    "ARCHAEOLOGY",
    "THEOLOGY",
    "MILITARY TRAINING",
    "RIMWISE",
    "ATHLETICS",
    "CHEMISTRY"
]

const levelToBonusMap = {
    1: "+10%",
    2: "+15%",
    3: "+20%"
}

const firstNamesList = [
    "MARIA",
    "NUSHI",
    "MOHAMMED",
    "JOSE",
    "WEI",
    "MOHAMMAD",
    "AHMED",
    "YAN",
    "ALI",
    "JOHN",
    "DAVID",
    "LI",
    "ABDUL",
    "ANA",
    "YING",
    "MICHAEL",
    "JUAN",
    "ANNA",
    "MARY",
    "JEAN",
    "ROBERT",
    "DANIEL",
    "LUIS",
    "CARLOS",
    "JAMES",
    "ANTONIO",
    "JOSEPH",
    "HUI",
    "ELENA",
    "FRANCISCO",
    "HONG",
    "MARIE",
    "MIN",
    "LEI",
    "YU",
    "IBRAHIM",
    "PETER",
    "FATIMA",
    "ALEKSANDR",
    "RICHARD",
    "XIN",
    "BIN",
    "PAUL",
    "PING",
    "LIN",
    "OLGA",
    "SRI",
    "PEDRO",
    "WILLIAM",
    "ROSA",
    "THOMAS",
    "JORGE",
    "YONG",
    "ELIZABETH",
    "SERGEY",
    "RAM",
    "PATRICIA",
    "HASSAN",
    "ANITA",
    "MANUEL",
    "VICTOR",
    "SANDRA",
    "MING",
    "SITI",
    "MIGUEL",
    "EMMANUEL",
    "SAMUEL",
    "LING",
    "CHARLES",
    "SARAH",
    "MARIO",
    "JOAO",
    "TATYANA",
    "MARK",
    "RITA",
    "MARTIN",
    "SVETLANA",
    "PATRICK",
    "NATALYA",
    "QING",
    "AHMAD",
    "MARTHA",
    "ANDREY",
    "SUNITA",
    "ANDREA",
    "CHRISTINE",
    "IRINA",
    "LAURA",
    "LINDA",
    "MARINA",
    "CARMEN",
    "GHULAM",
    "VLADIMIR",
    "BARBARA",
    "ANGELA",
    "GEORGE",
    "ROBERTO",
    "PENG",
    "IVAN",
    "ALEXANDER",
    "EKATERINA",
    "QIANG",
    "YUN",
    "JESUS",
    "SUSAN",
    "SARA",
    "NOOR",
    "MARIAM",
    "DMITRIY",
    "ERIC",
    "ZAHRA",
    "FATMA",
    "FERNANDO",
    "ESTHER",
    "JIN",
    "DIANA",
    "MAHMOUD",
    "CHAO",
    "RONG",
    "SANTOSH",
    "NANCY",
    "MUSA",
    "ANH",
    "OMAR",
    "JENNIFER",
    "GANG",
    "YUE",
    "CLAUDIA",
    "MARYAM",
    "GLORIA",
    "RUTH",
    "TERESA",
    "SANJAY",
    "NA",
    "NUR",
    "KYAW",
    "FRANCIS",
    "AMINA",
    "DENIS",
    "STEPHEN",
    "SUNIL",
    "GABRIEL",
    "ANDREW",
    "EDUARDO",
    "ABDULLAH",
    "GRACE",
    "ANASTASIYA",
    "MEI",
    "RAFAEL",
    "RICARDO",
    "CHRISTIAN",
    "ALEKSEY",
    "STEVEN",
    "GITA",
    "FRANK",
    "JIANHUA",
    "MO",
    "KAREN",
    "MASMAAT",
    "BRIAN",
    "CHRISTOPHER",
    "XIAOYAN",
    "RAJESH",
    "MUSTAFA",
    "EVA",
    "BIBI",
    "MONICA",
    "OSCAR",
    "ANDRE",
    "CATHERINE",
    "KAI",
    "RAMESH",
    "LIPING",
    "SONIA",
    "ANTHONY",
    "MINA",
    "MANOJ",
    "ASHOK",
    "ROSE",
    "ALBERTO",
    "NING",
    "REKHA",
    "CHEN",
    "LAN",
    "AUNG",
    "ALEX",
    "SURESH",
    "ANIL",
    "FATEMEH",
    "JULIO",
    "ZHEN",
    "SIMON",
    "PAULO",
    "JUANA",
    "IRENE",
    "ADAM",
    "KEVIN",
    "VIJAY",
    "SYED",
    "MEHMET",
    "ANGEL",
    "EDWARD",
    "JULIA",
    "VICTORIA",
    "RONALD",
    "CHENG",
    "LAKSHMI",
    "FRANCISCA",
    "VERONICA",
    "ROMAN",
    "ISMAIL",
    "MARGARET",
    "LUZ",
    "ANNE",
    "SILVIA",
    "KAMAL",
    "RAJU",
    "SERGIO",
    "WALTER",
    "LISA",
    "MARTA",
    "NADEZHDA",
    "MARCO",
    "ALBERT",
    "ALICE",
    "ASHA",
    "XIANG",
    "ISABEL",
    "ZAINAB",
    "MICHELLE",
    "LONG",
    "MICHEL",
    "PIERRE",
    "SALEH",
    "HAIYAN",
    "FELIX",
    "SALMA",
    "HECTOR",
    "MANJU",
    "JAN",
    "ROGER",
    "JOYCE",
    "MARGARITA",
    "JOEL",
    "JESSICA",
    "LUCIA",
    "PAVEL",
    "HAI",
    "NADIA",
    "MARIYA",
    "JIANPING",
    "JACQUELINE",
    "HALIMA",
    "NAN",
    "RAMA",
    "BENJAMIN",
    "REBECCA",
    "JULIE",
    "VERA",
    "VINOD",
    "KUN",
    "KHALID",
    "RAMON",
    "JANET",
    "SHARON",
    "SUMAN",
    "JANE",
    "LIHUA",
    "SHANTI",
    "ABUBAKAR",
    "AISHA",
    "ZAW",
    "JONATHAN",
    "PAULA",
    "BRUNO",
    "MONIKA",
    "MAKSIM",
    "MAMADOU",
    "JUDITH",
    "KENNETH",
    "MOSTAFA",
    "CHRIS",
    "HELEN",
    "NIKOLAY",
    "RINA",
    "ZHIQIANG",
    "MARCOS",
    "MRIA",
    "NORMA",
    "ANTON",
    "RAUL",
    "CRISTINA",
    "XIAOHONG",
    "HENRY",
    "WAI",
    "ANTONIA",
    "BETTY",
    "ALEJANDRO",
    "NELSON",
    "IGOR",
    "EVGENIY",
    "ADRIANA",
    "AMIR",
    "PABLO",
    "RAJ",
    "REGINA",
    "RAJENDRA",
    "BRENDA",
    "LINH",
    "SANI",
    "HUSSEIN",
    "GUL",
    "MIKHAIL",
    "JAIME",
    "NICOLE",
    "SIMA",
    "GIUSEPPE",
    "DINESH",
    "TATIANA",
    "BERNARD",
    "GARY",
    "LIJUN",
    "SITA",
    "JAVIER",
    "SHAN",
    "HASAN",
    "YULIYA",
    "NI",
    "MOSES",
    "AGNES",
    "CESAR",
    "XIAOLI",
    "USHA",
    "ALFREDO",
    "MENG",
    "JIANGUO",
    "KIRAN",
    "DENNIS",
    "KHALED",
    "CAROL",
    "RANI",
    "YUSUF",
    "XIAOPING",
    "HA",
    "RAKESH",
    "ISAAC",
    "LUIZ",
    "JOSEPHINE",
    "KRISHNA",
    "MOHAMAD",
    "RAYMOND",
    "ERIKA",
    "BLANCA",
    "JIANJUN",
    "DEBORAH",
    "AMANDA",
    "NATALIA",
    "GLADYS",
    "FLORENCE",
    "ASMA",
    "USMAN",
    "DONALD",
    "LIJUAN",
    "ZHI",
    "ABDULLAHI",
    "STEPHANIE",
    "TINGTING",
    "SAEED",
    "EDGAR",
    "MAYA",
    "HAN",
    "MAHDI",
    "KHADIJA",
    "VALENTINA",
    "RUBEN",
    "TUAN",
    "THANH",
    "JASON",
    "EI",
    "DORIS",
    "FATOUMATA",
    "DARYA",
    "RENE",
    "CECILIA",
    "UMAR",
    "CYNTHIA",
    "GUSTAVO",
    "KIM",
    "LUCAS",
    "ZIN",
    "XUAN",
    "ABDO",
    "MOUSSA",
    "AMIT",
    "MONA",
    "XIAOLING",
    "DILIP",
    "CAROLINE"
]

const lastNamesList = [
    "WANG",
    "LI",
    "ZHANG",
    "CHEN",
    "LIU",
    "DEVI",
    "YANG",
    "HUANG",
    "SINGH",
    "WU",
    "KUMAR",
    "XU",
    "ALI",
    "ZHAO",
    "ZHOU",
    "NGUYEN",
    "KHAN",
    "MA",
    "LU",
    "ZHU",
    "MAUNG",
    "SUN",
    "YU",
    "LIN",
    "KIM",
    "HE",
    "HU",
    "JIANG",
    "GUO",
    "AHMED",
    "KHATUN",
    "LUO",
    "AKTER",
    "GAO",
    "ZHENG",
    "DASILVA",
    "TANG",
    "LIANG",
    "DAS",
    "WEI",
    "MOHAMED",
    "ISLAM",
    "SHI",
    "SONG",
    "XIE",
    "HAN",
    "GARCIA",
    "MOHAMMAD",
    "TAN",
    "DENG",
    "BAI",
    "AHMAD",
    "YAN",
    "KAUR",
    "FENG",
    "HERNANDEZ",
    "RODRIGUEZ",
    "CAO",
    "LOPEZ",
    "HASSAN",
    "HUSSAIN",
    "GONZALEZ",
    "MARTINEZ",
    "CENG",
    "IBRAHIM",
    "PENG",
    "CAI",
    "XIAO",
    "TRAN",
    "PAN",
    "DOSSANTOS",
    "CHENG",
    "YUAN",
    "RAHMAN",
    "YADAV",
    "SU",
    "PEREZ",
    "I",
    "LE",
    "FAN",
    "DONG",
    "YE",
    "RAM",
    "TIAN",
    "FU",
    "HOSSAIN",
    "KUMARI",
    "SANCHEZ",
    "DU",
    "PEREIRA",
    "YAO",
    "ZHONG",
    "JIN",
    "PAK",
    "DING",
    "MOHAMMED",
    "LAL",
    "YIN",
    "BIBI",
    "SILVA",
    "MUHAMMAD",
    "REN",
    "FERREIRA",
    "LIAO",
    "MANDAL",
    "CUI",
    "BEGUM",
    "FANG",
    "SHARMA",
    "ALVES",
    "SHAH",
    "RAY",
    "QIU",
    "MENG",
    "RAMIREZ",
    "MONDAL",
    "DAI",
    "KANG",
    "PATEL",
    "WEN",
    "GU",
    "GOMEZ",
    "PHAM",
    "JIA",
    "SAH",
    "XIA",
    "HONG",
    "ABDUL",
    "RODRIGUES",
    "SMITH",
    "SANTOS",
    "DIAZ",
    "HOU",
    "HASAN",
    "XIONG",
    "ZOU",
    "ALAM",
    "PRASAD",
    "DEOLIVEIRA",
    "QIN",
    "CHOE",
    "JI",
    "UDDIN",
    "MUSA",
    "GONG",
    "GHOSH",
    "CHANG",
    "FLORES",
    "DIALLO",
    "GOMES",
    "XUE",
    "LEI",
    "PATIL",
    "TORRES",
    "DESOUZA",
    "QI",
    "LAI",
    "CRUZ",
    "LONG",
    "RAMOS",
    "HUSSEIN",
    "FERNANDEZ",
    "DUAN",
    "RI",
    "AN",
    "SHAIKH",
    "BAKHASH",
    "XIANG",
    "PAL",
    "MORALES",
    "ALLAH",
    "WAN",
    "JOHNSON",
    "REYES",
    "ABDULLAHI",
    "TAO",
    "GUPTA",
    "JIMENEZ",
    "MAO",
    "BISWAS",
    "KONG",
    "HOANG",
    "WILLIAMS",
    "ABUBAKAR",
    "ABBAS",
    "SAHU",
    "GUTIERREZ",
    "CHONG",
    "HAO",
    "SHAO",
    "SAHA",
    "GUAN",
    "MO",
    "RUIZ",
    "KHATOON",
    "OLIVEIRA",
    "QIAN",
    "ROY",
    "SALEH",
    "ABDULLAH",
    "LAN",
    "SARKAR",
    "SANI",
    "CASTILLO",
    "ALVAREZ",
    "BROWN",
    "MARTIN",
    "JONES",
    "MENDOZA",
    "ROMERO",
    "IQBAL",
    "QU",
    "BEGAM",
    "RANA",
    "CASTRO",
    "ANSARI",
    "YI",
    "USMAN",
    "TRAORE",
    "BAO",
    "SEKH",
    "ROJAS",
    "BI",
    "MAHMOUD",
    "MARTINS",
    "ORTIZ",
    "VU",
    "MORENO",
    "DEJESUS",
    "MALIK",
    "RIBEIRO",
    "LEE",
    "MAHATO",
    "ULLAH",
    "ISMAIL",
    "FERNANDES",
    "RANI",
    "PARAMAR",
    "THOMAS",
    "JOHN",
    "GE",
    "PHAN",
    "RIVERA",
    "CHU",
    "ADAMU",
    "MAHTO",
    "TONG",
    "VARGAS",
    "NIU",
    "XING",
    "JOSEPH",
    "LOPES",
    "CHO",
    "OSMAN",
    "NAYAK",
    "UMAR",
    "PANG",
    "RATHOD",
    "JADHAV",
    "BUI",
    "CHAND",
    "ZHAN",
    "MIA",
    "COULIBALY",
    "BARMAN",
    "SOARES",
    "SATO",
    "YOU",
    "NI",
    "KHALED",
    "CHAN",
    "DI",
    "SAEED",
    "MISHRA",
    "HERRERA",
    "THAKUR",
    "BARBOSA",
    "ZHUANG",
    "BEHERA",
    "ADAM",
    "LIMA",
    "SULTANA",
    "SUZUKI",
    "MEDINA",
    "DIN",
    "HO",
    "BANO",
    "COSTA",
    "AGUILAR",
    "O",
    "DIAS",
    "DANG",
    "PASWAN",
    "MUOZ",
    "QIAO",
    "MUHAMMED",
    "YUSUF",
    "ABDI",
    "MILLER",
    "CHOWDHURY",
    "VO",
    "CAMARA",
    "AHAMAD",
    "OMAR",
    "AKHTAR",
    "OUEDRAOGO",
    "SHEN",
    "GUL",
    "MAI",
    "VIEIRA",
    "DAVIS",
    "NIE",
    "WILSON",
    "MENDEZ",
    "BATISTA",
    "MAJHI",
    "SOUZA",
    "OU",
    "SARDAR",
    "PAUL",
    "HA",
    "VAZQUEZ",
    "THAKOR",
    "MIRANDA",
    "VASQUEZ",
    "HAQUE",
    "HAJI",
    "CHAUHAN",
    "AMIN",
    "YUE",
    "HUYNH",
    "SAYED",
    "RASHID",
    "PAWAR",
    "CHAVEZ",
    "SHANG",
    "TU",
    "GAN",
    "RAI",
    "PRADHAN",
    "NAIK",
    "DO",
    "KARIM",
    "JAMES",
    "TAYLOR",
    "GENG",
    "NGO",
    "HOSSEN",
    "DESOUSA",
    "JAHAN",
    "SALAZAR",
    "YUN",
    "DACOSTA",
    "KONE",
    "TANAKA",
    "MOUSSA",
    "NAWAZ",
    "MUSTAFA",
    "MI",
    "MOU",
    "GUZMAN",
    "JIAO",
    "RAO",
    "JUMA",
    "ZUO",
    "WATANABE",
    "ANDERSON",
    "DAN",
    "MOREIRA",
    "ILUNGA",
    "TAKAHASHI",
    "SHEIKH",
    "SHINDE",
    "HAMID",
    "BELLO",
    "ALIYU",
    "PU",
    "AKHTER",
    "NATH",
    "MENDES",
    "NGOY",
    "SUAREZ",
    "JACKSON",
    "AZIZ",
    "ORTEGA",
    "CARDOSO",
    "BA",
    "MOLLA",
    "GARBA",
    "CAMPOS",
    "PINTO",
    "ASHRAF",
    "KHALIL",
    "JEAN",
    "DELGADO",
    "NOOR",
    "TRUONG",
    "NUNES",
    "SHU",
    "MIAH",
]