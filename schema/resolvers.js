const {UserList} = require('../Data');

module.exports = {

    Query: {
        users() {
            return UserList;
        }
    }

}