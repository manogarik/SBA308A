
const body = document.querySelector('body');
const breedSelect = document.getElementById('breedSelect');
const div = document.getElementById('catinfo');
const info = document.getElementById('infodump');
const catnames = document.querySelector('#catnames');
const imageContainer = document.querySelector('.carousel-images');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');


const API_KEY = 'live_AnwRr2SmQktp4fzF0TWHGSPjzDt3mKV4aWj1vznnzgvT1jTRAIFBrR2Ix1I3ZrlC';
//Caraousel
const images =[];
  
try {
    async function initialLoad() {
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
try{
async function breedinfo(e) {
    
    const breed = e.target.value;
    const data = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breed}`,
        {
          headers : {
            "x-api-key" : API_KEY
          }
        }
      );
    const jsonData = await data.json();   
    console.log(jsonData);
    jsonData.forEach((element) =>
    {
        const btn =document.createElement('button');
        const img = document.createElement('img');
        img.setAttribute("src",element.url);
        img.setAttribute("alt",element.name);
        catnames.appendChild(img);
        btn.appendChild(img);
        catnames.appendChild(btn);
        
        btn.setAttribute("onlcick",createTable(element));
    });
}

   breedSelect.addEventListener("change", breedinfo);

 }
 catch(e)
 {
    console.log(e);
}
//Trying to fetch the cat details and display in a table
function createTable(obj)
{
    const cat = obj.breeds;
    const table = document.createElement('table');
    table.setAttribute("border","2px");
    const trow = document.createElement('tr');
    const th1 = document.createElement('th');
    th1.textContent = NAME;
    trow.appendChild(th1);
    const th2 = document.createElement('th');
    th2.textContent = DESCRIPTION;
    trow.appendChild(th2);
    table.appendChild(trow);
    info.appendChild(table);
    
}       
  
    
     
          
    
      
    