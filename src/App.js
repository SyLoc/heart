import React, { useState, useMemo } from 'react';
import './App.css';
// import Home from './Containers/Home';
// import Children from './features/Children';
import axios from 'axios';
import ReactPlayer from 'react-player';
import Render from './Containers/render';


function App() {
  const [value, setValue] = useState('');
  const [price, setPrice] = useState('');
  const [data, setData] = useState([]);

  const handleSubmit = () =>{
    setData([...data, {name: value, price: price}])
    setValue('');
    setPrice('');
  }

  const total = useMemo(() =>{
    // console.log('re-render');
    const value = data.reduce((result, item) => result + item.price*1, 0)
    return value;
  }, [data]);

  const arr = [
    {skill: {
      id: '12wd3',
      name:"di lam gi do"
    }, level: {
      name: 'level 1',
      id: 1,
    }},
    {skill: {
      id:'24fwq4',
      name: 'di bo doi'
    }, level: {
      name: 'level 3',
      id: 3,
    }},
    {skill: {
     id: '1fwf233',
     name: 'hello'
    }, level: {
      name: 'level 3',
      id: 3,
    }},
    {skill: {
      id: '1vsava23',
      name: 'dei doi'
    }, level: {
      name: 'level 1',
      id: 1,
    }},
    {skill: {
      id: '1vs211sca23',
      name: 'di choi'
    }, level: {
      name: 'level 4',
      id: 4,
    }},
    {skill: {
      id: 'shvvu',
      name: 'di nhau'
    }, level: {
      name: 'level 4',
      id: 4,
    }}
  ]

  // const needFind = [{skill: '1fwf233', level: 3}, {skill: '1vs211sca23', level: 4}, {skill: 'shvvu', level: 4}]

  // const arrEx = needFind.map((item) => item.skill);

  // const findNameOfSkill = arr.filter((item) => arrEx.includes(item.skill.id))
  
  // console.log(findNameOfSkill)


  const callApi = async() =>{
    try {
      const res = await fetch('http://localhost:3001/api/products?_page=1&_limit=3');
      const data = await res.json();
      console.log('data :', data);
    } catch (error) {
      console.log(error);
    }
  }

  const getProductList = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/products?_page=1&_limit=10');
      console.log('list ',res?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getListOfClass = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/class');
      console.log('list ',res?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const addClass = async (cls) => {
    try {
      const res = await axios.post('http://localhost:3001/api/class', cls);
      console.log('list ',res?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateClass = async (id, data) => {
    try {
      const res = await axios.put(`http://localhost:3001/api/class/${id}`, data);
      console.log('list ',res?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateClassbyPatch = async (id, data) => {
    try {
      const res = await axios.patch(`http://localhost:3001/api/class/${id}`, data);
      console.log('list ',res?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteClass = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/class/${id}`);
      console.log('list ',res?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const [onVolum, setOnVolum] = useState(0)

  const handleClickOnVolumn = () =>{
    onVolum === 0 ? setOnVolum(1) : setOnVolum(0)
  }

  return (
  <div>
    <Render/>
  </div>
  )

//   return (
//     <div style={{textAlign: 'center', marginTop:'20px'}}>
//       <input style={{border: '1px solid #f2f2f2'}} value={value} onChange={(e) => setValue(e.target.value)} />
//       <input type='number' style={{border: '1px solid #f2f2f2'}} value={price} onChange={(e) => setPrice(e.target.value)} />
//       <button onClick={handleSubmit} >submit</button>
      
//       <div>
//         <button onClick={() => callApi()} >Click to callApi</button>
//       </div>

//       <div>
//         <button onClick={() => getProductList()} >Click me get list</button>
//       </div>

//       <div>
//         <button onClick={() => updateClass(35, {name:"class updated"})} >Click me to update class</button>
//       </div>

//       <div>
//         <button onClick={() => updateClassbyPatch(35, {name:"class updated by patch"})} >Click me to update class by patch</button>
//       </div>

//       <div>
//         <button onClick={() => deleteClass(35)} >Click me to delete class</button>
//       </div>

//       <div>
//         <button onClick={() => getListOfClass()} >Click me to get list of class</button>
//       </div>

//       <div>video: </div>
//       {/* <video autoPlay loop muted>
//                     <source
//                         src={`//player.vimeo.com/video/641869956?autoplay=1&loop=1&muted=0&controls=0`}
//                     />
//                 </video> */}

// <ReactPlayer playing volume={onVolum} url={`//player.vimeo.com/video/641869956?autoplay=1&loop=1&muted=0&controls=0`} />
// <button type='button' onClick={handleClickOnVolumn} >click me</button>


//       <div>
//         <button onClick={() => addClass({
//           id: "35",
//           name: "Class name",
//           title:"title 1"
//         })} >add class</button>
//       </div>

//       <h2>total: {total}</h2>

//       { 
//         data.length !== 0 && (
//           data?.map((item, index) =>(
//             <h2 key={index}>{item.name}</h2>
//           ))
//         )
//       }
//     </div>
//   );
}

export default App;
