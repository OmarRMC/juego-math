import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import bcrypt from "bcryptjs";



// Interfaz del usuario
interface Usuario {
    user: string
    nombre:string 
    apellido?:string
    nivel: number[]
    password: string
    autenticado: boolean
}

// Interfaz para el contexto
interface AuthContextType {
    auth: Usuario | undefined;
    login: (a: string, b: string) => Promise<boolean>
    crear_cuenta: (user: string, pass1: string, pass2: string, nombre: string, apellido?: string) => Promise<boolean>
    salir: () => boolean
    setDatosUser:(pos:number , valor:number)=> void 
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

    
    const hashPassword = async (password: string): Promise<string> => {
        const saltRounds = 10; // Mayor número de rondas = mayor seguridad
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    };

    
    const verifyPassword = async (inputPassword: string, hashedPassword: string): Promise<boolean> => {
        return await bcrypt.compare(inputPassword, hashedPassword);
    };

    const login = async (username: string, pass: string): Promise<boolean> => {
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
        return false
    }
    function  setDatosUser(pos:number , valor:number):void{
        if(auth){
            let {nivel} = auth
            if(nivel){
                nivel[pos]=valor 
                localStorage.setItem(auth.user, JSON.stringify({...auth, nivel }))            
            }
            
        }
         
    }

    const salir = (): boolean => {
        localStorage.setItem("user-activo", "");
        setAuth(undefined);
        return true
    }

    const crear_cuenta = async (user: string, pass1: string, pass2: string, nombre: string, apellido?: string): Promise<boolean> => {
        if (pass1 == pass2) {
            const passHas = await hashPassword(pass1)
            localStorage.setItem(user, JSON.stringify({ user, password: passHas, nombre, apellido, nivel: [0,0,0,0,0], autenticado: true }));
            localStorage.setItem("user-activo", user);
           setAuth({ user, password: passHas, nombre, apellido, nivel: [0,0,0,0,0], autenticado: true })
            return true
        }
        return false
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("user-activo");
        const dato_user = storedUser && localStorage.getItem(storedUser);
        if (dato_user) {
            setAuth(JSON.parse(dato_user));
            console.log(JSON.parse(dato_user))
        }
    }, []);
    return (
        <authContext.Provider value={{ auth, login, crear_cuenta, salir , setDatosUser}}>
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
