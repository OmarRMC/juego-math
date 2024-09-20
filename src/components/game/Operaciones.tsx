import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import { Badge, Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";

import style from "../../styles/Operaciones.module.css"
import { useEffect, useRef, useState } from "react";
import Calculadora from "../../models/Calculadora";
import { useCal } from "../../context/ControlOpe";


export default function Operaciones() {


    const [enunciado, setEnenunciado] = useState<string>(""); 
    const [opciones, setOpciones] = useState<number[]>([])

    let { complejidad, preg } = useParams<{ complejidad: string, preg: string }>();
    let aux_preg: number = parseInt(preg ?? "1");
    let auxi_compl=parseInt(complejidad??"1")
    const referencia=  useRef<HTMLButtonElement>(null);
    const {cal, generarEnunciado, getPregunta, getEnunciado, getOpciones}=useCal()

    const prueba=()=>{
        //generarEnunciado(aux_preg, "+"); 
    }
    
    useEffect(()=>{
        let auxi=generarEnunciado(aux_preg, "+")
        setEnenunciado(auxi.enunciado)
        setOpciones(auxi.respuesta)      
        console.log(auxi)  
    },[])
    const next = (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.currentTarget;    
        const selectedInput = form.querySelector('input[name="options"]:checked') as HTMLInputElement | null;    
        const selectedOption = selectedInput ? selectedInput.value : null; 
        if(selectedOption){            
        }
        //alert(`Has seleccionado: ${selectedOption}`);
    };
    return (
        <>
            <Header></Header>
            <div className="p-5">
                <h3>Pregunta {preg}</h3>
                <Container>
                    <Row>
                        <Col sm={4} className="mt-3">
                            <ListGroup as="ol" numbered>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Suma</div>
                                        Acertados
                                    </div>
                                    <Badge bg="primary" pill>
                                        0
                                    </Badge>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Resta</div>
                                        Acertados
                                    </div>
                                    <Badge bg="primary" pill>
                                        0
                                    </Badge>
                                </ListGroup.Item>

                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Multiplicacion</div>
                                        Acertados
                                    </div>
                                    <Badge bg="primary" pill>
                                        0
                                    </Badge>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Division</div>
                                        Acertados
                                    </div>
                                    <Badge bg="primary" pill>
                                        0
                                    </Badge>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col sm={8} className="mt-3">
                            <div className={style.principal_ope}>
                                <h2 className={style.pregunta}>¿ {enunciado} ?</h2>
                                <p>Seleccione:</p>
                                <Form onSubmit={next}>
                                    <div className={`mb-3 d-flex flex-column ${style.box_respuestas}`}>
                                        {
                                            opciones.map((e) =>
                                                <Form.Check
                                                    inline
                                                    value={e}
                                                    label={e}
                                                    name="options"
                                                    type="radio"
                                                    id={`inline-radio-1`}
                                                    key={e}
                                                />
                                            )
                                        }
                                    </div>
                                   <button type="submit"  ref={referencia} >Hola </button>
                                </Form>
                            </div>
                        </Col>

                    </Row>
                </Container>
                <div className=" mt-3 d-flex gap-5" style={{justifyContent:"space-evenly"}}>
                    <Button >
                        <Link to={`/ope/${complejidad}/${(aux_preg > 1) ? aux_preg - 1 : 1}`} className="text-light">Prev</Link>
                    </Button>
                    <Button onClick={prueba}>Prueba </Button>
                    <Button ><Link to={`/ope/${complejidad}/${aux_preg < 5 ? aux_preg + 1 : aux_preg}`} className="text-light"> Next</Link></Button>
                </div>
            </div>
        </>
    )
}