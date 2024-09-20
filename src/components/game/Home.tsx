import { Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import Header from "./Header";
import Game from "./Game";

export default function Home() {
    
    return(

        <>
        <Header></Header>
        <Game></Game>
        </>
    ); 
}