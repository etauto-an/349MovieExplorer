import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ControlsBar from './components/ControlsBar';
import MovieGrid from './components/MovieGrid';
import Pagination from './components/Pagination';

// --- TMDB API Configuration ---
const BASE_URL = 'https://api.themoviedb.org/3/';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODE3Y2NkMzUwNjY5ZGJiZjY4OWJlODhjZDlhODJhZSIsIm5iZiI6MTc1OTY5NTk2OC42NTYsInN1YiI6IjY4ZTJkNDYwMjVjY2VmY2M2ZDljYWFiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3xt-zCouOfuFbLOLTiPC48aIWEFLFPx572VhyvofW1w'
  }
};

const SORT_MAP = {
  'release_date_desc': 'primary_release_date.desc',
  'release_date_asc': 'primary_release_date.asc',
  'rating_desc': 'vote_average.desc',
  'rating_asc': 'vote_average.asc'
};

// --- Utility Function: Get Current Date for filtering future releases ---
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Main application component. Manages global state, handles all data fetching,
 * and orchestrates interactions between the ControlsBar and Pagination components.
 */
function App() {
    // --- State Management ---
    const [movies, setMovies] = useState([]); // Array of movie data to display
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentSort, setCurrentSort] = useState('popularity.desc'); // Default sort
    const [currentQuery, setCurrentQuery] = useState(''); // Current search term
    const [isLoading, setIsLoading] = useState(false); // UI loading state
    const [error, setError] = useState(null); // API error state

    // --- Core Data Fetching Function ---
    async function fetchMovies() {
        const page = currentPage;
        const sort = currentSort;
        const query = currentQuery;

        // Reset display states and set loading flag
        setIsLoading(true);
        setError(null);
        setMovies([]);
        
        // 1. Determine API Endpoint and Parameters based on current state
        let endpoint;
        let params = `&page=${page}`; 
        
        if (query) {
            // Search mode: uses query, ignores sort
            endpoint = 'search/movie';
            params += `&query=${encodeURIComponent(query)}`;
            
        } else {
            // Discover mode: uses sort, applies date filter if sorting by release date
            endpoint = 'discover/movie';
            params += `&sort_by=${sort}`;

            if (sort.includes('primary_release_date')) {
                const today = getTodayDate();
                params += `&primary_release_date.lte=${today}`;
            }
        }
        
        const url = `${BASE_URL}${endpoint}?language=en-US${params}`;

        // 2. Execute Fetch and Process Data
        try {
            const response = await fetch(url, options); 
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            
            // Update movies and pagination states
            setMovies(data.results);
            setTotalPages(data.total_pages);
            
            // Scroll user back to the top of the page after a new fetch
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (err) {
            console.error('Could not fetch movies:', err);
            setError('Error fetching movie list. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    // --- Data Sync Hook ---
    // Re-runs the fetchMovies function whenever the core control states change.
    useEffect(() => {
        fetchMovies();
    }, [currentPage, currentSort, currentQuery]);


    // --- Event Handlers (Update State which triggers useEffect) ---

    // Handles input from the ControlsBar search field
    const handleSearch = (query) => {
        // Clear sort, reset page to 1
        setCurrentPage(1);
        setCurrentSort('popularity.desc');
        setCurrentQuery(query);
    };

    // Handles selection from the ControlsBar sort dropdown
    const handleSortChange = (selectedValue) => {
        const tmdbSortValue = SORT_MAP[selectedValue];
        // Clear query, reset page to 1
        setCurrentPage(1);
        setCurrentQuery('');
        setCurrentSort(tmdbSortValue);
    };
    
    // Handles clicks from the Pagination component
    const handlePageChange = (newPage) => {
        // Maintain current sort and query, only update page
        setCurrentPage(newPage);
    };

    // --- Rendering Logic based on state ---
    let content;
    if (isLoading) {
        content = <p className="loading-message">Loading movies...</p>;
    } else if (error) {
        content = <p className="error-message">{error}</p>;
    } else {
        // Render the MovieGrid with fetched movies
        content = <MovieGrid movies={movies} />;
    }

    return (
        <>
            <Header />
            
            <ControlsBar 
                onSearch={handleSearch}
                onSortChange={handleSortChange}
            />
            
            <main>
                {/* Dynamically render loading, error, or movie content */}
                {content}
            </main>

            {/* Pagination is rendered only when data is successfully loaded */}
            {!isLoading && !error && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
}

export default App;