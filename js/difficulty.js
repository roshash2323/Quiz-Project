const buttons=document.querySelectorAll("button");


const show=(event)=>{
    const level=event.target.innerText.toLowerCase();
    console.log(level);
    localStorage.setItem("level",level);
    window.location.assign("./");


}


buttons.forEach((button)=>{
    button.addEventListener("click",show)

})


