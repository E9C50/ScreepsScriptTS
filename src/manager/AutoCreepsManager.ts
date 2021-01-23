function autoDeleteMissingCreeps(): void {
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    }
}

function autoCreepsManagerRun(): void {
    autoDeleteMissingCreeps();
}

export { autoCreepsManagerRun };
