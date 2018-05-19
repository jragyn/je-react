
//-------------------------------------------------------------------------//
//  Encapsulates the canvas game into this function.
//-------------------------------------------------------------------------//
(function gameSandbox() {
"use strict"; var then = Date.now();
document.getElementById("versionSandbox").innerHTML += "0.1";
// ====================================================================================//
  // Canvas details
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext("2d");
	canvas.width = 512; var cw = canvas.width;
	canvas.height = 288; var ch = canvas.height;
	document.getElementById("hookSandBox").appendChild(canvas);
	
	// is the system busy?
	var _isBusy = false;
	
	// used for preloading images.
	var loadedImages = {};
	
	// a global object to hold important information.
	var dataSystem = {};
             
  // input-handling variables
	var keysDown = {};
	addEventListener("keydown", function(e) { keysDown[e.keyCode] = true; }, false);
	addEventListener("keyup", function(e) {	delete keysDown[e.keyCode];	}, false);

  // Global object for creating characters of any kind.
  function GameObject(spd, gfx, hp, dmg) {
    this.Speed = spd;
    this.Graphics = gfx;
    this.Life = hp;
    this.Damage = dmg;
    this.x = 32;
    this.y = 32;
  }
  
  var hero;
	var gfx = {};

  var gameWorld = {};
  var camera = {}; 
  // done with global variables, start setup.
	initialize();

// ====================================================================================//	
	// handles all initial setup that only need be done once.
	function initialize() {
		hero = new GameObject(200, "", 30, 1);
		// do the setup of all the global variables here:
		gfx = {
			ground: {},
			wall: {},
			door: {},
			chest: {},
			water: {}
		};
		dataSystem = {
			currentMap: 0,
			mapList: [],
		};
		gameWorld = {
			x: 0,
			y: 0,
			width: canvas.width,
			height: canvas.height
		};
		camera = {
			x: (gameWorld.x + gameWorld.width / 2) - camera.width / 2,
			y: (gameWorld.y + gameWorld.height / 2) - camera.height / 2,
			width: canvas.width,
			height: canvas.height
		};
		// then load the images, and get the ball rolling.
		loadAllImages();
		}
	
	// Preloads and assigns all the images into memory for use throughout.
	// GO HERE if you want to add more images to be loaded.
	// Once images are loaded, THEN it proceeds to run the game.
	function loadAllImages() {
		var listOfImages = [
			"./gfx/grn_brick.png",	//00 ground- brick
			"./gfx/grn_grass.png",	//01 ground- grass
			"./gfx/obj_chest.png",	//02 object- chest
			"./gfx/obj_coin.png",		//03 object- coin
			"./gfx/obj_door.png",		//04 object- door
			"./gfx/obj_tree.png",		//05 object- tree
			"./gfx/spr_goby.png",		//06 sprite- goby
			"./gfx/spr_hero.png",		//07 sprite- hero
			"./gfx/spr_hunter.png",	//08 sprite- hunter
			"./gfx/spr_impy.png",		//09 sprite- impy
			"./gfx/spr_slime.png",	//10 sprite- slime
			"./gfx/wal_brick.png",	//11 wall  - brick
			"./gfx/wal_water.png",	//12 wall  - water
			"./gfx/obj_key.png"			//13 object- key
		];
		var promiseArray = listOfImages.map(function(imgurl){
			var prom = new Promise(function(resolve,reject){
				var img = new Image();
				img.onload = function(){
					var name = imgurl.slice(6, -4);
					loadedImages[name] = img;
					resolve();
				};
				img.src = imgurl;
			});
			return prom;
		});
		Promise.all(promiseArray).then(function() {
			hero.Graphics = loadedImages['spr_hero'];
			gfx.wall = loadedImages['wal_brick'];
			gfx.water = loadedImages['wal_water'];
			gfx.ground = loadedImages['grn_brick'];
			gfx.door = loadedImages['obj_door'];
			gfx.chest = loadedImages['obj_chest'];
			gfx.key = loadedImages['obj_key'];
			begin();
		});
	}
	
	// is run once, after images and such are loaded and assigned.
	// gets the ball rolling.
	function begin() {
		createMaps();
		main();
	}
	
	// this handles the input every frame
	function update(delta) {
    handleInput(delta);
	}
  
  // this is the full drawing phase of the game.
	function render() {
    ctx.clearRect(0, 0, cw, ch);

    //Move the context so that it's positioned relative to the camera
    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    drawMap();
    drawSprites();
    ctx.restore();
	}

	// This is where all input is handled for the player.
  // All camera movement and boundaries are also handled here.
  function handleInput(delta) {
    var SPEED = hero.Speed * delta;
		// UP
		if (38 in keysDown) {
      if (getPassable("up")) {
				hero.y -= SPEED;
      }
		}

		// DOWN
		if (40 in keysDown) {
      if (getPassable("down")) {
				hero.y += SPEED;        
      }
		}
		
		// LEFT
		if (37 in keysDown) {
      if (getPassable("left")) {
				hero.x -= SPEED;        
      }
		}
		
		// RIGHT
		if (39 in keysDown) {
      if (getPassable("right")) {
				hero.x += SPEED;        
      }
		}
		
		// SPACE BAR
		if (32 in keysDown) {
			
		}
    // handle camera movement, too:
    camera.x = Math.floor(hero.x + (hero.Graphics.width / 2) - (camera.width / 2));
    camera.y = Math.floor(hero.y + (hero.Graphics.height / 2) - (camera.height / 2));
    
    if ( camera.x < gameWorld.x) {      // left edge
      camera.x = gameWorld.x;
    }
    if ( camera.y < gameWorld.y) {      // top edge
      camera.y = gameWorld.y;
    }    
    if ( camera.x + camera.width > gameWorld.x + gameWorld.width ) {     // right edge
      camera.x = gameWorld.x + gameWorld.width - camera.width;
    }
    if ( camera.y + camera.height > gameWorld.y + gameWorld.height ) {   // bottom edge
      camera.y = gameWorld.y + gameWorld.height - camera.height;
    }
    
  }//end-input
	
	/*---------------------------------------------------------------------------
	BUILDMAP()
	  > The major function that draws and redraws the entire tilemap.
	---------------------------------------------------------------------------*/
	function buildMap(levelMap) {
		// various information necessary for drawing the map.
		var tileSize = 32; var ROWS = levelMap.length;	var COLS = levelMap[0].length;
		var mapLayer = [];
		// basically, an enumeration that puts words to the number grid of a map.
		var mapKey = {
			// nothing
			nothing: 0,
      
			// tiles
			ground: 1,
			wall: 2,
			water: 5,
      
			// objects
			door: 3,
			chest: 4,
			key: 6
		}
    
		// iterates over each tile and draws it based on the numeric key.
		for(var row = 0; row < ROWS; row++) {	
    	for(var column = 0; column < COLS; column++) { 
      	var currentTile = levelMap[row][column];
				var x = column * tileSize;
				var y = row * tileSize;
				
				switch (currentTile) {
					case mapKey.nothing:
						// don't draw anything in this tile.
						// used for the secondary layers.
						break;
						
					case mapKey.ground:
						// draw a ground tile.
						var ground = gfx.ground;
						ctx.drawImage(ground, x, y);
						break;
						
					case mapKey.wall:
						// draw a wall tile.
						var wall = gfx.wall;
            ctx.drawImage(wall, x, y);
						break;
						
					case mapKey.water:
						// draw a water tile.
						var water = gfx.water;
            ctx.drawImage(water, x, y);
						break;

					case mapKey.door:
						// draw a door tile.
						var door = gfx.door;
						ctx.drawImage(door, x, y);
						break;

					case mapKey.chest:
						// draw a chest object.
						var chest = gfx.chest;
						ctx.drawImage(chest, x, y);
						break;
						
					case mapKey.key:
						// draw a key tile.
						var key = gfx.key;
            ctx.drawImage(key, x, y);
						break;
						

						
					default:
						break;
				}//switch-mapKey
				
			}//for-cols
		}//for-rows
    
	}//end-buildMap

  // draws the given map based on the map-array of arrays from createMaps().
	function drawMap() {
		var map = dataSystem.mapList[dataSystem.currentMap];
    gameWorld.width = dataSystem.mapList[dataSystem.currentMap].tiles[0].length * 32;
    gameWorld.height = dataSystem.mapList[dataSystem.currentMap].tiles.length * 32;
		buildMap(map.tiles);
		buildMap(map.objects);
	}

  // draws the given selection of sprites.
	// currently is only drawing the hero since he is the only sprite.
	function drawSprites(newX, newY) {
    ctx.drawImage(hero.Graphics, hero.x, hero.y);
	}//end-spriteDraw
  
	// the ultimate list of maps, and what they look like.
	function createMaps() {
    
		function Map() {
			this.name =  "";
			this.id = 0;
			this.tiles = [];
			this.objects = [];
			this.events = [];
		}

    function mapEvent(x, y, acts) {
      this.locX = x;
      this.locY = y;
      this.actions = acts;
    }
    
    var m0 = new Map();
    m0.name = "";
    m0.id = 0;
    m0.tiles = [
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 2, 2, 2, 2, 2, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 1, 1, 2],
      [2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 1, 1, 2],
      [2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 1, 1, 2],
      [2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];
    
    m0.objects = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    // the map's events
    var m0e1 = new mapEvent(
        13, 0,        // x, y 
        [1, 13, 8, 2] // actions: ecode, x, y, newMapID
    );
    var m0e2 = new mapEvent(
        0, 8,        // x, y 
        [1, 14, 7, 1] // actions: ecode, x, y, newMapID
    );
    m0.events.push(m0e1);
		m0.events.push(m0e2);
    dataSystem.mapList.push(m0);
      
    var m1 = new Map();
    m1.name = "";
    m1.id = 1;
    m1.tiles = [
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2],
      [2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2],
      [2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2],
      [2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    ];
		
    m1.objects = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
      [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
		
    var m1e1 = new mapEvent(
        15, 7,        // x, y 
        [1, 1, 8, 0] // actions: ecode, x, y, newMapID 
    );
    m1.events.push( m1e1 );
		
    var m1e2 = new mapEvent(
        14, 0,        // x, y 
        [1, 17, 8, 3] // actions: ecode, x, y, newMapID 
    );
    m1.events.push( m1e2 );
    dataSystem.mapList.push(m1);
		
    var m2 = new Map();
    m2.name = "";
    m2.id = 2;
    m2.tiles = [
      [2, 2, 2, 2, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 1, 1, 2],
      [2, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 1, 1, 2],
      [2, 5, 5, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 1, 1, 1, 2],
      [2, 5, 5, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 1, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 2, 2, 2, 2, 2, 2],
    ];
		
    m2.objects = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
    ];
		
    var m2e1 = new mapEvent(
			13, 9,        // x, y
			[1, 13, 1, 0] // actions: ecode, x, y, newMapID 
    );
    m2.events.push( m2e1 );
		
		var m2e2 = new mapEvent(
			0, 4,        // x, y
			[1, 17, 4, 3] // actions: ecode, x, y, newMapID 
    );
    m2.events.push( m2e2 );
    dataSystem.mapList.push(m2);
		
    var m3 = new Map();
    m3.name = "";
    m3.id = 3;
    m3.tiles = [
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 2, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 5],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5],
      [2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 5, 5, 5],
      [2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 5, 5, 5, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 5, 5, 5, 5, 2, 2, 2, 2],
      [2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 5, 5, 5, 5, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];
		
    m3.objects = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
    ];
		
    var m3e1 = new mapEvent(
			17, 9,        // x, y
			[1, 14, 1, 1] // actions: ecode, x, y, newMapID
    );
    m3.events.push( m3e1 );
		
		var m3e2 = new mapEvent(
			18, 4,        // x, y
			[1, 1, 4, 2] // actions: ecode, x, y, newMapID 
    );
    m3.events.push( m3e2 );
    dataSystem.mapList.push(m3);
		

	}//end-mapList

  // the function that handles passability over specific tiles.
	// also handles event interaction (like teleporting).
	function getPassable(dir) {
		var j_debug = true;
		var pass = [
			1,	// ground tiles
			3,	// door objects
			6		// key objects
			];
		var xBoost = 0, yBoost = 0;
		switch (dir) { // checks the next-tile-over based on direction.
			case "up": 		yBoost = -18; break;
			case "down": 	yBoost = 18; 	break;
			case "left": 	xBoost = -18; break;
			case "right": xBoost = 18; 	break;
			default: break;
    }
		var x = Math.round((hero.x + xBoost) / 32);
		var y = Math.round((hero.y + yBoost) / 32);
		
		var map = dataSystem.mapList[dataSystem.currentMap];

		// note: the X and Y are transposed to make creating maps easier.
		var currentTile = map.tiles[y][x];
		var currentObject = map.objects[y][x];
		checkIfEvent(map.events, x, y);
		var canPass = false;
		
		// first it checks the tilemap to see if passable.
		if (pass.includes(currentTile)) { canPass = true; }
		// then it checks the objectmap to see if passable.
		else if (pass.includes(currentObject)) { canPass = true; }
			// theoretically, objects can enable passability over
			// normally non-passable tiles.
			// only fails if both are unpassable.
		else { canPass = false; }
		
		// output for current map tile information.
		if (j_debug) {
			var thisLog = document.getElementById('sb-log');
			var thisString = "X: " + x + " Y: " + y
			thisLog.innerText = thisString;
		}
		
		return canPass;
	}
	
	// handles the checking and execution of events on the map.
	function checkIfEvent(m, hx, hy) {
		if (!(m.length > 0)) return;
		m.forEach(function(ev) {
			if (ev.locX == hx && ev.locY == hy) {
				executeEvent(ev.actions);
			}
		})
	}

	// handles the execution of a given event.
	function executeEvent(actions) {
		//_isBusy = true;
		switch (actions[0]) {
			case 1: // change maps
				fadeTransfer(actions);
				break;
			case 2: // access treasure chest??
				break;
			case 3: // ???
				break;
			default: break;
		}
	};
	
	// modified combination of fadeIn() + transfer info + fadeIn()
	function fadeTransfer(actions) {
		var transfer = setInterval(function() {
			if (ctx.globalAlpha > 0.02) {
				ctx.globalAlpha -= 0.02;
			} else {
				ctx.globalAlpha = 0;
				dataSystem.currentMap = actions[3];
				hero.x = actions[1] * 32;
				hero.y = actions[2] * 32;
				fadeIn();
				clearInterval(transfer);
			}
		}, 30)
	};
	
	// standard fade out function; drops opacity to 0.
	function fadeOut() {
		var toggleOut = setInterval(function() {
			if (ctx.globalAlpha > 0.05) {
				ctx.globalAlpha -= 0.04;
			} else {
				ctx.globalAlpha = 0;
				clearInterval(toggleOut);
			}
		}, 30)
	};
	
	// standard fade in function; raises opacity to 1.
	function fadeIn() {
		var toggleIn = setInterval(function() {
			if (ctx.globalAlpha < 0.95) {
				ctx.globalAlpha += 0.04;
			} else {
				ctx.globalAlpha = 1;
				clearInterval(toggleIn);
			}
		}, 30)
	};

  // the main game-loop of this game.
  function main() {
		// handle the delta, and iterate the loop.
    //console.log("running main() ... ");
		var now = Date.now();	var delta = (now - then) / 1000;
		requestAnimationFrame(main);
		// things to do every frame:
    update(delta);
		render();
		
		// close out the main function before refresh.
		then = now;
    
	}//end-main

})();
