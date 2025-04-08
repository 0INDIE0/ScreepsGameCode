"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loop = loop;
function loop() {
    console.log(`Current tick: ${Game.time}`);
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
    }
}
function harvestEnergy(creep) {
    // Логика добычи энергии
}
//# sourceMappingURL=main.js.map