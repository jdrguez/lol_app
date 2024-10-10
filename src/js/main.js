import Champion from './Champion.js';
var champions = [];


function cursor_cards(){
    const cards = document.querySelectorAll('.card_inner');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const xPos = (e.clientX - cardRect.left) / cardRect.width;  
            const yPos = (e.clientY - cardRect.top) / cardRect.height;  
            
            const rotateX = (yPos - 0.5) * 25; 
            const rotateY = (xPos - 0.5) * 25; 
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `rotateX(0) rotateY(0)`;
        });
    });
}




const button = document.querySelector("button");
button.addEventListener("click", () => {
    document.querySelector('#button').style.display = 'none';
    document.querySelector('#msg_load').style.visibility = 'visible';
    document.querySelector('#champions').style.visibility = 'visible';
    startLoad();
});

const startLoad = async () => {
    const api = "https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json"
    try{
        const response = await fetch(api);
        if (!response.ok){
            throw new Error('Fallo en la lectura de la api')
        }

        const data = await response.json()
        const all_warriors = data.data

        Object.keys(all_warriors).forEach(character => {
            champions.push(new Champion(all_warriors[character]));
        });

        console.log(champions)
    } catch (error){
        console.error('Error', error);
    }

    showLoad();
}



const showLoad = async () => {
    document.querySelector("#msg_load").style.visibility='hidden'
    document.querySelector('#msg_load').style.display = 'none'
    const all_champs = document.getElementById("champions");
    for(var i = 0; i < champions.length; i++) {
    
        all_champs.innerHTML +=    `<div class="card ${champions[i].tags[0]}" id="card">
                                        <div class="card_inner">
                                                <div class="card_front">
                                                    <a href="#" class= "category">${champions[i].tags[0]}</a>
                                                    <img class= "img_class" src="${champions[i].img}">
                                                    <div class= "name">
                                                        <h3>${champions[i].name}</h3>
                                                        <p>${champions[i].title}</p
                                                    </div>
                                                    <div class="container_icons"> 
                                                        <img class="icon attack" src="https://img.icons8.com/?size=25&id=3Cq0Piv1ClSf&format=png&color=000000">${champions[i].attack}                                      
                                                        <img class="icon defense" src="https://img.icons8.com/?size=25&id=lsZBoVE2zMo3&format=png&color=000000">${champions[i].defense}
                                                        <img class="icon diff" src="https://img.icons8.com/?size=35&id=owYqN8ZvQFtU&format=png&color=000000">${champions[i].difficult}
                                                    </div>
                                                    <div class="types"> </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>`
    }


    cursor_cards()
}

