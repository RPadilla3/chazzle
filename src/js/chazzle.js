(function() {
    'use strict';

    //Aliases
    var Container = PIXI.Container,
        autoDetectRenderer = PIXI.autoDetectRenderer,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite;

    //Create a Pixi stage and renderer and add the
    //renderer.view to the DOM
    var stage = new Container(),
        renderer = autoDetectRenderer($(window).width(), $(window).height());
    $('body')[0].appendChild(renderer.view);

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
      var cat = new Sprite(resources["images/board.png"].texture);
      cat.scale.set(0.4,0.4);
      cat.position.set(($(window).outerWidth()/2)-(cat.width/2),($(window).outerHeight()/2)-(cat.height/2));
      console.log(cat.position);
      stage.addChild(cat);
      renderer.render(stage);
    }
}());
