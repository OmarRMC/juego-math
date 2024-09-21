import { Spinner } from "react-bootstrap";

export default function Loading() {
    
   return(<>
   <div className="d-flex  align-content-center justify-content-center flex-wrap" style={{height:"100vh"}}>
     <div className="d-flex gap-1">
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="success" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
      <Spinner animation="grow" variant="dark" />
      </div>
      </div>
    </>
   ); 
}