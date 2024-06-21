export default function EventsPagination({registrationCount, currentPage, pageSize, onPageChange}) {
  
  const totalPages = Math.ceil(registrationCount/pageSize);
  if(totalPages == 1) return null;

  const pages = Array.from({length: totalPages}, (_, i) => i+1);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <ul className="pagination">
          {
            pages.map(page => {
              return (
                <li key = {page} className={`page-item ${page == currentPage ? 'active' : '' } `}>
                  <a href="#" className="page-link" onClick={() => onPageChange(page)}>{page}</a>
                </li>
              )
            })
          }
        </ul>
      </div>
    </>
  )
}