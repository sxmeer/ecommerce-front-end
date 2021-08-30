import React from 'react';
import './Pagination.css';

// const [paged, setPaged] = useState({
//   currentPage: 4,
//   totalPage: 6
// });

// const updateCurrentPage = useCallback((page) => {
//   setPaged({ currentPage: page, totalPage: paged.totalPage });
// }, [paged]);

// return (
//   <div className="App">
//     <Pagination
//       updateFn={updateCurrentPage}
//       currentPage={paged.currentPage}
//       totalPage={paged.totalPage} />
//   </div>
// );

const Pagination = ({ currentPage, totalPage, updateFn }) => {
  let pagingationElements = [];
  let startPage = currentPage - 1;
  let endPage = currentPage + 1;

  if (startPage <= 0) {
    endPage -= (startPage - 1);
    startPage = 1;
  }

  if (endPage > totalPage) {
    endPage = totalPage;
    if (endPage - 2 > 0) {
      startPage = endPage - 2;
    }
  }

  if (currentPage > 1) {
    pagingationElements.push(<button className='danger-btn sm' onClick={() => updateFn(currentPage - 1)}><i className="fa fa-long-arrow-left"></i>  Previous</button>);
  }

  if (startPage - 1 >= 1) {
    pagingationElements.push(<p className="sm" style={{ padding: "0.4rem" }}>1...</p>);
  }


  for (let index = startPage; index <= endPage; index++) {
    pagingationElements.push(<button className={index === currentPage ? 'secondary-btn sm' : 'danger-btn sm'} onClick={() => updateFn(index)} > {index}</button >);
  }

  if (endPage + 1 <= totalPage) {
    pagingationElements.push(<p className="sm" style={{ padding: "0.4rem" }}>...{totalPage}</p>);
  }

  if (currentPage < totalPage) {
    pagingationElements.push(<button className='danger-btn sm' onClick={() => updateFn(currentPage + 1)}>Next <i className="fa fa-long-arrow-right"></i></button>);
  }
  return <div className="Pagination">
    {pagingationElements.map((el, index) => <React.Fragment key={index}>{el}</React.Fragment>)}
  </div >
};

export default Pagination;