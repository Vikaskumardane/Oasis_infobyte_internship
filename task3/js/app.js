
    showNotes(); //THis is the function that will be called when notes will be added 



// If User add's the note then ,add it to localStorage

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click',function(e) {

    let addtxt = document.getElementById('addtxt');
    let notes = localStorage.getItem('notes');  // notes is an array of strings

    if(notes == null){
       
        notesObj = []; // empty array
    }
    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.push(addtxt.value);  // when clicking add button then push the value to the notes array

    // Now we need to uppdate the localStorage value ,so
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // use stringify to conert value into string because it is not stored in localStorage in string format

    addtxt.value=" "; // to clear the existing string valueafter adding to localStorage
    // console.log(notesObj);
    showNotes(); //THis is the function that will be called when notes will be added 
})

function showNotes() {
    let notes = localStorage.getItem('notes');  // notes is an array of strings

    if(notes == null){
        notesObj = []; // empty array
    }
    else{
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function(element, index){ //it is an  index of array element 
        html += `
        <div class="notesCard my-3 mx-3" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Note ${index + 1}</h5>
              <p class="card-text">${element} </p>
              <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
            </div>
          </div>`;
        
    });
    let notesElm = document.getElementById('notes');
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = 'there is no note to show use  "Add note" section to add note '
    }
}

/*
//diplay alert dialog to user on empty note
addbtn.addEventListener('click',function(e){
    if(addtxt.value == " "){
        alert('note cannot be empty');
   }
})
*/

// Function to delete the note
function deleteNote(index){
    // console.log("I am deleteing",index)

    let notes = localStorage.getItem("notes");  // notes is an array of strings

    if(notes == null){
       
        notesObj = []; // empty array
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index , 1);
    // Now we need to uppdate the localStorage value ,so
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


// Section to implement the Search method 

let search = document.getElementById('searchTxt'); // create a new variable for the search.

search.addEventListener('input', function(e){
    // input event is fire when user input some data in the search box

    let inputVal = search.value;  // put the search value in "inputVal"
     console.log("Input event fire", inputVal);

     if(inputVal === " "){
         document.getElementById('noMatches').innerHTML = '';
     }

    let noteCards = document.getElementsByClassName('noteCard'); // select all the note cards
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText; // get all info from "p" in "noteCard" to cardTxt
    
        if(cardTxt.includes(inputVal)){
            // element.style.display = "block";
            element.style.display = 'block';
 
        }
        else{
            element.style.display = 'none';
        }
    })
    
})
