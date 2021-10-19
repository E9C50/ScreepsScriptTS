/************************************************** 系统Memory扩展 **************************************************/
//系统Memory
interface Memory {
    creeps: { [id: string]: CreepMemory };
    sources: { [id: string]: SourceMemory };
    dropedResource: { [id: string]: RoomPosition };
    minerals: { [id: string]: MineralMemory };
}

// CreepMemory扩展
interface CreepMemory {
    name: string;
    working: boolean;
    role: CreepRoleConstant;
    work(): void
}

interface FlagMemory { }
interface RoomMemory { }
interface SpawnMemory { }
interface PowerCreepMemory { }

/************************************************** 挖矿相关 **************************************************/
// 挖矿工位
interface WorkStations {
    position: RoomPosition;
    hasCreep: Boolean;
    hasContainer: Boolean;
}

// 能源信息
interface SourceMemory {
    sourceid: string;
    isActive: Boolean;
    position: RoomPosition;
    stations: { [name: string]: WorkStations };
}

//矿场信息
interface MineralMemory {
    sourceid: string;
    isActive: Boolean;
    position: RoomPosition;
    sourceType: MineralConstant;
    stations: { [name: string]: WorkStations };
}

/************************************************** 枚举值 **************************************************/
// 所有的 creep 角色
type CreepRoleConstant = BaseRoleConstant;

// 房间基础运营角色
type BaseRoleConstant = "ROLE_HARVESTER" | "ROLE_UPGRADER" | "ROLE_BUILDER" | "ROLE_FILLER" | "ROLE_SUPPORTER";
