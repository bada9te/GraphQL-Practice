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
};