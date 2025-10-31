/**
 * Renders the search input and the sort dropdown controls.
 * It uses callback props to notify the parent component (App.jsx) of changes.
 * * @param {function} onSearch - Callback function (query) => void when search text changes.
 * @param {function} onSortChange - Callback function (sortValue) => void when sort selection changes.
 */
function ControlsBar({ onSearch, onSortChange }) {
    
    // --- Handlers for user input ---
    
    // Notifies parent component immediately on input change.
    const handleSearchChange = (event) => {
        const query = event.target.value.trim();
        onSearch(query);
    };

    // Notifies parent component when a new sort option is selected.
    const handleSortChange = (event) => {
        const selectedValue = event.target.value;
        onSortChange(selectedValue);
    };

    return (
        <section className="controls-bar">
            <div className="controls-container">

                <input 
                    type="text" 
                    id="search-input" 
                    placeholder="Search for a movie..."
                    onChange={handleSearchChange}
                />

                <select 
                    id="sort-dropdown" 
                    onChange={handleSortChange}
                >
                    <option value="" disabled defaultValue>Sort By</option>
                    <option value="release_date_asc">Release Date (Asc)</option>
                    <option value="release_date_desc">Release Date (Desc)</option>
                    <option value="rating_asc">Rating (Asc)</option>
                    <option value="rating_desc">Rating (Desc)</option>
                </select>

            </div>
        </section>
    );
}

export default ControlsBar;