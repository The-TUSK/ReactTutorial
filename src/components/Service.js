import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Service() {
    const [movieTitle, setMovieTitle] = useState('');
    const [movieResults, setMovieResults] = useState([]);

    useEffect(() => {
        if (movieTitle.length >= 4) {
            axios.get(`http://www.omdbapi.com/?s=${movieTitle}*&apikey=35493d4`)
                .then(response => setMovieResults(response.data.Search))
                .catch((err) => console.log("Error: ", err));
        }
    }, [movieTitle])

    return (
        <>
            <div className="container searchContainer">
                <div className="card mb-3">
                    <h3 className="card-header">Web Service Example</h3>
                    <div className="card-body">
                        <h5 className="card-title">The Open Movie Database API</h5>
                        <h6 className="card-subtitle text-muted">Search for a movie by title.</h6>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <input
                                type="text"
                                value={movieTitle}
                                onChange={(e) => { setMovieTitle(e.target.value) }}
                                className="form-control"
                                autoComplete='off'
                                placeholder="enter a movie title..." />
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        {
                            movieResults.slice(0, 1).map((movie, index) =>
                                <div className="card-body" key={index}>
                                    <a href={'https://www.imdb.com/title/' + movie.imdbID}>
                                        <img className="card-img-top"
                                            src={movie.Poster}
                                            alt=""
                                            style={{ width: '5rem', height: '5rem' }} /></a>
                                    <p className="card-text">
                                        <a href={'https://www.imdb.com/title/' + movie.imdbID} target="blank">{movie.Title}</a> ({movie.Year})
                                    </p>
                                </div>
                            )}
                    </div>
                    <div className="card-footer text-muted">
                    </div>
                </div>
            </div>
        </>
    )
}
export default Service;