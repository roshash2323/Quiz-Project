
import formatData from "./app.js";


const loader=document.getElementById("loader");
const container=document.querySelector(".container");
const questionText=document.getElementById("question-text");
const answerText=document.querySelectorAll(".answer-text");
const scoreBox=document.getElementById("score");
const nextButton=document.getElementById("next");
const questionBox=document.getElementById("question");
const finishButton=document.getElementById("finish");
const p=document.getElementById("error");

const level=localStorage.getItem("level") || "medium";
const URL=`https://opentdb.com/api.php?amount=10&difficulty=${level}`;





let formattedDta=null;
let questionIndex=0;
let correctAnswer=null;
let scores=0;
let CORRECT_BONOUS=10;
let isAccepted=true;



const fetchData=async()=>{
    try {
        const data=await fetch(URL);
        const json=await data.json();
        formattedDta=formatData(json.results);
        console.log(formattedDta);
        start();
      
        
    } catch (error) {
        console.log("error");
        loader.style.display="none";
        p.style.display="inline-block";
        
    }

   
}

const start=()=>{
    showQuestion();
    loader.style.display="none";
    container.style.display="inline-block";

}

const showQuestion=()=>{
   
    const{question,answers,correctAnswerIndex}=formattedDta[questionIndex];
    console.log(answers);
  
   questionText.innerText=question;
   correctAnswer=correctAnswerIndex;
   
   answerText.forEach((answer,index)=>{
    answer.innerText=answers[index];
    
   })


};


const checkAnswer=(event,index)=>{
    if(!isAccepted) return;
    isAccepted=false;
  
    const isCorrect=index===correctAnswer? true : false;
    console.log(isCorrect);

    if(isCorrect){
       event.target.classList.add("correct");
       scores+=CORRECT_BONOUS;
       scoreBox.innerText=scores;
    
    
    }

    else{
        event.target.classList.add("incorrect");
        answerText[correctAnswer].classList.add("correct");

    }

};


answerText.forEach((answer,index) => {
   
    answer.addEventListener("click",(event)=>checkAnswer(event,index));
    
});

const next=()=>{

    questionIndex++;
    
    if(questionIndex<formattedDta.length){
        isAccepted=true;
        removeClasses();
        showQuestion();
        questionBox.innerText=questionIndex+1;

    }
    else{
       finish();
    }
  
}


const removeClasses=()=>{
    
   answerText.forEach((answer)=>answer.className="answer-text")

}


nextButton.addEventListener("click",next);


const finish=()=>{
    localStorage.setItem("score",JSON.stringify(scores));
   
    window.location.assign("end.html");

}


finishButton.addEventListener("click",finish)

window.addEventListener("load",fetchData);

