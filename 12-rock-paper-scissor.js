 const score=JSON.parse(localStorage.getItem('score')) || {
      wins: 0,
      Losses: 0,
      Ties: 0
    };
   updateScoreElement();
   let isAutoPlaying=false;
   let intervalId;
   let autoPlayButton=document.querySelector('.auto-play-js');
   function autoplay(){
    if(!isAutoPlaying){
       isAutoPlaying=true;
     intervalId=setInterval(()=>{
         const playerMove=pickcomputerMove();
         playGame(playerMove);
        
     },1000);
     autoPlayButton.innerHTML='Stop Play';    
    }
    else{
      clearInterval(intervalId);
      isAutoPlaying=false;
      autoPlayButton.innerHTML='Auto Play';
    }
  };
    autoPlayButton.addEventListener('click',autoplay);
 
  document.querySelector('.js-rock-button').addEventListener('click',()=>playGame('rock'));

  document.querySelector('.js-paper-button').addEventListener('click',()=>playGame('paper'));

  document.querySelector('.js-scissors-button').addEventListener('click',()=>playGame('scissors'));

  document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r'){
      playGame('rock');
    }
    else if(event.key==='p'){
      playGame('paper');
    }
    else if(event.key==='s'){
      playGame('scissors');
    }
    else if(event.key==='a'){
      autoplay();
    }
    else if(event.key==='backspace'){
      showResetConfirmation();
    }
  });
  document.addEventListener('keydown', (event) => {
  console.log(event.key);
});
   function updateScoreElement(){
    document.querySelector('.js-score').innerHTML=`Wins:${score.wins}, Losses:${score.Losses}, Ties:${score.Ties}`;
   }
    function pickcomputerMove(){
      const randomNumber=Math.random();
      if(randomNumber<1/3)
      return 'rock';
      else if(randomNumber<2/3){
        return 'paper';
      }
      else{
        return 'scissors';
      }
    }
      function playGame(playerMove){
        const computerMove=pickcomputerMove();
        let result='';
        if(computerMove===playerMove){
          result='Tie.';
        }
        else if(computerMove==='scissors' && playerMove==='rock'||computerMove==='rock' && playerMove==='paper'||computerMove==='paper' && playerMove==='scissors'){
          result='You Win.';
        }
        else{
          result='You Lose.';
        }
        if(result==='You Win.'){
          score.wins+=1;
        }
        if(result==='You Lose.'){
          score.Losses+=1;
        }
        if(result==='Tie.'){
          score.Ties+=1;
        }

        localStorage.setItem('score',JSON.stringify(score));
        updateScoreElement();
        document.querySelector('.js-result').innerHTML=result;
        document.querySelector('.js-moves').innerHTML=`You <img src="images/${playerMove}-emoji.png" class="move-icon"> Computer <img src="images/${computerMove}-emoji.png" class="move-icon">`;
    }
    function resetScore(){
      score.wins=0;
      score.Losses=0;
      score.Ties=0;
      localStorage.removeItem('score');
      updateScoreElement();
    }
    let resetButton=document.querySelector('.js-reset-button');
    
    let MakeReset=document.querySelector('.need_reset');
    resetButton.addEventListener('click',()=>{
      showResetConfirmation();
    });
   function showResetConfirmation(){
       MakeReset.innerHTML=`<p>Are you sure you want to reset the score?</p>
      <button class="yes_reset">Yes</button>
      <button class="no_reset">No</button>`;
      let yesButton=document.querySelector('.yes_reset');
       yesButton.addEventListener('click',()=>{
      resetScore();
      clearLine();
    });
      let noButton=document.querySelector('.no_reset');
      noButton.addEventListener('click',()=>{
       clearLine();
    });
    };
   

   function clearLine(){
    MakeReset.innerHTML='';
   }
   
   

   

    
     
      
      