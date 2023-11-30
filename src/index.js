import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import { characterMaker, necromancer, monk, shaman, goon, bard, outlaw, enemyMaker } from './rpg.js';
import { getGif } from "./giphy";



window.onload = function () {
    let counter = 0;
    const enemies = {};
    const heroes = {};
    let actionCounter = 0;

    document.getElementById('newCharacter').onclick = async function (e) {
        e.preventDefault();

        const inputName = document.getElementById("characterName").value;
        const inputClassType = document.querySelector("select#classTypes option:checked").textContent;
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
        newCharacterDiv.setAttribute("id", `characterDiv${counter}`);

        const displayStats = (character) => {
            const stats = document.createElement("ul");
            stats.innerHTML = "";
            const health = document.createElement("li");
            const strength = document.createElement("li");
            const intelligence = document.createElement("li");
            const speed = document.createElement("li");
            const stealth = document.createElement("li");
            const charm = document.createElement("li");
            const id = document.createElement("li");

            health.append(`Health: ${character.health}`);
            strength.append(`Strength: ${character.strength}`);
            intelligence.append(`Intelligence: ${character.intelligence}`);
            speed.append(`Speed: ${character.speed}`);
            stealth.append(`Stealth: ${character.stealth}`);
            charm.append(`Charm: ${character.charm}`);
            id.append(`ID: ${character.id}`);


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
        const ability1Button = document.createElement("button");
        ability1Button.setAttribute("id", "ability1");
        ability1Button.innerText = `${classedCharacter.ability1}`;
        const ability2Button = document.createElement("button");
        ability2Button.setAttribute("id", "ability2");
        ability2Button.innerText = `${classedCharacter.ability2}`;

        const statsDiv = document.createElement("div");
        statsDiv.append(displayStats(classedCharacter));
        statsDiv.setAttribute("id", `statsDiv${counter}`);

        newCharacterDiv.setAttribute("class", "characterCard");

        const actionsDiv = document.createElement("div");
        actionsDiv.setAttribute("id", `actionsDiv${counter}`);

        const actionsAvailable = document.createElement("h4");
        actionsAvailable.setAttribute("id", `actions${heroId}`);
        actionsAvailable.append(`Actions Left: ${classedCharacter.actionTaken}`);
        actionsDiv.append(actionsAvailable);
        

        newCharacterDiv.append(name, playerClass, attackButton, moveButton, interactButton, br, ability1Button, ability2Button, statsDiv, actionsDiv);

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
        enemyDiv.setAttribute("id", `enemyDiv${counter}`);
        enemyDiv.append(monsterGif, enemyHealth, enemyRadio);

        const monsterAttack = function () {
            for (let i = 1; i < counter + 1; i++) {
                const randomPlayer = Math.floor(Math.random() * counter) + 1;
                const randomDamage = Math.floor(Math.random() * 5) + 1;
                let attackedPlayer = heroes[`hero${randomPlayer}`];
                attackedPlayer.health -= randomDamage;
                const statsDivToUpdate = document.getElementById(`statsDiv${randomPlayer}`);
                statsDivToUpdate.innerHTML = "";
                statsDivToUpdate.append(displayStats(attackedPlayer));
                Object.values(heroes).forEach(element => {
                    element.actionTaken = 1;
                });
                actionCounter = 0;

                if (attackedPlayer.health <= 0) {
                    const selectedPlayerDiv = document.getElementById(`characterDiv${randomPlayer}`);
                    selectedPlayerDiv.style.display = "none";
                }
            }
            Object.keys(heroes).forEach(heroKey => {
                const heroId = heroKey;
                const actionsDivToUpdate = document.getElementById(`actions${heroId}`);
                if (actionsDivToUpdate) {
                    actionsDivToUpdate.innerHTML = `Actions Left: 1`;
                }
            });
        };

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
                            actionCounter += 1;
                            document.getElementById(`actions${heroId}`).innerText = `Actions Left: ${attackingCharacter.actionTaken}`;
                            if (actionCounter === counter) {
                                monsterAttack();
                            }
                            if (selectedEnemy.health <= 0) {
                                const selectedEnemyDiv = document.getElementById(`enemyDiv${enemyId}`);
                                selectedEnemyDiv.style.display = "none";
                            }
                        }
                        break;
                    }
                }
            }
        };
        moveButton.onclick = function () {

        };
        interactButton.onclick = function () {

        };
        ability1Button.onclick = function () {

        };
        ability2Button.onclick = function () {

        };



    };
};