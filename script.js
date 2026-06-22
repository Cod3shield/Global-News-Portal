// variables
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];

// API

const API_KEY = "YOUR_API_KEY_HERE"; 

const HEADLINES_NEWS =
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=";

// WORLD NEWS (GLOBAL STYLE - FIXED)
const WORLD_NEWS =
    "https://newsapi.org/v2/everything?q=world OR international OR global&sortBy=publishedAt&language=en&apiKey=";

const SPORTS_NEWS =
    "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=";

const ENTERTAINMENT_NEWS =
    "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=";

const TECHNOLOGY_NEWS =
    "https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=8&apiKey=";

const SEARCH_NEWS =
    "https://newsapi.org/v2/everything?q=";

window.onload = function () {
    newsType.innerHTML = "<h4>Headlines</h4>";
    fetchHeadlines();
};

// Button listeners
sportsBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Sports</h4>";
    fetchSportsNews();
});

entertainmentBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Entertainment</h4>";
    fetchEntertainmentNews();
});

technologyBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Technology</h4>";
    fetchTechnologyNews();
});

searchBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Search : " + newsQuery.value + "</h4>";
    fetchQueryNews();
});

// Fetch Headlines
const fetchHeadlines = async () => {
    const response = await fetch(HEADLINES_NEWS + API_KEY);
    newsDataArr = [];

    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
};

// Fetch Sports News
const fetchSportsNews = async () => {
    const response = await fetch(SPORTS_NEWS + API_KEY);
    newsDataArr = [];

    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
};

// Fetch Entertainment News
const fetchEntertainmentNews = async () => {
    const response = await fetch(ENTERTAINMENT_NEWS + API_KEY);
    newsDataArr = [];

    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
};

// Fetch Technology News
const fetchTechnologyNews = async () => {
    const response = await fetch(TECHNOLOGY_NEWS + API_KEY);
    newsDataArr = [];

    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
};

// Search News
const fetchQueryNews = async () => {
    if (newsQuery.value == null || newsQuery.value.trim() === "") return;

    const response = await fetch(
        SEARCH_NEWS +
        encodeURIComponent(newsQuery.value) +
        "&apiKey=" +
        API_KEY
    );

    newsDataArr = [];

    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
};

// Display News
function displayNews() {
    newsdetails.innerHTML = "";

    newsDataArr.forEach((news) => {
        var date = news.publishedAt
            ? news.publishedAt.split("T")
            : ["N/A"];

        var col = document.createElement("div");
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement("div");
        card.className = "p-2";

        var image = document.createElement("img");
        image.setAttribute("width", "100%");
        image.src =
            news.urlToImage ||
            "https://via.placeholder.com/400x200?text=No+Image";

        var cardBody = document.createElement("div");

        var newsHeading = document.createElement("h5");
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title || "No title available";

        var dateHeading = document.createElement("h6");
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var description = document.createElement("p");
        description.className = "text-muted";
        description.innerHTML =
            news.description || "No description available.";

        var link = document.createElement("a");
        link.setAttribute("target", "_blank");
        link.href = news.url || "#";
        link.innerHTML = "Read more";

        link.style.backgroundColor = "purple";
        link.style.color = "white";
        link.style.padding = "8px 15px";
        link.style.borderRadius = "5px";
        link.style.textDecoration = "none";

        link.addEventListener("mouseover", function () {
            link.style.backgroundColor = "#6a0dad";
        });

        link.addEventListener("mouseout", function () {
            link.style.backgroundColor = "purple";
        });

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });
}
