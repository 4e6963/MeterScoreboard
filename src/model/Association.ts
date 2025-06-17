export class Association {

    constructor(name?: string) {
        this.name = name ?? "";
    }

    name: string;
    score: number = 0;
}