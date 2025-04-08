module.exports = { run: Main };

function Main() {

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
    
        if (myRooms.find(spawnName) == undefined) {
            myRooms.push(Game.spawns[spawnName].room);
        }
    }
    return myRooms
}

/** @param {Room} room */
function setRoomCreepsMaxCount(room) {

    if (mainModule.CREEPS_MAX_COUNT in room.memory) {
        return;
    }

    room.memory[mainModule.CREEPS_MAX_COUNT] = {
        [mainModule.ROLE_HARVESTER]: 4,
        [mainModule.ROLE_BUILDER]: 2,
        [mainModule.ROLE_UPGRADER]: 2,
    };
}

/** @param {Room} room - Комната */
function setCreepsCount(room) {

    roomCreeps = _.find(Game.creeps, (creep) => creep.memory.owner === room.name);

    room.memory[mainModule.CREEPS_COUNT] = {
        [mainModule.ROLE_HARVESTER]: _.sum(roomCreeps, (creep) => creep.memory.role === mainModule.ROLE_HARVESTER),
        [mainModule.ROLE_BUILDER]: _.sum(roomCreeps, (creep) => creep.memory.role === mainModule.ROLE_BUILDER),
        [mainModule.ROLE_UPGRADER]: _.sum(roomCreeps, (creep) => creep.memory.role === mainModule.ROLE_UPGRADER),
    }
}