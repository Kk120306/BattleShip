class Ship {
    constructor(length, name) {
        this._length = length;
        this.name = name;
        this.hits = 0;
        this.sunken = false;
    }

    hit() {
        this.hits += 1;
        console.log(`Ship ${this.name} Takes Damage!`);

        if (this.hits === this._length) {
            this.sunken = true;
            console.log(`Ship ${this.name} Has Sunk!`);
        }
    }

    isSunk() {
        return this.hits >= this._length;
    }
}

module.exports = Ship;
