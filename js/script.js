let animated = document.querySelectorAll(".animated");

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
window.addEventListener("scroll", showScroll);

const url = "./courses.json";
fetch(url)
.then(res=>res.json())
.then(data=>console.log(data))
// .catch(e => console.log(e))

const butt = document.querySelector("#butt");
butt.addEventListener("click", () => {
  const notification = document.getElementById("notification");
  console.log(notification);
  const p = document.createElement("p");
  p.innerHTML = "Agregado al carrito";
  p.classList.add("toast", "success", "show-up-toast");
  p.style.opacity = "1";
  console.log(p.classList);
  notification.appendChild(p);
  setTimeout(() => {
    p.remove();
  }, 2000);
});
