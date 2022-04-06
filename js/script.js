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

//payment

//arrays
let courses = [];
let coursesAux = [];
let cart = [];
let coursesContainerCardAux = [];

//execution starts
window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", showScroll); //to line 158
  $resetButton.addEventListener("click", () => {
    resetCart(); //to line 193
  });
  createObjCourses(); //to line 53
  addFunctionToAddCartButton(); //to line 67
  $searchButton.addEventListener("click", searchCourse); //to line 207
  cart = JSON.parse(localStorage.getItem("cart")) || []; //if local storage is empty, cart = []
  setTotalPayment(); //to line 109
  createHMLT(); // to line 118
});

//creates obj courses & fill courses array
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
    el.addEventListener("click", () => {
      addCourseToCart(el);
      createHMLT();
    });
  });
}

//add course to cart
function addCourseToCart(element) {
  //works with function addFunctionToAddCartButton(), line 69. the element is the "aregar" button

  courses.forEach((course) => {
    //iterates courses and check: if course.id == element.id in order to add the course to cart

    if (course.id == element.dataset.id) {
      //if cart is empty allways adds it.
      if (cart.length == 0) {
        cart = [...cart, course];
        return;
      }
      let contains = false;
      cart.forEach((el) => {
        console.log(el); // if the cart element is included in courses, just adds one to quantity
        if (el.id == course.id) {
          el.quantity++;
          contains = true;
          return;
        }
      }); //if the cart element is included in courses, it adds it to cart
      if (contains == false) {
        cart = [...cart, course];
      }
    }
  });
  setLocalStorageCart();
  setTotalPayment();
  showMessage("Curso agregado con éxito");
}

//calculates total amount when hover the cart
function setTotalPayment() {
  totalPayment = 0;
  cart.forEach((el) => {
    totalPayment += el.price * el.quantity;
  });
  $total.textContent = totalPayment.toFixed(2);
}

// creates html in cart using the course object
function createHMLT() {
  deleteHTML();
  if (cart.length > 0) {
    //if the cart is empty the payment button will be hidden
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
  // inserts function to the button created by createHMLT()
  const selectedBtn = document.querySelector(`#x-button-${btnId}`);
  courses.forEach((course) => {
    if (course.id == btnId) {
      course.quantity = 1;
    }
  });
  cart = cart.filter((c) => c.id != selectedBtn.dataset.id);
  createHMLT();
  setTotalPayment();
  setLocalStorageCart();
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
  if (value == 2) {
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
  setLocalStorageCart();
  deleteHTML();
  $paymentBtn.style.visibility = "hidden";
  showMessage("Carrito vaciado con éxito");
  totalPayment = 0;
  $total.textContent = totalPayment;
  courses.forEach((course) => {
    course.quantity = 1;
  });
}

//search a specific course
function searchCourse() {
  removeDisplayNone();
  coursesAux = [];
  coursesContainerCardAux = [];
  fillCoursesContainerCard();

  courses.forEach((course) => {
    if ($searchInput.value.trim() == "") {
      return;
    }
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

  if (coursesAux.length == 0) {
    showMessage("No se ha encontrado ningún curso con ese nombre", 2);
    restartSearch();
    return;
  }
  displayNoneToFiltered();
  restartSearch();
  backToCoursesButton();
}

//removes class dn (display-none) from hidden elements
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
function backToCoursesButton() {
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

//add class dn (display-none) to the filtered courses in searchCourse()
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

//helps in function searchCourse()
function fillCoursesContainerCard() {
  for (let i = 0; i<$coursesContainerCard.length; i++) {
    coursesContainerCardAux = [
      ...coursesContainerCardAux,
      $coursesContainerCard[i],
    ];
  }
}

//saves cart info in local storage
function setLocalStorageCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
