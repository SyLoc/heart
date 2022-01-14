import React, { useRef, useState, useEffect, useCallback } from "react";
import SearchIcon from "./images/icon-search.svg";
import CloseIcon from "./images/icon-close.svg";
import debounce from "lodash.debounce";

const SearchBarEx: React.FC<any> = (props: any) => {
  const { value, handleSearch, placeholder, isCollapsed, disabled, name, id  } = props
  const [search, setSearch] = useState(value)
  const [isOnlyIcon, setIsOnlyIcon] = useState(isCollapsed ? isCollapsed : false)
  const [focus, setFocus] = useState(false)
  const refInput = useRef<any>(null)


  const handleDebouncedChange = useCallback(
    debounce((value: string) => {
      handleSearch(value);
    }, 500),
    []
  );

  const handleClickRemoveSearch = () =>{
    if(refInput.current){
      refInput.current.focus()
      setSearch("")
    }
  } 

  const handleClickSearchIcon = () =>{
    setIsOnlyIcon(!isOnlyIcon)
    setTimeout(() => {
      refInput.current.focus()
    }, 250);
  }

  useEffect(() => {
    handleDebouncedChange(search)
  }, [search])

  useEffect(() =>{
    if(isCollapsed && !focus){
      setIsOnlyIcon(isCollapsed)
    }
  }, [focus])


  // const handleOnKeyPress = (event: any) =>{
  //   if(event.key === "Enter" && search){
  //     handleSearch(search)
  //   }
  // }
  
  const handleSubmit = (e: any) =>{
    e.preventDefault();
    handleSearch(search)
  }

  return(
    <form onSubmit={handleSubmit} 
      className={`searchBarEx ${focus && "searchBarEx-focus"} ${isOnlyIcon ? "searchBarEx-nonInput" : ""}`}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          if(!search){
            setFocus(false)
          }
        }}
      >
      <div className={`${disabled ? "searchBarEx-disable" : null}`}></div>
      <div className="searchBarEx__icon-search">
          <img
              src={SearchIcon} alt=""
              onClick={handleClickSearchIcon}
            />
      </div>
      <input 
        id={id || "searchInputId"}
        name={name} 
        ref={refInput}
        placeholder={placeholder}
        className="searchBarEx__input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        // onKeyPress={handleOnKeyPress}
      />
      {
        search && !isOnlyIcon && (
          <div className="searchBarEx__icon-delete">
            <img
              src={CloseIcon} alt=""
              onClick={handleClickRemoveSearch}
            />
          </div>
        )
      }
    </form>
  )
} 


export default SearchBarEx