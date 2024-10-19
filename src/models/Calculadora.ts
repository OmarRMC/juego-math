
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

    public set setComplejidad(v : number) {
        this.complejidad = v;
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
     * getSeleccionado
     */
    public getSeleccionado(nro_preg:number):number|undefined {
        return this.Preguntas.get(nro_preg)?.select
    }
    /**
     * name
     */
    public getOpciones(nro_pregun:number):number[]|undefined {
        return this.Preguntas.get(nro_pregun)?.opciones; 
    }


    
    public get getPreguntas() {
        return this.Preguntas; 
    }
    
    
    public get getPromedio() : number {
        let correctos = 0 ; 
        let caltidad=12;         
        this.Preguntas.forEach((data)=>{            
            let { select ,solucion }=data 
            if(select!==null && solucion!== null){                
                if(select===solucion){
                    correctos++;             
                }
            }
        })
        let promedio=correctos*100/caltidad        
        return Number(promedio.toFixed(2));  
    }
    
    public generarEnunciado(nro_preg:number, ope:string):{enunciado:string, respuesta:number[]}{
        const a:number =parseInt((Math.random()*(10**this.complejidad))+""); 
        let b:number =parseInt((Math.random()*(10**this.complejidad))+""); 
        if(ope=="/" && b==0){
            b=1 ; 
        }
        let enunciado:string=a+ope+b; 
        const solucion=this.getOperacion(a,ope,b);
        //console.log(enunciado, solucion)

        let respuesta = new Set<number>(); 
        let option=0; 
        while(respuesta.size<5){
            if(ope =="/"){              
                option=parseFloat((Math.random()*(10**(this.complejidad+1)))+"");                            
                option = parseFloat(option.toFixed(2))
            }else {
                option=parseInt((Math.random()*(10**(this.complejidad+1)))+"");             
            }
            if( option < a && option<b){
                respuesta.add(solucion) 
            }else {
                respuesta.add(option); 
            }
        }
        if(!respuesta.has(solucion)){
            respuesta.delete(option); 
            let pos=Math.floor(Math.random()*5)
            let lista = [...respuesta]; 
            lista.splice(pos,0, solucion)
            respuesta= new Set(lista);             
        }
        
        this.Preguntas.set(nro_preg,
            {enunciado, 
            opciones:Array.from(respuesta),            
            solucion})
        //console.log(this.Preguntas)

        return {enunciado, respuesta:Array.from(respuesta)}
    }
    

    /**
     * setSelecion
     */
    public setSelecion(nro_preg:number , opcion:number) {
        const auxi = this.Preguntas.get(nro_preg)
        if(auxi)
            this.Preguntas.set(nro_preg, {...auxi,"select":opcion})
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
                let auxi=a/b 
                return parseFloat(auxi.toFixed(2)) ; 
            
            default:
                return -1; 
        }
    }





}