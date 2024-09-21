# Math Game - React & TypeScript

## Descripción

Este proyecto es un **juego de matemáticas** desarrollado con **React** y **TypeScript**. El objetivo es permitir a los usuarios practicar operaciones matemáticas, como **suma**, **resta**, **multiplicación** y **división**, que se vuelven más complejas a medida que se avanza en los niveles. El juego incluye cuatro niveles de dificultad:
- **Básico**: Operaciones simples de suma y resta.
- **Intermedio**: Multiplicación y división básicas.
- **Avanzado**: Combinación de operaciones más difíciles.
- **Pro**: Problemas matemáticos avanzados y combinados.

El juego ofrece autenticación de usuarios, con contraseñas encriptadas utilizando **bcryptjs** y almacenamiento de datos de usuario en **LocalStorage**.

## Funcionalidades

- **Autenticación de usuarios**: Los usuarios pueden registrarse e iniciar sesión. Las contraseñas se almacenan de forma segura mediante bcryptjs.
- **Sistema de niveles**: Cuatro niveles de dificultad, donde las operaciones matemáticas se complican conforme se avanza.
- **Operaciones matemáticas**: Suma, resta, multiplicación y división.
- **Persistencia de datos**: Los datos de los usuarios y el progreso se almacenan en LocalStorage.
- **Interfaz de usuario responsiva**: Utilizando **Bootstrap** para asegurar que la aplicación funcione en múltiples dispositivos.

## Tecnologías utilizadas

- **React**: Biblioteca principal para la interfaz de usuario.
- **TypeScript**: Para el tipado estático y asegurar la robustez del código.
- **Bootstrap**: Para crear una interfaz de usuario responsiva y atractiva.
- **bcryptjs**: Para la encriptación de contraseñas.
- **LocalStorage**: Para guardar los datos del usuario y su progreso en el navegador.
- **Vite**: Herramienta de construcción rápida y moderna.

## Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/math-game.git
