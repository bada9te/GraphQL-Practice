import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { useState } from "react";


const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            age
            username
        }
    }
`;


const QUERY_ALL_MOVIES = gql`
    query GetAllMovies {
        movies {
            id
            name
            yearOfPublication
            isInTheaters
        }
    }
`;


const GET_MOVIE_BY_NAME = gql`
    query GetMovieByName($name: String!) {
        movie(name: $name) {
            name
            yearOfPublication
            isInTheaters
        }
    }
`;


const CREATE_USER_MUTATION = gql`
    mutation CreateUser($user: CreateUserInput!) {
        createUser(input: $user) {
            id
            name
        }
    }
`;


const DisplayData = (props) => {
    // gql
    // fetch data
    const { data: usersData, loading: usersLoading } = useQuery(QUERY_ALL_USERS);
    const { data: moviesData, loading: moviesLoading } = useQuery(QUERY_ALL_MOVIES);
    const [
        fetchMovie, 
        { data: movieSearchedData, error: movieSearchedError }
    ] = useLazyQuery(GET_MOVIE_BY_NAME);

    // create data
    const [
        createUser,
        { data: createdUserData, error: createdUserError }
    ] = useMutation(CREATE_USER_MUTATION);


    // react
    // search movie by name state
    const [movieSearched, setMovieSearched] = useState("");

    // create user state
    const [user, setUser] = useState({
        name: "",
        username: "",
        age: 0,
        nationality: "",
    });
    


    return (  
        <>
            <div>
                <input type="text" placeholder="Name" onChange={e => setUser({...user, name: e.target.value})}/>
                <input type="number" placeholder="Age" onChange={e => setUser({...user, age: Number(e.target.value)})}/>
                <input type="text" placeholder="Username" onChange={e => setUser({...user, username: e.target.value})}/>
                <input type="text" placeholder="Nationality" onChange={e => setUser({...user, nationality: e.target.value.toUpperCase()})}/>
                <button onClick={() => createUser({
                    variables: {
                        user: {
                            name: user.name,
                            username: user.username,
                            age: user.age,
                            nationality: user.nationality,
                        }
                    }
                })}>
                    Create user
                </button>
            </div>

            <ul>
                {
                    !usersLoading && usersData && usersData.users.map((item, i) => {
                        return (
                            <li key={i}>{item.name}</li>
                        );
                    })
                }
            </ul>
                            
            <ul>
                {
                    !moviesLoading && moviesData && moviesData.movies.map((item, i) => {
                        return (
                            <li key={i}>{item.name}</li>
                        );
                    })
                }
            </ul>


            <div>
                <input type="text" placeholder="Movie name" onChange={e => setMovieSearched(e.target.value)}/>
                <button 
                    onClick={() => fetchMovie({
                        variables: {
                            name: movieSearched,
                        },
                    })}
                >
                    Get movie
                </button>
                <div>
                    {
                        (() => {
                            if (movieSearchedData) {
                                return (
                                    <div>
                                        <p>Movie name: {movieSearchedData.movie.name}</p>{" "}
                                        <p>Year of publication: {movieSearchedData.movie.yearOfPublication}</p>{" "}
                                    </div> 
                                );
                            } else if (movieSearchedError) {
                                return (
                                    <p>Movie not found</p>
                                );
                            }
                        })()
                        
                    }
                </div>
            </div>
        </>           
    );
}

export default DisplayData;