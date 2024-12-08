const API_KEY="de3a6772f3814aa4b8b18f40aa50dd21";
const url = "/api/news?q=";




window.addEventListener('load',()=> fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    console.log(data);
    bindData(data.articles);
}


function bindData(articles){
    const cardContainer= document.getElementById('card-container');
    const newsCardTemplate= document.getElementById('template-news-card');

    cardContainer.innerHTML ="";

    articles.forEach(article=>{
        if(!article.urlToImage) return ;
        const cardClone= newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone);
    });
}
    
 function fillDataInCard(cardClone,article) {
    const newsImg= cardClone.querySelector('#news-image'); 
    const newsTitle= cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDes= cardClone.querySelector('#news-des');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDes.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} : ${date} `;

    cardClone.firstElementChild.addEventListener("click", () =>{
        window.open(article.url,"_blank")
    });

}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}


const searchButton= document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchButton.addEventListener("click",()=>{
    const query= searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    customElements=null;

})
