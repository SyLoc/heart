import React, {useMemo} from 'react';
import SearchInput from '../components/searchInput';
import SelectInput from '../components/selectInput';
import Select from '../components/select';
import Loading from '../components/loading';
import CustomSelect from '../components/singleSelectField/CustomSelect';
import { countries } from './data';
import { fetchUserApi } from '../actions/user'
import { useDispatch } from 'react-redux';
import { Counter } from '../features/counter/Counter';

export default function Render() {
  const dispatch = useDispatch()

  const data = useMemo(
    () => 
      countries.map((country, index) => {
        if(index === 5){
          return {
            id: index + 1,
            name: country,
            isDisabled: true,
          }
        }else{
          return {
            id: index + 1,
            name: country
          }
        }
      }),[countries])
    
  const userId = 2

  const handleClick  = () =>{
    dispatch({type: 'USER_FETCH_REQUESTED', payload: {userId}})
  }

  // log


  return (
    <>
      <Counter/>
    <div style={{margin: "20px auto", maxWidth:"300px"}}>
        {/* <SearchInput 
          value=""
          // isCollapsed
          // disabled
          handleSearch={(str) => {console.log(str)}}
          placeholder="Search..."
        /> */}
      

        {/* <CustomSelect 
          label="Select another country"
          data={data}
          // value={{id: 51, name: "Congo (the)"}}
          keyLabel="name"
          keyValue="id"
          onChange={(value) => console.log(value)}
          error={"this is error message"}
          // loading
          // name="countryTwo"
        /> */}

        <button onClick={handleClick}>fetch user</button>
      {/* <Loading/> */}
    </div>
    </>
  )
}
