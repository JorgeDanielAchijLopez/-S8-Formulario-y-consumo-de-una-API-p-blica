"use strict";
function getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`No se encontró el elemento: ${selector}`);
    }
    return element;
}
const form = getElement("#search-form");
const submitButton = getElement("#submit-button");
const statusElement = getElement("#status");
const resultsElement = getElement("#results");
let requestInProgress = false;
function setInterfaceState(state, message) {
    statusElement.textContent = message;
    statusElement.className = `status-${state}`;
}
function clearResults() {
    resultsElement.replaceChildren();
}
function createPostElement(post) {
    const item = document.createElement("li");
    item.className = "result-item";
    const title = document.createElement("h3");
    title.textContent = post.title;
    const body = document.createElement("p");
    body.textContent = post.body;
    const meta = document.createElement("span");
    meta.className = "result-meta";
    meta.textContent =
        `Publicación #${post.id} · Usuario ${post.userId}`;
    item.append(title, body, meta);
    return item;
}
function renderPosts(posts) {
    clearResults();
    posts.forEach((post) => {
        const postElement = createPostElement(post);
        resultsElement.append(postElement);
    });
}
function isPost(value) {
    if (typeof value !== "object" ||
        value === null) {
        return false;
    }
    const post = value;
    return (typeof post.userId === "number" &&
        typeof post.id === "number" &&
        typeof post.title === "string" &&
        typeof post.body === "string");
}
async function getPosts(userId) {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`La solicitud HTTP falló con estado ${response.status}.`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new Error("La API devolvió un formato de datos inesperado.");
    }
    return data.filter(isPost);
}
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (requestInProgress) {
        return;
    }
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const formData = new FormData(form);
    const userIdValue = formData.get("userId");
    const keywordValue = formData.get("keyword");
    if (typeof userIdValue !== "string" ||
        typeof keywordValue !== "string") {
        setInterfaceState("error", "No fue posible obtener los datos del formulario.");
        return;
    }
    const userId = Number(userIdValue);
    const keyword = keywordValue
        .trim()
        .toLowerCase();
    if (!Number.isInteger(userId) ||
        userId < 1 ||
        userId > 10) {
        setInterfaceState("error", "El ID del usuario debe ser un número entre 1 y 10.");
        return;
    }
    if (keyword.length < 2) {
        setInterfaceState("error", "La palabra de búsqueda debe contener al menos 2 caracteres.");
        return;
    }
    requestInProgress = true;
    submitButton.disabled = true;
    clearResults();
    setInterfaceState("loading", "Consultando publicaciones...");
    try {
        const posts = await getPosts(userId);
        const filteredPosts = posts.filter((post) => post.title
            .toLowerCase()
            .includes(keyword));
        if (filteredPosts.length === 0) {
            setInterfaceState("empty", "La consulta terminó correctamente, pero no se encontraron resultados.");
            return;
        }
        renderPosts(filteredPosts);
        const resultText = filteredPosts.length === 1
            ? "publicación encontrada"
            : "publicaciones encontradas";
        setInterfaceState("success", `${filteredPosts.length} ${resultText}.`);
    }
    catch (error) {
        clearResults();
        const errorMessage = error instanceof Error
            ? error.message
            : "Ocurrió un error desconocido.";
        setInterfaceState("error", `No fue posible completar la consulta. ${errorMessage}`);
    }
    finally {
        requestInProgress = false;
        submitButton.disabled = false;
    }
});
//# sourceMappingURL=app.js.map