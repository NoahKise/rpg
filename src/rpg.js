export const changeStateFixed = (prop) => {
    return (value) => {
        return (state) => ({
            ...state,
            [prop]: (state[prop] || 0) + value
        });
    };
};

export const changeStateD20 = (prop) => {
    return (state) => ({
        ...state,
        [prop]: (state[prop] || 0) + Math.floor(Math.random() * 21)
    });
};

export const changeStateD6 = (prop) => {
    return (state) => ({
        ...state,
        [prop]: (state[prop] || 0) + Math.floor(Math.random() * 7)
    });
};

export const changeStateD10 = (prop) => {
    return (state) => ({
        ...state,
        [prop]: (state[prop] || 0) + Math.floor(Math.random() * 11)
    });
};

export const storeState = () => {
    const characterStates = {};
    return (characterId) => {
        if (!characterStates[characterId]) {
            characterStates[characterId] = {};
        }
        let currentState = characterStates[characterId];
        return (stateChangeFunction = state => state) => {
            const newState = stateChangeFunction(currentState);
            currentState = { ...newState };
            return newState;
        };
    };
};

export const stateControl = storeState();
export const attack = changeStateD20("attack");
export const move = changeStateD20("move");
export const interact = changeStateD20("interact");

export const characterMaker = function (inputName, inputClass, characterId) {
    const characterObj = {
        id: characterId,
        name: inputName,
        class: inputClass
    };
    return characterObj;
};

const unarmedStrike = function () {
    const obj = {
        ability1: "Punch",
        punch: function (target) {
            target.health -= 5;
        }
    };
    return obj;
};

const meditate = function () {
    const obj = {
        ability2: "Focus",
        focus: function () {
            const focusAttack = {
                superPunch: function (target) {
                    target.health -= 12;
                }
            };
            return focusAttack;
        }
    };
    return obj;
};

export const monk = function (player) {
    let state = {
        ...player,
        health: 35,
        strength: 30,
        intelligence: 20,
        speed: 35, 
        stealth: 25,
        charm: 10
    };
    return {...state, ...unarmedStrike(state), ...meditate(state)};
};

const animateCorpse = function () {
    const obj = {
        ability1: "Animate Corpse",
        animate: function () {
            const zombie = characterMaker("corpse", "zombie", 6);
            return zombie;
        }
    };
    return obj;
};

const castCurse = function () {
    const obj = {
        ability2: "Curse",
        curse: function (target) {
            return target.health -= 2;
        }
    };
    return obj;
};

export const necromancer = function(player) {
    let state = {
        ...player,
        health: 20,
        strength: 15,
        intelligence: 35,
        speed: 25, 
        stealth: 30,
        charm: 10
    };

    return {...state, ...animateCorpse(state), ...castCurse(state)};
};

const intimidate = function () {
    const obj = {
        ability1: "Beat Chest",
        beatChest: function (target) {
            return target.item1 = null;
        }
    };
    return obj;
};

const enrage = function(player) {
    const obj = {
        ability2: "Become Frenzied",
        becomeFrenzied: function() {
            const frenziedGoon = {
                ...player, 
                strength: player.strength + 3,
                intelligence: player.intelligence - 2
            };
            return frenziedGoon;
        }
    };
    return obj;
};

export const goon = function(player) {
    let state = {
        ...player,
        health: 40,
        strength: 40,
        intelligence: 5,
        speed: 30, 
        stealth: 5,
        charm: 20
    };

    return {...state, ...intimidate(state), ...enrage(state)};
};

const invokeTheOldGods = function(player) {
    const obj = {
        ability1: "Invoke the Old Gods",
        bloodSacrifice: function(num) {
            const bloodedShaman = {
                ...player,
                health: player.health - num
            };
            const roll = Math.floor(Math.random() * 21);
            if (roll <= num) {
                //end encounter
            }
            return bloodedShaman;
        }
    };
    return obj;
};

const heal = function() {
    const obj = {
        ability2: "Heal",
        restoreHealth: function(target) {
            const roll = Math.floor(Math.random() * 5);
            return target.health += roll;
        }
    };
    return obj;
};

export const shaman = function(player) {
    let state = {
        ...player,
        health: 35,
        strength: 10,
        intelligence: 30,
        speed: 25, 
        stealth: 20,
        charm: 25
    };

    return {...state, ...invokeTheOldGods(state), ...heal(state)};
};

const romance = function () {
    const obj = {
        ability1: "Seduce",
        seduce: function (target) {
            target.armor - 2;
        }
    };
    return obj;
};

const jester = function () {
    const obj = {
        ability2: "Charm",
        charm: function (player) {
            const charmingBard = {
                ...player,
                armor: player.armor + 2
            };
            return charmingBard;
        }
    };
    return obj;
};

export const bard = function (player) {
    let state = {
        ...player,
        health: 30,
        strength: 15,
        intelligence: 20,
        speed: 30, 
        stealth: 30,
        charm: 40
    };

    return {...state, ...romance(state), ...jester(state)};
};

const trap = function() {
    const obj = {
        ability1: "Set Trap",
        setTrap: function(player, num) {
            if (player.moves === num) {
                player.health -= 5;
            }
        }
    };
    return obj;
};

const rangedAttack = function() {
    const obj = {
        ability2: "Shoot Arrow",
        shoot: function(target) {
            target.health -= 5;
        }
    };
    return obj;
};

export const outlaw = function (player) {
    let state = {
        ...player,
        health: 25,
        strength: 25,
        intelligence: 35,
        speed: 35, 
        stealth: 35,
        charm: 30
    };

    return {...state, ...trap(state), ...rangedAttack(state)};
};