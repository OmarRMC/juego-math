
import { useCal } from "../../context/ControlOpe";
import { Container, Table } from "react-bootstrap";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function Revision() {

    const { cal } = useCal()
    
    return (
        <>
            <Header></Header>
            <Container className="p-5">
                <h4>Resumen del ultimo Test </h4>
                <Link to="/" >Finalizar la Revision</Link>
                <p>Promedio: {cal?.getPromedio?cal.getPromedio:"0"}</p>
                
                <Table striped bordered hover style={{ maxWidth: "450px" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Pregunta</th>
                            <th>Tu respuesta</th>
                            <th>Correcta</th>
                            <th>Obs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (cal?.getPreguntas) &&
                            Array.from(cal?.getPreguntas).map(([key, item]) =>
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{item.enunciado}</td>
                                    <td>{item.select}</td>
                                    <td>{item.solucion}</td>
                                    <td style={{ background: item.select == item.solucion ? 'green' : 'red', color: 'white' }}>{item.select == item.solucion ? "✔" : "❌"}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
                
            </Container>
        </>
    );


}