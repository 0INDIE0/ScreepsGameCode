module.exports = { run: Main };

/** @param {Creep} creep **/
function Main(creep) {
    // Если крип не собирает энергию и у него нет энергии
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.harvesting = true; // Переключаемся в режим сбора энергии
        creep.say('🔄 Сбор');
    }

    // Если крип собирает энергию и его хранилище заполнено
    if (creep.memory.harvesting && creep.store.getFreeCapacity() === 0) {
        creep.memory.harvesting = false; // Переключаемся в режим переноса энергии
        creep.say('🚚 Перенос');
    }

    // Если крип в режиме сбора энергии
    if (creep.memory.harvesting) {
        // Ищем ближайший источник энергии
        const source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (source) {
            // Пытаемся собирать энергию
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                // Если источник далеко, идем к нему
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
    // Если крип в режиме переноса энергии
    else {
        // Ищем ближайшее хранилище (спаун, расширение или контейнер)
        const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_CONTAINER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        if (target) {
            // Пытаемся передать энергию
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                // Если хранилище далеко, идем к нему
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
}