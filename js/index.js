/* varaibles */

const url = "https://my-json-server.typicode.com/RobottiFranco/API-FAKE/blob/main/users";

//utilizado en la
const button_add_card = document.querySelectorAll(".add-card")

//utilizado en changeTitle
const cardTitles = document.querySelectorAll('.title-card');

//llamados
changeTitle(cardTitles);




/* este proceso se realiza para el poder acceder a los diferentes elementos que tengan la clase add-card
esta seccion devuelve un numero i utilizado en addCard */

for (let i = 0; i< button_add_card.length;i++){
    button_add_card[i].addEventListener("click", function() {addCard(i)})
}

/* esta funcion tiene todos los parametros opcionales, esto se denota por la estructura de los parametros.
en esta funcion quiero crear un estilo de "tarjetas" dentro de un div particular llamado colum,
como la clase add-card esta contenida dentro del div con clase column, voy a utilizar el valor i obtenida en la funcion de arriba.

datos a considerar: 
- como  quiero crear varias estructuras dentro de la tarjeta, ademas de crearla, creo varias etiquetas y le asigno por dentro los valores
de los parametros.
- esta funcion tiene momentamente el llamado a deleted para borrar la tarjeta creada. 
*/

function addCard(i = 0, space = "Worker", name = "Julian", lastName = "Martinez", description = "good slave"){

    const column = document.querySelectorAll(".column");
    const card = document.createElement("div");

    card.classList.add("card");
    card.innerHTML = `
    <h2>${space}</h2>
    <p>Name: ${name} ${lastName}</p>
    <p>Description: ${description}<p>`;

  column[i].appendChild(card);

  card.addEventListener("click", deleted);
}

/* esta es una funcion que borra la tarjeta entera, esta es momentanea mientras encuentro una forma mejor de realizar la tarea.
lo que ocurre aqui es que como dentro de la funcion addCard tiene un card.listener de delete, todas las tarjetas creadas tienen
un target que permite eliminarlas facilmente  */

function deleted(event) {
  event.currentTarget.remove();
}


/* esta funcion cambia el titulo de forma similar a la primera, recorre todos los que tenga la clase title-card y toma el valor que necesita
luego con ocurre un prompt que introduce el valor y lo coloca en el html*/

function changeTitle(cardTitles) {
  for (let i = 0; i < cardTitles.length; i++) {
    (function(index) {
      cardTitles[index].addEventListener('click', function() {
        const newTitle = prompt("Enter a new title:", cardTitles[index].innerHTML);
        cardTitles[index].innerHTML = newTitle;
      });
    })(i);
  }
}


/* Este fetch es la forma en que hay en js de tomar los datos de un json y colocarlos en el html
lo que hago aqui es tomo el la url y transformo la respuesta en un json, en este caso particular
tomo cada uno de los valores de cada usuario y los imprimo a partir de la funcion addCard
el .catch es por posibles errores, es un punto a mejorar */

fetch(url)
.then(response => response.json() )
.then(data => {
  for(let u=0; u<=data.length; u++){
    addCard(undefined, data[u].role, data[u].name, data[u].lastName, data[u].description);
  }
})
.catch(err => console.log(err));
