"use strict";

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var spawnsManager = require('spawnsManager');
var creepManager = require("creepManager");

module.exports.loop = function () {

 // Перебираем все комнаты, принадлежащие вам
    for (const roomName in Game.rooms) {
        
        const room = Game.rooms[roomName];

        // Проверяем, что комната принадлежит вам
        if (room.controller && room.controller.my) {
            // Целевые значения для каждой роли
            const targetCounts = {
                harvester: 4,
                builder: 2,
                upgrader: 2,
                defender: 1,
            };

            // Управляем крипами в текущей комнате
            spawnsManager.run(room, targetCounts);
        }
    }

    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
    }

}








    // for(var name in Memory.creeps) {
    //     if(!Game.creeps[name]) {
    //         delete Memory.creeps[name];
    //         console.log('Clearing non-existing creep memory:', name);
    //     }
    // }

    // var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    // console.log('Harvesters: ' + harvesters.length);

    // if(harvesters.length < 2) {
    //     var newName = 'Harvester' + Game.time;
    //     console.log('Spawning new harvester: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
    //         {memory: {role: 'harvester'}});
    // }
    
    // if(Game.spawns['Spawn1'].spawning) { 
    //     var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    //     Game.spawns['Spawn1'].room.visual.text(
    //         '🛠️' + spawningCreep.memory.role,
    //         Game.spawns['Spawn1'].pos.x + 1, 
    //         Game.spawns['Spawn1'].pos.y, 
    //         {align: 'left', opacity: 0.8});
    // }

    // for(var name in Game.creeps) {
    //     var creep = Game.creeps[name];
    //     if(creep.memory.role == 'harvester') {
    //         roleHarvester.run(creep);
    //     }
    //     if(creep.memory.role == 'upgrader') {
    //         roleUpgrader.run(creep);
    //     }
    // }
