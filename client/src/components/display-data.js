import { useQuery, useLazyQuery, gql } from "@apollo/client";
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



const DisplayData = (props) => {
    // gql
    const { data: usersData, loading: usersLoading } = useQuery(QUERY_ALL_USERS);
    const { data: moviesData, loading: moviesLoading } = useQuery(QUERY_ALL_MOVIES);
    const [
        fetchMovie, 
        { data: movieSearchedData, error: movieSearchedError }
    ] = useLazyQuery(GET_MOVIE_BY_NAME);

    // react
    const [movieSearched, setMovieSearched] = useState("");


    return (  
        <>
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