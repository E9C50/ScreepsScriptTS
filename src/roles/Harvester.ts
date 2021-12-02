import { ROOM_MAIN_ID } from "ConfigConstant";

export const HarvesterRole: BaseRoleConstant = "ROLE_HARVESTER"

export function HavisterOrBuild(creep: Creep) {

    if (!Memory.creeps[creep.name].working) {
        havisteCloseActiveResource(creep);
        return;
    }

    let closeSource: Source | null = creep.pos.findClosestByRange(creep.room.find(FIND_SOURCES_ACTIVE))
    if (closeSource == null) {
        return;
    }

    creep.harvest(closeSource)
    if (creep.pos.lookFor(LOOK_STRUCTURES).length > 0) {
        // console.log(creep.pos + " havisting...")
        creep.drop(RESOURCE_ENERGY)
    } else if (creep.pos.lookFor(LOOK_CONSTRUCTION_SITES).length > 0) {
        // console.log(creep.pos + " building...")
        creep.build(creep.pos.lookFor(LOOK_CONSTRUCTION_SITES)[0])
    } else {
        // console.log(creep.pos + " created...")
        Game.rooms[ROOM_MAIN_ID].createConstructionSite(creep.pos, STRUCTURE_CONTAINER)
    }
}

function havisteCloseActiveResource(creep: Creep): void {
    console.log(creep.name + ' is moving to source...')

    let closeSource: Source | null = creep.pos.findClosestByRange(creep.room.find(FIND_SOURCES_ACTIVE))
    if (closeSource?.pos.isNearTo(creep)) {
        Memory.creeps[creep.name].working = true
        return;
    }

    let closeFreeSource: Source | null = creep.pos.findClosestByRange(
        creep.room.find(FIND_SOURCES_ACTIVE).filter(function (source) {
            let hasStations = false;
            let stations = Memory.sources[source.id].stations
            for (let index in stations) {
                if (!stations[index].hasCreep) {
                    hasStations = true
                }
            }
            return hasStations
        })
    );

    if (closeFreeSource == null) {
        console.log("Can not find any active source.");
        return;
    }

    if (creep.pos.getRangeTo(closeFreeSource.pos) > 0) {
        creep.moveTo(closeFreeSource);
    }
    return;
}

export function buildHarvesterBodys(): BodyPartConstant[] {
    return [WORK, CARRY, MOVE]
}