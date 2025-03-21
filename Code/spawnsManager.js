module.exports = { run: Main };
/**
 * Управляет созданием крипов в комнате на основе целевых значений.
 *
 * @param {Room} room - Комната, в которой нужно управлять крипами.
 * @param {Object.<string, number>} targetCounts - Объект, где ключи — роли крипов, а значения — количество крипов, которые нужно поддерживать.
 */

function Main(room, targetCounts) {

    // Получаем всех крипов в комнате
    const creeps = room.find(FIND_MY_CREEPS);

    // Считаем количество крипов по ролям
    const creepCounts = {
        harvester: _.sum(creeps, (creep) => creep.memory.role === 'harvester'),
        builder: _.sum(creeps, (creep) => creep.memory.role === 'builder'),
        upgrader: _.sum(creeps, (creep) => creep.memory.role === 'upgrader'),
        defender: _.sum(creeps, (creep) => creep.memory.role === 'defender'),
    };

    // Получаем все спаунеры в комнате
    const spawns = room.find(FIND_MY_SPAWNS);

    // Перебираем целевые значения и создаем крипов, если нужно
    for (const role in targetCounts) {
        if (creepCounts[role] < targetCounts[role]) {
            // Находим свободный спаунер
            const availableSpawn = spawns.find(spawn => !spawn.spawning);

            if (availableSpawn) {
                createCreep(availableSpawn, role, getBodyForRole(role));
                break; // Создаем только одного крипа за вызов
            }
        }
    }
}

function createCreep (spawn, role, body) {
    const creepName = role + Game.time;
    const memory = { role: role };

    const result = spawn.spawnCreep(body, creepName, { memory: memory });

    if (result === OK) {
        console.log('Крип успешно создан: ' + creepName);
    } else {
        console.log('Ошибка при создании крипа: ' + result);
    }
}

function getBodyForRole (role) {
    // Возвращаем части тела в зависимости от роли
    switch (role) {
        case 'harvester':
            return [WORK, CARRY, MOVE];
        case 'builder':
            return [WORK, CARRY, MOVE, MOVE];
        case 'upgrader':
            return [WORK, CARRY, MOVE, MOVE];
        case 'defender':
            return [TOUGH, ATTACK, MOVE, MOVE];
        default:
            return [WORK, CARRY, MOVE]; // По умолчанию
    }
}