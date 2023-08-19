import React, { useState,useEffect } from 'react'

function PaginationBar({onPage,pageAmount}) {

    const maxPageNumber = Math.round(pageAmount/10);

    const [page, setPage] = useState(0);

    useEffect(() => {
        onPage(page);
    }, [page]);

    return (
      <>
        <div className='pagination'>
            <button onClick={()=>{
                if (page>0){
                setPage(preValue => preValue-1);
                }
            }}>-</button>
            <div>{page+1}</div>
            <button onClick={()=>{
                if (page<maxPageNumber-1){
                    setPage(preValue => preValue+1);
                   
                }
            }}>+</button>
        </div>
      </>
    );
    
}

export default PaginationBar;