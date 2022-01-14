import React, { useState, useRef, useEffect } from 'react';
import Loading from '../loading'

import Dropdown from './Dropdown';
import ArrowIcon from './images/arrow-icon.svg';

const CustomSelect : React.FC<any> = (props: any) => {
  const { label, data, value, name, onChange, error, defaultOptionLabel, searchPlaceholder, keyLabel, keyValue, loading } = props

  const [selectedValue, setSelectedValue] = useState((value ? value[keyLabel] : "") || value?.label);
  const [selectedIndex, setSelectedIndex] = useState((value ? value[keyValue] : "") || value?.value);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState([]); 
  const [dataChanged, setDataChanged] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownEl = useRef<any>();
  const typingTimeoutRef = useRef<any>(null)
  const outsideTimeoutRef = useRef<any>(null)


  const handleClickOutside = () =>{
    if(showDropdown) clearTimeout(outsideTimeoutRef.current)

    outsideTimeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
      setSearch('');
      setOptions(dataChanged)
    }, 150);
  }

  useEffect(() => {
    if(data.length > 0 && (data[0].label === undefined || data[0].value === undefined)){
      const options = data.map((datax: any, index: number) => 
      ({ label: data[index][keyLabel], value: data[index][keyValue], isDisabled: data[index]?.isDisabled })) 
      setOptions(options)
      setDataChanged(options)
    }else{
      setOptions(data)
      setDataChanged(data)
    }
  }, [data, keyLabel, keyValue])


  const changeSelectedHandler = (item:string, name:string, index:string | number) => {
    setSelectedValue(item);
    setSelectedIndex(index);
    setShowDropdown(false);
    onChange({value:index, label:item, name: name ? name : null });
  }

  function handleSearchTermChange(e:any){
    const { value } = e.target;

    if(typingTimeoutRef.current){
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() =>{
      const filteredOptions = dataChanged.filter((opt:any) => {
        return opt.label.toLowerCase().includes(value.trim().toLowerCase());
      });
      setOptions(filteredOptions);
    }, 250)
  }

  const handleAsyncSearch = () =>{  

  }

  const searchChangeHandler = (e:any) => {
    const {value} = e.target;
    setSearch(value);
    handleSearchTermChange(e)
  }

  return(
    <div className="form__group">
      <label>{label}</label>
      <div className="dropdown" ref={dropdownEl}>
        <div className="dropdown__selected" onClick={() => {
          if(!loading) setShowDropdown(!showDropdown)
        }}>
          { selectedValue ? selectedValue : defaultOptionLabel ? defaultOptionLabel : 'Please select one option' }
        </div>
        {
          loading && <div className='dropdown__loading'><Loading /></div>
        }
        <div className='dropdown__icon'>
          <img className={`${showDropdown ? "rotate__icon" : null}`} src={ArrowIcon} alt="" />
        </div>
        {showDropdown && 
          <Dropdown 
            searchPlaceholder={searchPlaceholder}
            search={search}
            searchChangeHandler={searchChangeHandler}
            options={options}
            selectedValue={selectedValue}
            selectedIndex={selectedIndex}
            changeSelectedHandler={changeSelectedHandler}
            name={name}
            data={data}
            onBlur={handleClickOutside}
          />
        }
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default CustomSelect;