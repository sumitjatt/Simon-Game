let user = [];
let final = [];
// user and final are two arrays used to store color we select and random colors respectively
const select = ['red','blue','yellow','green'];
let level = 0;
let bool = false;
const lvl = document.querySelector(".level");

// Start game using keyoress
document.addEventListener("keypress",()=>{
    if(bool == false){
        bool = true;
        levelup();
        rand();
    }
})

// Level Up 
function levelup(){
    user = [];
    level++;
    lvl.innerHTML = `Level ${level}`;
}

//Get Random Colors
function rand(){
    const random = Math.floor(Math.random()*4);
    const color = select[random];
    final.push(color);
    flash(color);
    let audio = new Audio("./sounds/random.mp3");
    audio.play();
}

//Flash the selected color box
function flash(color){
    const btn = document.querySelector(`.${color}`);
    btn.classList.add("right");
    setTimeout(() => {
        btn.classList.remove("right");
    }, 250);
}

//Adding click event to colors
const allBtn = document.querySelectorAll(".btn");
allBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        user.push(btn.id);
        check(user.length-1);
        flash(btn.id);
        let audio = new Audio("./sounds/right.mp3");
        audio.play();
    })
})

// Check weather the sequence of user is right
function check(index){
    if(user[index]==final[index]){
        if(user.length == final.length){
            levelup();
            setTimeout(()=>{
                rand();
            },1000);
        }
    }
    else{
        highest();
        let audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        lvl.innerHTML = `Game Over. Press Any key to Restart <br> Your Level : ${level}`;
        const btn = document.querySelector(`.${user[index]}`);
        btn.classList.add("wrong");
        setTimeout(() => {
            btn.classList.remove("wrong");
        }, 250);
        restart();
    }
}

// Highest score 
function highest(){
    const high = document.querySelector(".high");
    if(high.id<level){
        high.id = `${level}`;
        high.innerHTML = `Highest Score : ${level}`;
    }
}

// Restart Game
function restart(){
    final = [];
    bool = false;
    level = 0;
}