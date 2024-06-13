function HashMap() {
    let array = [, , ,];

    function hash(key) {
        const len = length();
        return key && len ? key % len : null;
    }

    return {
        hash,
    };

    function length() {
        return array.length;
    }
}

let map = HashMap();

console.log(map.hash('beyzu'));
