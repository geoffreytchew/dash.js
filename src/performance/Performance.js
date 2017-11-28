class Performance {
    constructor() {
        this.marks = new Map();
    }

    mark(name) {
        var timestamp = window.performance.now();
        this.marks.set(name, timestamp);
        console.log('!!! @_@ Added timestamp ' + timestamp + ' for mark named ' + name);
    }

    markOnce(name) {
        if ( !this.marks.has(name) ) {
            this.mark(name);
        }
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