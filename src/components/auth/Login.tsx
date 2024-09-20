import { Alert, Button, Form } from "react-bootstrap"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";




import Loading from "../Loading";

function Login() {
    const [txtUser, setTxtUser] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const { auth, login } = useAuth();
    const navigate = useNavigate();

    const  handleLogin =async (event: React.FormEvent) => {
        event.preventDefault()
        console.log("Datos Guardados...")
        if (await login(txtUser, txtUser)) {
            navigate("/");
        } else {
            setError(true)
        }
    };
    const crearCuenta = () => {
        navigate("/new_acount")
    }
    const verificado=async ()=>{
        const dataInfo = localStorage.getItem("user-activo")
        if (dataInfo) {
            const datos_actuales= localStorage.getItem(dataInfo); 
            const {autenticado} = datos_actuales&&JSON.parse(datos_actuales)
            if (autenticado) {
                navigate("/")
            }
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
                                <Form.Control type="text" onChange={e => setTxtUser(e.target.value)}></Form.Control>
                                <Form.Text >Ingrese su usuario </Form.Text>
                            </Form.Group>
                            <Form.Group className="m-2" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"></Form.Control>
                                <Form.Text>Ingrese su Contraseña  </Form.Text>
                            </Form.Group>

                            <div className="d-flex justify-content-center gap-3">
                                <Button type="submit" variant="primary">Iniciar</Button>
                                <Button variant="secondary" onClick={crearCuenta}>Crear Cuenta</Button>
                            </div>
                        </Form>
                    </div>
            }



        </>
    )
}

export default Login 