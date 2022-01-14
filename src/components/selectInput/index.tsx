import React, { useState } from "react";
import arrowIcon from './images/arrow-icon.svg'

const SelectInput: React.FC<any> = (props: any) => {
    const [clicked, setClicked] = useState(false)
    return(
        <div className="select-input">
            <div className={`select-wrap ${clicked ? "select-clicked" : null}`}>
                <select onChange={(event) => console.log(event)} 
                onClick={(event) => console.log(event.nativeEvent)} className='select__field' 
                    onFocus={() => setClicked(true)}
                    onBlur={() => setClicked(false)}
                    name="cars" id="cars">
                        <option value="">all</option>
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                </select>
                <span className='select__arrow-icon'>
                    <img src={arrowIcon} style={{transform: `${clicked ? "rotate(180deg)" : "rotate(0deg)"}`}} alt="" />
                </span>
            </div>
            <div className="list-option">

            </div>
        </div>  
    )
}

export default SelectInput