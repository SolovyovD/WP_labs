function start() {
    console.log("Request handler 'start' was called.");
}

function upload() {
    console.log("Request handler 'upload' was called.");
}

function first() {
    console.log("Request handler 'first' was called.");
}

function second() {
    console.log("Request handler 'second' was called.");
}

function third() {
    console.log("Request handler 'third' was called.");
}

exports.start = start;
exports.upload = upload;
exports.first = first;
exports.second = second;
exports.third = third;