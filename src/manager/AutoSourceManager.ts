import { ROOM_MAIN_ID } from "ConfigConstant";

function getAllStations(source: Source | Mineral): { [name: string]: WorkStations } {
    let allStations: { [name: string]: WorkStations } = {}

    let centerPos = source.pos;
    let roundPosition: Map<string, RoomPosition> = new Map<string, RoomPosition>([
        ['leftDownPos', new RoomPosition(centerPos.x - 1, centerPos.y + 1, ROOM_MAIN_ID)],
        ['downPos', new RoomPosition(centerPos.x, centerPos.y + 1, ROOM_MAIN_ID)],
        ['rightDownPos', new RoomPosition(centerPos.x + 1, centerPos.y + 1, ROOM_MAIN_ID)],
        ['leftPos', new RoomPosition(centerPos.x - 1, centerPos.y, ROOM_MAIN_ID)],
        ['rightPos', new RoomPosition(centerPos.x + 1, centerPos.y, ROOM_MAIN_ID)],
        ['leftUpPos', new RoomPosition(centerPos.x - 1, centerPos.y - 1, ROOM_MAIN_ID)],
        ['upPos', new RoomPosition(centerPos.x, centerPos.y - 1, ROOM_MAIN_ID)],
        ['rightUpPos', new RoomPosition(centerPos.x + 1, centerPos.y - 1, ROOM_MAIN_ID)]
    ]);

    roundPosition.forEach((position, key) => {
        let terrain: Terrain = position.lookFor(LOOK_TERRAIN)[0];
        let haveCreep: boolean = position.lookFor(LOOK_CREEPS).length > 0;
        let hasContainer: boolean = position.lookFor(LOOK_CONSTRUCTION_SITES).length > 0;
        if (terrain != 'wall') {
            allStations[key] = {
                position: source.pos,
                hasCreep: haveCreep,
                hasContainer: hasContainer
            }
        }
    })

    return allStations;
}

function autoSourcesManagerRun(): void {
    let allSource: Source[] = Game.rooms[ROOM_MAIN_ID].find(FIND_SOURCES);
    let allMinerals: Mineral[] = Game.rooms[ROOM_MAIN_ID].find(FIND_MINERALS);
    let allDropedResource: Resource[] = Game.rooms[ROOM_MAIN_ID].find(FIND_DROPPED_RESOURCES);

    Memory.sources = {}
    for (const index in allSource) {
        let source = allSource[index];
        Memory.sources[source.id] = {
            sourceid: source.id,
            isActive: source.energy > 0,
            position: source.pos,
            stations: getAllStations(source),
        };
    }

    for (const index in allDropedResource) {
        let resource = allDropedResource[index];
        // console.log("resource_" + resource.id);
    }
    for (const index in allMinerals) {
        let mineral = allMinerals[index];
        // console.log("mineral_" + mineral.id);
    }
}

export { autoSourcesManagerRun };
