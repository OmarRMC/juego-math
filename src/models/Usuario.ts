import IUser from "../interfaces/IUser";

class Usuario  implements IUser{   
    user: string; 
    pass: string;
    puntuacion: number[];
    constructor(user:string , pass:string , puntuacion:number[]=[])
    {                
        this.user=user; 
        this.pass=pass          
        this.puntuacion=puntuacion
        
    }

    vefificarPass(passwd: string): boolean {
        return false 
    }
}