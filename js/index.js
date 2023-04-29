/* variables */

const button_add_card = document.querySelectorAll(".add-card");
const cardTitles = document.querySelectorAll('.title-card');
const column = document.querySelectorAll(".column");

/* llamados */
changeTitle(cardTitles);

/* este proceso se realiza para poder acceder a los diferentes elementos que tengan la clase add-card.
esta sección devuelve un número "i" que se utiliza en addCard */
for (let i = 0; i < button_add_card.length; i++) {
  button_add_card[i].addEventListener("click", function() {
    addCard(i, "user");
  });
}

/* desactualizado */
/* esta función tiene todos los parámetros opcionales, esto se denota por la estructura de los parámetros.
En esta función quiero crear un estilo de "tarjetas" dentro de un div particular llamado "column".
Como la clase "add-card" está contenida dentro del div con clase "column", voy a utilizar el valor "i" obtenido en la función de arriba.

Datos a considerar:
- Como quiero crear varias estructuras dentro de la tarjeta, además de crearla, creo varias etiquetas y les asigno los valores de los parámetros.
- Esta función tiene momentáneamente el llamado a "deleted" para borrar la tarjeta creada. 
*/

/* actual */
/* la funcion toma muchos parametros pero no son obligatorios, lo que hace es segun el primer parametro en que fila va a insertar y el segundo que switch va a usar,
esto para hacer la funcion mas generica y en un futuro agregar mas sin apenas tocar codigo, el resto de parametros son elementos dentro de cada card.
Datos a considerar:
- Como quiero crear varias estructuras dentro de la tarjeta, además de crearla, creo varias etiquetas y les asigno los valores de los parámetros.
- Esta función tiene momentáneamente el llamado a "deleted" para borrar la tarjeta creada. 
 */


function addCard(i, type, title, description, description2, description3) {
  const card = document.createElement("div");
  card.classList.add("card");

  switch (type){
    case "color":
      addCardColor(card, title, description);
      break;
    case "user":
      addCardUser(card, title, description, description2, description3);
      break;
  }

  column[i].appendChild(card);
  card.addEventListener("click", deleted);
}

function addCardUser(card, role = "Worker", name = "Julian", lastName = "Martinez", description = "good slave") {
  card.innerHTML = `
    <h2>${role}</h2>
    <p>Name: ${name} ${lastName}</p>
    <p>Description: ${description}<p>`;
}

function addCardColor(card, role = "colors", color = "skyblue") {
  card.innerHTML = `
    <h2>${role}</h2>
    <p>Colors: ${color}</p>`;
}

/* Esta es una función que borra la tarjeta entera. Esta es momentánea mientras encuentro una forma mejor de realizar la tarea.
Lo que ocurre aquí es que, como dentro de la función "addCard" tiene un "card.listener" de "deleted", todas las tarjetas creadas tienen un target que permite eliminarlas fácilmente. */

function deleted(event) {
  event.currentTarget.remove();
}

/* Esta función cambia el título de forma similar a la primera. Recorre todos los elementos que tengan la clase "title-card" y toma el valor que necesita.
Luego, ocurre un prompt que introduce el valor y lo coloca en el HTML. */

function changeTitle(cardTitles) {
  for (let i = 0; i < cardTitles.length; i++) {
    (function(index) {
      cardTitles[index].addEventListener('click', function() {
        let newTitle = prompt("Enter a new title:", cardTitles[index].innerHTML);
        cardTitles[index].innerHTML = newTitle;
      });
    })(i);
  }
}

/* Este fetch es la forma en que hay en JS de tomar los datos de un JSON y colocarlos en el HTML. */
fetch("https://my-json-server.typicode.com/RobottiFranco/API-FAKE/users")
  .then(response => response.json())
  .then(data => {
    for (let u = 0; u < data.length; u++) {
      addCard(0, "user", data[u].role, data[u].name, data[u].lastName, data[u].description);
    }
  })
  .catch(err => console.log(err));

/* son 2 diferentes con distintos datos y por lo tanto diferente implementacion */
fetch("https://my-json-server.typicode.com/RobottiFranco/API-FAKE/colors")
  .then(response => response.json())
  .then(data => {
    for (let e = 0; e < data.length; e++) {
      addCard(1, "color", data[e].role, data[e].color);
    }
  })
  .catch(err => console.log(err));
 