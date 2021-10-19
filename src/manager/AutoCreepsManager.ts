import { BUILDER_MAX_COUNT, HARVESTER_MAX_COUNT, SUPPORTER_MAX_COUNT, UPGRADER_MAX_COUNT } from "ConfigConstant";


function randomName(namePrefix: string): string {
    let minNum: number = 100000;
    let maxNum: number = 999999;
    return namePrefix + '_' + (Math.random() * (maxNum - minNum + 1) + minNum, 10).toString();
}

function createCreep(role: BaseRoleConstant): number {
    let creepName = randomName(role)
    let spawnResult = Game.spawns.Spawn.spawnCreep(roles, creepName)
    console.log('create creep: ' + creepName);
    return spawnResult
}

function autoSpawnCreeps(): void {
    var myCreeps = []
    for (var name in Memory.creeps) {
        myCreeps.push(Memory.creeps[name]);
    }

    if (myCreeps.filter(function (x) { return x.role == "ROLE_HARVESTER"; }).length < HARVESTER_MAX_COUNT) {
        createCreep("ROLE_HARVESTER")
    } else if (myCreeps.filter(function (x) { return x.role == "ROLE_BUILDER"; }).length < BUILDER_MAX_COUNT) {
        createCreep("ROLE_BUILDER")
    } else if (myCreeps.filter(function (x) { return x.role == "ROLE_UPGRADER"; }).length < UPGRADER_MAX_COUNT) {
        createCreep("ROLE_HARVESTER")
    } else if (myCreeps.filter(function (x) { return x.role == "ROLE_SUPPORTER"; }).length < SUPPORTER_MAX_COUNT) {
        createCreep("ROLE_HARVESTER")
    }
}

function autoDeleteMissingCreeps(): void {
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    }
}

function autoCreepsWork(): void {
    for (const name in Memory.creeps) {
        Memory.creeps[name].work()
    }
}

function autoCreepsManagerRun(): void {
    autoDeleteMissingCreeps();
    autoSpawnCreeps();
    autoCreepsWork();
}

export { autoCreepsManagerRun };