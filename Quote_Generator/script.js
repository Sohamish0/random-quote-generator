'use strict'

const quoteText = document.querySelector('.quote');
const quoteContainer = document.querySelector('.quote_container');
const quoteAuthor = document.querySelector('.quote_author');
const quoteBtn = document.querySelector('.new_quote');
const tweetBtn = document.querySelector('.tweet');
const loader = document.querySelector('.loader');

let response;
// functions
const loading = function() {
    quoteContainer.style.display = 'none';
    loader.style.display = 'block';
}
const complete = function() {
    quoteContainer.style.display = 'block';
    loader.style.display = 'none';
}

function newQuote() {
    loading();
    // checking if author name exist or not
    if(!response.author){
        quoteAuthor.textContent = 'Unknown';
    } else {
        quoteAuthor.textContent = response.author;
    }
    quoteText.textContent = response.quote;

    // if quote is longer then making their font size small
    if(response.quote.length >= 100){
        quoteText.classList.add('longer');
    } else {
        quoteText.classList.remove('longer');
    }
    
    complete();
}

const tweet = function(){
    const url = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(url, '_blank');
}


// Getting api data ////////////////////
async function getQuote() {
    loading();
    const url = 'https://free-quotes-api.herokuapp.com/';

    try {
        const quote = await fetch(url);
        response = await quote.json();
        console.log(response);
        newQuote();
    } catch (error) {
        
    }
}

// event handlers
quoteBtn.addEventListener('click', getQuote);
tweetBtn.addEventListener('click', tweet);
// on load
getQuote();