class post {
    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    toString() {
        return `Name: ${this.name}, Body: ${this.body}`;
    }
}

module.exports = post;
