import {inform} from "./values.js"
import {body,breedSelect,div,info} from "./values1.js"

// const body = document.querySelector('body');
// const breedSelect = document.getElementById('breedSelect');
// const div = document.getElementById('catinfo');
// const info = document.getElementById('infodump');
const catnames = document.querySelector('#catnames');
const h3 = document.createElement('h3');
//Value imported from another file
h3.textContent = inform;




const API_KEY = 'live_AnwRr2SmQktp4fzF0TWHGSPjzDt3mKV4aWj1vznnzgvT1jTRAIFBrR2Ix1I3ZrlC';
//Caraousel
const images = [];

try {
    async function initialLoad() {
        //USING FETCH API TO COMMUNICATE WITH AN EXTERNAL WEB API
        const response = await fetch("https://api.thecatapi.com/v1/breeds");
        const value = await response.json();
        console.log(value);
        value.forEach((element) => {
            let option = document.createElement("option");
            option.text = element.name;
            option.value = element.id;
            breedSelect.appendChild(option);

        });
    }
    initialLoad();
}
catch (e) {
    console.log(e);
}
try {
    //MAKING USE OF ASYNC /AWAIT
    async function breedinfo(e) {
        catnames.innerHTML = "";
        const breed = e.target.value;
        const data = await fetch(
            //USING GET TO POPULATE THE SEARCH FEATURE
            `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breed}`,
            {
                method: "GET",
                headers: {
                    "x-api-key": API_KEY
                }
            }
        );
        const jsonData = await data.json();
        console.log(jsonData);
        div.appendChild(h3);
        jsonData.forEach((element) => {
           
            const btn = document.createElement('button');
            const img = document.createElement('img');
            img.setAttribute("src", element.url);
            img.setAttribute("alt", element.name);
            catnames.appendChild(img);
            btn.appendChild(img);
            catnames.appendChild(btn);
            //info.textContent = element.breeds[0]
            btn.setAttribute("click", createTable(element));
        });

    }
    
    breedSelect.addEventListener("change", breedinfo);

}
catch (e) {
    console.log(e);
}
//Trying to fetch the cat details and display in a table
function createTable(obj) {
   info.textContent = obj.breeds[0].description;
}


