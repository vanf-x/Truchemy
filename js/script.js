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
const $total = document.querySelector("#total");
const $coursesContainer = document.querySelector("#courses-container");

let $animated = document.querySelectorAll(".animated");
let $coursesContainerCard = document.querySelectorAll(
  ".courses-container-card"
);
let $addCartButton = document.querySelectorAll(".add-cart-button");
let id = 1;
let totalPayment = 0;
let buttonDiv;

//carrito con localStorage
//comentar con más detalle
//payment

//arrays
let courses = [];
let coursesAux = [];
let cart = [];
let coursesContainerCardAux = [];

//execution starts
window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", showScroll);
  $resetButton.addEventListener("click", () => {
    resetCart();
  });
  createObjCourses();
  addFunctionToAddCartButton();
  $searchButton.addEventListener("click", searchCourse);
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

//calculates total payment
function setTotalPayment() {
  totalPayment = 0;
  cart.forEach((el) => {
    totalPayment += el.price * el.quantity;
  });
  $total.textContent = totalPayment.toFixed(2);
}

// creates html in cart
function createHMLT() {
  deleteHTML();
  if (cart.length > 0) {
    $paymentBtn.style.visibility = "visible";
  } else {
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
  courses.filter((c) => (c.quantity = 1));
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
function showMessage(message, value) {
  const $notification = document.getElementById("notification");
  const p = document.createElement("p");
  p.textContent = message;
  p.classList.add("toast", "success", "show-up-toast");
  if(value==2){
  p.classList.remove("success");
  p.classList.add("error");
  }
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
  courses.forEach((course) => {
    course.quantity = 1;
  });
}

//searchs an specific course
function searchCourse() {
  removeDisplayNone();
  coursesAux = [];
  coursesContainerCardAux = [];
  inverseOrdenForCoursesContainerCard();
  //
  courses.forEach((course) => {
    if (
      course.name
        .toLowerCase()
        .includes($searchInput.value.trim().toLowerCase())
    ) {
      coursesAux = [...coursesAux, course];
      // 
    }
    filterCourses();
  });
  if(coursesAux.length==0){
    showMessage("No se ha encontrado ningún curso con ese nombre", 2);
    restartSearch();
    return;
  }
  displayNoneToFiltered();
  restartSearch();
  backToCoursesButton();
}

//removes display none to hidden elements
function removeDisplayNone() {
  $coursesContainerCard.forEach((card) => {
    card.classList.remove("dn");
  });
}

//function for .back-to-courses button
function showCoursesAgain(value) {
  removeDisplayNone();
  value.remove();
}

  //creates button to bring back all the courses
function backToCoursesButton(){
  let $exists = document.querySelector(".back-to-courses");
  if (!$exists) {
    buttonDiv = document.createElement("div");
    buttonDiv.innerHTML = `
      <div class="back-to-courses">
    <button class="db" id="complete-list-button" onclick="showCoursesAgain(buttonDiv)" style="color: white; min-width=700px"> < < Volver a la lista completa</button>
    </div>
    `;
    $coursesContainer.appendChild(buttonDiv);
  }
}

//restarts search input
function restartSearch() {
  $searchInput.value = "";
}

//display none to the filtered courses
function displayNoneToFiltered() {
  if (coursesContainerCardAux.length > 0) {
    coursesContainerCardAux.forEach((el) => {
      el.classList.add("dn");
    });
  }
}
//filter courses comparing by id and dataset.id
function filterCourses() {
  coursesAux.forEach((el) => {
    for (let i = 0; i < coursesAux.length; i++) {
      for (let j = 0; j < coursesContainerCardAux.length; j++) {
        if (coursesAux[i].id == coursesContainerCardAux[j].dataset.id) {
          coursesContainerCardAux = coursesContainerCardAux.filter(
            (course) => course.dataset.id != coursesAux[i].id
          );
        }
      }
    }
  });
}

//inverts order of coursesContainerCard in order todo filter operations succesfully
function inverseOrdenForCoursesContainerCard(){
  for (let i = $coursesContainerCard.length; i > 0; i--) {
    coursesContainerCardAux = [
      ...coursesContainerCardAux,
      $coursesContainerCard[i - 1],
    ];
  }
}