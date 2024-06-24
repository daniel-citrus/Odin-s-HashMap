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

    /**
     * Inserts new node into hash map. If key was reused, then override previous value. If a different key reaches a populated hashkey, insert a new node at the end of the list.
     * @param {*} key
     * @param {*} value
     * @returns
     */
    function set(key, value) {
        if (exceedsLoadFactor()) {
        }

        const node = createNode(key, value);
        const hashCode = hash(key);

        if (!array[hashCode]) {
            array[hashCode] = node;
        } else {
            let ptr = array[hashCode];

            while (ptr) {
                if (ptr.key === key) {
                    ptr.value = value;
                    return;
                }

                if (!ptr.next) {
                    break;
                }

                ptr = ptr.next;
            }

            ptr.next = node;
        }

        capacity++;
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

    function display() {
        let str, ptr;

        for (let i = 0; i < array.length; i++) {
            str = `(${i}): `;

            ptr = array[i];

            while (ptr) {
                str += `[${ptr.key}:${ptr.value}] -> `;
                ptr = ptr.next;
            }

            str += `null`;
            console.log(str);
            str = '';
        }
    }

    return {
        has,
        hash,
        set,
        display,
    };
}

function createNode(key, value, next = null) {
    return {
        key,
        value,
        next,
    };
}

let map = HashMap();

map.set('daniel', 4);
map.set('lolita', '6');
map.display();
