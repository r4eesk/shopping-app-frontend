import { MDBBtn, MDBContainer } from "mdb-react-ui-kit"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom";

const ErrorComponent = () => {

    const location = useLocation();
    let error = "Page not found!!!";
    if(location.state!==null){
        error = location.state.error;
    }
    
    return(
        <MDBContainer className="m-5">
            <h1>Oooooooppppsssss!!!!</h1>
            <h3>We can't find the page you are looking for.</h3>
            <h5 className="text-danger">{error}</h5>
            <Link to='/'>
                <MDBBtn outline color="success">Go to Home</MDBBtn>
            </Link>
        </MDBContainer>
    )
}

export default ErrorComponent;