//Obtaining the default helper
	var animationHelper = AniJS.getHelper();

	animationHelper.slide = function(e, animationContext){
		$this = $(e.toElement).next().children('.upcoming');
		if ($this.hasClass('on')){
			$this.animate({
    		left: "100%",
  			}, 100, function() {

    		// Animation complete.

    		$this.removeClass('on');
			  $this.addClass('off');
  			});

		}else{

        $this.animate({
    		left: "5%",
  			}, 50, function() {

    		// Animation complete.

    		$this.removeClass('off');
			  $this.addClass('on');
  			});
        animationContext.run();
    }
}

// 	//Defining afterAnimationFunction
// 	animationHelper.timeFlipAfter = function(e, animationContext){
//     console.log('Running afterAnimationFunction');
//     console.log('Event triggered');
//     console.log(e);
// }
