import { Col, Container, Image, ListGroup, ProgressBar, Row } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext"

import style from '../../styles/Game.module.css'

import img1 from "../../assets/img-1.jpg"
import nivel1 from "../../assets/nivel1.jpg"
import nivel2 from "../../assets/nivel2.jpg"
import nivel3 from "../../assets/nivel3.jpg"

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCal } from "../../context/ControlOpe";

export default function Game() {

    const { auth , iniciando} = useAuth();
    const navigate = useNavigate()

    const {NewCaculadora} = useCal()
    const ope = (complejidad: number) => {
        navigate(`/ope/${complejidad}/1`)
    }

    useEffect(()=>{
        NewCaculadora(1)
        iniciando()
        
    }, [])

    return (
        <div style={{ background: "#A0AFFF", minHeight:"90vh" }} className="d-flex flex-column p-2" >
            <h3 className="ms-4 mt-4">Niveles y puntuaciones </h3>
            {
                <Container className={`d-flex align-items-center justify-content-center gap-5 m-auto ${style.resposivo}`} style={{ minHeight: "70vh", maxWidth:"750px" }}>
                <Col className={`${style.principal}`}>
                
                <Row style={{ height: "50%" }} className="justify-content-center">
                    <Col style={{ width:"50%"}}  onClick={() => ope(1)}>
                        <Image src={`${nivel1}`} width={"100%"} rounded data-text="Basico" />
                        <p className="text-center"><strong>Basico</strong></p>
                    </Col>
                    <Col style={{width: "50%"}} className={auth?(auth.level>=2?"":style.bloqueado):""} onClick={() => ope(2)}>
                        <Image src={`${nivel2}`} width={"100%"} rounded />
                        <p className="text-center"><strong>Intermedio</strong></p>
                    </Col>
                </Row>
                <Row style={{ height: "50%" }} className="justify-content-center">
                    <Col style={{ width: "50%" }} className={auth?(auth.level>=3?"":style.bloqueado):""} onClick={() => ope(3)}>
                        <Image src={`${nivel3}`} width={"100%"} rounded />
                        <p className="text-center"><strong>Avanzado</strong></p>
                    </Col>
                    <Col style={{ width:"50%"}} className={auth?(auth.level>=4?"":style.bloqueado):""} onClick={() => ope(4)}>
                        <Image src={`${img1}`} width={"100%"} rounded />
                        <p className="text-center"><strong>Pro</strong></p>
                    </Col>                    
                </Row>
            </Col>
            <Col className={`${style.principal_puntuacion}`}>
            <ListGroup as="ol" numbered>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Nivel Basico</div>                            
                            <ProgressBar variant="success" now={ (auth?.nivel)?auth.nivel[0]:0} label={`${(auth?.nivel)?auth.nivel[0]:0}%`}  animated/>
                        </div>                        
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Nivel intermedio</div>
                            <ProgressBar variant="warning" now={ (auth?.nivel)?auth.nivel[1]:0} label={`${(auth?.nivel)?auth.nivel[1]:0}%`}  animated/>
                            
                        </div>                        
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                        <div className="fw-bold">Nivel Avanzado</div>
                        <ProgressBar variant="info" now={ (auth?.nivel)?auth.nivel[2]:0} label={`${(auth?.nivel)?auth.nivel[2]:0}%`}  animated/>
                        
                        </div>                        
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                        <div className="fw-bold">Nivel Pro</div>
                        <ProgressBar  now={ (auth?.nivel)?auth.nivel[3]:0} label={`${(auth?.nivel)?auth.nivel[3]:0}%`}  animated/>
                        </div>                        
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            </Container>    
            }
                            
        </div>
    )
}