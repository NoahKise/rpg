import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import { stateControl, attack, move, interact } from './rpg.js';

window.onload = function () {
    let counter = 1;
    document.getElementById('newCharacter').onclick = function (e) {
        e.preventDefault();
        const inputClassType = document.querySelector("select#classTypes option:checked").textContent;
        const characterId = `character${counter}`;
        const newPlant = stateControl(characterId);
        counter++;
        const body = document.querySelector("body");
        const newCharacterDiv = document.createElement("div");
        const name = document.createElement("h1");
        name.append(inputClassType);
        const attackButton = document.createElement("button");
        attackButton.setAttribute("id", "attack");
        attackButton.innerText = "Attack";
        const moveButon = document.createElement("button");
        moveButon.setAttribute("id", "move");
        moveButon.innerText = "Move";
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
        newCharacterDiv.append(name, attackButton, h3Attack, moveButon, h3Move, interactButton, h3Interact);

        body.append(newCharacterDiv);

        attackButton.onclick = function () {
            const newState = newPlant(attack);
            divAttack.innerText = `Attack: ${newState.attack}`;
        };
        moveButon.onclick = function () {
            const newState = newPlant(move);
            divMove.innerText = `Move: ${newState.move}`;
        };
        interactButton.onclick = function () {
            const newState = newPlant(interact);
            divInteract.innerText = `Interact: ${newState.interact}`;
        };
    };
};