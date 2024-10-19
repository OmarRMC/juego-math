import {  useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Header from "./Header";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import img_user from "../../assets/user.jpg"
import { useEffect, useState , FormEvent} from "react";
import style from "../../styles/Perfil.module.css"
import { env } from "../../config";
import Cookies from 'js-cookie';

export default function Perfil() {

  const navigate = useNavigate()
  const { auth, updateDatosUser } = useAuth()
  const [update_pass, setUpdate_pass] = useState<boolean>(false)
  const [proceso , setProceso]=useState<boolean>(false); 
  const [exito, setExito]= useState<boolean>(false); 
  const [error, setError] = useState<boolean>(false); 
  if (!auth) {
    navigate("/login")
  }

  const btn_update_pass = () => {
    setUpdate_pass(true);
  }
  const btn_cancelar=()=>{
    setUpdate_pass((_e)=>false)
  }


  const btn_actualizar=async (e:FormEvent)=>{
    e.preventDefault(); 
    setError(false)
    setProceso(true)
    console.log(e.target)
    const fromData = new FormData(e.target as HTMLFormElement); 
    console.log(new URLSearchParams(fromData as any ));
    
    //console.log(fromData.get("password"));
    //console.log(fromData.get("new_password"))
    //console.log(fromData.entries())
    const token= Cookies.get("token")
    if(token){      
      const reponse= await fetch(env.URL_API+"/auth/forgot-password", {
        method:"POST", 
        headers:{
          'Content-Type':'application/x-www-form-urlencoded', 
          "authorization":token
        }, 
        body:new URLSearchParams(fromData as any )
      })

      if(reponse.ok){
        const data= await reponse.json(); 
        console.log("Se cambio la contraseña", data )
        setExito(true); 
        setTimeout(() => {
          setUpdate_pass(false); 
          setExito(false);
        }, 400);
        setProceso(false)
        setError(false)
      }else {
        console.log("No se cambio la contraseña ");
        setProceso(false)
        setError(true)
      }
    }else {
      navigate("/login")
    }

  }
  useEffect(() => {
    async function vefiryProfile() {
      const res = await updateDatosUser()
      console.log(res);
      if (!res) {
        navigate("/login")
      }
    }
    vefiryProfile();
  }, [])
  return (<>
    <Header />
    <h2 className="mt-5 text-center">Perfil de Usuario </h2>
    <Card className="p-2 align-items-center m-auto" style={{ width: "250px" }}>
      <Card.Img variant="top" src={img_user} style={{ width: 200 }} alt="User" />
      <Card.Body>
        <Card.Title className="text-center">{auth?.user}</Card.Title>
        <Card.Text><strong>Nombre: </strong>{auth?.nombre}</Card.Text>
        <Card.Text><strong>Apellidos:</strong> {auth?.apellido}</Card.Text>
        <Card.Text><strong>Nivel Actual:</strong> {auth?.level}</Card.Text>
        <Card.Text><strong>Promedio General:</strong> {auth?.score}</Card.Text>
        <Button onClick={btn_update_pass}>Cambiar la contrañena</Button>
      </Card.Body>
    </Card>
    {update_pass ? 
    <div className={style.contanier_alerta}>
     <Container fluid="sm" className={style.alerta}>
      {
        exito?<p className="text-center m-auto"><b>Se actualizo la contraseña</b></p>
        :
        <Form onSubmit={btn_actualizar}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Contraseña Actual</Form.Label>
          <Form.Control required name="password"  type="password" placeholder="Ingrese su contraseña" />          
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Nueva Contraseña</Form.Label>
          <Form.Control  required name="new_password" type="password" placeholder="Nueva Contraseña" />
        </Form.Group>
        <Form.Group className="d-flex gap-3 justify-content-center align-items-center">
        {error&& <Spinner animation="grow" variant="danger"  size="sm" />}
        <Button variant="primary" type="submit">
        {proceso&&<Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        }   Actualizar
        
        </Button>
        <Button variant="danger"  onClick={btn_cancelar}>
          Cancelar</Button>
        </Form.Group>
        </Form>
      }
      </Container>
    </div> : <></>}
  </>
  );
}