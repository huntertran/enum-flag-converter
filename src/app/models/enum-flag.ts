export class EnumFlag {
    constructor(bit: number, name: string) {
        this.bit = bit;
        this.name = name;
        this.isChecked = false;
    }
    public bit: number;
    public name: string;

    /**
     * Used for displaying check boxes for Enum to Number convert
     */
    public isChecked: boolean;
}