let page = 1;
let limit = 50;
const url = 'http://localhost:3000/monsters/'

document.addEventListener('DOMContentLoaded', () => {
    changePage(page)
    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const name = form.name.value
        const age = form.age.value
        const description = form.description.value
        const monster = {name, age, description}
        addMonster(monster)
        form.reset()
    })
    
})

function displayMonsters(monsters){    
    const container = document.getElementById('monster-container')

    let list = monsters.map(monster => {
        return `
        <h2>${monster.name}</h2>
        <h3>${monster.age}</h3>
        <p>${monster.description}</p>
        `
    })
    container.innerHTML = list.join('')
}

function nextPage(){
    page++;
    changePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevPage(){
    if (page > 1) {
        page--;
        changePage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function changePage(page){
    function getMonsters(){
        fetch(`${url}?_limit=${limit}&_page=${page}`)
        .then(res => res.json()).then(monsters => displayMonsters(monsters))
        // .then(monsters => monsters.forEach(monster => {
        //     displayMonsters(monster)
        // }))
    }
    getMonsters()
    const btn_next = document.getElementById("forward");
    const btn_prev = document.getElementById("back");
    btn_next.addEventListener('click', nextPage)

    btn_prev.addEventListener('click', prevPage)
}

function addMonster(monster){
    fetch(url,{method: 'POST', headers: {
        "Content-type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify(monster)
}).then(res => res.json()).then(data => changePage(page))
}








