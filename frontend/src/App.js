import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from "./Navbar"
import MemoryCard from "./MemoryCard"
import React, { useEffect } from "react"
import axios from "axios"
import AddMemory from './AddMemory';
import { useSelector, useDispatch } from "react-redux"
import { updateForm } from './redux/cardState';
import { getCardsdata } from './redux/cardState';
import Login from './Login'



function App() {

  const [cardsData, setCardsData] = React.useState(null)
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  let cardsArray = []
  console.log(state)
  console.log("outside render")
  // get data

  useEffect(() => {
    dispatch(getCardsdata())

  }, [state.uploading || state.deleting])  // whenerver state.uploading flag changes useEffect re-renders

  //** If you want to re-render useEffect (to get realtime data feed) just put a changeable flag of global state in the second argument array. like flag "delete" will change if we delete and so on
  // we dont need to call axios from outside we can do here also just remember to use flags to re-render the axios.get to get real-time data feed */


  if (state) {
    cardsArray = state.data.map((card) => {
      return (<MemoryCard
        data={card}
        key={card._id} />)
    })
  }


  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={<div>
              <Navbar />
              <div className="content">

                <div className="cards-container">
                  {cardsArray}
                </div>
                <div className="sidebar">
                  <AddMemory />
                </div>
              </div>
            </div>} />

            <Route 
            path='/login' 
            element={<Login/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
