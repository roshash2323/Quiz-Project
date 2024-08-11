const scores=JSON.parse(localStorage.getItem("score"));
const highScores=JSON.parse(localStorage.getItem("highScores")) || [];

const scoreButton=document.querySelector("div");
const input=document.getElementById("user-input");
const saveButton=document.getElementById("save");

scoreButton.innerText=scores;


const saveData=()=>{
    if(!input.value || !scores){
        alert("enter")
    }
    else{
        const finalScore={name:input.value,score:scores};
       
        highScores.push(finalScore);
        highScores.sort((a,b)=>(b.score-a.score));
        highScores.splice(10);
        console.log(highScores);
        localStorage.setItem("users",JSON.stringify(highScores));
        localStorage.removeItem("score")
        window.location.assign("./")
    
    }

}

saveButton.addEventListener("click",saveData);