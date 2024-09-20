
export default interface IUser {
    user:string  
    pass:string 
    puntuacion: number[]
    vefificarPass(passwd:string ):boolean    
}