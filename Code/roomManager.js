module.exports = { run: Main };

function Main() {

    const myRooms = getMyRooms()

    for (const roomName in myRooms) {

        const room = Game.rooms[roomName];
        setRoomCreepsMaxCount(room);
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

    if (CREEPS_MAX_COUNT in room.memory) {
        return;
    }

    room.memory[CREEPS_MAX_COUNT] = {
        [ROLE_HARVESTER]: 4,
        [ROLE_BUILDER]: 2,
        [ROLE_UPGRADER]: 2,
    };

}