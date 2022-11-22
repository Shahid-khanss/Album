import {Link} from "react-router-dom"
const Navbar = () => {
    return ( 
        <div className="navbar">
            <h1 className="nav-head"><i className="fa-solid fa-brain"></i>Memories</h1>
            <div className="nav-buttons">
                <a href=""><h2 className="about-us">About US</h2></a>
                <a href=""><h2 className="contact-us">Contact Us</h2></a>
                <Link to="/login"><h2 className="contact-us" style={{"background-color" : "#d998f5", "padding" : "5px", "border-radius" : "5px"}}>Login</h2></Link>
            </div>
        </div>
     );
}
 
export default Navbar;