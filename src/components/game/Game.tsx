import { Col, Container, Image, Row } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext"

import style  from '../../styles/Game.module.css'

import img1 from "../../assets/img-1.jpg"
import { useNavigate } from "react-router-dom";

export default function Game() {

    const { auth } = useAuth();
    const navigate= useNavigate()
    let nivel = auth?.nivel;

    const ope=(complejidad:number)=>{
        navigate(`/ope/${complejidad}/1`)
    }

    return (
        <div style={{ background: "#00AFFF" }}>
            <Container className={`d-flex flex-column  align-items-center justify-content-center  gap-5 ${style.principal}`} style={{ height: "90vh" }}>
                <Row style={{ height: 200 }}>
                    <Col style={{ maxWidth: 250 }}  onClick={()=>ope(1)}>
                        <Image src={`${img1}`} width={"100%"} rounded  data-text="Basico"/>
                        <p>Basico</p>
                    </Col>
                    <Col style={{ maxWidth: 250 }}  onClick={()=>ope(2)}>
                        <Image src={`${img1}`} width={"100%"} rounded />
                        <p>Intermedio</p>
                    </Col>
                </Row>
                <Row style={{ height: 200 }}>
                    <Col style={{ maxWidth: 250 }}>
                        <Image src={`${img1}`} width={"100%"} rounded />
                        <p>Avanzado</p>
                    </Col>
                    <Col style={{ maxWidth: 250 }}><Image src={`${img1}`} width={"100%"} rounded />
                    <p>Final</p>
                    </Col>
                </Row>

            </Container>
        </div>
    )

}