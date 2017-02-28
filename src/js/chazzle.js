(function() {
    'use strict';

    //Aliases
    var Container = PIXI.Container,
        autoDetectRenderer = PIXI.autoDetectRenderer,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite,
        Graphics = PIXI.Graphics;

    //Create a Pixi stage and renderer and add the
    //renderer.view to the DOM
    var stage = new Container(),
        renderer = autoDetectRenderer($(window).width(), $(window).height());
    $('body')[0].appendChild(renderer.view);

    var rectangle, red1, state, t, pointer, b;

    renderer.view.style.position = "absolute";
    renderer.view.style.display = "block";
    renderer.autoResize = true;
    renderer.resize(window.innerWidth, window.innerHeight);
    renderer.backgroundColor = 0xff2fff;



    //load an image and run the `setup` function when it's done
    loader
      .add("images/board.png")
      .load(setup);

    function setup() {

      //Create the `cat` sprite, add it to the stage, and render it
      var gameboard = new Sprite(resources["images/board.png"].texture);
      gameboard.scale.set(0.4,0.4);
      gameboard.position.set(($(window).outerWidth()/2)-(gameboard.width/2),($(window).outerHeight()/2)-(gameboard.height/2));
      stage.addChild(gameboard);

      rectangle = new Graphics();
      rectangle.beginFill(0x0033CC);
      rectangle.lineStyle(4, 0xFF0000, 1);
      rectangle.drawRect(0, 0, 48, 48);
      rectangle.endFill();
      rectangle.x = 64;
      rectangle.y = 64;

      red1 = new Graphics();
      red1.beginFill(0xFF3300);
      red1.lineStyle(4, 0x336699, 1);
      red1.moveTo(0,0);
      red1.lineTo(48, 0);
      red1.lineTo(48, 19.2);
      red1.lineTo(96, 19.2);
      red1.lineTo(96, 96);
      red1.lineTo(48, 96);
      red1.lineTo(48, 76.8);
      red1.lineTo(0, 76.8);
      red1.lineTo(0,0);
      red1.endFill();
      red1.x = 64;
      red1.y = 200;

      stage.addChild(red1);
      stage.addChild(rectangle);

      state = play;

      t = new Tink(PIXI, renderer.view);

      t.makeDraggable(red1, rectangle);

      pointer = t.makePointer();

      b = new Bump(PIXI);

      //b.hit(rectangle, red1, true);

      //console.log(b.hit(cat, red1));

      //Call the `gameLoop` function once to get it started
      gameLoop();
    }

    function gameLoop(){
        //Loop this function 60 times per second
        requestAnimationFrame(gameLoop);

        // pointer.press = function() {
        //     console.log("The pointer was pressed");
        // };
        //
        // pointer.release = function() {
        //     console.log("The pointer was released");
        // };
        //
        // pointer.tap = function() {
        //     console.log("The pointer was tapped");
        // };

        state();

        t.update();

        //Render the stage
        renderer.render(stage);
    }

    function play(){
        //Move the sprite 1 pixel per frame
        //red1.x += 1;

        if (b.hit(red1, rectangle, true)) {
            console.log("hit");
        }

        if (pointer.hitTestSprite(red1)) {
            //Display a hand icon while the pointer is over the sprite
            pointer.cursor = "pointer";
        }
        else {
            //Display the default arrow icon when the
            //pointer moves outside the sprite's area
            pointer.cursor = "auto";
        }

    }
}());
