
import './App.css';
import Navbar from "./Navbar"
import MemoryCard from "./MemoryCard"
import React, { useEffect } from "react"
import axios from "axios"
import AddMemory from './AddMemory';


function App() {

  const [cardsData, setCardsData] = React.useState(null)
  const [runEffect, setRunEffect]= React.useState(false)

  let cardsArray = []

  console.log("outside render")
  // get data
  React.useEffect(() => {
    console.log("inside render")
   
    axios.get("http://192.168.0.111:4000/api")
      .then((res) => {

        setCardsData(res.data)

      })
      .catch(err => console.log(err))

  }, [runEffect])


  if (cardsData) {
    cardsArray = cardsData.map((card) => {
      return (<MemoryCard
        render={setRunEffect}
        data={card}
        key={card._id} />)
    })
  }






  return (
    <div className="App">
      <Navbar />
      <div className="content">

        <div className="cards-container">
          {cardsArray}
        </div>
        <div className="sidebar">
          <AddMemory render={setRunEffect} />
        </div>
      </div>
    </div>
  );
}

export default App;
