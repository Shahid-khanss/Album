import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import './App.css';
import Navbar from "./Navbar"
import MemoryCard from "./MemoryCard"
import React, { useEffect } from "react"
import axios from "axios"
import AddMemory from './AddMemory';
import { useSelector, useDispatch } from "react-redux"
import { fetchCards, postCards, deleteCards } from './redux-features/cardSlice'
import { checkStorage } from './redux-features/authSlice'
import Login from './Login'



function App() {

  const [cardsData, setCardsData] = React.useState(null)
  const cardState = useSelector(state => state.cardReducer) // selecting card state
  const userState = useSelector(state=>state.authReducer)
  const dispatch = useDispatch()
  let cardsArray = []
  // console.log(state)
  // console.log("outside render")
  // get data

  useEffect(()=>{
    dispatch(checkStorage()) // checking localStorage if it has user token. If yes update State on initial first render
  },[userState.status]) // re-render component whenever status changes

  // console.log(state)
  useEffect(()=> {
    dispatch(fetchCards())

  }, [cardState.status.uploading, cardState.status.deleting, userState.user])  // whenerver state.uploading flag changes useEffect re-renders

  //** If you want to re-render useEffect (to get realtime data feed) just put a changeable flag of global state in the second argument array. like flag "delete" will change if we delete and so on
  // we dont need to call axios from outside we can do here also just remember to use flags to re-render the axios.get to get real-time data feed */

  /* 
    Also we re-render if there is change in there exists any change in userState.user. so that when we log in it re-renders
  */


  if (cardState) {
    cardsArray = cardState.data.map((card) => {
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
            element={userState.user ? (<div> {/* Conditional Render (using ternary) only if there exist a user other wiser render "user not logged in" */}
              <Navbar />
              <div className="content">

                <div className="cards-container">
                  {cardState.status.downloading ? <h1>Loading</h1> : cardsArray}
                </div>
                <div className="sidebar">
                  <AddMemory />
                </div>
              </div>
            </div>) : 
            <div>
            <h1>You are not logged in!!!</h1>
            <h1><Link to="/login">Log In</Link></h1>
            </div>
            } />

            <Route 
            path='/login' 
            element={
            userState.user ? <Navigate to="/home"/> : // If user exists redirect to /home.
            (<div>
            <Navbar />
            <Login/>
            </div>)} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
