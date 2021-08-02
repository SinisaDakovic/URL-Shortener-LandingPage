
const api = (link) => `https://api.shrtco.de/v2/shorten?url=${link}`;

const input = document.getElementById('inp');
const form = document.getElementById('form');


const main = document.querySelector('.formated');
const err = document.querySelector('.sp');
const btna = document.getElementById('btna');

const wait = document.querySelector('.please-w');

document.addEventListener('DOMContentLoaded',getLocal());

async function short(link){
    const res = await fetch(api(link));
    const data = await res.json();
    create(data);
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    let link = input.value;
    if(link){
        short(link);
        input.classList.remove('err');
        err.classList.remove('disp');

    }else{
        input.classList.add('err');
        err.classList.add('disp');
    } 

    input.value = "";
})
btna.addEventListener('click', (e) =>{
    e.preventDefault();
    let link = input.value;
    if(link){
        short(link);
        input.classList.remove('err');
        err.classList.remove('disp');

    }else{
        input.classList.add('err');
        err.classList.add('disp');
    } 
    wait.style.display = 'block';
    input.value = "";
})

input.addEventListener('focus', (e) =>{
    input.classList.remove('err');
    err.classList.remove('disp');
})

function create(datas){
    //creates first div and adds class of shorten-link
    
    const divv = document.createElement("div");
    divv.setAttribute('class','shorten-link');

    //creates second div inside first div with class link
    const divo = document.createElement("div");
    divo.setAttribute('class','link');

    //creates p in second div with class or-l
    const p = document.createElement("p");
    p.setAttribute('class','or-l');
    p.innerHTML = `${datas.result.original_link}`;

    //creates third div inside first div with class shorten-copy
    const divt = document.createElement("div");
    divt.setAttribute('class','shorten-copy');

    //creates two anchors inside shorten div
    const a = document.createElement("a");
    a.setAttribute('class', 'shorten-l');
    a.setAttribute('href',`${datas.result.full_short_link}`);
    a.setAttribute('target','_blank');
    a.innerHTML = `${datas.result.full_short_link}`;

    const ab = document.createElement("a");
    ab.innerText = "Copy";
    ab.setAttribute('class', 'copy');

    divo.append(p);
    divv.append(divo);

    divt.append(a);
    divt.append(ab);

    divv.append(divt);

    main.append(divv);

    let copy = document.querySelectorAll('.copy');
    
        copy.forEach((copi) => {
    
            copi.addEventListener('click', (e) =>{
                e.preventDefault();
                copi.innerHTML = 'Copied!';
                copi.style.backgroundColor = "#1e9494";
                
                navigator.clipboard.writeText(copi.previousSibling.innerText);
                })
            })
wait.style.display = 'none';
saveLocal(datas);
}

// function write(datas){
//     const p = document.querySelector('.or-l');
//     const anchor = document.querySelector('.shorten-l');

//     p.innerHTML = `${datas.result.original_link}`;
//     anchor.innerHTML = `${datas.result.full_short_link}`;
// }


function saveLocal(data){
    

    localStorage.setItem('Original_link',`${data.result.original_link}`);
    localStorage.setItem('Short_link',`${data.result.full_short_link}`);
  
}

function getLocal(){

    if(localStorage.getItem('Original_link')){

        const divv = document.createElement("div");
        divv.setAttribute('class','shorten-link');
        
        //creates second div inside first div with class link
        const divo = document.createElement("div");
        divo.setAttribute('class','link');
        
        //creates p in second div with class or-l
        const p = document.createElement("p");
        p.setAttribute('class','or-l');
        p.innerHTML = localStorage.getItem('Original_link');
        
        //creates third div inside first div with class shorten-copy
        const divt = document.createElement("div");
        divt.setAttribute('class','shorten-copy');
        
    //creates two anchors inside shorten div
    const a = document.createElement("a");
    a.setAttribute('class', 'shorten-l');
    a.setAttribute('href',localStorage.getItem('Short_link'));
    a.innerHTML = localStorage.getItem('Short_link');
    
    const ab = document.createElement("a");
    ab.innerText = "Copy";
    ab.setAttribute('class', 'copy');
    
    divo.append(p);
    divv.append(divo);
    
    divt.append(a);
    divt.append(ab);
    
    divv.append(divt);
    
    main.append(divv);
    
}
}

if(localStorage.getItem('Original_link')){


    let copy = document.querySelectorAll('.copy');
    
    copy.forEach((copi) => {

        copi.addEventListener('click', (e) =>{
            e.preventDefault();
            copi.innerHTML = 'Copied!';
            copi.style.backgroundColor = "#1e9494";
            
            navigator.clipboard.writeText(copi.previousSibling.innerText);
            })
        })

}





