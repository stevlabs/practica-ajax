const tbody = document.querySelector('#tbody');
const urlBase = "https://jsonplaceholder.typicode.com/"


document.addEventListener("click", (ev) => {
    if (ev.target.matches("button")) {
        pintarCuerpo(ev.target.id) // closest para recoger el tr padre
        //pintarCuerpo(5000, ev.target.closest("tr"))
    }
})

const conexion = async (url) => {
    const resp = await fetch(`${urlBase}/${url}`);
    try {
        if (resp.ok) {
            return resp.json()
        } else {
            throw Error("Error en la peticion")
        }
    } catch (error) {
        throw error.message;
    }
};

const pintarDatos = async (url) => {
    try {
        const data = await conexion("posts");
        data.forEach(item => {
            tbody.innerHTML += `
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td><button id=${item.id}>Mas info</button></td>
            `
        });
    } catch (error) {
        tbody.innerHTML = `${error}`;
    }
};

const pintarCuerpo = async (id) => {
    const tDescription = document.querySelector('#tDescription');
    try {
        const data = await conexion(`posts/${id}`);
        tDescription.innerHTML = `${data.body}`;
    } catch (error) {
        tDescription.innerHTML = `${error}`;
    }
};

pintarDatos();
