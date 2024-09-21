
import { createContext, ReactNode, useContext, useState } from "react";
import Calculadora from "../models/Calculadora";

interface EstructuraInfo{
    enunciado:string 
    opciones:number[]
    select?:number
    solucion:number 
}

interface OperacionContextType {
    cal: Calculadora| null;
    generarEnunciado:(nro_preg:number, ope:string) => {enunciado:string, respuesta:number[]}   
    getPregunta:(nro_preg:number)=>EstructuraInfo|undefined
    getEnunciado:(nro_preg:number)=>string|undefined
    getOpciones:(nro_pregun:number)=>number[]|undefined 
    setSelecion:(nro_preg:number , opcion:number)=>void 
    getPromedio:()=>number
    getPreguntas:()=>Map<number,EstructuraInfo>
    NewCaculadora:(nivel:number )=>void 
  }



const opeContext = createContext<OperacionContextType | undefined>(undefined);
interface OpeProviderProps {
    children: ReactNode;
}
export  function ControlOpe({children}:OpeProviderProps){

    const [cal, setCal] = useState<Calculadora>(new Calculadora(1));
    function generarEnunciado(nro_preg:number, ope:string):{enunciado:string, respuesta:number[]}{
        return cal.generarEnunciado(nro_preg, ope)
    }
    function getPregunta(nro_preg:number):EstructuraInfo|undefined {
        return  cal.getPregunta(nro_preg)
    }

    function getOpciones(n:number):number[]|undefined {
        return cal.getOpciones(n)
    }

    function NewCaculadora(nivel:number) {
        setCal(new Calculadora(nivel))
    }

    function getEnunciado(n:number) :string|undefined {
        return cal.getEnunciado(n)
    }

    function setSelecion(a:number , b:number ) {
        cal.setSelecion(a,b)
    }

    function getPromedio():number {
        return cal.getPromedio; 
    }

    function getPreguntas(){
        return cal.getPreguntas
    }
    return(
    <opeContext.Provider value={{cal, generarEnunciado, getPregunta, getEnunciado, getOpciones, setSelecion, getPromedio, getPreguntas, NewCaculadora}}>
            {children}
        </opeContext.Provider>
    )    
}


export const useCal = () => {
    const context = useContext(opeContext);
    if (!context) {
      throw new Error('useJuego debe ser usado dentro de un JuegoProvider');
    }
    return context;
  };
  

