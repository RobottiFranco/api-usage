/* variables */

const button_add_card = document.querySelectorAll(".add-card"); //todos los elementos del body de clase add-card
const cardTitles = document.querySelectorAll(".title-card"); //todos los elementos del body con la clase title-card
const column = document.querySelectorAll(".column"); //todos los elelementos del body con la clase column

/* llamados */
changeTitle(cardTitles); //borra las tarjetas existentes y futuras creadas

/* eventos */

/* resumen : evento que elijo y agrego una tarjeta por defecto segun la posicion del boton */
for (let i = 0; i < button_add_card.length; i++) {
  //itero sobre todos los elementos hasta encontrar el llamado que me interesa antender
  button_add_card[i].addEventListener("click", function () {
    //le agrego el evento de agregar tarjeta al boton que busque
    const addDefaultCard = {
      //estos parametros son para usar en el addCard, ya que todos son opcionales. (es un objeto)
      columnAdd: i,
      type: "user",
    };
    addCard(addDefaultCard); //lamado a la fauncion
  });
}

/* resumen: la funcion toma parametros y segun ellos crea diferentes tipos de tarjeta y les da un target de delete */
function addCard({
  //el {} es para señalar que los parametros son opcionales y que reibe un objeto como parametro
  columnAdd = 0,
  type = "user",
  title = "Worker",
  name = "Julian",
  lastName = "Martinez",
  description = "good slave",
}) {
  const card = document.createElement("div"); //creacion del elemento card
  card.classList.add("card"); //le doy una clase al elemento card recien creado

  switch (
    type //posibilidad de modificacion, se usa para seleccionar que clase llamara para continuar con la contruccion, dependiendo del type
  ) {
    case "color":
      addCardColor(card, title, description);
      break;
    case "user":
      addCardUser(card, title, name, lastName, description);
      break;

    default:
      addCardUser(card, title, name, lastName, description);
  }

  column[columnAdd].appendChild(card); //agrego la card como hijo de la columna seleccionada.
  card.addEventListener("click", deleted); //a la tarjeta creada le asigno un tarjet para poder borrarla
}

/* resumen: da el formato al tipo de tarjeta de tipo user (primera columna) */
function addCardUser(card, title, name, lastName, descriptionUser) {
  card.innerHTML = `
    <h2>${title}</h2>
    <p>Name: ${name} ${lastName}</p>
    <p>Description: ${descriptionUser}<p>`; //crea los elementos de la tarjeta
}

/* resumen: da el formato al tipo de tarjeta de tipo color (segunda columna) */
function addCardColor(card, role, descriptionColor) {
  card.innerHTML = ` 
    <h2>${role}</h2>
    <p>Colors: ${descriptionColor}</p>`; //crea los elementos de la tarjeta
}

/* resumen: borra las tarjetas creadas y por crear segun se elija mediante 1 click */
function deleted(event) {
  event.currentTarget.remove();
}

/* Esta función cambia el título de l columna. Recorre todos los elementos que tengan la clase "title-card" y toma el valor que necesita.
Luego, ocurre un prompt que introduce el valor y lo coloca en el HTML. */

function changeTitle(cardTitles) {
  for (let i = 0; i < cardTitles.length; i++) {
    (function (index) {
      cardTitles[index].addEventListener("click", function () {
        let newTitle = prompt(
          "Enter a new title:",
          cardTitles[index].innerHTML
        );
        cardTitles[index].innerHTML = newTitle;
      });
    })(i);
  }
}

/* Este fetch es la forma en que hay en JS de tomar los datos de un JSON y colocarlos en el HTML. */
fetch("https://my-json-server.typicode.com/RobottiFranco/API-FAKE/users")
  .then((response) => response.json())
  .then((data) => {
    for (let u = 0; u < data.length; u++) {
      const addUserCardParams = {
        columnAdd: 0,
        type: "user",
        title: data[u].role,
        name: data[u].name,
        lastName: data[u].lastName,
        description: data[u].description,
      };
      addCard(addUserCardParams);
    }
  })
  .catch((err) => console.log(err));

/* son 2 diferentes con distintos datos y por lo tanto diferente implementacion */
fetch("https://my-json-server.typicode.com/RobottiFranco/API-FAKE/colors")
  .then((response) => response.json())
  .then((data) => {
    for (let e = 0; e < data.length; e++) {
      const addColorCardParams = {
        columnAdd: 1,
        type: "color",
        title: data[e].role,
        description: data[e].color,
      };
      addCard(addColorCardParams);
    }
  })
  .catch((err) => console.log(err));
