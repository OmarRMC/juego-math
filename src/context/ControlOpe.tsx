
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

    function getEnunciado(n:number) :string|undefined {
        return cal.getEnunciado(n)
    }
    return(
        <opeContext.Provider value={{cal, generarEnunciado, getPregunta, getEnunciado, getOpciones}}>
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
  

