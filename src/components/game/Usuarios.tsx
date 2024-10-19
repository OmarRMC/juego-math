import { useEffect, useState } from "react"
import Header from "./Header"
import { env } from "../../config"
import Cookies from 'js-cookie';
import { Alert, Button, Container, Table } from "react-bootstrap";

interface typeUser{
    apellido: string 
    level: number 
    nombre: string 
    rol: number
    score: number
    usuario: string
}

export default function Usuarios() {

    const [list_user, setList_user] = useState<typeUser[]|undefined>(undefined);
    const [alerta, setAlerta] = useState<string|undefined>(undefined); 
    const get_users = async () => {

        const token = Cookies.get("token")
        if (token) {
            const response = await fetch(env.URL_API + "/game/get_users", {
                method: "GET", headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                }
            })
            if (response.ok) {
                const data = await response.json();
                setList_user(data)
            }

        }

    }

    const  ResetPassword=async (idUser:string)=>{
        const token = Cookies.get("token")
        if(token){
            
            const response= await fetch(env.URL_API + "/auth/reset-password", {
                method:"POST", 
                headers:{
                    "Content-Type": "application/json",
                    "authorization": token
                }, 
                body:JSON.stringify({
                    usuario:idUser
                })

            })
            if(response.ok){
                const data = await response.json(); 
                setAlerta(data.message+" -> Su nueva contraseña es: " +idUser)                
            }else {
                setAlerta("Error en resetear  la contraseña ")
            }
            setTimeout(()=>{
                setAlerta(undefined)
            },3000)
        }
    }

    useEffect(() => {
        get_users();
    }, [])


    return (
        <>
            <Header></Header>
            <Container className="p-5">
                <h4>Lista de usuarios  </h4>
                <Table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list_user?.map((e) =>
                                <tr key={e.usuario}>
                                    <td>{e.usuario}</td>
                                    <td>{e.nombre}</td>
                                    <td>{e.apellido}</td>
                                    <td>
                                        <Button variant="outline-primary" onClick={(_e1)=>ResetPassword(e.usuario)}>Reset Pass</Button>{' '}                                        
                                        <Button variant="outline-danger">Eliminar</Button>{' '}
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
                
            </Container>

            {
                alerta&&<div>
                    <Alert key="primary" variant="primary">
                    {alerta}</Alert>
                </div>
            }

        </>
    )
}