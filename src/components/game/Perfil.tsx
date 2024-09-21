import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Header from "./Header";
import { Button, Card } from "react-bootstrap";
import img_user from "../../assets/user.jpg"

export default function Perfil(){

    const navigate= useNavigate()
    const {auth}= useAuth()
    if(!auth){
        navigate("/login")        
    }
    return(<>
        <Header/>
        <h2 className="mt-5 text-center">Perfil de Usuario </h2>
        <Card className="p-2 align-items-center m-auto" style={{width:"250px"}}>
          <Card.Img variant="top"  src={img_user} style={{width:200}} alt="User"/>
          <Card.Body>
            <Card.Title className="text-center">{auth?.user}</Card.Title>
            <Card.Text><strong>Nombre: </strong>{auth?.nombre}</Card.Text>
            <Card.Text><strong>Apellidos:</strong> {auth?.apellido}</Card.Text>
            <Button>Cambiar la contrañena</Button>
          </Card.Body>
        </Card>        
    </>
    ); 
}