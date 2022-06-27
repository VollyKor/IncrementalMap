
// Task
// const map = new IncrementalMap();

// map.snapshot(0);

// map.set('key', 10);
// // map.get('key') === 10

// map.snapshot(1);

// map.set('key', 20);
// // map.get('key') === 20

// map.snapshot(0);
// // map.get('key') === 10

class IncrementalMap {
    constructor(){
        this.prevSnapshotPoint = 0;
        this.snapshotPoint = 0
        this.#data = {}
    }
    snapshotPoint;
    prevSnapshotPoint;
    #data;

    snapshot(value){
        if(!this.#data.hasOwnProperty(value)) {
            this.#data[value] = {...this.#data[this.prevSnapshotPoint]}
            this.prevSnapshotPoint = value
        };

        this.snapshotPoint = value
    }
    
    set(key, value){
        if (!this.#data.hasOwnProperty(this.snapshotPoint)) {
            this.#data[this.snapshotPoint] = {}
        }

        this.#data[this.snapshotPoint][key] = value
    }

    get(key){
        if (!(this.#data.hasOwnProperty(this.snapshotPoint) && this.#data[this.snapshotPoint][key])
        ) return undefined
        return this.#data[this.snapshotPoint][key]
    }

}

const linkedObj1 = {value: 10}
const linkedObj2 = {value: 20}
const linkedObj3 = {value: 30}

const map = new IncrementalMap()

console.log(`================================================================`);
console.log(`========================= STARTS ===============================`);
console.log(`================================================================`);

map.snapshot(0);
console.log("🚀 ~ file: IncrementalMap.js ~ line 58 ~ map.snapshot(0);")
console.log("Set Keys");

map.set('key1', linkedObj1);
map.set('key2', linkedObj2);
map.set('key3', linkedObj3);

map.get('key1')
console.log("🚀 ~ file: IncrementalMap.js ~ line 64 ~ map.get('key1')", map.get('key1'))
map.get('key2')
console.log("🚀 ~ file: IncrementalMap.js ~ line 64 ~ map.get('key2')", map.get('key2'))
map.get('key3')
console.log("🚀 ~ file: IncrementalMap.js ~ line 64 ~ map.get('key3')", map.get('key3'))

console.log(`================================================================`);

console.log("Change layer");
map.snapshot(1)
console.log("🚀 ~ file: IncrementalMap.js ~ line 72 ~ map.snapshot(1)")

console.log("Update key2");
map.set('key2', {value: 20000000});

console.log("Update linked Obj1 with value ");
linkedObj1.value = 11 

console.log(`================================================================`);

map.snapshot(3)

const obj_1_layer_3 = map.get('key1')
console.log("🚀 ~ file: IncrementalMap.js ~ line 64 ~ map.get('key1')", map.get('key1'))
const obj_2_layer_3 =  map.get('key2')
console.log("🚀 ~ file: IncrementalMap.js ~ line 64 ~ map.get('key2')", map.get('key2'))
const obj_3_layer_3 =  map.get('key3')
console.log("🚀 ~ file: IncrementalMap.js ~ line 64 ~ map.get('key3')", map.get('key3'))

console.log(`================================================================`);

console.log("Back to base layer");
map.snapshot(0);
console.log("🚀 ~ file: IncrementalMap.js ~ line 89 ~ map.snapshot(0)")

const obj_1_layer_0 = map.get('key1')
console.log("🚀 ~ file: IncrementalMap.js ~ line 64 ~ map.get('key1')", map.get('key1'))
const obj_2_layer_0 =  map.get('key2')
console.log("🚀 ~ file: IncrementalMap.js ~ line 64 ~ map.get('key2')", map.get('key2'))
const obj_3_layer_0 =  map.get('key3')
console.log("🚀 ~ file: IncrementalMap.js ~ line 64 ~ map.get('key3')", map.get('key3'))

console.log(`================================================================`);
console.log("Check if links still same between layers");

console.log(`Is Same link Obj 1: ${obj_1_layer_0 === obj_1_layer_3} // Should be "true" because we use outer link to this value`);
console.log(`Is Same link Obj 2: ${obj_2_layer_0 === obj_2_layer_3} // Should be "false" because we update this value at snapshotPoint 2`);
console.log(`Is Same link Obj 3: ${obj_3_layer_0 === obj_3_layer_3} // Should be "true" because we don't use this value from start point`);

console.log(`================================================================`);
console.log("Check if snapshot was linked from 3rd");
map.snapshot(4)

const obj_1_layer_4 = map.get('key1')
console.log("🚀 ~ file: IncrementalMap.js ~ line 64 ~ map.get('key1')", map.get('key1'))
const obj_2_layer_4 =  map.get('key2')
console.log("🚀 ~ file: IncrementalMap.js ~ line 64 ~ map.get('key2')", map.get('key2'))
const obj_3_layer_4 =  map.get('key3')
console.log("🚀 ~ file: IncrementalMap.js ~ line 64 ~ map.get('key3')", map.get('key3'))

console.log(`Is Same link Obj 1: ${obj_1_layer_4 === obj_1_layer_3} // Should be "true" because linked from 3rd`);
console.log(`Is Same link Obj 2: ${obj_2_layer_4 === obj_2_layer_3} // Should be "true" because linked from 3rd`);
console.log(`Is Same link Obj 3: ${obj_3_layer_4 === obj_3_layer_3} // Should be "true" because linked from 3rd`);
