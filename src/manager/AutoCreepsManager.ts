import { BUILDER_MAX_COUNT, HARVESTER_MAX_COUNT, SUPPORTER_MAX_COUNT, UPGRADER_MAX_COUNT } from "ConfigConstant";
import { HavisterOrBuild, HarvesterRole, buildHarvesterBodys } from "roles/Harvester"
import { UpgradeController, UpgraderRole, buildUpgraderBodys } from "roles/Upgrader"
import { randomName } from "utils/StringUtils"

function createCreep(creepRole: BaseRoleConstant, creepRoles: BodyPartConstant[]): void {
    let creepName = randomName(creepRole)
    let spawnResult = Game.spawns.Spawn.spawnCreep(creepRoles, creepName)
    if (spawnResult == OK) {
        Memory.creeps[creepName] = {
            'name': creepName,
            'working': false,
            'role': creepRole
        }
        console.log('build creep: ' + creepName + ' - ' + spawnResult);
    }
}

function autoCreepsSpawn(): void {
    var myCreeps = []
    for (var name in Memory.creeps) {
        myCreeps.push(Memory.creeps[name]);
    }

    if (myCreeps.filter(function (creep) { return creep.role == HarvesterRole; }).length < HARVESTER_MAX_COUNT) {
        createCreep(HarvesterRole, buildHarvesterBodys());
    } else if (myCreeps.filter(function (creep) { return creep.role == UpgraderRole; }).length < UPGRADER_MAX_COUNT) {
        createCreep(UpgraderRole, buildUpgraderBodys());
    } else if (myCreeps.filter(function (creep) { return creep.role == "ROLE_BUILDER"; }).length < BUILDER_MAX_COUNT) {

    } else if (myCreeps.filter(function (creep) { return creep.role == "ROLE_SUPPORTER"; }).length < SUPPORTER_MAX_COUNT) {

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
        let creep: Creep = Game.creeps[name]
        let creepMemory: CreepMemory = Memory.creeps[name]
        if (creepMemory.role == HarvesterRole) {
            HavisterOrBuild(creep)
        } else if (creepMemory.role == UpgraderRole) {
            UpgradeController(creep)
        }
    }
}

function autoCreepsManagerRun(): void {
    autoDeleteMissingCreeps();
    autoCreepsSpawn();
    autoCreepsWork();
}

export { autoCreepsManagerRun };