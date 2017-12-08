const uuidv1 = require('uuid/v1');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default function generateMoneyTrace() {
    var uuid = uuidv1();
    var parent = getRandomInt(-2147483647, 2147483647);
    var span = parent;

    return 'trace-id=' + uuid + ';parent-id=' + parent + ';span-id=' + span;
}
