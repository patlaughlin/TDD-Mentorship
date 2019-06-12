function Promise() {
    this._thens = [];
}

Promise.prototype = {
    then: function (resolve, reject) {
        this._thens.push({resolve, reject});
        return this;
    },
    resolve: function (val) {
        this._complete('resolve', val);
        return this;
    },
    reject: function (val) {
        this._complete('reject', val);
        return this;
    },
    _complete: function (which, arg) {
        this.then = which === 'resolve' ?
            function (resolve) {
                return resolve && resolve(arg);
            } : function (resolve, reject) {
                return reject && reject(arg);
            }

        this._thens.forEach((aThen) => {
            return aThen[which](arg);
        })
    }
};


export const removeDupes = arr => {
    const promise1 = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, 300);
    });

    promise1.then(function (value) {
        console.log('foo');
    }).then(function (value) {
        console.log('bar');
    }).resolve();

    return arr.filter((el, pos, arr) => {
        return arr.indexOf(el) === pos;
    });
};


/**
 * subscriptions data format:
 * { eventType: { id: callback } }
 */
const subscriptions = {}
const getNextUniqueId = getIdGenerator()

function subscribe(eventType, callback) {
    const id = getNextUniqueId()

    if (!subscriptions[eventType])
        subscriptions[eventType] = {}

    subscriptions[eventType][id] = callback

    return {
        unsubscribe: () => {
            delete subscriptions[eventType][id]
            if (Object.keys(subscriptions[eventType]).length === 0) delete subscriptions[eventType]
        }
    }
}

function publish(eventType, arg) {
    if (!subscriptions[eventType])
        return

    Object.keys(subscriptions[eventType]).forEach(key => subscriptions[eventType][key](arg))
}

function getIdGenerator() {
    let lastId = 0

    return function getNextUniqueId() {
        lastId += 1
        return lastId
    }
}

function Sub() {
}

Sub.prototype = {
    on: function (eventType, callback) {
        const id = getNextUniqueId();
        /**
         * doesnt exist? add it
         */
        if (!subscriptions[eventType]) {
            subscriptions[eventType] = {};
        }

        /**
         * set up the memory
         */
        subscriptions[eventType][id] = callback;


        return {
            unsubscribe: () => {
                delete subscriptions[eventType][id];
                if (Object.keys(subscriptions[eventType].length === 0)) delete subscriptions[eventType]
            }
        }

    },
    trigger: function (eventType, arg) {
        if (!subscriptions[eventType]) {
            return;
        }

        Object.keys(subscriptions[eventType]).forEach(key => {
            return subscriptions[eventType][key](arg);
        });

    }
};


const sub = new Sub();
sub.on('click', () => console.log('clicked!!!'));
sub.on('click', () => console.log('clicked again!!!'));
sub.on('mouseover', () => console.log('mouseover'));
sub.on('mouseout', () => console.log('clicked!!!'));
sub.on('mouseenter', () => console.log('clicked!!!')).unsubscribe();

sub.trigger('click', 12);
sub.trigger('mouseover');
sub.trigger('mouseenter');
