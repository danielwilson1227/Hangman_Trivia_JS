let easyBTN = document.querySelector('#easyBTN'),
	mediumBTN = document.querySelector('#mediumBTN'),
	hardBTN = document.querySelector('#hardBTN'),
	fullCont = document.querySelector('#full-container'),
	totalScoreDisp = document.querySelector('#total-score'),
	totalScoreDisp2 = document.querySelector('#total-Score'),
	triviaContainer = document.querySelector('.trivia-container'),
	resultsContainer = document.querySelector('#results-container'),
	questionsContainer = document.querySelector('#questions-container'),
	question = document.querySelector('#question'),
	answerChoice = document.querySelectorAll('.answerChoice'),
	progressContainer = document.querySelector('.progress-container'),
	questNum = document.querySelector('#questNum'),
	nextBTN = document.querySelector('#nextBTN'),
	triviaContent = document.querySelector('.trivia-content'),
	userChoice1 = document.querySelector('#userChoice1'),
	userChoice2 = document.querySelector('#userChoice2'),
	userChoice3 = document.querySelector('#userChoice3'),
	userChoice4 = document.querySelector('#userChoice4'),
	resultsText = document.querySelectorAll('.resultsText'),
	instructionsBTN = document.querySelector('#instructionsBTN'),
	instructionsContainer = document.querySelector('#instructions-container'),
	instructText = document.querySelector('#instructions-text'),
	pointDisplay = document.querySelector('#point-Display'),
	correctDisplay = document.querySelector('#correct-Display');
questionCat = '';
totalScore = 0;
pointCount = 0;
correctCount = 0;
incorrectCounter = 0;
jokeText = '';
totalScoreDisp.innerText = `Total Score: ${totalScore} Points`;
let res;
let data;

/*After the user clicks on a difficulty button and since the counter is 0, call is made to database depending on difficulty. Data comes back in the form of an array with nested objects. Each nested object has a question number, a question, an answer and 4 user choices. These values change depending on the counter. App then displays question number, question and answer choices. Generate icon tags for right and wrong answers with font awesome. 

Once a user selects an answer choice and the user's choice matches the correct answer:
background color of user choice button changes to green.
correctCount increments.
answered Correctly text updates.
user choice button HTML is manipulated to include the check icon.
points are incremented depending on difficulty.

If the user's choice is not the correct answer:
loop through answer choices and see which answer choice matches the correct answer.
background color of answer choice button changes to green.
correct answer choice button HTML is manipulated to include the check icon.
background color of user choice button changes to red.
user choice button HTML is manipulated to include the incorrect "x" icon.
incorrect counter increments by 1.
*/
async function getData (userChoice, userChoiceBTN){
	nextBTN.style.visibility = 'hidden';
	totalScoreDisp.style.visibility = 'hidden';
	totalScoreDisp2.innerText = `Total Score: ${totalScore} Points`;
	correctDisplay.innerText = `Answered Correctly: ${correctCount}`;
	nextBTN.innerHTML = `NEXT   <i class="fas fa-arrow-right"></i>`;
	if(counter === 0){
	if (questionCat == 'easy') {
		res = await fetch('https://api.jsonbin.io/b/5f9349c63895f90cd22e617b');
		data = await res.json();
	} else if (questionCat == 'medium') {
		res = await fetch('https://api.jsonbin.io/b/5f9349f13895f90cd22e618a');
		data = await res.json();
	} else if (questionCat == 'hard') {
		res = await fetch('https://api.jsonbin.io/b/5f934a21bd69750f00c2b806');
		data = await res.json();
	}
}
	questNum.innerText = `Question #${data[counter].questionNum}`;
	question.innerText = `${data[counter].question}`;
	answerChoice[0].innerText = `${data[counter].choice1}`;
	answerChoice[1].innerText = `${data[counter].choice2}`;
	answerChoice[2].innerText = `${data[counter].choice3}`;
	answerChoice[3].innerText = `${data[counter].choice4}`;
	enableBTNS();
	let checkIcon = document.createElement('i');
	checkIcon.className = 'fas fa-check';
	let wrongIcon = document.createElement('i');
	wrongIcon.className = 'fas fa-times';
	if (userChoice) {
		if (userChoice === `${data[counter].answer}`) {
			document.getElementById(userChoiceBTN).style.backgroundColor = '#0c725a';
			correctCount++;
			correctDisplay.innerText = `Answered Correctly: ${correctCount}`;
			document.getElementById(userChoiceBTN).innerHTML = `<i class="fas fa-check"></i>   ${userChoice}`;
			disableBTNS();
			nextBTN.style.visibility = 'visible';
			if (questionCat == 'easy') {
				pointCount += 5;
				totalScore += 5;
			} else if (questionCat == 'medium') {
				pointCount += 10;
				totalScore += 10;
			} else if (questionCat == 'hard') {
				pointCount += 15;
				totalScore += 15;
			}

			pointDisplay.innerText = `Current Points: ${pointCount}`;
			totalScoreDisp2.innerText = `Total Score: ${totalScore} Points`;
		} else {
			for (let choice of answerChoice) {
				if (choice.innerText === `${data[counter].answer}`) {
					document.getElementById(choice.id).style.backgroundColor = '#0c725a';
					document.getElementById(choice.id).innerHTML = `<i class="fas fa-check"></i>   ${choice.innerText}`;
					document.getElementById(userChoiceBTN).style.backgroundColor = '#850707';
					document.getElementById(userChoiceBTN).innerHTML = `<i class="fas fa-times"></i>   ${userChoice}`;
					disableBTNS();
					nextBTN.style.visibility = 'visible';
					incorrectCounter += 1;
				}
			}
		}
	}
}

/*Disable the answer choice buttons so they aren't clickable */
function disableBTNS (){
	for (let choice of answerChoice) {
		choice.disabled = true;
	}
}
/*Reset the answer choice buttons background color to white */
function resetBTN (){
	for (let choice of answerChoice) {
		choice.style.backgroundColor = 'white';
	}
}
/*Reenable the answer choice buttons so they are clickable */
function enableBTNS (){
	for (let choice of answerChoice) {
		choice.disabled = false;
	}
}

/*when user clicks on a difficulty button, the difficulty is set and that difficulty button is hidden. the class of hover-on will later tell app our when the game is finished. Then the app gets the data. */
$('#easyBTN').click(function(){
	questionCat = 'easy';
	diffClicked();
	$('#easyBTN').css('visibility', 'hidden')
	$('#easyBTN').removeClass('hover-On')
	finishedChecker();
	getData();
})

$('#mediumBTN').click(function(){
	questionCat = 'medium';
	diffClicked();
	$('#mediumBTN').css('visibility', 'hidden')
	$('#mediumBTN').removeClass('hover-On')
	finishedChecker();
	getData();
});

$('#hardBTN').click(function(){
	questionCat = 'hard';
	diffClicked();
	$('#hardBTN').css('visibility', 'hidden')
	$('#hardBTN').removeClass('hover-On')
	finishedChecker();
	getData();
});

/*After the user clicks on difficuly, the counters are refreshed. counter refers to the question number. */
function diffClicked (){
	counter = 0;
	correctCount = 0;
	pointDisplay.innerText = `Current Points: ${pointCount}`;
	questionsContainer.style.display = 'block';
	resetBTN();
}

/*Once the 3 difficulty buttons no longer contain the class hover-on, the game is finished and then:
 the "Thanks for playing" text is display
 the play again button is added to the DOM
 the instructions button HTML is changed over to a link to the hangman game
 the instructions button removes the event listener for show instructions
 */
function finishedChecker (){
	if (
		easyBTN.classList.contains('hover-On') === false &&
		mediumBTN.classList.contains('hover-On') === false &&
		hardBTN.classList.contains('hover-On') === false
	) {
		$('#difficultyBTNS').css('display', 'none')
		$('#chooseDiffText').text('Thanks For Playing!')
		$('#refresh').css('display', 'block');
		$('#instructionsBTN').html('<a class="switcher" href="index.html">Click Here to Play Hangman</a>')
		$('#instructionsBTN').css('height', '4rem')
		instructionsBTN.removeEventListener('click', showInstructions);
	}
}

function loadOtherGame (){}

/*After the user clicks on the next button, if the counter is less than 9, increment the progress bar, update current points, reset the background color of user choice buttons, increment counter and then getData again. If the counter = 9, calculate the percentage, remove the quiz container and display the results container with the accumulated points and percentage. */
nextBTN.addEventListener('click', function (){
	if (counter < 9) {
		incrementProg();
		pointDisplay.innerText = `Current Points: ${pointCount}`;
		resetBTN();
		counter++;
		getData();
	} else if ((counter = 9)) {
		let percent = (10 - incorrectCounter) * 10;
		questionsContainer.style.display = 'none';
		resultsContainer.style.display = 'block';
		resultsText[0].innerText = `You have accumulated ${pointCount} points`;
		resultsText[1].innerText = `Your percentage for this quiz is ${percent}%`;
		joke(percent);
		totalScoreDisp.innerText = `Total Score: ${totalScore} Points`;
		let exitBTN = document.querySelector('#exit');
		exitBTN.addEventListener('click', clearAll);
	}
});

/*jokeText displayed in the results container depend on the percentage for the quiz. */
function joke (percent){
	if (percent < 55) {
		jokeText = `"Well, performance issues, it's not uncommon. One out of five...": Tony Stark`;
	} else if (percent >= 80 && percent <= 100) {
		jokeText = `"Genius, billionaire, playboy, philanthropist.": Tony Stark`;
	} else {
		jokeText = `"Dude you’re embarrassing me in front of the wizards.": Tony Stark`;
	}
	resultsText[2].innerText = jokeText;
}

/*Increase the width of the progress container for every question answered.*/
function incrementProg (){
	let compStyle = getComputedStyle(progressContainer);
	let width = parseFloat(compStyle.getPropertyValue('--width')) || 0;
	progressContainer.style.setProperty('--width', width + 10);
}

/*  When user exists the results container:
the results container is not displayed.
the counters are reset to 0 on top to the difficulty category.
progress bar is reset to 0 width.
total score at the top of the main page is displayed.   */
function clearAll (){
	resultsContainer.style.display = 'none';
	counter = 0;
	pointCount = 0;
	correctCount = 0;
	incorrectCounter = 0;
	questionCat = '';
	progressContainer.style.setProperty('--width', 0);
	totalScoreDisp.style.visibility = 'visible';
}

let userChoice;
let userChoiceBTN;

/*When user clicks on an answer choice, app saves the text and ID of the answer choice and are used as arguments in getData function */

triviaContent.addEventListener('click', getText);


function getText (e){
	if (e.target.className === 'answerChoice') {
		userChoice = e.target.innerText;
		userchoiceBTN = e.target.id;
		getData(userChoice, userchoiceBTN);
	}
}

/*When user clicks on the instructions button, the instructions container is displayed with the instructions text*/
instructionsBTN.addEventListener('click', showInstructions);
function showInstructions (){
	instructionsContainer.style.display = 'block';
	instructText.innerText =
		'There are 3 Marvel quizzes ranging from easy to hard. There are 10 questions per quiz. You cannot take the same quiz twice in a row. You will get 5 points for each correct easy question, 10 points for each correct medium question and 15 points for each correct hard question. The top of the page shows the total accumulation of points after each quiz is completed. See if you can score 100% on all the quizzes.';
}

/*clicking on the close button or clicking outside of the instructions container while the instructions container is open closes the instructions container*/
$('.close').on('click', function(){
	$('#instructions-container').css('display', 'none');
})

window.onclick = function (event){
	if (event.target == instructionsContainer) {
		instructionsContainer.style.display = 'none';
	}
};


