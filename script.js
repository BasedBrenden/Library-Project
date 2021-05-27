let myLibrary = [];

const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const create = document.getElementById("createBtn");
const subBtn = document.querySelector('#formSubmit');
const container = document.querySelector(".container");
const formSpace = document.querySelector(".formSpace");

const cardTitle = document.querySelector('.cardTitle');
const cardAuthor = document.querySelector('.cardAuthor');
const cardPages = document.querySelector('.cardPages');
let cardRead = document.querySelector('.cardRead');
let cardList = document.createElement("DIV");

const test = document.querySelector('.test');

class Book {
    constructor(title, author, pages, displayed, index) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.displayed = displayed;
        this.index = index;
        
    }
}

window.onload = function (){
    if(localStorage.length !== 0){
        let localLibraryString = localStorage.getItem('myLibrary');
        myLibrary = JSON.parse(localLibraryString);
        displayBooks();
    }
    /*else{
    let defaultBook = new Book('Eragon', "George", 191, false, 0)
    myLibrary.push(defaultBook);
    localStorage.setItem('myLibrary',JSON.stringify(myLibrary));
    displayBooks();
    }*/
}


create.addEventListener("click", function(){
    create.style.display = 'none';
    createForm();

})

subBtn.addEventListener('click', function() {

    addBookToLibrary();
    displayBooks();
    formSpace.classList.remove("clickOn");
    create.style.display = 'block';
})


function addBookToLibrary(){

    //connect together with a form
    let title = bookTitle.value;
    let author = bookAuthor.value;
    let pages = bookPages.value;
    let displayed = false;
    let index = (myLibrary.length);

    
    
    
    let newBook = new Book(title, author, pages, displayed, index);
    
    
    myLibrary.push(newBook);
    localStorage.setItem('myLibrary',JSON.stringify(myLibrary));

    
    console.log(index);
}


function createForm(){

    formSpace.classList.add("clickOn");
}


function updates(){

    let cardRead = document.querySelectorAll('.cardRead');
    let cardDelete = document.querySelectorAll('.cardDelete');

    cardRead.forEach(function (newRead){

        newRead.addEventListener('click', function(){
            if(newRead.innerHTML == 'Not Read'){
            newRead.style.color = "green";
            newRead.innerHTML = 'Read';}
            else{
            newRead.style.color = "red";
            newRead.innerHTML = 'Not Read';
            }

        })
    })

    cardDelete.forEach(function (newDelete){
        newDelete.addEventListener('click', (e) =>{

                let focii = e.target.value;
                let focus = document.getElementById(focii);
                
                myLibrary.splice(focii, 1);
                console.log(myLibrary);
                localStorage.setItem('myLibrary',JSON.stringify(myLibrary));
                
                if(focus !== null){
                    /*let localLibraryString = localStorage.getItem('myLibrary');
                    myLibrary*/
                    focus.remove()

                }
                if(myLibrary.length === 0){
                    localStorage.clear();
                }
        })
    })
    
}


function displayBooks(){

    myLibrary.forEach( function(library){

        if(library.displayed == false){
        
        cardList.classList.add('.cardList');
        
        let newCard = document.createElement("DIV");
        newCard.classList.add('card');
        newCard.id = library.index;
        let cardHead = document.createElement("DIV");
        cardHead.classList.add('head');

        let pTitle = document.createElement("p");
        pTitle.classList.add('cardTitle');
        pTitle.innerHTML = library.title;

        let pAuthor = document.createElement("p");
        pAuthor.classList.add('cardAuthor');
        pAuthor.innerHTML = library.author;

        let pPages = document.createElement("p");
        pPages.classList.add('cardPages');
        pPages.innerHTML = library.pages;

        let pRead= document.createElement("p");
        pRead.classList.add('cardRead');
        pRead.innerHTML = 'Not Read';

        let pDelete = document.createElement("span");
        pDelete.classList.add('material-icons');
        pDelete.classList.add('cardDelete');
        pDelete.innerHTML = "delete_outline";
        pDelete.value = library.index;

            //input delete function here. current function works with no errors until the data field is blank.
        
        test.appendChild(cardList)
        cardList.appendChild(newCard);
        newCard.appendChild(cardHead);
        newCard.appendChild(pTitle);
        newCard.appendChild(pAuthor);
        newCard.appendChild(pPages);
        newCard.appendChild(pRead);
        newCard.appendChild(pDelete);

        library.displayed = true;}
    })
    updates();
}