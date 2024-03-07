import React from "react"

const PackagePaginator=({currentPage,totalPages,onPageChange})=>{
    const pageNumbers=Array.from({length : totalPages},(_,i)=>i+1)
    return(
        <nav className="d-grid mt-2 text-center">
            <ul className="pagination">
            {pageNumbers.map((pageNumber)=>(
                
                    <li className={`page-item ${currentPage === pageNumber ?"active":""}`} key={pageNumber} >
                    <button onClick={()=>onPageChange(pageNumber)} className="page-link">{pageNumber}</button>
                    </li>
            ))}
            </ul>
        </nav>
    )
}

export default PackagePaginator