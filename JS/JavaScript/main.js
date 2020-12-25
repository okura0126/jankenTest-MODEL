"use strict";

const counter = document.getElementById("counter");
const delayText1 = document.getElementById("delayText1");
const delayText2 = document.getElementById("delayText2");
const delayText3 = document.getElementById("delayText3");
const versus = document.getElementById("versus");
const retry = document.getElementById("retry");

const jankenContainer = document.getElementById("jankenContainer");
const rock = document.getElementById("rock");
const scissors = document.getElementById("scissors");
const paper = document.getElementById("paper");

const jankenArray = ["グー","チョキ","パー"];
const jankenImage = ["img/rock.jpg","img/scissors.png","img/paper.png"];
let count = 0;


function enemyJanken(){//呼び出すたびに、じゃんけんの出目を変更
    const randomJanken = Math.floor(Math.random() * 3);
    
    return randomJanken;
}



const first = () => {//最初のフリ

    retry.style.display = "none";
    delayText1.textContent = "";
    delayText2.textContent = "";
    delayText3.textContent = "";

    const delay1 = function(){     
        delayText1.textContent = "最初はグー!";
    }
    const delay2 = function(){     
        delayText2.textContent = "じゃんけん";
    }
    const delay3 = function(){     
        delayText3.textContent = "ポン!";
        jankenContainer.style.display = "flex";
    }
    
    setTimeout(delay1,1500);
    setTimeout(delay2,3000);
    setTimeout(delay3,4000);
};
first();


function player(janken){//playerのじゃんけん画像

    const player = document.createElement("img");
    player.src = `${jankenImage[janken]}`;
    player.alt = `${jankenArray[janken]}`;
    player.width = 50;
    player.height = 50;
    versus.appendChild(player);

    player.insertAdjacentHTML("beforebegin",`<span>あなた→</span>`);
    
}

function enemy(janken){//enemyのじゃんけん画像
    const enemy = document.createElement("img");
    enemy.src = `${jankenImage[janken]}`;
    enemy.alt = `${jankenArray[janken]}`;
    enemy.width = 50;
    enemy.height = 50; 
    versus.appendChild(enemy);

    enemy.insertAdjacentHTML("afterend",`<span>←てき</span>`);
}

function secondChance(janken){//あいこのフリ
    
    delayText1.textContent = "";
    delayText2.textContent = "あいこで";
    delayText3.textContent = ""; 

    const delay = function(){
        delayText3.textContent = "ショ!";
    }
    setTimeout(delay,1000);
}

function winner(janken){//勝った時の処理
    count++;
    counter.textContent = `勝利数:${count}`;
    delayText1.textContent = "";
    delayText2.textContent = "あなたの勝ち!!!";
    delayText3.textContent = "Retry???";
    jankenContainer.style.display = "none";
    retryButton();
}

function loser(janken){//負けた時の処理
    delayText1.textContent = "";
    delayText2.textContent = "あなたの負け...";
    delayText3.textContent = "Retry???";
    jankenContainer.style.display = "none";
    retryButton();


}

const retryButton = () => {//retryのボタンの追加
    retry.style.display = "block";
    retry.textContent = "もう一度";
    retry.style.margin = "0 auto";
    retry.style.padding = "50px";
    retry.style.width = "70px";
    retry.style.height = "70px";
    retry.style.lineHeight = "85px";
    retry.style.borderRadius = "50%";
    retry.style.background = "pink";
    retry.style.cursor = "pointer";

    delayText3.insertAdjacentElement("afterend",retry);

    
}

rock.addEventListener("click",()=>{//グーを出した場合の処理
    const janken = enemyJanken();
    versus.textContent = "";
    player(0);
    enemy(janken);
    if(jankenArray[janken] === "グー"){
        secondChance();
    }else if(jankenArray[janken] === "チョキ"){
        winner();
    }else if(jankenArray[janken] === "パー"){
        loser();
    }
});

scissors.addEventListener("click",()=>{//チョキを出した場合の処理
    const janken = enemyJanken();
    versus.textContent = "";
    player(1);
    enemy(janken);
    if(jankenArray[janken] === "グー"){
        loser();
    }else if(jankenArray[janken] === "チョキ"){
        secondChance();
    }else if(jankenArray[janken] === "パー"){
        winner();
    }
});

paper.addEventListener("click",()=>{//パーを出した場合の処理
    const janken = enemyJanken();
    versus.textContent = "";
    player(2);
    enemy(janken);
    if(jankenArray[janken] === "グー"){
        winner();
    }else if(jankenArray[janken] === "チョキ"){
        loser();
    }else if(jankenArray[janken] === "パー"){
        secondChance();
    }
});

if(retry !== null){//retryを押したときの処理
    retry.addEventListener("click",()=>{
        versus.innerHTML = "";
        first();
    })
}
