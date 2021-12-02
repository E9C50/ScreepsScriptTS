import { ErrorMapper } from "utils/ErrorMapper";
import { autoCreepsManagerRun } from "manager/AutoCreepsManager";
import { autoSourcesManagerRun } from "manager/AutoSourceManager";
import { autoComputeCreepMaxCount } from "ConfigConstant";

export const loop = ErrorMapper.wrapLoop(() => {
    console.log(`--------------- tick_${Game.time} ---------------`);

    autoComputeCreepMaxCount();
    autoSourcesManagerRun();
    autoCreepsManagerRun();
});
