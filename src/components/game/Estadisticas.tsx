import { useEffect, useState } from "react"
import Header from "./Header"
import { env } from "../../config"
import Cookies from 'js-cookie';

//import { createChart } from 'lightweight-charts';

import Chart from 'chart.js/auto';

import "../../styles/Estadisticas.css"
interface typeHistory {
    id: string,
    date: string,
    level: number,
    score: number
}
export default function Estadisticas() {
    const [lista, setLista] = useState<typeHistory[] | undefined>(undefined);
    

    const getHitorias = async () => {
        const token = Cookies.get("token");
        if (token) {
            const response = await fetch(env.URL_API + "/game/history_list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                }
            })
            if (response.ok) {
                const data = await response.json();
                setLista(data)
                console.log(data);

            }

        }
    }

    let chartInstance:any = null
    async function graficar(nivel: number, id_html: string) {
        
        const colors = [
            '#9BD0F5', // Color para la primera barra
            '#FF6384', // Color para la segunda barra
            '#36A2EB', // Color para la tercera barra
            '#FFCE56', // Color para la cuarta barra
            '#4BC0C0', // Color para la quinta barra
            '#9966FF', // Color para la sexta barra
            '#FF9F40'  // Color para la séptima barra
        ];
        const fil_data = lista?.filter(e => e.level == nivel)
        
        const data = fil_data?.map((e, pos) => {
            return { intento: pos, puntuacion: e.score }
        })

        
        const elemento = document.getElementById(id_html) as HTMLCanvasElement;
        
        if (elemento &&data && data?.length>0) {
            const padre_element = elemento.closest("div");
            if(padre_element)
                padre_element.classList.remove("ocultar")
            if (padre_element && data)
                padre_element.style.width = `${data?.length * 80}px`;
            chartInstance = new Chart(
                elemento,
                {
                    type: 'bar',
                    data: {
                        labels: data?.map(row => row.intento),
                        datasets: [
                            {
                                label: 'Puntuacion: ',
                                data: data?.map(row => row.puntuacion),
                                borderColor: '#FFFFFF',
                                backgroundColor: data?.map((_, index) => colors[index % colors.length]),
                                // Ajusta el grosor de la barra
                                // barThickness: 50, // Ajusta el tamaño de las barras según sea necesario
                                // O ajusta el porcentaje de la categoría y la barra
                                barPercentage: 1.0, // Hace que las barras usen todo el ancho disponible
                                categoryPercentage: 1.0, // Asegura que las barras no dejen espacio entre sí
                            }
                        ]
                    },
                    options: {
                        scales: {
                            x: {
                                stacked: false, // Desactiva el apilamiento, si es necesario
                                ticks: {
                                    maxRotation: 0, // Elimina rotación de etiquetas si es necesario
                                },
                                grid: {
                                    display: false // Opcional, quita las líneas de la cuadrícula en el eje X
                                }
                            },
                            y: {
                                beginAtZero: true, // Asegura que el gráfico comience desde 0 en el eje Y
                                grid: {
                                    display: false // Quita las líneas de la cuadrícula en el eje Y, opcional
                                }
                            }
                        },
                        plugins: {
                            tooltip: {
                                enabled: true // Desactiva los tooltips si no son necesarios
                            },
                        },
                        responsive: true, // Asegura que el gráfico se ajuste al tamaño del contenedor
                        maintainAspectRatio: false // Permite que el gráfico ocupe todo el div sin forzar el aspecto
                    }
                }
            );
        }

    }

    useEffect(() => {
        if (lista) {
            graficar(1, 'acquisitions1')
            graficar(2, 'acquisitions2')
            graficar(3, 'acquisitions3')
            graficar(4, 'acquisitions4')
        }
        return ()=>{
            if(chartInstance){
                chartInstance.destroy(); 
            }
            
        }
    }, [lista])
    useEffect(() => {
        getHitorias();
    }, [])
    return (

        <>
            <Header></Header>
            <h3 style={{textAlign:"center", margin:"10px 0px 0px 0px"}}>Estadistica  de tus avances </h3>
            <div className="content_graficos">         
            <div style={{ width: "100px", height: "250px" }} className="box_grafica ocultar">
                <h4>Nivel 1</h4>
                <canvas id="acquisitions1">
                </canvas>
            </div>
            <div style={{ width: "100px", height: "250px" }} className="box_grafica ocultar">
            <h4>Nivel 2</h4>
                <canvas id="acquisitions2">
                </canvas>
            </div>

           <div style={{ width: "100px", height: "250px" }} className="box_grafica ocultar">
           <h4>Nivel 3</h4>
                <canvas id="acquisitions3">
                </canvas>
            </div>
            <div style={{ width: "100px", height: "250px" }} className="box_grafica ocultar">
            <h4>Nivel 4</h4>
                <canvas id="acquisitions4">
                </canvas>
            </div>
            </div>
        </>
    )
}