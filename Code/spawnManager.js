const { ROLE_HARVESTER, ROLE_BUILDER, ROLE_UPGRADER, CREEPS_MAX_COUNT, CREEPS_COUNT} = require('constants');

module.exports = { run: spawnManager};

/** Основной метод модуля. Контролирует спавн крипов
*/
function spawnManager() {
    
    if (Game.time % 25) {
        createCreeps();
    }
}

/** Возвращает тело для роли
* @param {string} role Роль
* @returns {string[]} Тело крипа
*/
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

/** Глобальное событие создания крипов
*/
function createCreeps() {

    for (const spawnName in Game.spawns) {

        const spawn = Game.spawns[spawnName];
        
        if (!canSpawn(spawn)) {
            continue;
        }

        const maxCount = spawn.room.memory[CREEPS_MAX_COUNT];
        const Count = spawn.room.memory[CREEPS_COUNT];

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

        const creepName = getCreepName(spawn.room, roleName, maxCount);
        const body = getBodyForRole(needCreate);
        const memory = { role: needCreate, owner: spawn.room };

        const result = spawn.spawnCreep(body, creepName, { memory: memory });

        if (result === 0 || result === -6) {
            return;
        }

        console.log(`При создании крипа ${creepName} с телом ${body} в комнате ${spawn.room.name} спавн ${spawn.name} выдал ошибку ${result}`);
    }
}

/** Генерирует имя для крипа
* @param {Room} room Комната 
* @param {string} roleName Имя роли крипа
* @param {int} maxCount Количество крипов данной роли
* @returns {string} Имя крипа
*/
function getCreepName(room, roleName, maxCount) {

    let creepName = room + roleName;

    for (i = 0; i < maxCount[roleName] - 1; i++) {

        creepName = room + roleName + i;
        creep = Game.creeps[creepName];

        if (!creep) {
            return creepName;
        }
    }
}

/** Проверяет возможность спавна
* @param {StructureSpawn} spawn Спавн
* @returns {boolean} Можно спавнить
*/
function canSpawn(spawn) {

    if (spawn.spawning || !spawn.isActive()) {
        return false;
    }

    return true;
}