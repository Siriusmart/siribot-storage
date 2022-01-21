const fs = require('fs');

const defaultProfile = {
    cooldowns: {},
};

function get(userID, create, storagePath) {
    if (fs.existsSync(`${storagePath}/profiles/userdata/${userID}.json`)) {
        return require(`../userdata/${userID}.json`);
    } else if (create) {
        const now = Date.now();
        let obj = {
            ...defaultProfile,
            profileCreate: now
        };

        fs.writeFileSync(`${storagePath}/profiles/userdata/${userID}.json`, JSON.stringify(obj, null, 4));
        return obj;
    }
}

module.exports = get;