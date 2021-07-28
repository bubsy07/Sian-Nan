//Overlay pages
//turn links colour on hover

window.onload = function() {  
    $('#voice-on').css('color', 'green');
    $('#melody-on').css('color', 'green');
    $("#resume").hide();
}

$("#start-game").mouseenter(function () {
    $(this).css('color', 'lightgreen');
});

$("#start-game").mouseleave(function () {
    $(this).css('color', 'azure');
});

$("#rules-of-game").mouseenter(function () {
    $(this).css('color', 'lightgreen');
});

$("#rules-of-game").mouseleave(function () {
    $(this).css('color', 'azure');
});

$("#back-to-home").mouseenter(function () {
    $(this).css('color', 'lightgreen');
});

$("#back-to-home").mouseleave(function () {
    $(this).css('color', 'azure');
});

$("#win-home").mouseenter(function () {
    $(this).css('color', 'lightgreen');
});

$("#win-home").mouseleave(function () {
    $(this).css('color', 'azure');
});

$("#contact").mouseenter(function () {
    $(this).css('color', 'lightgreen');
});

$("#contact").mouseleave(function () {
    $(this).css('color', 'azure');
});

$("#home").mouseenter(function () {
    $(this).css('color', 'green');
})

$("#home").mouseleave(function () {
    $(this).css('color', 'grey');
});

$("#pause").mouseenter(function () {
    $(this).css('color', 'green');
})

$("#pause").mouseleave(function () {
    $(this).css('color', 'grey');
});

$("#resume").mouseenter(function () {
    $(this).css('color', 'green');
})

$("#resume").mouseleave(function () {
    $(this).css('color', 'grey');
});

$(document).ready(function () {
    //Create Array of 'card'
    let cards = Array.from(document.getElementsByClassName('card'));

    //time/card array
    let play = new remember(cards);

    //Start on front page

$('#start-game').click(function () {
    $("#front-page").hide();
        
        play.startRemember();
        play.timerStart();
    });

    //Rules of the game
    $("#rules-of-game").click(function () {
        $("#what-to-do").slideToggle("slow"); 
        $("#contact-form").hide("slow");   
    });

    //Reload game 
    $('#back-to-home, #win-home').click(function () {
        location.reload();
    });

    //contact
    $("#contact").click(function () {
        $("#contact-form").slideToggle("slow"); 
        $("#what-to-do").hide("slow");  
    });

    //Restart game 
     $("#home").click(function () {
        gameReset = true;
        location.reload();  
     });
     
     
     //Pause game 
     $("#pause").click(function () {
        gameReset = true;
        $("#pause").hide();
        $("#resume").show();

     });

     //Resume game 
     $("#resume").click(function () { 
        gameReset = false;
        $("#resume").hide();
        $("#pause").show();
        play.timerStart();

     });

 //click mute voice animal
    jQuery('#voice-on').click(function () {
        $(this).css('color', 'green');
        jQuery('audio').prop("muted", false);
        $('#voice-off').css('color', 'grey'); 
        });

    jQuery('#voice-off').click(function () {
         $(this).css('color', 'red');
        jQuery('audio').prop("muted", true);
         $('#voice-on').css('color', 'grey');
        });

      //Flip and say card animal
    cards.forEach(card => {
        card.addEventListener('click', () => {
        play.flipCard(card);
        let audio = card.querySelector("audio");
        audio.play();
        audio.volume = 1; 
        });
    });
});

var gameInPlay = true;
var gameReset = false;
var gameMoves = 0;

 //add constructor to handle the game https://www.w3schools.com/js/js_object_constructors.asp
class remember {
    //Game content
    constructor(cards) {
        this.cardArray = cards;
        this.gameCount = document.getElementById('counter'); 
    }

     //Delay @ Start Game
    startRemember() {
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;        
        this.playMelody();
        setTimeout(() => {
            this.shuffle(this.cardArray);
            this.busy = false;
        }, 750);
    }
 
//Flipping stopped if matched and if flipping active
    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }

    //Flip function
    flipCard(card) {
        if (this.canFlipCard(card)) {
            gameMoves++;
            this.gameCount.innerText = gameMoves;
            card.classList.add('visible');
            if (this.cardToCheck) {
                this.analyseMatch(card);
            } else {
                this.cardToCheck = card;
            };
        }
    } 

//shuffling algorithm    
    shuffle(cardArray) {
        for (let i = cardArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            cardArray[j].style.order = i;
            cardArray[i].style.order = j;
    }
}
   
//Timer 
    timerStart() {
    var remainingTime = 60;
    var elem = document.getElementById('time-to-go');
    var elemWin = document.getElementById('winTime');
    var timer = setInterval(countdown, 1000);
    function countdown() {
      if (remainingTime <0) {
        clearInterval(timer)
        $('#game-finished').addClass('visible');

        } else if (gameInPlay == false) {
            clearInterval(timer);          

         } else if (gameReset == true) {
            clearTimeout(timer);          

        } else {
        elem.innerHTML = remainingTime;
        elemWin.innerHTML = remainingTime;
        remainingTime--;
      }
    }
    }

//win 
    win() {     
        gameInPlay = false; 
        $('#win').addClass('visible');
    }

//animal clicked
    getCardType(card) {
               return card.getElementsByClassName('photo-img')[0].src;
               
    }

//match
    analyseMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.match(card, this.cardToCheck);
        else
            this.misMatch(card, this.cardToCheck);
        this.cardToCheck = null;
    }

    //Card Match function pushes matched cards into matchedArray
    match(card_A, card_B) {
        this.matchedCards.push(card_A);
        this.matchedCards.push(card_B);
        card_A.classList.add('matched');
        card_B.classList.add('matched');
        if (this.matchedCards.length === this.cardArray.length)
            this.win();
    }

    //Cards Mis Match Function, hides both cards
    misMatch(card_A, card_B) {
        this.busy = true;
        setTimeout(() => {
            card_A.classList.remove('visible');
            card_B.classList.remove('visible');
            this.busy = false;
        }, 6000);
    }
     
    //Plays Melody
    playMelody() {
        var melody = new Audio('assets/melody/audio_c2fcb3b211.mp3')
        melody.play();
        melody.volume = 0.2;
        melody.loop = true;

        //Mutes / play melody
        $('#melody-on').click(function () {
            $(this).css('color', 'green');
            $(melody).each(function () {
            $(melody).prop('muted', false);
            $('#melody-off').css('color', 'grey');
            });  
        });

        $('#melody-off').click(function () {
            $(this).css('color', 'red');
            $(melody).each(function () {
            $(melody).prop('muted', true);
            $('#melody-on').css('color', 'grey');
            });    
        });
    }
}    
