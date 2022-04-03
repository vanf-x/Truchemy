//classes
class Course {
  constructor(id, picture, name, tutor, stars, price, offer) {
    this.id = id;
    this.picture = picture;
    this.name = name;
    this.tutor = tutor;
    this.stars = stars;
    this.price = price;
    this.offer = offer;
    let cantidad = 1;
  }
}
//CONST & LET
let courses = [];
let cart = [];
let animated;
let addButton;
resetBtn = document.querySelector("#reset-btn");
const $coursesList = document.querySelector('#courses-list');

//

window.addEventListener("DOMContentLoaded", () => {
  fillCoursesCart();
  window.addEventListener("scroll", showScroll);
  resetBtn.addEventListener("click", resetCart);
});



//fetch from courses.json() & creates objs course for courses array.
function fillCoursesCart() {
  const url = "http://127.0.0.1:5500/js/courses.json";
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

//creates HTML inside coursesContainer
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
                                <p class="discount">$${el.price}</p>
                                <span id="course-price">$${el.offer}</span>
                            </div>
                            <button class="add-cart-button" id="button${el.id}" data-id="${el.id}">Agregar</button>
                        </div>
                        </div>
        `;
    fragment.appendChild(div);
  });
  coursesContainer.appendChild(fragment);
  animated = document.querySelectorAll(".animated");
  addButtonAll();
}

//EVENTO DE BOTON




//select addButtons
function addButtonAll(){
  addButton = document.querySelectorAll('.add-cart-button');
  console.log(addButton);
}

//
function addCourse(){
  addButton.forEach(el=>{
    el.addEventListener('click', ()=>{
      console.log('xd')
    })
  })
}



// /////////////////////////////////
