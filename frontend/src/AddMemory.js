import { useDispatch } from 'react-redux'
import { postCards } from './redux-features/cardSlice'
import axios from 'axios'
import React from 'react'


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
        
        dispatch(postCards(formData))
        // axios.post("http://192.168.0.111:4000/api",formData, {headers : {'Content-Type' : "multipart/form-data"}})
        // .then(data=>{
        //     alert("Data Saved")
            
        //   }).catch(err=>console.log(err))

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