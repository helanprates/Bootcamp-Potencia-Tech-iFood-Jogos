
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: parseInt(document.querySelector(".lives").textContent),
        retry: document.querySelector(".retry")
    },

    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },

    actions: {
        timerId: setInterval(randomSquare, 650),
        countDownTimerId: setInterval(countDown, 1000),
    },
}

function retry(){
    state.view.retry.addEventListener('click', () => {
      location.reload();
    })
}

function playSound(audioName){
    let audio = new Audio(`./assets/audios/${audioName}` );
    audio.volume = 0.4;
    audio.play();
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    
    if(state.values.currentTime<=0 || state.view.lives<=0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert ("Game Over! O seu resultado foi: " + state.values.result);}
}

function randomSquare(){
    state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
    });

let randomNumber = Math.floor(Math.random() * 9);
let randomSquares = state.view.squares[randomNumber];
randomSquares.classList.add("enemy");
state.values.hitPosition = randomSquares.id;
}

function addListenerHitBox()
{  
    state.view.squares.forEach((square) => 
    {
        square.addEventListener("mousedown", () =>
        {
          if (square.id === state.values.hitPosition){
            state.values.result++;
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
            playSound("hit2.m4a");}
        
          else if(square.id !== state.values.hitPosition){
            let vidas = document.querySelector(".lives");
             state.view.lives--;
             console.log(state.view.lives);
             vidas.textContent = state.view.lives;
            state.values.hitPosition = null;
            playSound("error.wav");}
        });
    });   

}

function initialize(){
    addListenerHitBox();
    retry();
}

initialize();