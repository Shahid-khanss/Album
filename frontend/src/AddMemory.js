import { useDispatch } from 'react-redux'
import axios from 'axios'
import React from 'react'
import { fetchCards, postCards, deleteCards } from './redux-features/cardSlice'
const AddMemory = (props) => {

    const [formData, setFormData] = React.useState({
        name: "",
        place: "",
        pics : "",
        content: "",
        email: ""
    }
    )

    
const dispatch = useDispatch()
// console.log(formData)
    function handleChange(event) {
        
        setFormData((prev) => {
            if(event.target.type==='file')
            return {...prev, [event.target.name] : event.target.files[0]}
            else
            return { ...prev, [event.target.name]: event.target.value }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        
        dispatch(postCards()) // redux-features / cardSlice
        

    }


    return (
        <form className="add-memory-form" onSubmit={handleSubmit}>

            <h1>Add Memory</h1>
            <input name="name" type="text" placeholder="Memory by" id="name" onChange={handleChange} value={formData.name} />


            <input name="place" type="text" placeholder="Place" onChange={handleChange} value={formData.place} />


            <textarea name="content" id="content" cols="30" rows="10" placeholder="Content" onChange={handleChange} value={formData.content}></textarea>


            <input name="email" type="text" placeholder="Email" onChange={handleChange} value={formData.email} />

            <input name="pics" type="file" placeholder="upload image" onChange={handleChange} accept=".jpg" />

            <input type="submit" className="submit" />

        </form>
    );
}

export default AddMemory;