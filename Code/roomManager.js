module.exports = { run: Main };

function Main() {

    const myRooms = getMyRooms()

    for (const myRoom in myRooms) {

        setRoomCreepsMaxCount(myRoom)
    }

}

/** @return {Set<Room>}  */
function getMyRooms() {

    const myRooms = new Set();

    for (let spawnName in Game.spawns) {
        myRooms.add(Game.spawns[spawnName].room);
    }

    return myRooms
}

/** @param {Room} myRoom */
function setRoomCreepsMaxCount(myRoom) {

    if (CREEPS_MAX_COUNT in myRoom.memory) {
        return;
    }

    myRoom.memory[CREEPS_MAX_COUNT] = {
        [ROLE_HARVESTER]: 4,
        [ROLE_BUILDER]: 2,
        [ROLE_UPGRADER]: 2,
    };

}