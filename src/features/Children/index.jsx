import React, {memo} from 'react'

const Children = ({onInc}) => {
    
    console.log('children: re-render');
    

    return (
        <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
            <h1>========== children =============== </h1>
            <div>
            <button onClick={onInc}>increase</button>
            </div>
        </div>
    )
}

export default memo(Children)