import { Alert, Button, Form } from "react-bootstrap"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';



import Loading from "../Loading";

function Login() {
    const [txtUser, setTxtUser] = useState<string>("");
    const [txtPass, setTxtPass] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const { login, iniciando } = useAuth();
    const navigate = useNavigate();
    const [proces_check,setProces_check ] = useState<boolean>(false); 

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault()
        setProces_check(true); 
        console.log("Datos Guardados...")
        if (await login(txtUser, txtPass)) {
            navigate("/");
        } else {
            setProces_check(false); 
            setError(true)
        }
    };

    const crearCuenta = () => {
        navigate("/new_acount")
    }
    const verificado = async () => {
        const autenticado = await iniciando();
        if (autenticado) {
            navigate("/")
        }
        setLoading(false)
    }
    useEffect(() => {
        verificado();
    }, [])

    return (
        <>
            {
                loading ?
                    <Loading />
                    :
                    <div className="d-flex flex-column justify-content-center align-items-center " style={{ height: '100vh' }}>
                        {
                            error && <Alert variant="danger">Error en sus credenciales</Alert>
                        }
                        <h3>Bienvenido al Juego de Matematicas</h3>
                        <Form className="m-3 d-flex   flex-column bg-red p-3" style={{ maxWidth: 500, borderRadius: 10, background: "#ffe093" }} onSubmit={handleLogin}>
                            <Form.Group className="m-2" >
                                <Form.Label>User</Form.Label>
                                <Form.Control type="text" onChange={e => setTxtUser(e.target.value)} required></Form.Control>
                                <Form.Text >Ingrese su usuario </Form.Text>
                            </Form.Group>
                            <Form.Group className="m-2" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={e => setTxtPass(e.target.value)} required></Form.Control>
                                <Form.Text>Ingrese su Contraseña  </Form.Text>
                            </Form.Group>

                            <div className="d-flex justify-content-center gap-3">
                                <Button type="submit" variant="primary">
                                {proces_check&&
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />}

                                    Iniciar</Button>
                                <Button variant="secondary" onClick={crearCuenta}>Crear Cuenta</Button>
                            </div>
                        </Form>
                    </div>
            }
        </>
    )
}

export default Login 