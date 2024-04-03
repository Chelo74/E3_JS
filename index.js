const pizzas = [
  {
    id: 1,
    nombre: "Pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: './img/muzzarella.png'
  },

  {
    id: 2,
    nombre: "Pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "Pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "Pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "Pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

/*--------------------------------------------------*/
/*---------------------Utils------------------------*/
/*--------------------------------------------------*/

/* Agarro los elementos del DOM */
const form = document.getElementById('form');
const inputText = document.getElementById('input');
const inputBtn = document.getElementById('submit_btn')
const cardContainer = document.getElementById('container')

/* Obtengo el array */
let pizzasFiltered = JSON.parse(localStorage.getItem('pizzasFiltered')) || [];

/* Guardo el array */
const saveArray = () => {
  localStorage.setItem('pizzasFiltered',JSON.stringify(pizzasFiltered));
};

/* Crea la card */
const createCard = (object) => {
  return `
    <div class="card">
      <div class="img_name_price">
          <div>
              <img src="${object.imagen}" alt="">
          </div>
          <div class="name_price">
              <h2>${object.nombre}</h2>
              <h3>Precio: ${object.precio}</h3>
          </div>
          <div>
              <img src="${object.imagen}" alt="">
          </div>
      </div>
      <div class="ingredients">
          <h4>Ingredientes</h4>
          <p>${object.ingredientes}</p>
      </div>
    </div>
  `
};

/* Renderiza la card */
const renderCard = () => {
    cardContainer.innerHTML = createCard(pizzasFiltered);
    showContainer();
    // console.log(pizzasFiltered);
};

/* Busca la pizza en el array */
const searchPizza = (input) => {
  const filterID = Number(input.value);
  
  if (pizzas.some(e => e.id === filterID)) {
    pizzasFiltered = pizzas.find(e => e.id === filterID);
    renderCard();
    return;

  }else {
    showError(input,'No encontramos la pizza');
    hiddenContainer();
  };
};

const hiddenContainer = () => {
  cardContainer.classList.add('hidden')
};

const showContainer = () => {
  cardContainer.classList.remove('hidden');
};

/*--------------------------------------------------*/
/*-------------------Validaciones-------------------*/
/*--------------------------------------------------*/

const isEmpty = (input) => {
  return !input.value.trim().length;
};

const isNumber = (input) => {
  const regex = /^[0-9,$]*$/;
  return regex.test(input.value.trim());
};


const checkInput = (input) => {
  let valid = false;

  if(isEmpty(input)) {
    showError(input,'Este campo es obligatorio');
    return;
  };

  if(!isNumber(input)) {
    showError(input,'El valor ingresado debe ser un número');
    return;
  };

  showSucces(input);
  valid = true;
  return valid;
};

// Submit.
const submitBtn = (e) => {
  e.preventDefault();

  if(checkInput(inputText)) {
    searchPizza(inputText);
    saveArray();
  };
};

/*--------------------------------------------------*/
/*-------------------Éxito/Error--------------------*/
/*--------------------------------------------------*/

const showError = (input,message) => {
  const formField = input.parentElement;
  // console.log(formField);
  formField.classList.remove('succes');
  formField.classList.add('error');
  
  const error = formField.querySelector('Small')
  error.style.display = 'block';
  error.textContent = message;
};

const showSucces = (input) => {
  const formField = input.parentElement;
  formField.classList.remove('error');
  formField.classList.add('succes');

  const error = formField.querySelector('small');
  error.textContent = ''; 
};

/*--------------------------------------------------*/
/*-----------------Función Init---------------------*/
/*--------------------------------------------------*/

const init = () => {
  form.addEventListener('submit',submitBtn);
  document.addEventListener('DOMContentLoaded', renderCard);
};

init();

