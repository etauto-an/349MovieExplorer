import MovieCard from './MovieCard';

/**
 * Renders a grid container that iterates over an array of movies and displays a MovieCard for each.
 * Handles the display of the "no results" message if the array is empty.
 * * @param {object[]} movies - The array of movie objects to display.
 */
function MovieGrid({ movies }) {
    
    // Display a message if no movies are found
    if (movies.length === 0) {
        return (
            <p className="no-results">No movies found matching your criteria.</p>
        );
    }

    // Map over the array to render MovieCard components
    return (
        <div className="movie-grid-container">
            {movies.map(movie => (
                <MovieCard 
                    key={movie.id} // Essential for list rendering performance
                    movie={movie} 
                />
            ))}
        </div>
    );
}

export default MovieGrid;