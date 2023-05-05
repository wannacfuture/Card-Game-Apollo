export class DataSource {
    constructor() {
        this.totalArray = [
            {
                type: 1,
                value: 4,
            },
            {
                type: 3,
                value: 4,
            },
        ];
    }
    deal() {
        if (this.totalArray.length > 5)
            return this.totalArray.splice(0, 5);
        else
            return this.totalArray.splice(0, 2);
    }
    async reset() {
        let tempArray = [];
        for (let i = 0; i < 52; i++)
            tempArray.push({ type: Math.floor(i / 13), value: (i % 13) + 1 });
        for (let i = 0; i < 52; i++) {
            let tempV = tempArray[i];
            let randomNum = Math.floor(Math.random() * 52);
            tempArray[i] = tempArray[randomNum];
            tempArray[randomNum] = tempV;
        }
        this.totalArray = tempArray;
        let canSuccess = (tempArray[51].value == 1 ? 1 : 0) + (tempArray[50].value == 1 ? 1 : 0);
        return {
            code: "200",
            success: true,
            message: "Reseted!",
            totalArray: this.totalArray,
            cansuccess: canSuccess,
        };
    }
}
