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

const characterMaker = function (inputName, inputClass, characterId) {
    const characterObj = {
        id: characterId,
        name: inputName,
        class: inputClass
    };
    return characterObj;
};

const unarmedStrike = function () {
    const obj = {
        punch: function (target) {
            target.health -= 5;
        }
    };
    return obj;
};

const meditate = function () {
    const obj = {
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

const monk = function (player) {
    let state = player;

    return {...state, ...unarmedStrike(state), ...meditate(state)};
};

const animateCorpse = function () {
    const obj = {
        animate: function () {
            const zombie = characterMaker("corpse", "zombie", 6);
            return zombie;
        }
    };
    return obj;
};

const castCurse = function () {
    const obj = {
        curse: function (target) {
            return target.health -= 2;
        }
    };
    return obj;
};

const necromancer = function(player) {
    let state = player;

    return {...state, ...animateCorpse(state), ...castCurse(state)};
};

const intimidate = function () {
    const obj = {
        beatChest: function (target) {
            return target.item1 = null;
        }
    };
    return obj;
};

const enrage = function(player) {
    const obj = {
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

const goon = function(player) {
    let state = player;

    return {...state, ...intimidate(state), ...enrage(state)};
};

const invokeTheOldGods = function(player) {
    const obj = {
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
        restoreHealth: function(target) {
            const roll = Math.floor(Math.random() * 5);
            return target.health += roll;
        }
    };
    return obj;
};

const shaman = function(player) {
    let state = player;

    return {...state, ...invokeTheOldGods(state), ...heal(state)};
};

const romance = function () {
    const obj = {
        seduce: function (target) {
            target.armor - 2;
        }
    };
    return obj;
};

const jester = function () {
    const obj = {
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

const bard = function (player) {
    let state = player ;

    return {...state, ...romance(state), ...jester(state)};
};

const trap = function() {
    const obj = {
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
        shoot: function(target) {
            target.health -= 5;
        }
    };
    return obj;
};

const outlaw = function (player) {
    let state = player ;

    return {...state, ...trap(state), ...rangedAttack(state)};
};