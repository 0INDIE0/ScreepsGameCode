const { ROLE_HARVESTER, ROLE_BUILDER, ROLE_UPGRADER, CREEPS_MAX_COUNT, CREEPS_COUNT} = require('constants');

module.exports = { run: roomManager};

function roomManager() {

    const myRooms = getMyRooms();
    for (const roomName in myRooms) {

        const room = myRooms[roomName];
        setRoomCreepsMaxCount(room);
        setCreepsCount(room);
    }
}

/** @return {Set<Room>}  */
function getMyRooms() {

    const myRooms = [];

    for (let spawnName in Game.spawns) {
        const room = Game.spawns[spawnName].room;
        
        // Проверяем, существует ли комната с таким именем в массиве
        if (!myRooms.some(r => r.name === room.name)) {
            myRooms.push(room);
        }
    }

    return myRooms
}

/** @param {Room} room */
function setRoomCreepsMaxCount(room) {

    if (CREEPS_MAX_COUNT in room.memory) {
        return;
    }

    room.memory[CREEPS_MAX_COUNT] = {
        [ROLE_HARVESTER]: 4,
        [ROLE_BUILDER]: 2,
        [ROLE_UPGRADER]: 2,
    };
}

/** @param {Room} room - Комната */
function setCreepsCount(room) {

    roomCreeps = _.find(Game.creeps, (creep) => creep.memory.owner === room.name);

    room.memory[CREEPS_COUNT] = {
        [ROLE_HARVESTER]: _.sum(roomCreeps, (creep) => creep.memory.role === ROLE_HARVESTER),
        [ROLE_BUILDER]: _.sum(roomCreeps, (creep) => creep.memory.role === ROLE_BUILDER),
        [ROLE_UPGRADER]: _.sum(roomCreeps, (creep) => creep.memory.role === ROLE_UPGRADER),
    }
}