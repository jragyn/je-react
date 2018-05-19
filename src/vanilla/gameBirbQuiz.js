
//-------------------------------------------------------------------------//
//  Encapsulates the birb quiz into this function.
//-------------------------------------------------------------------------//
(function gameBirbQuiz() {
"use strict"; document.getElementById("versionBirbQuiz").innerHTML += "0.1";
  document.getElementById('verifyBtn').addEventListener("click", verifyInput);
  document.getElementById('spoilerBtn').addEventListener("click", giveAnswer);
													
  // global access to the fieldset above the "give up" button.
  var outputField = document.getElementById('outputField');
  
  // global access to the input field for entering birb names.
  var inputField = document.getElementById('birbInput');
	
	// global access to the IMG element for the birds.
	var birbImg = document.getElementById("imgBirb");
	
	// global access to list of birbs.
	var listOfBirbs = [];

  initialize();
  populateBirbs();
	
	function updateImage() {
		var currentBirb = getCurrentBirb();
		birbImg.src = currentBirb.gfx;
		birbImg.style.height = '400px';
		birbImg.style.width = 'auto';
		
		//console.log(" - updating image");
		console.log("name: " + currentBirb.name);
		//console.log("gfx: " + currentBirb.gfx);
	}
	
	// verifies input matches the name of birb
	function verifyInput() {
		var thisName = document.getElementById('birbInput').value.toLowerCase();
		var thisBirb = getCurrentBirb();
		if (thisName === thisBirb.name.toLowerCase()) {
			outputField.style.color = "green";
			outputField.innerHTML = "Great job!<br/>Here's the next one:"
			inputField.value = "";
			getNextBirb();
		}
		else {
			outputField.style.color = "red";
			outputField.innerHTML = "That isn't right.<br/>No hyphens or capitolization is necessary.";
		}
	}

  function giveAnswer() {
		var thisBirb = getCurrentBirb();
		var answer = "It is <br/>" + thisBirb.name;
		outputField.innerHTML = answer;
	}
	
	// first time setup, creates a dummy birb (temporary) and adds it.
	function initialize() {
		var thisBirb = new Birb("./gfx/birbs/owl_NorthernPygmy.jpg", "Northern Pygmy Owl", "");
		listOfBirbs.push(thisBirb);
		updateImage();
	}
													
  function getCurrentBirb() {
		return listOfBirbs[0];
	}

	function getNextBirb() {
		listOfBirbs.shift();
		if (listOfBirbs.length == 0) { 
			populateBirbs();
			console.log("re-populating!");
		}
		else {
			listOfBirbs = shuffle(listOfBirbs);
			console.log("shuffling... " + listOfBirbs.length + " remaining!")
		}
		updateImage();
	}
  
  // The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
  function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}
													
  function populateBirbs() {
		// Flycatchers
		var fc_alder = new Birb("./gfx/birbs/flycatcher_Alder.jpg", "Alder Flycatcher", "");
		listOfBirbs.push(fc_alder);
		var fc_dusky = new Birb("./gfx/birbs/flycatcher_Dusky.jpg", "Dusky Flycatcher", "");
		listOfBirbs.push(fc_dusky);
		var fc_gray = new Birb("./gfx/birbs/flycatcher_Gray.jpg", "Gray Flycatcher", "");
		listOfBirbs.push(fc_gray);
		var fc_hammonds = new Birb("./gfx/birbs/flycatcher_Hammonds.jpg", "Hammonds Flycatcher", "");
		listOfBirbs.push(fc_hammonds);
		var fc_least = new Birb("./gfx/birbs/flycatcher_Least.jpg", "Least Flycatcher", "");
		listOfBirbs.push(fc_least);
		var fc_pacslo = new Birb("./gfx/birbs/flycatcher_PacificSlope.jpg", "Pacific Slope Flycatcher", "");
		listOfBirbs.push(fc_pacslo);
		var fc_willow = new Birb("./gfx/birbs/flycatcher_Willow.jpg", "Willow Flycatcher", "");
		listOfBirbs.push(fc_willow);
		var fc_yelbel = new Birb("./gfx/birbs/flycatcher_YellowBellied.jpg", "Yellow Bellied Flycatcher", "");
		listOfBirbs.push(fc_yelbel);
	}
		
	// the core structure of a birb.
	function Birb(graphics, name, call) {
		this.gfx = graphics;
		this.name = name;
		this.call = call;
	}
	
})();
