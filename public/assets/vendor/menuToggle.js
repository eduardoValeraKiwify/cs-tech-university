function menuToggle1(){
    var nav = document.getElementById('overlay-atv1');
    nav.classList.toggle('active');
}

function menuToggle2(){
    var nav = document.getElementById('overlay-atv2');
    nav.classList.toggle('active');
}

function menuToggle3(){
    var nav = document.getElementById('overlay-atv3');
    nav.classList.toggle('active');
}

async function menuToggle4(){
    var nav = document.getElementById('overlay-atv4');
    nav.classList.toggle('active');
    // const cards = await fetch('/api/fetchTeamNotion').then((res) => res.json().then((data) => data.results))
}