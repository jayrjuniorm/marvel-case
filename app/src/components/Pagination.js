import React from 'react';
import ReactPaginate from 'react-paginate';
import ReactDOM from 'react-dom';

const Pagination = ({ charactersPerPage, totalCharacters, paginate, currentPage }) => {
    const pageNumbers = Math.ceil(totalCharacters / charactersPerPage);

    return (
        <div id="container">
            <ReactPaginate
                breakLabel="..."
                nextLabel="próxima"
                onPageChange={paginate}
                pageRangeDisplayed={3}
                pageCount={pageNumbers}
                previousLabel="anterior"
                renderOnZeroPageCount={null}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
            />
        </div>
    );
};
export default Pagination;