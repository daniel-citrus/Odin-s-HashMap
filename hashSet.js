function HashSet() {
    const START_SIZE = 2;
    const LOAD_FACTOR = 0.75;
    let bucket = new Array(START_SIZE);
    let capacity = 0;

    function hash(value) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < value.length; i++) {
            hashCode = primeNumber * hashCode + value.charCodeAt(i);
            hashCode %= bucket.length;
        }

        return hashCode;
    }

    /**
     * Inserts new node into hash map. If key was reused, then override previous value. If a different key reaches a populated hashkey, insert a new node at the end of the list.
     * @param {*} value
     * @returns
     */
    function set(value) {
        const node = createNode(value);
        const hashCode = hash(value);

        if (!bucket[hashCode]) {
            bucket[hashCode] = node;
        } else {
            let ptr = bucket[hashCode];

            while (ptr) {
                if (ptr.value === value) {
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
        if (exceedsLoadFactor()) {
            growBucket();
        }
    }

    function has(value) {
        const hashCode = hash(value);
        const linkedList = bucket[hashCode];
        let ptr = linkedList;

        while (ptr) {
            if (ptr.value === value) {
                return true;
            }
        }

        return false;
    }

    function remove(value) {
        const hashCode = hash(value);
        let linkedList = bucket[hashCode];

        // Empty
        if (!linkedList) {
            return false;
        }

        let ptr = linkedList;

        // Key in the first node
        if (ptr.value === value) {
            linkedList = linkedList.next;
            bucket[hashCode] = linkedList;
            return true;
        }

        while (ptr.next) {
            if (ptr.next.value === value) {
                return true;
            }

            ptr = ptr.next;
        }

        return false;
    }

    function length() {
        return capacity;
    }

    function clear() {
        bucket = new Array(START_SIZE);
        capacity = 0;
    }

    function values() {
        const result = [];

        bucket.forEach((linkedList) => {
            let ptr = linkedList;

            while (ptr) {
                result.push(ptr.value);

                ptr = ptr.next;
            }
        });

        return result;
    }

    function entries() {
        const result = [];

        bucket.forEach((linkedList) => {
            if (!linkedList) return;

            let ptr = linkedList;

            while (ptr) {
                result.push(ptr.value);

                ptr = ptr.next;
            }
        });

        return result;
    }

    function exceedsLoadFactor() {
        const currentLoad = capacity / bucket.length;
        return currentLoad > LOAD_FACTOR;
    }

    /**
     * Grow bucket and rehash data
     */
    function growBucket() {
        const oldBucket = bucket;
        capacity = 0;
        bucket = new Array(bucket.length * 2);

        let ptr;

        oldBucket.forEach((node) => {
            ptr = node;

            while (ptr) {
                set(ptr.value);
                ptr = ptr.next;
            }
        });
    }

    function display() {
        console.log(`-------------------------------------------------------`);
        let str, ptr;

        for (let i = 0; i < bucket.length; i++) {
            str = `(${i}): `;

            ptr = bucket[i];

            while (ptr) {
                str += `[${ptr.value}] -> `;
                ptr = ptr.next;
            }

            str += `null`;
            console.log(str);
            str = '';
        }
    }

    return {
        clear,
        display,
        entries,
        growBucket,
        has,
        hash,
        length,
        remove,
        set,
        values,
    };
}

function createNode(value, next = null) {
    return {
        value,
        next,
    };
}

const test = HashSet();
test.set('apple');
test.set('banana');
test.set('carrot');
test.set('dog');
test.set('elephant');
test.set('frog');
test.set('grape');
test.set('hat');
test.set('ice cream');
test.set('jacket');
test.set('kite');
test.set('lion');

console.log(test.length());
test.display();
