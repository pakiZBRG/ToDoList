const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const check = 'fa-check-circle';
const uncheck = 'fa-circle-thin';
const line_through = 'lineThrough';

let LIST, id;
let data = localStorage.getItem('TODO');

if(data) {
   LIST = JSON.parse(data);
   id = LIST.length;
   loadList(LIST);
} else {
   LIST = [];
   id = 0;
}

function loadList(array){
   array.forEach(i => {
      addToDo(i.name, i.id, i.done, i.trash)
   });
}

clear.addEventListener('click', () => {
   localStorage.clear();
   location.reload();
})

const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('en-us', {weekday: 'long', month: 'long', day: 'numeric'});

function addToDo(toDo, id, done, trash){
   if(trash){
      return;
   }
   
   const DONE = done ? check : uncheck;
   const LINE = done ? line_through : '';   
   const item = `
         <li class='item'>
            <i class='fa ${DONE} co' job='complete' id='${id}'></i>
            <p class='text ${LINE}'>${toDo}</p>
            <i class='fa fa-trash-o de' job='delete' id='${id}'></i>
         </li>`
   
   list.insertAdjacentHTML('beforeend', item);
}

document.addEventListener('keyup', (e) => {
   if(e.keyCode == 13){
      const toDo = input.value;
      
      if(toDo) {
         addToDo(toDo, id, false, false);
         
         LIST.push({
            name: toDo, 
            id: id,
            done: false,
            trash: false
         });
         
         localStorage.setItem("TODO", JSON.stringify(LIST));
         id++;
      }
      input.value = '';
   }
})

function completeToDo(element) {
   element.classList.toggle(check);
   element.classList.toggle(uncheck);
   element.parentNode.querySelector('.text').classList.toggle(line_through);
   LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
   element.parentNode.parentNode.removeChild(element.parentNode);
   LIST[element.id].trash = true;
}

list.addEventListener('click', (e) => {
   const element = e.target;
   const elementJob = element.attributes.job.value;
   
   if(elementJob == 'complete') {
      completeToDo(element)
   } else if(elementJob == 'delete') {
      removeToDo(element);
   }
   
   localStorage.setItem("TODO", JSON.stringify(LIST));
})