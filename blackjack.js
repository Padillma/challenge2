function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

let pCards="";
let dCards="";
let playerSum=0;
let dealerSum=0;
let betAmount=0;

let standed=false;
let doubled=false;
let turnOne=true;

let pElement=document.getElementById("p-cards");
let dElement=document.getElementById("d-cards");

function myBet(){
    betAmount=document.getElementById("betAmount").value;

    if(betAmount<=1000 && betAmount >= 10){

    document.getElementById("bet-label").innerText="Bet Accepted";
    document.getElementById("mySubmit").disabled = true;
    document.getElementById("betAmount").disabled = true;
    startGame();

    }

    else
    {
        alert("Only enter value of 10 - 1000");
        return;
    }

}

function startGame(){
    //remove zeros from player and dealers cards and sum
    document.getElementById("p-cards").innerText="";
    document.getElementById("d-cards").innerText="";


    //dealing players card values by creating thier own span tag
    let tag = document.createElement("span");
    let tagTwo= document.createElement("span");
    
    let firstCard=getRandomInt(1,12);
    let secondCard=getRandomInt(1,12);

    let fcardStr=document.createTextNode(firstCard);
    let scardStr=document.createTextNode(secondCard);

    tag.appendChild(fcardStr);
    tagTwo.appendChild(scardStr);

    

    pElement.appendChild(tag);
   pElement.appendChild(tagTwo);
    
    playerSum=firstCard+secondCard;

  
    //dealers cards dealt
    dealerSum=getRandomInt(1,12);
    dCards=dealerSum+" ?";

    let dtag = document.createElement("span");
    let dcardStr=document.createTextNode(dealerSum);
    dtag.appendChild(dcardStr);

    let quetag = document.createElement("span");
    let queStr=document.createTextNode("?");
    quetag.appendChild(queStr);

    
    dElement.appendChild(dtag);
    dElement.appendChild(quetag);
;

    document.getElementById("yourSum").innerText=playerSum;
    document.getElementById("dealerSum").innerText=" ?";
    document.getElementById("messager").innerText=`Cards have been dealt. Please decide to 'Hit', 'Stand', or 'Double' to continue`;

}

function newPcard(newCard){
    let tag = document.createElement("span");
    let ncardStr=document.createTextNode(newCard);
    tag.appendChild(ncardStr);
    pElement.appendChild(tag);

    return;
}

function newDcard(newCard){
    let tag = document.createElement("span");
    let ncardStr=document.createTextNode(newCard);
    tag.appendChild(ncardStr);
    dElement.appendChild(tag);

    return;
}


function dealersDeal(){
    
    let thirdCard=0; 
    dElement.removeChild(dElement.lastChild);
    while(dealerSum<21 && playerSum >= dealerSum){

        thirdCard=getRandomInt(1,12); 
        newDcard(thirdCard);
        dealerSum+=thirdCard;
        document.getElementById("dealerSum").innerText=dealerSum; 

    }

    if(dealerSum>playerSum&& dealerSum<=21){
        document.getElementById("messager").innerText="GAME OVER. You Lose.."
        document.getElementById("double-btn").disabled = true;
        document.getElementById("hit-btn").disabled = true;
        document.getElementById("stand-btn").disabled = true;
    }

    else if(dealerSum<playerSum || dealerSum>21){
        document.getElementById("messager").innerText="You WIN!! You won: $" + betAmount*2;
        document.getElementById("double-btn").disabled = true;
        document.getElementById("stand-btn").disabled = true;
        document.getElementById("hit-btn").disabled = true;
    }

    else{
    document.getElementById("messager").innerText="Its a tie.."
    document.getElementById("double-btn").disabled = true;
    document.getElementById("stand-btn").disabled = true;
    document.getElementById("hit-btn").disabled = true;
    }
}

function hitter(){
    if(betAmount===0){
        return;
    }

    turnOne=false;
    
    
    let thirdCard=getRandomInt(1,12);
    playerSum+=thirdCard;

    if (standed!==true && doubled!== true && playerSum<=21){
        document.getElementById("double-btn").disabled = true
        document.getElementById("messager").innerText='Can no longer "Double". Do you wish to Hit or Stand?'

        newPcard(thirdCard); 
        
        document.getElementById("yourSum").innerText=playerSum; 
    }
    
    else if(playerSum>21){
        document.getElementById("messager").innerText="You have Busted.. GAME OVER!"
        
        newPcard(thirdCard); 

        document.getElementById("yourSum").innerText=playerSum;
        document.getElementById("hit-btn").disabled = true;
        document.getElementById("stand-btn").disabled = true;
        document.getElementById("double-btn").disabled = true;
    }

    else
        document.getElementById("hit-btn").disabled = true;
}


function stander(){
    if(betAmount===0){
        return;
    }
    turnOne=false;
    standed=true;
    if(doubled!==true){
        dealersDeal();
        document.getElementById("stand-btn").disabled = true;
    }

    else{
        standed=false
        return;
    }

   //revise this later. 
}


function doubler(){
    if(betAmount===0 || turnOne === false){
        return;
    }
    
    if(standed===false)
    {   doubled=true;
        let thirdCard=getRandomInt(1,12);
        betAmount*=2;
        newPcard(thirdCard);
        playerSum+=thirdCard;
        document.getElementById("yourSum").innerText=playerSum;
        turnOne=false;
    }


    if(playerSum<=21){
        dealersDeal();
        document.getElementById("double-btn").disabled = true;
        return;
    }

    else {
        document.getElementById("messager").innerText="You have Busted.. GAME OVER!"
        document.getElementById("double-btn").disabled = true;
        document.getElementById("stand-btn").disabled = true;
        document.getElementById("hit-btn").disabled = true;
    }

}




