"use strict";

let roleHarvester = require('roleHarvester');
let roleUpgrader = require('roleUpgrader');
let spawnManager = require('spawnManager');
let creepManager = require("creepManager");
let roomManager = require("roomManager");

module.exports.loop = function () {
    
    roomManager.run();
    spawnManager.run();
    
}








    // for(let name in Memory.creeps) {
    //     if(!Game.creeps[name]) {
    //         delete Memory.creeps[name];
    //         console.log('Clearing non-existing creep memory:', name);
    //     }
    // }

    // let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    // console.log('Harvesters: ' + harvesters.length);

    // if(harvesters.length < 2) {
    //     let newName = 'Harvester' + Game.time;
    //     console.log('Spawning new harvester: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
    //         {memory: {role: 'harvester'}});
    // }
    
    // if(Game.spawns['Spawn1'].spawning) { 
    //     let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    //     Game.spawns['Spawn1'].room.visual.text(
    //         '🛠️' + spawningCreep.memory.role,
    //         Game.spawns['Spawn1'].pos.x + 1, 
    //         Game.spawns['Spawn1'].pos.y, 
    //         {align: 'left', opacity: 0.8});
    // }

    // for(let name in Game.creeps) {
    //     let creep = Game.creeps[name];
    //     if(creep.memory.role == 'harvester') {
    //         roleHarvester.run(creep);
    //     }
    //     if(creep.memory.role == 'upgrader') {
    //         roleUpgrader.run(creep);
    //     }
    // }
