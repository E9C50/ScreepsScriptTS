function randomName(namePrefix: string): string {
    let minNum: number = 100000;
    let maxNum: number = 999999;
    return namePrefix + '_' + parseInt((Math.random() * (maxNum - minNum + 1) + minNum).toString(), 10).toString();
}

export { randomName }