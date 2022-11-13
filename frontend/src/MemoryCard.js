import axios from 'axios'
import React from 'react'





const MemoryCard = (props) => {



    function handleDelete() {
        alert("Are you sure you want to delete")
        axios.delete(`http://192.168.0.111:4000/api/${props.data._id}`).then(res => {
            alert(`Following data deleted : ${JSON.stringify(res.data)}`)
            props.render(prev=>!prev)
        })
            .catch(err => console.log(err))
    }



    return (
        <div>
            <div className="memory-card">
                <img className="card-image" src={`http://192.168.0.111:4000/uploads/${props.data.pics}`} alt="img" />
                <button onClick={handleDelete}
                    style={{ position: "absolute", top: "5px", right: "5px", fontSize: "1.5em", padding: "5px" }}>
                    <i className="fa-solid fa-trash"></i>
                </button>
                <div className="card-content">
                    <h3>{props.data.place}</h3>
                    <p>Experience :</p>
                    <p style={{ marginTop: "10px" }}>{props.data.content}</p>
                    <footer style={{ position: "absolute", bottom: "5px" }}>Memory By : {props.data.name} email : {props.data.email}</footer>
                </div>
            </div>
        </div>

    );
}

export default MemoryCard;