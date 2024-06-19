function HashMap() {
    const START_SIZE = 16;
    const LOAD_FACTOR = 0.75;
    let array = new Array(START_SIZE);
    let capacity = 0;

    function hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode %= array.length;
        }

        return hashCode;
    }

    function set(key, value) {
        const node = Node(key, value);

        // get hash code
        const hashCode = hash(key);
        // check array for existing values
        //      if undefined
        //          insert a new node
        //          store key
        //          store value
        //          store next node is null
        //      else
        //          insert new node at the end of linked list
        //
    }

    function get(key) {}

    function has(key) {
        const hashCode = hash(key);
        const linkedList = array[hashCode];
        let ptr = linkedList;

        while (ptr) {
            if (ptr.key === key) {
                return true;
            }
        }

        return false;
    }

    function remove(key) {}

    function length() {
        return capacity;
    }

    function clear() {
        array = new Array(START_SIZE);
        capacity = 0;
    }

    function keys() {}

    function values() {}

    function entries() {}

    function exceedsLoadFactor() {
        const currentLoad = capacity / array.length;
        return currentLoad >= LOAD_FACTOR;
    }

    function resizeMap() {}

    return {
        has,
        hash,
        set,
    };
}

function Node(key, value, next = null) {
    return {
        key,
        value,
        next,
    };
}

let map = HashMap();

console.log(map.hash('beyzu'));
console.log(map.hash('apple'));
console.log(map.hash('orange'));
console.log(map.hash('daniel'));
