import {NEWSKEY} from "../NODESERVER/keys.mjs"

const brief = document.getElementById('card__home--button-breif')
const done = document.getElementById('card__summary--button-done')
const home = document.getElementById('card__home')
const summary = document.getElementById('card__summary')
const feed = document.getElementById("feed")
const search = document.getElementById("nav__search")
const searchBAr = document.getElementById("nav__search-bar")
let inactiveScreen = summary
let activeScreen = home
let feedArray = ["Reuters","CNN","Bloomberg","Fox News","Sports","BBC","cbc","times","people","atlantic",]

function toggleActiveScreen(){


    activeScreen === home ? activeScreen = summary : activeScreen = home
    inactiveScreen === home ? inactiveScreen = summary : inactiveScreen = home

    
    setTimeout( () => {
        activeScreen.style.zIndex = "1"
        inactiveScreen.style.zIndex = "-1"
        console.log(inactiveScreen, activeScreen)

    }, 800)

}

brief.addEventListener('click', () => {
    home.classList.remove("enter-reverse")
    home.classList.add("exit")
    summary.classList.remove("exit-reverse")
    summary.classList.add("enter")
    toggleActiveScreen()

})
done.addEventListener('click', () => {
    home.classList.remove("exit")
    home.classList.add("enter-reverse")
    summary.classList.remove('enter')
    summary.classList.add('exit-reverse')
    toggleActiveScreen()
})

search.addEventListener('click', ()=>{

    if(searchBAr.value != ""){
        
        feedArray.unshift(searchBAr.value)
        feed.innerHTML = ""
        
        console.log(searchBAr.value,)
        if (feedArray.length > 10){
            feedArray.pop()
        }
        
        searchBAr.value = ""
        addToFeed()
    }
})



function addToFeed(){

    for (let i = 0 ; i < feedArray.length ; i++){

        let newIcon = document.createElement("div")
        newIcon.classList.add("feed__icon")
        feed.appendChild(newIcon)
        newIcon.innerText = feedArray[i]


    }


}

addToFeed()

let searchParameter = "BBC"

let url = `https://newsapi.org/v2/everything?q=${searchParameter}&apiKey=${NEWSKEY}`;

// url = `https://api.worldapi.com/reports?lat=37.8715&lon=-122.2730&radius=77000&min_time=1698456425&api_key=${WORLDKEY}`


fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log("THIS IS THE API DATA", data.articles)
    let array = data.articles;
    console.log("BELOW IS THE FILTERED INFO",array)
    for (let i = 0 ; i < array.length ; i++){
        console.log(array[i].source_citation_url)
        console.log(array[i].source.name, "---" ,array[i].title, "---"  ,array[i].url)
    }
    })
  .catch(error => {
    console.error('Error fetching news:', error);
  });
