function HashMap() {
    /* const START_SIZE = 10; */
    const START_SIZE = 2;
    const LOAD_FACTOR = 0.75;
    let bucket = new Array(START_SIZE);
    let capacity = 0;

    function hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode %= bucket.length;
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
            growBucket();
        }

        const node = createNode(key, value);
        const hashCode = hash(key);

        if (!bucket[hashCode]) {
            bucket[hashCode] = node;
        } else {
            let ptr = bucket[hashCode];

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

    function get(key) {
        const hashCode = hash(key);
        const contents = bucket[hashCode];
        let ptr = contents;

        while (ptr) {
            if (ptr.key === key) {
                return ptr.value;
            }

            ptr = ptr.next;
        }

        return null;
    }

    function has(key) {
        const hashCode = hash(key);
        const linkedList = bucket[hashCode];
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
        bucket = new Array(START_SIZE);
        capacity = 0;
    }

    function keys() {
        const keys = new Array();

        bucket.forEach((content) => {
            let ptr = content;

            while (ptr) {
                keys.push(ptr.key);
                ptr = ptr.next;
            }
        });

        return keys;
    }

    function values() {}

    function entries() {}

    function exceedsLoadFactor() {
        const currentLoad = capacity / bucket.length;
        return currentLoad >= LOAD_FACTOR;
    }

    /**
     * Grow bucket and rehash data
     */
    function growBucket() {
        console.log(`Map Grows`);
        const oldBucket = bucket;
        capacity = 0;
        bucket = new Array(bucket.length * 2);

        let ptr;

        oldBucket.forEach((node) => {
            ptr = node;

            while (ptr) {
                set(ptr.key, ptr.value);
                ptr = ptr.next;
            }
        });
    }

    function display() {
        let str, ptr;

        for (let i = 0; i < bucket.length; i++) {
            str = `(${i}): `;

            ptr = bucket[i];

            while (ptr) {
                str += `[${ptr.key}:${ptr.value}] -> `;
                ptr = ptr.next;
            }

            str += `null`;
            console.log(str);
            str = '';
        }

        console.log(`-------------------------------------------------------`);
    }

    return {
        clear,
        display,
        get,
        growBucket,
        has,
        hash,
        keys,
        length,
        set,
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
map.set('d', 4);
map.set('fl', 4);
map.set('sdfds', 4);
map.set('lolita', '6');
map.display();
console.log(map.keys());
