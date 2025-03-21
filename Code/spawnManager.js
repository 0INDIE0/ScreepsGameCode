let constants = require("constants");

module.exports = { run: main };

function main() {
    
    if (Game.time % 15) {
        createCreeps();
    }
}

function getBodyForRole(role) {
    // Возвращаем части тела в зависимости от роли
    switch (role) {
        case ROLE_HARVESTER:
            return [WORK, CARRY, MOVE];
        case ROLE_BUILDER:
            return [WORK, CARRY, MOVE, MOVE];
        case ROLE_UPGRADER:
            return [WORK, CARRY, MOVE, MOVE];
        default:
            return [WORK, CARRY, MOVE]; // По умолчанию
    }
}

function createCreeps() {

    for (const spawnName in Game.spawns) {

        const spawn = Game.spawns[spawnName];
        
        if (!canSpawn(spawn)) {
            continue;
        }

        const maxCount = spawn.room.memory[constants.CREEPS_MAX_COUNT];
        const Count = spawn.room.memory[constants.CREEPS_COUNT];

        let needCreate;

        for (roleName in maxCount) {
            if (Count[roleName] < maxCount[roleName]) {
                needCreate = roleName;
                break;
            }
        }

        if (!needCreate) {
            return;
        }

        const creepName = getCreepName(spawn.room, roleName);
        const body = getBodyForRole(needCreate);
        const memory = { role: needCreate, owner: spawn.room };

        const result = spawn.spawnCreep(body, creepName, { memory: memory });

        if (result === 0 || result === -6) {
            return;
        }

        console.log(`При создании крипа в комнате ${spawn.room.name} спавн ${spawn.name} при создании крипа ${creepName}`);
    }
}

/** @param {Room} room - Комната */
function getCreepName(room, roleName) {

    let creepName = room + roleName;

    for (i = 0; i < maxCount[roleName] - 1; i++) {

        creepName = room + roleName + i;
        creep = Game.creeps[creepName];

        if (!creep) {
            return creepName;
        }
    }
}

function canSpawn(spawn) {

    if (spawn.spawning || !spawn.isActive()) {
        return false;
    }

    return true;
}