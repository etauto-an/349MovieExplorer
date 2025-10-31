/**
 * Renders the pagination controls (Previous/Next buttons and page info).
 * It calculates button disabled states and sends page change requests to the parent.
 * * @param {number} currentPage - The current active page number.
 * @param {number} totalPages - The total number of pages available from the API.
 * @param {function} onPageChange - Callback function (newPage) => void to request a new page.
 */
function Pagination({ currentPage, totalPages, onPageChange }) {
    
    // Determine button disabled state
    const isPrevDisabled = currentPage === 1;
    const isNextDisabled = currentPage >= totalPages;

    // Handlers to calculate and request the new page number
    const handlePrevClick = () => {
        if (!isPrevDisabled) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (!isNextDisabled) {
            onPageChange(currentPage + 1);
        }
    };
    
    // Format the totalPages with separators for better readability
    const formattedTotalPages = totalPages.toLocaleString();

    return (
        <footer className="pagination-footer">
            <button 
                id="prev-page-button" 
                onClick={handlePrevClick}
                disabled={isPrevDisabled}
            >
                Previous
            </button>
            <span id="current-page-info">
                Page {currentPage} of {formattedTotalPages}
            </span>
            <button 
                id="next-page-button" 
                onClick={handleNextClick}
                disabled={isNextDisabled}
            >
                Next
            </button>
        </footer>
    );
}

export default Pagination;