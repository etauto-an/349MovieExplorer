// Base URL for fetching movie poster images
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

/**
 * Renders a single movie card based on the provided movie data.
 * Handles logic for placeholder images and formatting the rating.
 * * @param {object} movie - A single movie object from the TMDB API results.
 */
function MovieCard({ movie }) {
    // 1. Prepare data for rendering
    const posterPath = movie.poster_path;
    const title = movie.title;
    
    // Choose placeholder image if no poster path exists
    const posterUrl = posterPath
        ? `${IMAGE_BASE_URL}${posterPath}`
        : 'https://placehold.co/200x300?text=Placeholder+Image';

    const releaseDate = movie.release_date || 'N/A';
    
    // Format the rating to one decimal place if available
    const formattedRating = movie.vote_average
        ? movie.vote_average.toFixed(1)
        : 'N/A';

    // 2. Return the JSX structure
    return (
        <div className="movie-card">
            <img 
                src={posterUrl} 
                alt={`${title} Poster`} 
                className="movie-poster"
            />
            <div className="movie-info">
                <h3 className="movie-title">{title}</h3>
                <p className="movie-release-date">Release Date: {releaseDate}</p>
                <p className="movie-rating">Rating: {formattedRating}</p>
            </div>
        </div>
    );
}

export default MovieCard;