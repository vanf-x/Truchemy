//classes
class Course {
  constructor(id, picture, name, price, cantidad) {
    this.id = id;
    this.picture = picture;
    this.name = name;
    this.price = price;
    this.cantidad = 1;
  }
}
//let & const
const $completeListButton = document.querySelector("#complete-list-button");
const $searchInput = document.querySelector("#search");
const $searchButton = document.querySelector("#search-button");
const $resetButton = document.querySelector("#reset-btn");
const $paymentBtn = document.querySelector("#pay-btn");
const $coursesList = document.querySelector("#courses-list");
const $payButton = document.querySelector("#pay-btn");

let $animated = document.querySelectorAll(".animated");
let $coursesContainerCard = document.querySelectorAll(
  ".courses-container-card"
);
let $addCartButton = document.querySelectorAll(".add-cart-button");
let id = 1;

//programar boton
//programar cantidad

//arrays
let courses = [];
let cart = [];
let cartAux = [];

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
  // console.log(courses);
}

//adds event listener to $addCartButton
function addFunctionToAddCartButton() {
  $addCartButton.forEach((el) => {
    const { id, picture, name, price, cantidad } = el;
    el.addEventListener("click", () => {
      // console.log(el.dataset.id);
      addCourseToCart(el);
      createHMLT();
    });
  });
}

//add course to cart
function addCourseToCart(element) {
  console.log(element.dataset.id);
  courses.forEach((course) => {
    if (course.id == element.dataset.id) cart = [...cart, course];
  });
  // console.log(cart);
  showMessage("Curso agregado con éxito");
}

//creates html in cart
function createHMLT() {
  deleteHTML();
  cart.forEach((course) => {
    const { id, picture, name, price } = course;
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><img src="${picture}" alt="pic-${name}" width=100px></td>
        <td>${name}</td>
        <td>${price}</td>
        <td>${course.cantidad}</td>
        <td><button class="x-button" id="x-button-${id}" data-id="${id}" onclick="deleteCourse(${id})">x</button></td>
      `;
    $coursesList.appendChild(tr);
  });
  console.log(cart);
  console.log(courses);
}

function deleteCourse(btn){
  const selectedBtn = document.querySelector(`#x-button-${btn}`);
  console.log(selectedBtn.dataset.id);
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
  showMessage("Carrito vaciado con éxito");
}
