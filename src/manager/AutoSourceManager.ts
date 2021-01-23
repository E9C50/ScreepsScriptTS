import { ROOM_MAIN_ID } from "Constant";

function getAllStations(source: Source | Mineral): { [name: string]: WorkStations } {
    return {
        "": {
            position: source.pos,
            hasCreep: true,
            hasContainer: true,
        },
    };
}

function autoSourcesManagerRun(): void {
    let allSource: Source[] = Game.rooms[ROOM_MAIN_ID].find(FIND_SOURCES);
    let allMinerals: Mineral[] = Game.rooms[ROOM_MAIN_ID].find(FIND_MINERALS);
    let allDropedResource: Resource[] = Game.rooms[ROOM_MAIN_ID].find(FIND_DROPPED_RESOURCES);

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
        console.log("resource_" + resource.id);
    }
    for (const index in allMinerals) {
        let mineral = allMinerals[index];
        console.log("mineral_" + mineral.id);
    }
}

export { autoSourcesManagerRun };
