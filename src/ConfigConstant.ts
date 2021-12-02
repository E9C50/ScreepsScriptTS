export let HARVESTER_MAX_COUNT: Number = 4;
export let UPGRADER_MAX_COUNT: Number = 2;
export let BUILDER_MAX_COUNT: Number = 2;
export let FILLER_MAX_COUNT: Number = 2;
export let SUPPORTER_MAX_COUNT: Number = 1;

export const HARVESTER_NAME_PERFIX: string = "HARVESTER";
export const UPGRADER_NAME_PERFIX: string = "UPGRADER";
export const BUILDER_NAME_PERFIX: string = "BUILDER";
export const FILLER_NAME_PERFIX: string = "FILLER";
export const SUPPORTER_NAME_PERFIX: string = "SUPPORTER";

export const ROOM_MAIN_ID: string = "W2N2";


export function autoComputeCreepMaxCount() {
    let maxHarvesterMaxCount = 0
    for (let index in Memory.sources) {
        maxHarvesterMaxCount += Object.keys(Memory.sources[index].stations).length
    }
    HARVESTER_MAX_COUNT = maxHarvesterMaxCount
}