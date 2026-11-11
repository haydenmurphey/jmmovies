// Originally a client for the CS 345 course key-value service
// (keyval.learnscrum.xyz), which has since been retired. It now keeps the
// same get/set interface but stores everything in the browser's localStorage.
class Keyval {

    static PREFIX = "jmmovies:";

    // Returns the parsed JSON stored under `key`, or null if missing/invalid.
    static read(key) {
        try {
            const raw = localStorage.getItem(Keyval.PREFIX + key);
            return raw === null ? null : JSON.parse(raw);
        } catch (e) {
            return null;
        }
    }

    get(key, callback, error_callback=undefined) {
        Promise.resolve()
            .then(() => localStorage.getItem(Keyval.PREFIX + key))
            .then(data => callback(data))
            .catch(error => {
                if (error_callback !== undefined) {
                    error_callback(error);
                }
            });
    }

    set(key, value, callback=() => {}, error_callback=undefined) {
        Promise.resolve()
            .then(() => localStorage.setItem(Keyval.PREFIX + key, value))
            .then(() => callback(value))
            .catch(error => {
                if (error_callback !== undefined) {
                    error_callback(error);
                }
            });
    }
}
