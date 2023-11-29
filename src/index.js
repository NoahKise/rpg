import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import { stateControl, attack, move, interact, characterMaker, classCheck } from './rpg.js';

window.onload = function () {
    let counter = 1;
    document.getElementById('newCharacter').onclick = function (e) {
        e.preventDefault();
        const createdCharacter = characterMaker(inputName, inputClassType, counter);


        classCheck(createdCharacter.class);


        const inputName = document.getElementById("characterName").value;
        const inputClassType = document.querySelector("select#classTypes option:checked").textContent;
        const characterId = `character${counter}`;
        const newCharacter = stateControl(characterId);
        counter++;
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
        newCharacterDiv.setAttribute("class", "characterCard");
        newCharacterDiv.append(name, playerClass, attackButton, h3Attack, ability2Button, h3Move, interactButton, h3Interact);

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
    };
};



const ability1Button = document.createElement("button");
ability1Button.setAttribute("id", "ability1");
ability1Button.innerText = "Ability 1"; //this will be from the character creation
const ability2Button = document.createElement("button");
ability2Button.setAttribute("id", "ability2");
ability2Button.innerText = "Ability 2"; //this will be from the character creation
const divAbility1 = document.createElement('div');
divAbility1.setAttribute("id", "chosen-attack-value");
h3Ability1.append(divAbility1);
const divAbility2 = document.createElement('div');
divAbility2.setAttribute("id", "chosen-attack-value");
h3Ability2.append(divAbility2);
ability1Button.onclick = function () {
    const newState = newCharacter(attack);
    divAbility1.innerText = `Ability 1: ${newState.attack}`;
};
ability2Button.onclick = function () {
    const newState = newCharacter(move);
    divAbility2.innerText = `Ability 2: ${newState.move}`;
};

// necromancer, monk, shaman, goon, bard, outlaw