import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { env } from "../config";


import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


// Interfaz del usuario
interface Usuario {
    user: string
    nombre?: string
    apellido?: string
    nivel?: number[]
    level: number
    password?: string
    autenticado: boolean
    score:number 
    rol:number 
}

// Interfaz para el contexto
interface AuthContextType {
    auth: Usuario | undefined;
    login: (a: string, b: string) => Promise<boolean>
    crear_cuenta: (user: string, pass1: string, pass2: string, nombre: string, apellido?: string) => Promise<boolean>
    salir: () => void
    setDatosUser: (pos: number, valor: number) => void
    updateDatosUser(): Promise<boolean>
    iniciando():Promise<boolean> 
    //setAuth: React.Dispatch<React.SetStateAction<Usuario | undefined>>;
}

// Creación del contexto con valor por defecto `undefined`
const authContext = createContext<AuthContextType | undefined>(undefined);

// Tipado de las props del proveedor de contexto
interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const [auth, setAuth] = useState<Usuario | undefined>(undefined);

    const navigate = useNavigate(); 
    const login = async (username: string, pass: string): Promise<boolean> => {
        console.log(env.URL_API);
        const response = await fetch(env.URL_API + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario: username, password: pass })
        }
        )

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            Cookies.set("token", token, { expires: env.TIEMPO_TOKEN_EXPIRE(10) });

            const autenticado= await iniciando();  

            return autenticado;
        }



        /*
         let userDB = localStorage.getItem(username)
         if (userDB) {
             const { user, password} = JSON.parse(userDB);
             const isValid = await verifyPassword(pass, password);
             if (isValid) {
                 setAuth({ ...JSON.parse(userDB) })
                 localStorage.setItem("user-activo", user);
                 return true
             }
         }
             */
        return false
    }
    async  function setDatosUser(pos: number, valor: number): Promise<void> {

        const token = Cookies.get("token")
        if(token){
        const response= await  fetch(env.URL_API+"/game/new_history", {method:"POST", headers:{
        "Content-Type": "application/json",
        "authorization":token
        }, 
        body:JSON.stringify({
            score:valor,level:pos,duration:0
        })
       })

        if(response.ok){
            if(auth){                
                let {nivel}= auth;
                if(nivel){
                    nivel[pos]=valor 
                }
            }
        }

        }
        
        /*if (auth) {
            let { nivel } = auth
            if (nivel) {
                nivel[pos] = valor
                localStorage.setItem(auth.user, JSON.stringify({ ...auth, nivel }))
            }

        }*/

    }

    async function updateDatosUser(): Promise<boolean> {
        const token = Cookies.get('token');

        if (!token) {
            //console.error('No hay token disponible');
            return false;
        }
        const response = await fetch(env.URL_API + "/auth/profile", {
            method: "GET", headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            setAuth({
                user: data.usuario,
                nombre: data.nombre,
                apellido: data.apellido,
                level: data.level,
                score:data.score,
                autenticado: true, 
                rol:data.rol 
            })
            return true;
        }
        return false;


    }

    const salir = () => {
        Cookies.remove('token');        
        setAuth(undefined);
        navigate("/login")
    }

    const crear_cuenta = async (user: string, pass1: string, pass2: string, nombre: string, apellido?: string): Promise<boolean> => {
        console.log(user, nombre, apellido, pass1, pass2);
        
        if (pass1 == pass2) {

           const respose= await fetch(env.URL_API+"/auth/register",{
            method:"POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({usuario:user, nombre, apellido, password:pass1, password1:pass2}) 
           })
           console.log(respose);
           
           if(respose.ok){
            const data = await respose.json()
            const {token} = data
            if(token){
                Cookies.set("token", token); 
                setAuth({ user, nombre, apellido, nivel: [0, 0, 0, 0, 0], level: 1, autenticado: true, score:0 , rol:0})
                return true;     
            }
           }
            /*
            const passHas = await hashPassword(pass1)
            localStorage.setItem(user, JSON.stringify({ user, password: passHas, nombre, apellido, nivel: [0, 0, 0, 0, 0], autenticado: true }));
            localStorage.setItem("user-activo", user);
            setAuth({ user, password: passHas, nombre, apellido, nivel: [0, 0, 0, 0, 0], level: 0, autenticado: true, score:0 })
            return true*/
        }
        return false
    }

    async function iniciando():Promise<boolean> {            
        const token= Cookies.get("token")
        
        if(token){
            const response= await fetch(env.URL_API+"/auth/profile", {method:"GET", headers:{
                'Content-Type': 'application/json',
                'authorization': `${token}`
            }})
            if(response.ok){
                const data = await response.json();                
                if(auth){
                    setAuth({ ...auth,nivel:data.bestScoreLevel,  user:data.usuario, nombre:data.nombre , apellido:data.apellido,  level: data.level, autenticado: true , rol:data.rol})                
                }else {
                    setAuth({    user:data.usuario, nombre:data.nombre , apellido:data.apellido, score:0, nivel:data.bestScoreLevel, level: data.level, autenticado: true , rol:data.rol})                

                }
            }            
            return response.ok             
        }else {
           setAuth(undefined)
           return false; 
        }        
    }

    useEffect(() => {
        
    iniciando(); 
           
    }, []);
    return (
        <authContext.Provider value={{ auth, login, crear_cuenta, salir, setDatosUser, updateDatosUser, iniciando }}>
            {children}
        </authContext.Provider>
    );
}

function useAuth() {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthProvider, authContext, useAuth };
