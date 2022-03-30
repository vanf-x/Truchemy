let animated = document.querySelectorAll('.animated');

function showScroll(){
    let scrollTop = document.documentElement.scrollTop;
    for(let i = 0; i< animated.length; i++){
        let animatedHeight = animated[i].offsetTop;
        if(animatedHeight-500 < scrollTop){
            animated[i].style.opacity = 1;
            animated[i].classList.add('show-up');
        }
    }
}
window.addEventListener('scroll', showScroll);
const url = "courses.json";
fetch(url)
.then(res=>res.json())
.then(data=>console.log(data))
// .catch(e => console.log(e))