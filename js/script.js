class Course {
  constructor(id, picture, name, tutor, stars, price, offer) {
    this.id = id;
    this.picture = picture;
    this.name = name;
    this.tutor = tutor;
    this.stars = stars;
    this.price = price;
    this.offer = offer;
  }
}
//CONST & LET
let courses = [];
let cart = [];
let animated;
resetBtn = document.querySelector("#reset-btn");

//
fillCoursesCart();
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(()=>{
console.log(animated);
animated = document.querySelectorAll(".animated");

window.addEventListener("scroll", showScroll);

  }, 100)
});
//
  function showScroll() {
    let scrollTop = document.documentElement.scrollTop;
    for (let i = 0; i < animated.length; i++) {
      let animatedHeight = animated[i].offsetTop;
      if (animatedHeight - 500 < scrollTop) {
        animated[i].style.opacity = 1;
        animated[i].classList.add("show-up");
      }
    }
  }
function fillCoursesCart() {
  const url = "../js/courses.json";
  fetch(url)
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(res);
    })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const { id, picture, name, tutor, stars, price, offer } = data[i];
        const course = new Course(
          id,
          picture,
          name,
          tutor,
          stars,
          price,
          offer
        );
        courses.push(course);
      }
      fillCoursesContainer(courses);
    });
}

function fillCoursesContainer(coursesArray) {
  const fragment = document.createDocumentFragment();
  const coursesContainer = document.querySelector("#courses-container");
  coursesArray.forEach((el) => {
    const { id, picture, name, tutor, stars, price, offer } = el;
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="courses-container-card animated">
        <div class="courses-container-card-img">
                            <img src="${el.picture}" alt="curso${el.id}">
                        </div>
                        <div class="courses-container-card-info">
                            <h3>${el.name}</h3>
                            <h4>${el.tutor}</h4>
                            <img src="${el.stars}" alt="stars">
                            <div class="prices">
                                <p class="discount">${el.price}</p>
                                <span id="course-price">$${el.offer}</span>
                            </div>
                            <button class="add-cart-button" id="button${el.id}" data-id="${el.id}">Agregar</button>
                        </div>
                        </div>
        `;
    fragment.appendChild(div);
  });
  coursesContainer.appendChild(fragment);
}
// fillCoursesContainer(courses);

//EVENTO DE BOTON
resetBtn.addEventListener("click", resetCarr);

function showMessage(message) {
  const notification = document.getElementById("notification");
  const p = document.createElement("p");
  p.textContent = message;
  p.classList.add("toast", "success", "show-up-toast");
  notification.appendChild(p);
  setTimeout(() => {
    p.remove();
  }, 2000);
}
function resetCarr() {
  showMessage("Carrito vaciado con éxito");
  let cart = [];
}

/////////////////////////////////

