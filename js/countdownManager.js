var times;
var options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };

        function success(pos) {
          var crd = pos.coords;
          // var longi = -71.242796;
          // var lat = 46.803283;
          times = prayTimes.getTimes(new Date(), [crd.latitude, crd.longitude]);      
          initMagic(times);
          
          // console.log('Your current position is:');
          // console.log('Latitude : ' + crd.latitude);
          // console.log('Longitude: ' + crd.longitude);
          // console.log('More or less ' + crd.accuracy + ' meters.');
        };

        function error(err) {
          console.warn('ERROR(' + err.code + '): ' + err.message);

        };

navigator.geolocation.getCurrentPosition(success, error, options);
function initMagic (times){
		var d = new Date();
		var today = d.getMonth()+1 +'/'+d.getDate()+'/'+d.getFullYear();

	//set the data attr for each salaat. Makes getting current time more easily accessible
	$('.fajr').data('sTime', today+' '+times.fajr+':00');
	$('.dhuhr').data('sTime', today+' '+times.dhuhr+':00');
	$('.asr').data('sTime', today+' '+times.asr+':00');
	$('.maghrib').data('sTime', today+' '+times.maghrib+':00');
	$('.isha').data('sTime', today+' '+times.isha+':00');
	
	//set the times for the upcoming days
	

	setCountdown();


	function setCountdown(){
		$('[data-sTime]').each(function() {
		   	var $this = $(this); 
			finalDate = $(this).data('sTime');
		  	$this.countdown(finalDate, function(event) {
		  	$this.children('.h').html(event.strftime('%H'));
		  	$this.children('.m').html(event.strftime('%M'));
		  	$this.children('.s').html(event.strftime('%S'));
		  	//$this.html(event.strftime('%H:%M:%S'));
		  });
		});
	}
	 

}