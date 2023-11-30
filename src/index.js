import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import { characterMaker, necromancer, monk, shaman, goon, bard, outlaw, enemyMaker } from './rpg.js';
import { getGif } from "./giphy";



window.onload = function () {
    let counter = 0;
    const enemies = {};
    const heroes = {};


    document.getElementById('newCharacter').onclick = async function (e) {
        e.preventDefault();

        const inputName = document.getElementById("characterName").value;
        const inputClassType = document.querySelector("select#classTypes option:checked").textContent;
        // const characterId = `character${counter}`;
        // const newCharacter = stateControl(characterId);
        counter++;

        const createdCharacter = characterMaker(inputName, inputClassType, counter);
        const classCheck = function (inputClass) {
            if (inputClass === "Necromancer") {
                const classedCharacter = necromancer(createdCharacter);
                return classedCharacter;
            } else if (inputClass === "Monk") {
                const classedCharacter = monk(createdCharacter);
                return classedCharacter;
            } else if (inputClass === "Shaman") {
                const classedCharacter = shaman(createdCharacter);
                return classedCharacter;
            } else if (inputClass === "Goon") {
                const classedCharacter = goon(createdCharacter);
                return classedCharacter;
            } else if (inputClass === "Bard") {
                const classedCharacter = bard(createdCharacter);
                return classedCharacter;
            } else {
                const classedCharacter = outlaw(createdCharacter);
                return classedCharacter;
            }
        };

        const heroId = `hero${counter}`;
        const classedCharacter = classCheck(createdCharacter.class);
        heroes[heroId] = classedCharacter;

        const enemyId = `enemy${counter}`;
        const enemy = enemyMaker(enemyId);
        enemies[enemyId] = enemy;
        const gif = await getGif();

        const newCharacterDiv = document.createElement("div");

        const displayStats = () => {
            const stats = document.createElement("ul");
            const health = document.createElement("li");
            const strength = document.createElement("li");
            const intelligence = document.createElement("li");
            const speed = document.createElement("li");
            const stealth = document.createElement("li");
            const charm = document.createElement("li");
            const id = document.createElement("li");

            health.append(`Health: ${classedCharacter.health}`);
            strength.append(`Strength: ${classedCharacter.strength}`);
            intelligence.append(`Intelligence: ${classedCharacter.intelligence}`);
            speed.append(`Speed: ${classedCharacter.speed}`);
            stealth.append(`Stealth: ${classedCharacter.stealth}`);
            charm.append(`Charm: ${classedCharacter.charm}`);
            id.append(`ID: ${classedCharacter.id}`);


            stats.append(health, strength, intelligence, speed, stealth, charm, id);
            return stats;

        };

        const body = document.querySelector("body");
        const name = document.createElement("h1");
        name.append(inputName);
        const playerClass = document.createElement("h2");
        playerClass.append(inputClassType);
        const attackButton = document.createElement("button");
        attackButton.setAttribute("id", "attack");
        attackButton.innerText = "Attack";
        const moveButton = document.createElement("button");
        moveButton.setAttribute("id", "move");
        moveButton.innerText = "Move";
        const interactButton = document.createElement("button");
        interactButton.setAttribute("id", "interact");
        interactButton.innerText = "Interact";
        const br = document.createElement("br");
        // const h3Attack = document.createElement('h3');
        // const divAttack = document.createElement('div');
        // divAttack.setAttribute("id", "chosen-attack-value");
        // h3Attack.append(divAttack);
        // const h3Move = document.createElement('h3');
        // const divMove = document.createElement('div');
        // divMove.setAttribute("id", "chosen-move-value");
        // h3Move.append(divMove);
        // const h3Interact = document.createElement('h3');
        // const divInteract = document.createElement('div');
        // divInteract.setAttribute("id", "chosen-interact-value");
        // h3Interact.append(divInteract);
        const ability1Button = document.createElement("button");
        ability1Button.setAttribute("id", "ability1");
        ability1Button.innerText = `${classedCharacter.ability1}`;
        const ability2Button = document.createElement("button");
        ability2Button.setAttribute("id", "ability2");
        ability2Button.innerText = `${classedCharacter.ability2}`;
        newCharacterDiv.setAttribute("class", "characterCard");

        // const showMovesLeft = () => {
        const actionsAvailable = document.createElement("h4");
        actionsAvailable.setAttribute("id", `actions${heroId}`);
        // actionsavailable = "";
        actionsAvailable.append(`Actions Left: ${classedCharacter.actionTaken}`);
        // }

        newCharacterDiv.append(name, playerClass, attackButton, moveButton, interactButton, br, ability1Button, ability2Button, displayStats(), actionsAvailable);

        const monsterGif = document.createElement("img");
        monsterGif.setAttribute("src", gif);
        const enemyDiv = document.createElement("div");
        const enemyHealth = document.createElement("h2");
        enemyHealth.setAttribute("id", `health${enemyId.charAt(enemyId.length - 1)}`);
        const enemyRadio = document.createElement("input");
        enemyRadio.setAttribute("type", "radio");
        enemyRadio.setAttribute("name", "target");
        enemyRadio.setAttribute("value", counter);
        enemyHealth.append(`Health: ${enemy.health}`);
        enemyDiv.setAttribute("class", "enemyCard");
        enemyDiv.append(monsterGif, enemyHealth, enemyRadio);



        body.append(newCharacterDiv, enemyDiv);

        attackButton.onclick = function () {
            const enemyRadios = document.querySelectorAll(".enemyCard input[type='radio']");
            const attackingCharacter = heroes[heroId];

            if (attackingCharacter.actionTaken === 1) {

                for (const radio of enemyRadios) {
                    if (radio.checked) {
                        const enemyId = radio.value;
                        const selectedEnemy = enemies[`enemy${enemyId}`];

                        if (selectedEnemy) {
                            selectedEnemy.health -= attackingCharacter.strength / 5;
                            document.getElementById(`health${enemyId.charAt(enemyId.length - 1)}`).innerText = `Health: ${selectedEnemy.health}`;
                            attackingCharacter.actionTaken -= 1;
                            document.getElementById(`actions${heroId}`).innerText = `Actions Left: ${attackingCharacter.actionTaken}`;
                        }
                        break;
                    }
                }
            }
        };
        moveButton.onclick = function () {
            // const newState = newCharacter(move);
            // divMove.innerText = `Move: ${newState.move}`;
        };
        interactButton.onclick = function () {
            // const newState = newCharacter(interact);
            // divInteract.innerText = `Interact: ${newState.interact}`;
        };
        ability1Button.onclick = function () {
            // const newState = newCharacter(attack);
            // divAbility1.innerText = `Ability 1: ${newState.attack}`;
        };
        ability2Button.onclick = function () {
            // const newState = newCharacter(move);
            // divAbility2.innerText = `Ability 2: ${newState.move}`;
        };



    };
};

// stateControl, attack, move, interact, 