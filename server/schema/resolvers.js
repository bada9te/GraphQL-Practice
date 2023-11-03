const {UserList, MovieList} = require('../Data');


module.exports = {

    Query: {
        // user resolvers
        users: () => {
            return UserList;
        },
        user: (_, args) => {
            const id = args.id;
            return UserList.find(item => item.id === Number(id));
        },

        // movie resolvers
        movies: () => {
            return MovieList;
        },
        movie: (_, args) => {
            const name = args.name;
            return MovieList.find(item => item.name === name);
        }
    },

    User: {
        favoriteMovies: () => {
            return MovieList.filter(item => item.yearOfPublication >= 2000 && item.yearOfPublication <= 2007);
        }
    },

    Mutation: {
        createUser: (parent, args) => {
            const user = args.input;
            const lastId = UserList[UserList.length - 1].id;
            user.id = lastId + 1;
            UserList.push(user);
            return user;
        },

        updateUsername: (parent, args) => {
            const {id, newUsername} = args.input;
            let updatedUser;
            UserList.forEach(u => {
                if (u.id === Number(id)) {
                    u.name = newUsername;
                    updatedUser = u;
                }
            });

            return updatedUser;
        },

        deleteUser: (parent, args) => {
            const {id} = args.input;
            let deletedUser = UserList.find(u => u.id === Number(id));
            UserList = UserList.filter(u => u.id !== deletedUser.id);
            return deletedUser;
        }
    },
};