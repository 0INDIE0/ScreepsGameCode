module.exports = { run: Main };

function Main() {

    const myRooms = getMyRooms();
    console.log(myRooms.size);
    for (const roomName in myRooms) {
        console.log(roomName);

        const room = Game.rooms[roomName];
        setRoomCreepsMaxCount(room);
        setCreepsCount(room);
    }
}

/** @return {Set<Room>}  */
function getMyRooms() {

    const myRooms = new Set();

    for (let spawnName in Game.spawns) {
        
        myRooms.add(Game.spawns[spawnName].room.name);
    }
    return myRooms
}

/** @param {Room} room */
function setRoomCreepsMaxCount(room) {

    console.log(room.name);

    if (mainModule.CREEPS_MAX_COUNT in room.memory) {
        return;
    }

    room.memory[mainModule.CREEPS_MAX_COUNT] = {
        [mainModule.ROLE_HARVESTER]: 4,
        [mainModule.ROLE_BUILDER]: 2,
        [mainModule.ROLE_UPGRADER]: 2,
    };

    console.log(room.memory[mainModule.CREEPS_MAX_COUNT]);
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