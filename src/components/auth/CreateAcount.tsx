import { Alert, Button, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateAccount() {
    const {crear_cuenta} = useAuth(); 
    const navigate = useNavigate()

    const [error, setError] = useState<boolean>(false); 

    async function  submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Previene el refresco de la página
        const form = e.currentTarget; // Referencia al formulario actual    
        const usuario = form.usuario.value;
        const nombre = form.nombre.value;
        const apellido = form.apellido.value;
        const pass1 = form.pass1.value;
        const pass2 = form.pass2.value;
        console.log({ usuario, nombre, apellido, pass1, pass2 });
        //user: string, pass1: string, pass2: string, nombre: string, apellido?: string
        if(await crear_cuenta(usuario, pass1, pass1, nombre, apellido)){
            navigate("/")
        }else {
            setError(true)
        } 
    }

    return (
        <>
        <div className="d-flex flex-column justify-content-center align-items-center " style={{height:"100vh"}}>
            
            {
                error&&<Alert variant="danger">Error en los datos </Alert>
            }
            <h4>Crea una nueva cuenta para monitorear tus avances</h4>
            <Form onSubmit={submitForm} className="p-4" style={{maxWidth:"500px", background:"#5cc1f3", borderRadius:10}}>
                <Form.Group className="mb-3" controlId="formUsuario">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control name="usuario" type="text" placeholder="usuario" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control name="nombre" type="text" placeholder="Nombre"required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formApellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control name="apellido" type="text" placeholder="Apellido" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPass1">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control name="pass1" type="password" placeholder="Password" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPass2">
                    <Form.Label>Repetir la contraseña</Form.Label>
                    <Form.Control name="pass2" type="password" placeholder="Password" required/>
                </Form.Group>

                <Button variant="secondary" type="submit">Enviar</Button>
            </Form>
        </div>
        </>

    );
}
