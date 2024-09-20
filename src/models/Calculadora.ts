
interface EstructuraInfo{
    enunciado:string 
    opciones:number[]
    select?:number
    solucion:number 
}

export default  class Calculadora{

    private Preguntas:Map<number , EstructuraInfo>; 
    private complejidad:number 
    constructor(complejidad: number ){
        this.Preguntas = new Map<number, EstructuraInfo>();         
        this.complejidad=complejidad; 
    }

    
    public get getComplejidad() : number {
        return  this.complejidad
    }

    public getPregunta(nro_pregunta:number):EstructuraInfo|undefined{
        return this.Preguntas.get(nro_pregunta)
    }

    /**
     * getEnunciado
     */
    public getEnunciado(nro_preg:number):string|undefined {
        return this.Preguntas.get(nro_preg)?.enunciado; 
    }

    /**
     * name
     */
    public getOpciones(nro_pregun:number):number[]|undefined {
        return this.Preguntas.get(nro_pregun)?.opciones; 
    }

    public generarEnunciado(nro_preg:number, ope:string):{enunciado:string, respuesta:number[]}{
        const a:number =parseInt((Math.random()*(10**this.complejidad))+""); 
        const b:number =parseInt((Math.random()*(10**this.complejidad))+""); 
        
        let enunciado:string=a+ope+b; 
        const solucion=this.getOperacion(a,ope,b);
        console.log(enunciado, solucion)

        let respuesta = new Set<number>(); 
        let option=0; 
        
        while(respuesta.size<5){
            option=parseInt((Math.random()*(10**(this.complejidad+1)))+"");             
            if( option > a && option<b){
                respuesta.add(solucion) 
            }else {
                respuesta.add(option); 
            }
            console.log(respuesta)
        }
        if(!respuesta.has(solucion)){
            respuesta.delete(option); 
            respuesta.add(solucion)
        }
        
        this.Preguntas.set(nro_preg,
            {enunciado, 
            opciones:Array.from(respuesta),            
            solucion})
        console.log(this.Preguntas)

        return {enunciado, respuesta:Array.from(respuesta)}
    }
    

    public getOperacion(a:number,ope:string,b:number):number {

        switch (ope) {
            case "+":
                return a+b ; 
                
            case "-":
                    return a-b ; 
            case "*":
                return a*b ; 
            
            case "/":
                    return a/b ; 
            
            default:
                return -1; 
        }
    }





}