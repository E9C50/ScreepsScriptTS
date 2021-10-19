/**
 * 寻找并移动到最近的有source的矿
 * @param creep 要移动的creep
 */
function havisteCloseActiveResource(creep: Creep): Source | null {
    let closeSource: Source | null = creep.pos.findClosestByRange(
        creep.room.find(FIND_SOURCES_ACTIVE)
    );
    if (closeSource == null) {
        console.log("Can not find any active source.");
        return null;
    }

    if (creep.pos.getRangeTo(closeSource.pos) > 0) {
        creep.moveTo(closeSource);
    }
    return closeSource;
}

class HavisterCreep implements CreepMemory {
    name: string;
    working: boolean;
    role: CreepRoleConstant;

    constructor(name: string) {
        this.name = name
        this.working = false
        this.role = "ROLE_HARVESTER"
    }

    work() {
        let creep: Creep = Game.creeps[this.name];

        // 如果
        if (creep.store.getFreeCapacity() > 0) {
            havisteCloseActiveResource(creep);
        }
    }
}