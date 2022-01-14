import React from "react";

const Loading: React.FC<any> = (props: any) => {
    return(
        <div className="loading">
            <div className='loading__point' id='point-1'></div>
            <div className='loading__point' id='point-2'></div>
            <div className='loading__point' id='point-3'></div>
        </div>  
    )
}

export default Loading