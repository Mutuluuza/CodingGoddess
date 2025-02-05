function createParagraph(){
    const para = document.createElement("p");
    para.textContent = "You Clicked the Button!";
    document.body.appendChild(para);
}
const buttons = document.querySelectorAll("button");
for(const button of buttons){
    button.addEventListener("click", createParagraph);
}
//start of java for number guess game 
let randomNumber = Math.floor(Math.random()*50)+1;
//the function math.random() generates a random decimal number btw 0 and 1
//the math.floor function is meant to round the number passed to it down
//to the nearest whole number. then adding a +1 will make the function
//return 1 if you dont add 1 the function will return 0 and adding 50
//gives the code a range of numbers to 50 without the +1 the range will be 
//1-49 then with the +1 1-50 coz math.floor(math.random()) returns 0
//this above variable randomNumber is assigned a random
//number between 1 and 100 calculated using a math algorithm
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
//each of these above are constants made to store the 
//results from the users input
const guessSubmit = document.querySelector(".guessSubmit");
const guesField = document.querySelector(".guessField");
//these constants above are to the form text input and submit
//button and are used to control submitting the guess 
let guessCount = 1;
let resetButton;
guessField.focus();//this code just automatically puts the cursor into the input text field
//above is code to describe the constants and the variables
function checkGuess(){
    //below is a variable called userGuess and sets its value
    //to the current value entered inside the text field
    const userGuess = Number(guessField.value);
    //here we see a conditional code block. this allows you
    //to run code selectively depending on weather a condition
    //is true or false. the simplest form of conditional block starts 
    //with keyword if then parentheses then curly braces
    //inside the parenttheses () we include a text
    //if test is true we run the code if not we dont and move to the next bit of code
    //here the guessCount is testing if variable is equal to 1
    if (guessCount === 1){
        guesses.textContent = "Previous guesses:"
    }
    //below, we use a template literal to append the current userGuess 
    // value onto the end of the guesses paragraph, with a blank space in between
    guesses.textContent = `${guesses.textContent} ${userGuess}`;
    //The first if (){ } checks whether the user's guess is equal to the 
    // randomNumber set at the top of our JavaScript. If it is, the player 
    // has guessed correctly and the game is won, so we show the player a 
    // congratulations message with a nice green color, clear the contents 
    // of the Low/High guess information box, and run a function called 
    // setGameOver(), which we'll discuss later.
    if(userGuess === randomNumber){
        lastResult.textContent = "Congratulations! You got it right!";
        lastResult.computedStyleMap.backgrouundColor = "seagreen";
        lowOrHi.textContent = "";
        setGameOver();
    }
    //Now below we've chained another test onto the end of the last one using 
    // an else if (){ } structure. This one checks whether this turn is 
    // the user's last turn. If it is, the program does the same thing 
    // as in the previous block, except with a game over message instead 
    // of a congratulations message.
    else if (guessCount === 10){
        lastResult.textContent = "!!!GAMEOVER!!!";
        lowOrHi.textContent = "";
        setGameOver();
    }
    //The final block chained onto the end of this code (the else { }) 
    // contains code that is only run if neither of the other two tests 
    // returns true (i.e. the player didn't guess right, but they have 
    // more guesses left). In this case we tell them they are wrong, 
    // then we perform another conditional test to check whether the 
    // guess was higher or lower than the answer, displaying a further 
    // message as appropriate to tell them higher or lower.
    else{
        lastResult.textContent = "Wrong!";
        lastResult.computedStyleMap.backgrouundColor = "lightred";
        if(userGuess < randomNumber){
            lowOrHi.textContent = "Last guess was too low!";
        } else if (userGuess > randomNumber){
            lowOrHi.textContent = "Last guess was too high!";
        }
    }
    //The last three lines in the function get us ready for the 
    // next guess to be submitted. We add 1 to the guessCount 
    // variable so the player uses up their turn 
    // (++ is an increment operation — increase by 1), 
    // and empty the value out of the form text field and 
    // focus it again, ready for the next guess to be entered.
    guessCount++;
    guessField.value = "";
    guessField.focus();
}
//(this instruction is for the code from the begining to now)
// here we define the function by using function followed
//by a name with parentheses put after it
//then with-in the curly braces goes all the code that we
//want to run whenever we call the function
//when we want to run the code we will type the name of the 
//function followed by the parentheses 
guessSubmit.addEventListener("click", checkGuess);
//above is the addEventlistener() this is meant to call the 
//checkGuess function coz if we dont call the function it wont work
function setGameOver(){
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = "Start new game";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}
//The first two lines disable the form text input and button 
// by setting their disabled properties to true. This is necessary, 
// because if we didn't, the user could submit more guesses 
// after the game is over, which would mess things up.
// The next three lines generate a new <button> element, 
// set its text label to "Start new game", and add it to the 
// bottom of our existing HTML.
// The final line sets an event listener on our new button so 
// that when it is clicked, a function called resetGame() is run.
function resetGame(){
    guessCount = 1;
    const resetParas = document.querySelectorAll(".resultParas p");
    for(const resetPara of resetParas){
        resetPara.textContent = "";
    }
    //This is a loop. Here code creates variables containing a list of all 
    //paragraphs inside the div resultParas using the querySeletorAll method
    //then it loops through each one, removing the text content of each.
    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();
    lastResult.computedStyleMap.backgrouundColor = "smokewhite";
    randomNumber = Math.floor(Math.random() * 50) + 1;
}
//This long block of code completely resets everything to how it 
// was at the start of the game, so the player can have another go. 
// *Puts the guessCount back down to 1.
// *Empties all the text out of the information paragraphs. 
//  We select all paragraphs inside <div class="resultParas"></div>, 
//  then loop through each one, setting their textContent to '' (an empty string).
// *Removes the reset button from our code.
// *Enables the form elements, and empties and focuses the text field, 
// ready for a new guess to be entered.
// *Removes the background color from the lastResult paragraph.
// *Generates a new random number so that you are not just guessing 
// the same number again!


