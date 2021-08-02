const nav = document.querySelector('.mobnav');
const hamb = document.querySelector('.hamburger');

hamb.addEventListener('click', (e)=>{
    e.preventDefault();
    nav.classList.toggle('show');
})