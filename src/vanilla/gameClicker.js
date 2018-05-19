//-------------------------------------------------------------------------//
//  Encapsulates the clicker game into this function.
//-------------------------------------------------------------------------//
(function gameClicker() {
"use strict"; document.getElementById("versionClicker").innerHTML += "0.1";
// ====================================================================================//
  /// TODO: Implement Map-event detection.
  /// TODO: Implement various map-events operations, like teleporting.
// ====================================================================================//
	// object shortcuts
	var buttonClicker = document.getElementById("clickBtn");
	var clickDisplay = document.getElementById("clickOut");
	
	// variable declarations
	var clickCount = 0;
	var viewCount = 0;
	var frames = 0;
	var animObjs = [];
	var cw = 512,
			ch = 288;
	
  // creates the player object for use all throughout the "game".
	var player = createPlayer();
                         
  // creates the generic text objects for text display.
	var displayStamina, displayResult;

  // hooks the action of "clicking" to the button.
	buttonClicker.addEventListener("click", clickUp);

	//Aliases
	var Container = PIXI.Container,
			loader = PIXI.loader,
			resources = PIXI.loader.resources,
			Sprite = PIXI.Sprite,
			TextureCache = PIXI.utils.TextureCache,
			Text = PIXI.Text;

	//Create a Pixi stage and renderer and add the 
	//renderer.view to the DOM
	var stage    = new Container(),
			renderer = PIXI.autoDetectRenderer(cw, ch);
	document.getElementById("hookClicker").appendChild(renderer.view);
	renderer.view.style.border = "1px dashed white";
	renderer.backgroundColor = '0x8b0000';
  
  
	
	initialize();
	
	/*---------------------------------------------------------------------------
	INITIALIZE()
	  > Gets the ball rolling, and initializes all necessary starting stuff.
	---------------------------------------------------------------------------*/
	function initialize() {
    // creates the instances of text for PIXI text display on the canvas.
		displayStamina  = new Text("", {fontFamily: "Roboto Mono", fontSize: 24, fill: "white"} );
		displayResult   = new Text("", {fontFamily: "Roboto Mono", fontSize: 24, fill: "white"} );
		displayStamina.position.set(0, ch - displayStamina.height);
		displayResult.position.set(0, ch - displayStamina.height * 2)
		stage.addChild(displayStamina);
		stage.addChild(displayResult);
    
		// starts primary game-loop function.
		gameLoop();
	}//end-initialize
	
	/*---------------------------------------------------------------------------
	GAMELOOP()
	  > Executes the game loop @ 60fps
	---------------------------------------------------------------------------*/
	function gameLoop() {
		// repeat self 60x / second.
		requestAnimationFrame(gameLoop);
		
		// processes updates and animations.
		updateProcess();
		updateAnimations();
	}
	
	/*---------------------------------------------------------------------------
	CREATEPLAYER()
	  > The skeleton template for what a player consists of.
	---------------------------------------------------------------------------*/
	function createPlayer() {
		var p = {
			Stamina: {
				cur: 200,
				max: 200,
			},
			Stats: {
				power: 3,
				intelligence: 3,
				charisma: 1,
				regen: 1,
			},
			Boosts: {
				regenTime: 0,
				ampPower: 1,
				ampRegen: 1,
				ampStamina: 1,
				
			}
		}
		return p;
	}
	
	/*---------------------------------------------------------------------------
	CLICKUP()
	  > The primary "click" function of the game. Adds points on click.
	---------------------------------------------------------------------------*/
	function clickUp() {
		// if player has enough stamina:
		//  >perform click
		//  >drain stamina
		//  >gain experience?
		if (player.Stats.power < player.Stamina.cur) {
			player.Stamina.cur -= player.Stats.power;
			drawPlus();
      addCount();
		}
		else {
			// some error that says you don't have enough stamina.
		}
	}

  function addCount() {
    clickCount += player.Stats.power;
    displayResult.text = clickCount;
    clickDisplay.innerHTML = clickCount;
  }
	
	// updates frames count; if 60 or greater, reset count and process regen.
	function updateProcess() {
		if (frames < 60) {
			frames++;			
		}
		else {
			frames = 0;
			if (player.Stamina.cur < player.Stamina.max) {
				player.Stamina.cur += player.Stats.regen; //regen;
			}
		}
		
	}
	
	function updateAnimations() { // needs work.
		displayStamina.text = "Stamina: " + player.Stamina.cur.toString();
    displayResult.text = "Count: " + clickCount;
		renderer.render(stage);
	}//end-animateThings
	
	function drawPlus() {
		// create temporary X:Y coordinates for drawing the PIXI.Text object.
		var tempX = Math.round(Math.random() * cw);
		var tempY = Math.round(Math.random() * ch);
		
		// create the PIXI.Text object of "+number".
		var num = new Text(
			"+" + player.Stats.power.toString(),
			{fontFamily: "Roboto Mono", fontSize: 24, fill: "white", position: "absolute"}
		);
		
		// if it would draw it partially off the canvas, move it.
		if (tempX + num.width > cw) { tempX -= num.width; }
		else if (tempX - num.width < 0) { tempX += num.width; }
		if (tempY + num.height > ch) { tempY -= num.height; }
		else if (tempY - num.height < 0) { tempY += num.height; }

		// sets the PIXI.Text object's X:Y location.
		num.position.set(tempX,tempY);
		
		// draws it to the PIXI.Container we created for pop-ups.
		stage.addChild(num);
		removePopup(num);
	}//end-showFloatyGain	
	
	function removePopup(obj) {
		// the interval in milliseconds.
		var ms = 50;
		
		// create interval for each popup object that will gradually fade-out and
		// eventually self-delete after approximately 1 second.		
		var x = setInterval(function() {
				if (obj.alpha < 0.05) {
					clearInterval(x);
					stage.removeChild(obj);
				}
				obj.alpha -= 0.05;
			}, ms);
	}//end-removePopup
	
//end-game-encapsulation	
})();
