import { ErrorMapper } from "utils/ErrorMapper";
import { autoCreepsManagerRun } from "manager/AutoCreepsManager";
import { autoSourcesManagerRun } from "manager/AutoSourceManager";

export const loop = ErrorMapper.wrapLoop(() => {
    console.log(`--------------- tick_${Game.time} ---------------`);

    autoCreepsManagerRun();
    autoSourcesManagerRun();
});
