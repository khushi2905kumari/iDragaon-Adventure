score=0;
cross =  true;

audio = new  Audio('music.mp3');
audioGo = new  Audio('gameover.mp3');

setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function(e){
    console.log("KeyCode is : " , e.keyCode)

    if(e.keyCode == 38){
        // console.log("jump")
        dino = document.querySelector('.dino'); // document.getElementbyId v kr skte hai .. but use query selecter yeh kya krga jo pehla class hai us name se woh de dega
        dino.classList.add('animateDino'); //es class ki help se dino ko jump krwayenge

        setTimeout(() => { //animate class hmesa ke liye nhi rhe ..so baar baar hatana hai aur phir add krna hai
            dino.classList.remove('animateDino')
        }, 700);
    }
    else if(e.keyCode == 39){
        // console.log("jump")
        dino = document.querySelector('.dino'); // document.getElementbyId v kr skte hai .. but use query selecter yeh kya krga jo pehla class hai us name se woh de dega
        dinoX = parseInt( window.getComputedStyle(dino , null).getPropertyValue('left') );
        dino.style.left = (dinoX + 112) + "px";
    }
    else if(e.keyCode == 37){
        // console.log("jump")
        dino = document.querySelector('.dino'); // document.getElementbyId v kr skte hai .. but use query selecter yeh kya krga jo pehla class hai us name se woh de dega
        dinoX = parseInt( window.getComputedStyle(dino , null).getPropertyValue('left') );
        dino.style.left = (dinoX - 112) + "px";
    }
} 


setInterval(()=>{ //yeh check krega aap takra rhe ho ya nhi
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obsticle = document.querySelector('.obsticle');

    dx = parseInt( window.getComputedStyle(dino , null).getPropertyValue('left') ); //current left value kya hai dino ki kisi instant pe woh milegi esse
    dy = parseInt( window.getComputedStyle(dino , null).getPropertyValue('bottom') ); //current top value kya hai dino ki kisi instant pe woh milegi esse
    
    ox = parseInt( window.getComputedStyle(obsticle , null).getPropertyValue('left') ); //current left value kya hai obstacle ki kisi instant pe woh milegi esse
    oy = parseInt( window.getComputedStyle(obsticle , null).getPropertyValue('bottom') ); //current top value kya hai obstacle ki kisi instant pe woh milegi esse
    
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    // console.log("offsetX : " , offsetX , "offsetY : ",offsetY);

    if(offsetX<70 && offsetY<52){

        gameOver.innerHTML = " Game Over - Reload to Play Again";

        obsticle.classList.remove('obsticleAni');
        
        audioGo.play();
        setTimeout(() => {
            audio.pause();
            audioGo.pause();
        }, 1000);
    }
    else if(offsetX<100 && (cross == true)){
        score +=1;
        updateScore(score);
        cross = false;

        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            aniDur = parseFloat( window.getComputedStyle(obsticle , null).getPropertyValue('animation-duration') );
            newaniDur = aniDur - 0.1;
            // obsticle.style.animationDuration = newaniDur + 's';
            
            console.log("New Animation Duration : " , newaniDur);

            if(newaniDur<4.5){
                newaniDur = 4;
            }

            obsticle.style.animationDuration = newaniDur + 's';

            console.log("New Animation Duration : " , newaniDur);

        }, 500);   
        
    }


}, 100)

function updateScore(score){
    scoreCount.innerHTML = "Score : " + score;
}