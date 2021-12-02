export const UpgraderRole: BaseRoleConstant = "ROLE_UPGRADER"

export function UpgradeController(creep: Creep) {
    if (Memory.creeps[creep.name].working && creep.room.controller) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
        if (creep.store.energy == 0) {
            Memory.creeps[creep.name].working = false
        }
        return
    }



    let closeStoreContainer: AnyStructure | null = creep.pos.findClosestByPath(
        creep.room.find(FIND_STRUCTURES).filter(function (structure) {
            return structure.structureType == STRUCTURE_CONTAINER && structure.store.energy > 0
        })
    )

    if (closeStoreContainer != null) {
        creep.pickup(closeStoreContainer.)
        creep.moveTo(closeStoreContainer)
    }
}

export function buildUpgraderBodys(): BodyPartConstant[] {
    return [WORK, CARRY, MOVE]
}