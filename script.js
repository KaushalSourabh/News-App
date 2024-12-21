const API_KEY = "a69fcf01db0f477497fc8c4540bf51c8";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}


async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}


function bindData(articles) {
    const cardContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news');

    cardContainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataIncard(cardClone, article)
        cardContainer.appendChild(cardClone);
    });
}


function fillDataIncard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDes = cardClone.querySelector('#news-dsc');


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDes.innerHTML = article.description;


    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name}.${date}`;


    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });
    

   
}
  let curSelectNav=null;

 function onNavItemClick (id) {
    fetchNews(id);

    const navItem = document.getElementById(id);
    curSelectNav?.classList.remove('active');
    curSelectNav = navItem;
    curSelectNav.classList.add('active');
}

const searchButton = document.getElementById("search");
const searchtext = document.getElementById("text");


searchButton.addEventListener("click",()=>{
    const query = searchtext.value;
    if(!query)  return;
    fetchNews(query);
    curSelectNav?.classList.remove('active');
    curSelectNav = null;
});