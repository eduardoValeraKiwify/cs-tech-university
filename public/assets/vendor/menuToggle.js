function menuToggle(activity_number, flag){
    var nav = document.getElementById(`overlay-atv${activity_number}`)
    // nav.classList.toggle('active')
    if (flag) {
        nav.style.transform = "scale(1)"
    } else {
        nav.style.transform = "scale(0)"
    }
}