import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import { stateControl, attack, move, interact, characterMaker, necromancer, monk, shaman, goon, bard, outlaw} from './rpg.js';



window.onload = function () {
    let counter = 1;
    document.getElementById('newCharacter').onclick = function (e) {
        e.preventDefault();

        const inputName = document.getElementById("characterName").value;
        const inputClassType = document.querySelector("select#classTypes option:checked").textContent;
        const characterId = `character${counter}`;
        const newCharacter = stateControl(characterId);
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

        const classedCharacter = classCheck(createdCharacter.class);

        console.log(classedCharacter);

        const body = document.querySelector("body");
        const newCharacterDiv = document.createElement("div");
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
        const h3Attack = document.createElement('h3');
        const divAttack = document.createElement('div');
        divAttack.setAttribute("id", "chosen-attack-value");
        h3Attack.append(divAttack);
        const h3Move = document.createElement('h3');
        const divMove = document.createElement('div');
        divMove.setAttribute("id", "chosen-move-value");
        h3Move.append(divMove);
        const h3Interact = document.createElement('h3');
        const divInteract = document.createElement('div');
        divInteract.setAttribute("id", "chosen-interact-value");
        h3Interact.append(divInteract);
        const ability1Button = document.createElement("button");
        ability1Button.setAttribute("id", "ability1");
        ability1Button.innerText = `${classedCharacter.ability1}`;
        const ability2Button = document.createElement("button");
        ability2Button.setAttribute("id", "ability2");
        ability2Button.innerText = `${classedCharacter.ability2}`;
        newCharacterDiv.setAttribute("class", "characterCard");
        newCharacterDiv.append(name, playerClass, attackButton, h3Attack, moveButton, h3Move, interactButton, h3Interact, ability1Button, ability2Button);

        body.append(newCharacterDiv);

        attackButton.onclick = function () {
            const newState = newCharacter(attack);
            divAttack.innerText = `Attack: ${newState.attack}`;
        };
        moveButton.onclick = function () {
            const newState = newCharacter(move);
            divMove.innerText = `Move: ${newState.move}`;
        };
        interactButton.onclick = function () {
            const newState = newCharacter(interact);
            divInteract.innerText = `Interact: ${newState.interact}`;
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