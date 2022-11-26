import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {logout} from "./redux-features/authSlice"

const Navbar = () => {

const dispatch = useDispatch()
const userState = useSelector(state=>state.authReducer)
function handleLogout(event){
    event.preventDefault()
    dispatch(logout())
}



    return ( 
        <div className="navbar">
            <h1 className="nav-head"><i className="fa-solid fa-brain"></i>Memories</h1>
            <div className="nav-buttons">
                {userState.user && <h2 className="about-us" style={{"backgroundColor" : "#d998f5", "padding" : "5px", "borderRadius" : "5px", "fontSize" : "1rem"}} >Welcome : {userState.user.user}</h2> }
                <a href=""><h2 className="about-us">About US</h2></a>
                <a href=""><h2 className="contact-us">Contact Us</h2></a>
                {userState.user && <a href="" onClick={handleLogout}><h2 className="contact-us" style={{"backgroundColor" : "#d998f5", "padding" : "5px", "borderRadius" : "5px"}}>Logout</h2></a>}
            </div>
        </div>
     );
}
 
export default Navbar;