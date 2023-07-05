 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
 import { getDatabase ,  onValue , ref } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyAN4ImzaFY63oC5Q8L1ik_jDCOK3G6NOug",
   authDomain: "quizz-app-520ba.firebaseapp.com",
   databaseURL: "https://quizz-app-520ba-default-rtdb.firebaseio.com",
   projectId: "quizz-app-520ba",
   storageBucket: "quizz-app-520ba.appspot.com",
   messagingSenderId: "928819100716",
   appId: "1:928819100716:web:e222c245bf3f1d63e1e589",
   measurementId: "G-G28BBRDBLY"
 };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const databasee = getDatabase(app)
let REF = ref(databasee ,"Ques/")
onValue(REF, (snap)=>{
    let data = Object.values(snap.val()) 
    RenderingText(data)
})

var question_box = document.querySelector('.question_box')
var qeu_no = document.querySelector('.qeu_no')
var total_qeu = document.querySelector('.total_qeu')
var option_box = document.querySelector('.option_box')
var main_conatiner = document.querySelector('.main_conatiner')

var indexVal = 0;
var marks = 0;


function RenderingText(questions) {
    question_box.innerHTML = questions[indexVal].question
    total_qeu.innerText = questions.length
    qeu_no.innerText = indexVal + 1;
    option_box.innerHTML = ''
    for (let i = 0; i < questions[indexVal].options.length; i++) {
        option_box.innerHTML += `
        <button class="p-2 bg-light btn d-block w-100 text-dark text-start px-3 my-2 rounded" onclick="CheckingAns('${questions[indexVal].correctAnswer}','${questions[indexVal].options[i]}')">
            <div class="d-flex me-3 d-block w-100 p-2 text-start option-btn"></div>
        </button>
        `
        option_box.children[i].innerText = questions[indexVal].options[i]
    }



    window.nexTT = () => {
        indexVal++
        if (indexVal < questions.length) {
            RenderingText(questions);
        }else{
            ShowMakrs()
        }
}
    
    
    window.CheckingAns =(a, b , c)=> {
        if (a == b) {
            marks++
        }
        nexTT()
    }
    
    window.ShowMakrs = ()  =>{
    
        main_conatiner.innerHTML = `
        
        <div class="m-5">
            <div class="py-3 px-5 rounded border"> You give <span class="text-success"> ${marks} </span> Right Answer out of <span class="text-warning"> ${questions.length} </span></div>
        </div>
        
        `
    }





}











































