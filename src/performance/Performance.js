class Performance {
    constructor() {
        this.marks = new Map();
    }

    mark(name) {
        var timestamp = window.performance.now();
        console.log('!!! @_@ Adding timestamp ' + timestamp + ' for mark named ' + name);
        this.marks.set(name, timestamp);
    }

    measure(start, end) {
        return this.marks.get(end) - this.marks.get(start);
    }

    clear() {
        this.marks.clear();
    }

    hasMark(name) {
        return this.marks.has(name);
    }
}

export default Performance;