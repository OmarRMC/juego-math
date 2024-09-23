import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { Alert,  Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";

import style from "../../styles/Operaciones.module.css"
import { useEffect, useRef, useState } from "react";
import { useCal } from "../../context/ControlOpe";
import { useAuth } from "../../context/AuthContext";

export default function Operaciones() {
    const [enunciado, setEnenunciado] = useState<string>(""); 
    const [opciones, setOpciones] = useState<number[]>([])
    const [seleccionado ,setSelecionado ] = useState<number|undefined>(); 
    const [error , setError] = useState<boolean>(false); 
    const  navigate= useNavigate()
    
    let { complejidad, preg } = useParams<{ complejidad: string, preg: string }>();
    let aux_preg: number = parseInt(preg ?? "1");
    let aux_complejidad: number = parseInt(complejidad ?? "1");
    const referencia=  useRef<HTMLButtonElement>(null);
    const {cal, generarEnunciado,  setSelecion, getPromedio }=useCal()

    const {setDatosUser} = useAuth(); 

    if(cal) {
        cal.setComplejidad=aux_complejidad; 
    }
     
    function verifica_next(){
        referencia.current?.click(); 
    }

    function prueba() {        
        navigate("/")        
    }

    function getOperaciones(n:number ):string {
        if(n<=5){
            return "+"            
        }else if(n<=10){
            return "-"            
        }else if(n<=15){
            return "*"            
        }else if(n<=20){
            return "/"            
        }else {
            return "+"
        }
    }
    
    useEffect(()=>{
        if(cal?.getEnunciado(aux_preg)){
            setEnenunciado(cal.getEnunciado(aux_preg)??"...")
            setOpciones(cal.getOpciones(aux_preg)??[])
            setSelecionado(cal.getSeleccionado(aux_preg))            
        }else {
            const auxi =generarEnunciado(aux_preg, getOperaciones(aux_preg))
            setEnenunciado(auxi.enunciado)
            setOpciones(auxi.respuesta)      
            setSelecionado(undefined); 
        }
        
    },[preg])
    const next = (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.currentTarget;    
        const selectedInput = form.querySelector('input[name="options"]:checked') as HTMLInputElement | null;    
        const selectedOption = selectedInput ? selectedInput.value : null; 
        console.log(selectedOption);
        if(selectedOption){
            setError(false)
            const auxi_select = Number(selectedOption)                
            setSelecion(aux_preg, auxi_select)
            console.log(cal)            
            if(aux_preg==20){
                const auxi_pro=getPromedio()
                setDatosUser(aux_complejidad, auxi_pro);                     
               navigate("/Revision"); 
            }else {
               navigate(`/ope/${complejidad}/${aux_preg < 20 ? aux_preg + 1 : aux_preg}`)            
            }
        } else {
            setError(true)
        }        
    };
    function ok(evet:React.ChangeEvent<HTMLInputElement>) {
        setSelecionado(Number(evet.target.value))
    }
    return (
        <>
            <Header></Header>
            <div className="p-5">
            <Button className="m-auto" variant="dark"  onClick={prueba}> Volver al Menu </Button>
                <h3>Pregunta {preg}  -  Nivel {aux_complejidad}</h3>
                <Container>
                    <Row>
                        <Col sm={4} className="mt-3">
                            <ListGroup as="ol" numbered>
                                <ListGroup.Item
                                    as="li"
                                    className={`d-flex justify-content-between align-items-start ${getOperaciones(aux_preg)=="+"&&'text-success'}`}
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Suma</div>
                                        Acertados
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    className={`d-flex justify-content-between align-items-start ${getOperaciones(aux_preg)=="-"&&'text-success'}`}
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Resta</div>
                                        Acertados
                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item
                                    as="li"
                                    className={`d-flex justify-content-between align-items-start ${getOperaciones(aux_preg)=="*"&&'text-success'}`}
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Multiplicacion</div>
                                        Acertados
                                    </div>                                    
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    className={`d-flex justify-content-between align-items-start ${getOperaciones(aux_preg)=="/"&&'text-success'}`}
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Division</div>
                                        Acertados
                                    </div>                                    
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col sm={8} className="mt-3">
                            <div className={style.principal_ope}>
                                <h2 className={style.pregunta}>¿ {enunciado} ?</h2>
                                <p>Seleccione:</p>
                                <Form onSubmit={next}>
                                    <div className={`mb-3 d-flex flex-column  ${style.box_respuestas}`}>
                                        {
                                            opciones.map((e) =>
                                                <Form.Check
                                                    inline
                                                    value={e}
                                                    label={e}
                                                    name="options"
                                                    type="radio"
                                                    id={`inline-radio-${e}`}
                                                    key={e}
                                                    checked={seleccionado !== null && seleccionado !== undefined ? seleccionado === e : false} // Comparar correctamente incluso si seleccionado es 0
                                                    onChange={ok}
                                                    className={style.radio_btn+ " d-flex gap-2  align-items-center"}
                                                />
                                            )
                                        }
                                    </div>
                                   <button type="submit"  className={style.btnAuxi} ref={referencia} >Hola </button>
                                </Form>
                            </div>
                    {
                    error
                    &&
                    <Alert className={`position-absolute   d-block m-auto mt-3 ${style.alerta}`} style={{width:250}} variant="info">Seleccione al<strong> menos uno</strong>
                    </Alert>
                    }
                        </Col>
                    </Row>
                </Container>
                <div className=" mt-3 d-flex gap-5" style={{justifyContent:"space-evenly"}}>
                    <Button >
                        <Link to={`/ope/${complejidad}/${(aux_preg > 1) ? aux_preg - 1 : 1}`} className="text-light">Prev</Link>
                    </Button>                
                    <Button  variant="success"  onClick={verifica_next}>                        
                        {
                            aux_preg==20?"Finalizar":"Next"
                        }                        
                    </Button>
                </div>
                
            </div>
        </>
    )
}