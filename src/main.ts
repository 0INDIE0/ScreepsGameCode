export function loop() {
    console.log(`Current tick: ${Game.time}`);

    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
    }
}

function harvestEnergy(creep: Creep) {
    // Логика добычи энергии
}