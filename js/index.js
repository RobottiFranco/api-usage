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

/* resumen: Esta función cambia el título de la columna seleccionada. */

function changeTitle(cardTitles) {
  for (let i = 0; i < cardTitles.length; i++) {
    //itero sobre cada uno de loselementos con la clase title-card para buscar el que me interesa
    (function (index) {
      cardTitles[index].addEventListener("click", function () {
        let newTitle = prompt(
          //el promt crea una alerta donde el usuario ingresa el nombre que quiere para la fila
          "Enter a new title:",
          cardTitles[index].innerHTML
        );
        if (newTitle != "") {
          //verifico que el texto ingresado no sera ""
          cardTitles[index].innerHTML = newTitle; //si el texto es correcto lo cambio en HTML
        }
      });
    })(i);
  }
}
/* resumen: lo que ocurre ccon estos fetch es la obtencion de datos json a la integraacion de tarjetas en html  */
fetch("https://my-json-server.typicode.com/RobottiFranco/API-FAKE/users")
  .then((response) => response.json()) //recibo el respoonse y lo paso a json
  .then((data) => {
    for (let u = 0; u < data.length; u++) {
      //con los datos que obtengo los itero de modo de usar todos los que necesito
      const addUserCardParams = {
        //esta estructura es un objeto, donde yo escribo todos los datos que quiero pasarle a addCard y los obtengo del json.
        columnAdd: 0,
        type: "user",
        title: data[u].role,
        name: data[u].name,
        lastName: data[u].lastName,
        description: data[u].description,
      };
      addCard(addUserCardParams); //lamo a la funcion con los parametros que le di
    }
  })
  .catch((err) => console.log(err)); //en caso que ocurra un error lo tomo y lo imprimo en un log

/* resumen: lo mismo que el anterior */
fetch("https://my-json-server.typicode.com/RobottiFranco/API-FAKE/colors")
  .then((response) => response.json())
  .then((data) => {
    for (let e = 0; e < data.length; e++) {
      const addColorCardParams = {
        //esta estructura es un obejto, donde yo escribo todos los datos que quiero pasarle a addCard y los obtengo del json.
        columnAdd: 1,
        type: "color",
        title: data[e].role,
        description: data[e].color,
      };
      addCard(addColorCardParams); //lamo a la funcion con los parametros que le di
    }
  })
  .catch((err) => console.log(err)); //en caso que ocurra un error lo tomo y lo imprimo en un log


/* async function addJoke(){
  try{
  const response = await (await fetch("https://api.chucknorris.io/jokes/random")).json();
  return response;
}
  catch(err){
    console.log(err);
  }
}

addJoke(); */