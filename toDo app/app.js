// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, get , onValue , set, push  ,remove  ,update} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1Skvq-XYz5nETlur0lBpRPeXSY1sGIJ0",
    authDomain: "javascript-todo-list-b11c7.firebaseapp.com",
    databaseURL: "https://javascript-todo-list-b11c7-default-rtdb.firebaseio.com",
    projectId: "javascript-todo-list-b11c7",
    storageBucket: "javascript-todo-list-b11c7.appspot.com",
    messagingSenderId: "630050959762",
    appId: "1:630050959762:web:a92fe7e3c3a66edf76514b",
    measurementId: "G-01VRR3HXEN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

var input = document.getElementById("Inp")
var listParent = document.getElementById("listParent")



const Render_list = () => {
let dbref = ref(db, "todos/")
    onValue(dbref, (snap) => {
        let data = Object.values(snap.val())
        if (data.length < 0) return
        listParent.innerHTML = ``
        for (let i = 0; i < data.length; i++) {
            let li = document.createElement("li");
            li.innerHTML = `${data[i].todo}<div><button class="EditBtn" onclick="Edit_li('${data[i].key}')"><i class="fa-regular fa-pen-to-square"></i></button><button class="deletBtn" onclick="Delet_li('${data[i].key}')"><i class="fa-solid fa-trash"></i></button></div>`
            li.addEventListener("click", (e) => {
                e.target.style.textDecoration = 'line-through'
            })
            listParent.appendChild(li)
        }
    })
}
Render_list()
window.Addtask = () => {
    if (input.value.length == 0) return;
    let dbref = push(ref(db, "todos/"))
    set(dbref, {
        todo: input.value,
        key: dbref.key
    })
    input.value = ''
    input.focus()
}

window.Edit_li = (key) => {
    let New_value = prompt("Enter new Value to edit")
    if (New_value.length == 0) return;
    let dbref = ref(db , `todos/${key}`)
    update(dbref , {
        todo : New_value
    })
}
window.Delet_li = (key) => {
    let dbref = ref(db , `todos/${key}`)
    remove(dbref)
}
document.addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        Addtask()
    }
})