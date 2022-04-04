//classes
class Course {
  constructor(id, picture, name, price, quantity) {
    this.id = id;
    this.picture = picture;
    this.name = name;
    this.price = price;
    this.quantity = 1;
  }
}
//let & const. $makes reference to DOM.
const $completeListButton = document.querySelector("#complete-list-button");
const $searchInput = document.querySelector("#search");
const $searchButton = document.querySelector("#search-button");
const $resetButton = document.querySelector("#reset-btn");
const $paymentBtn = document.querySelector("#pay-btn");
const $coursesList = document.querySelector("#courses-list");
const $total = document.querySelector('#total');

let $animated = document.querySelectorAll(".animated");
let $coursesContainerCard = document.querySelectorAll(
  ".courses-container-card"
);
let $addCartButton = document.querySelectorAll(".add-cart-button");
let id = 1;
let totalPayment = 0;

//filter en el buscador

//arrays
let courses = [];
let coursesAux = [];
let cart = [];

//execution starts
window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", showScroll);
  $resetButton.addEventListener("click", () => {
    resetCart();
  });
  createObjCourses();
  addFunctionToAddCartButton();
});

//creates obj courses $ fill courses array
function createObjCourses() {
  $coursesContainerCard.forEach((el) => {
    const course = new Course(
      id,
      el.children[0].children[0].src,
      el.children[1].children[0].textContent,
      el.children[1].children[3].children[1].children[0].textContent
    );
    courses = [...courses, course];
    id++;
  });
}

//adds event listener to $addCartButton
function addFunctionToAddCartButton() {
  $addCartButton.forEach((el) => {
    const { id, picture, name, price, quantity } = el;
    el.addEventListener("click", () => {
      addCourseToCart(el);
      createHMLT();
    });
  });
}

//add course to cart
function addCourseToCart(element) {
  //boton agregar
  courses.forEach((course) => {
    //recorre los cursos y se fija: si el id del curso y el id del boton son iguales, agrega el curso.
    if (course.id == element.dataset.id) cart = [...cart, course];
  });
  let repeated = 0;
  cart.forEach((course) => {
    if (course.id == cart[cart.length - 1].id) {
      repeated++;
      if (repeated > 1) {
        course.quantity++;
        cart.pop();
      }
    }
  });
  setTotalPayment();
  showMessage("Curso agregado con éxito");
}

function setTotalPayment(){
  totalPayment = 0;
  cart.forEach(el=>{
    totalPayment += (el.price * el.quantity);
  })
  $total.textContent = totalPayment.toFixed(2);
}

//creates html in cart
function createHMLT() {
  deleteHTML();
  if (cart.length > 0) {
    $paymentBtn.style.visibility = "visible";
  }else{
    $paymentBtn.style.visibility = "hidden";
  }
  cart.forEach((course) => {
    const { id, picture, name, price } = course;

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><img src="${picture}" alt="pic-${name}" width=100px></td>
        <td>${name}</td>
        <td>${price}</td>
        <td>${course.quantity}</td>
        <td><button class="x-button" id="x-button-${id}" data-id="${id}" onclick="deleteCourse(${id})">x</button></td>
      `;
    $coursesList.appendChild(tr);


  });
}

//deletes course with "x" button
function deleteCourse(btnId) {
  const selectedBtn = document.querySelector(`#x-button-${btnId}`);
  courses.filter(c=>c.quantity = 1);
  cart = cart.filter((c) => c.id != selectedBtn.dataset.id);
  createHMLT();
  setTotalPayment();

  showMessage("Curso borrado con éxito");
  
}

//scroll animation for each course
function showScroll() {
  let scrollTop = document.documentElement.scrollTop;
  for (let i = 0; i < $animated.length; i++) {
    let animatedHeight = $animated[i].offsetTop;
    if (animatedHeight - 500 < scrollTop) {
      $animated[i].style.opacity = 1;
      $animated[i].classList.add("show-up");
    }
  }
}

//prevents html multiplication
function deleteHTML() {
  while ($coursesList.firstChild) {
    $coursesList.firstChild.remove();
  }
}

//notifiaction message
function showMessage(message) {
  const $notification = document.getElementById("notification");
  const p = document.createElement("p");
  p.textContent = message;
  p.classList.add("toast", "success", "show-up-toast");
  $notification.appendChild(p);
  setTimeout(() => {
    p.remove();
  }, 1500);
}

//resets cart
function resetCart() {
  cart = [];
  deleteHTML();
  $paymentBtn.style.visibility = "hidden";
  showMessage("Carrito vaciado con éxito");
  totalPayment = 0;
  $total.textContent = totalPayment;
  courses.forEach(course =>{
    course.quantity = 1;
  })
}

