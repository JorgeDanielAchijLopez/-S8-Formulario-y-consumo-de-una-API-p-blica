# Formulario y consumo de una API pública

Aplicación web desarrollada con HTML, CSS y TypeScript que permite consultar publicaciones mediante una API pública y mostrar los resultados dinámicamente en el navegador.

## Autor

Jorge Daniel Achij Lopez

## Descripción

El proyecto consiste en un formulario que solicita:

- ID de usuario.
- Palabra a buscar dentro del título de una publicación.

Al enviar el formulario, la aplicación obtiene los valores utilizando `FormData`, realiza una solicitud HTTP con `fetch` y `async/await` hacia la API JSONPlaceholder y muestra los resultados obtenidos en una lista dinámica.

## API utilizada

Se utiliza la API pública:

**JSONPlaceholder**

Recurso utilizado:

```text
https://jsonplaceholder.typicode.com/posts
```

La consulta se realiza filtrando publicaciones por usuario.

Ejemplo:

```text
https://jsonplaceholder.typicode.com/posts?userId=1
```

## Tecnologías utilizadas

- HTML5
- CSS3
- TypeScript
- Fetch API
- JSONPlaceholder
- Node.js
- http-server
- Git
- GitHub

## Funcionalidades

La aplicación permite:

- Capturar datos mediante un formulario HTML.
- Validar los campos mediante validación nativa del navegador.
- Procesar el evento `submit`.
- Obtener los valores mediante `FormData`.
- Consumir una API pública.
- Utilizar `fetch` con `async/await`.
- Comprobar `response.ok`.
- Modelar los datos recibidos mediante TypeScript.
- Filtrar publicaciones según una palabra.
- Crear resultados dinámicamente en el DOM.
- Evitar solicitudes duplicadas.
- Realizar nuevas consultas después de una respuesta o error.
- Insertar datos externos de forma segura mediante `textContent`.

## Validaciones

### ID de usuario

Debe ser un número entre:

```text
1 y 10
```

### Palabra de búsqueda

Debe contener entre:

```text
2 y 40 caracteres
```

## Estados de interfaz

La aplicación implementa los siguientes estados:

### Inicial

Se muestra antes de realizar una consulta.

```text
Ingresa los datos para realizar una consulta.
```

### Cargando

Se muestra mientras se realiza la solicitud a la API.

```text
Consultando publicaciones...
```

Durante este estado el botón de búsqueda se deshabilita para evitar solicitudes duplicadas.

### Éxito

Se muestra cuando existen publicaciones que coinciden con la búsqueda.

Ejemplo:

```text
2 publicaciones encontradas.
```

### Sin resultados

Se muestra cuando la solicitud es correcta pero ninguna publicación contiene la palabra buscada.

```text
La consulta terminó correctamente, pero no se encontraron resultados.
```

### Error

Se muestra cuando ocurre un problema durante la solicitud HTTP o al procesar los datos recibidos.

## Seguridad

Los datos externos obtenidos desde JSONPlaceholder se insertan utilizando:

```typescript
textContent
```

No se utiliza `innerHTML` para insertar contenido proveniente de la API.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/JorgeDanielAchijLopez/-S8-Formulario-y-consumo-de-una-API-p-blica.git
```

Entrar al proyecto:

```bash
cd -S8-Formulario-y-consumo-de-una-API-p-blica
```

Instalar las dependencias:

```bash
npm install
```

## Verificar TypeScript

```bash
npm run typecheck
```

## Compilar TypeScript

```bash
npm run build
```

Los archivos JavaScript compilados se generan en:

```text
dist/
```

## Ejecutar la aplicación

```bash
npm start
```

Abrir en el navegador:

```text
http://127.0.0.1:8080
```

## Estructura del proyecto

```text
api-publica-typescript/
├── dist/
│   ├── app.js
│   └── app.js.map
├── src/
│   └── app.ts
├── index.html
├── styles.css
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Flujo de la aplicación

1. El usuario completa el formulario.
2. El navegador valida los campos.
3. TypeScript procesa el evento `submit`.
4. Los datos son obtenidos mediante `FormData`.
5. Se muestra el estado de carga.
6. Se deshabilita temporalmente el botón.
7. Se realiza la solicitud mediante `fetch`.
8. Se verifica `response.ok`.
9. Se procesa la respuesta JSON.
10. Los datos son filtrados.
11. Se crean elementos dinámicamente en el DOM.
12. Se muestra éxito, sin resultados o error.
13. El botón vuelve a habilitarse.

## Repositorio

GitHub:

```text
https://github.com/JorgeDanielAchijLopez/-S8-Formulario-y-consumo-de-una-API-p-blica
```