/*
    part of older version of app using Knob.js. Keeping for future use...but a complete mess in it's current state.
*/
        function clock() {
            var $s = $(".second"),
                $m = $(".minute"),
                $h = $(".hour");
                d = new Date(),
                s = d.getSeconds(),
                m = d.getMinutes(),
                h = d.getHours();
            $s.val(s).trigger("change");
            $m.val(m).trigger("change");
            $h.val(h).trigger("change");
            setTimeout("clock()", 1000);
            $('.rem').text(h +':' + m + ':' + s);
        }

$(function($) {
    var tile = $('.tile'),
        notif = $('.notif'),
        wheel = $('.wheel'),
        alarms = $('.alarms'),
        outro = 'fadeOutUp',
        intro = 'fadeInDown',
        intro2 = 'fadeInDowner',
        flipOut = 'flipOutX',
        flipIn = 'flipInX',
        hidden = 'hidden',
        except;

    (function() {
        $('.save').on('click', function() {
            var alTime = $('.ival').text();
            // alTime.toFixed(2);
            $('.time').text('remind me in ' + alTime + ' minutes');
            // alarms.append(newAlarm);
            alarms.addClass(intro);
            alarms.one('webkitAnimationEnd animationend', function() {
                alarms.removeClass(intro);
                alarms.addClass(outro);
                //not fully implemented. Intended to freeze notif text on screen, then fadeout.
                setTimeout(function() {
                    $('.time').text(' ');
                }, 3000);
            });
            $('.ival').text('0');
            $('.infinite').val(0).trigger('change');;
        });

        tile.addClass('animated fadeInDown');
        tile.on('click', function() {
            var This = $(this),
                except = tile.not(This),
                flipMode = This.next('.al-disp');
            title = This.children('.name').text();
            tile.removeClass(intro+ ' ' +flipIn);
            //Remove flipin class at the end of the animation, but keep the opacity at 0.
            //to avoid tile from suddenly appearing
                This.addClass(flipOut);

                switch (true) {
                  case flipMode.hasClass('f'):
                    flipMode.fadeIn(700);
                    except.removeClass(flipOut);


                    console.log('fajr');

                    break;
                  case flipMode.hasClass('d'):
                    flipMode.fadeIn(700);
                    except.removeClass(flipOut);
                    

                    console.log('d');
                    break;
                  case flipMode.hasClass('a'):
                    flipMode.fadeIn(700);
                    except.removeClass(flipOut);
                    
                    console.log('a');
                    break;
                    case flipMode.hasClass('m'):
                    flipMode.fadeIn(700);
                    except.removeClass(flipOut);
                    
                    console.log('m');
                    break;
                    case flipMode.hasClass('i'):
                    flipMode.fadeIn(700);
                    except.removeClass(flipOut);
                    
                    console.log('i');
                    break;
                }

                // This.next('.al-disp').fadeIn(700);
                // This.one('webkitAnimationEnd animationend', function() {
                //     This.addClass('fk-hidden');
                //     This.removeClass(flipOut);
                // });
            
            // This.siblings().removeClass(flipOut);
            
            // tile.addClass(outro);
            // tile.one('webkitAnimationEnd animationend', function() {
            //     $('.title').text(title);
            //     notif.fadeIn(300);
            // });
        });
        $('.al-disp').on('click', function () {
            var This = $(this);
            This.fadeOut(700);
            This.prev(tile).removeClass('fk-hidden');
            This.prev(tile).addClass(flipIn);
            //quick fix for now, transition needs to be smoothed out. Need consistent solution for this problem.
            // This.children('.al-disp').addClass(hidden+ ' ' +'fk-hidden');
            // This.removeClass(flipOut+ ' ' +'fk-hidden').addClass(flipIn);
        });
        $('.back').on('click', function() {
            notif.fadeOut(300, function() {
                tile.removeClass(outro);
                tile.addClass(intro);
            });
        });
    })();

// to control the alarms..
/*

    need to check if alarm has children.
    FALSE:  then just set the add alarm text.

    TRUE:   query DB to get number of alarms,
            'activate' the alarm nodes,
            parse JSON string and set the alarm time for alarm 1,2...etc
*/
function Alarms () {
    if ($('.alarms').children()){

    } else{};
}

    var hours = 0;
    $(".knob").knob({
        change: function(value) {
            // console.log("change : " + value);
        },
        release: function(value) {
            // console.log(this.$.attr('value'));
            // console.log("release : " + value);
        },
        cancel: function() {
            // console.log("cancel : ", this);
        },
        /*format : function (value) {
                        return value + '%';
                    },*/
    });

    // Example of infinite knob, iPod click wheel
    var v, up = 0,
        down = 0,
        i = 0,
        $idir = $(".idir"),
        $ival = $(".ival"),
        incr = function() {
            i++;
            $idir.show().html("+").fadeOut();
            $ival.html(i);
        }, decr = function() {
            i--;
            $idir.show().html("-").fadeOut();
            $ival.html(i);
        };
    $("input.infinite").knob({
        min: 0,
        max: 60,
        stopper: false,
        change: function() {
            if (v > this.cv) {
                if (up) {
                    decr();
                    up = 0;
                } else {
                    up = 1;
                    down = 0;
                }
            } else {
                if (v < this.cv) {
                    if (down) {
                        incr();
                        down = 0;
                    } else {
                        down = 1;
                        up = 0;
                    }
                }
            }
            v = this.cv;
        }
    });
});


        function refresh(){
            today = prayTimes.getTimes(new Date(), [45.483299, -75.650002]);

            //call each salaat function and pass current times

            builder(today.fajr.substr(0,2), today.fajr.substr(3,2), 'fajr');
            builder(today.dhuhr.substr(0,2), today.dhuhr.substr(3,2), 'dhuhr');
            builder(today.asr.substr(0,2), today.asr.substr(3,2), 'asr');
            builder(today.maghrib.substr(0,2), today.maghrib.substr(3,2), 'maghrib');
            builder(today.isha.substr(0,2), today.isha.substr(3,2), 'isha');
        }

        
        
        function builder(todayHours, todayMinutes, salaat){
            var prayHours = parseInt(todayHours);
            var prayMinutes = parseInt(todayMinutes);
            //from each salaat function call the clock function to set the timer for each salaat
            clocker(prayHours, prayMinutes, salaat);
            }
            function clocker(PH, PM, salaat){
                d = new Date();
                currentHours = d.getHours();
                currentSec = d.getSeconds();
                currentMin = d.getMinutes();
                var $s,
                    $m,
                    $h;
                switch(salaat){
                    case 'fajr':
                        hoursUntil = PH - currentHours;
                        minUntil = PM - currentMin;

                        $s = $(".fsecond"),
                        $m = $(".fminute"),
                        $h = $(".fhour");
                        $s.val(minUntil).trigger("change");
                        $m.val(hoursUntil).trigger("change");
                        $('.rem').text($h +':' + $m + ':' + $s);
                        //$h.val(currentHours).trigger("change");
                        // $('.rem').text(h +':' + m + ':' + s);
                        break;

                    case 'dhuhr':
                        hoursUntil = PH - currentHours;
                        minUntil = PM - currentMin;

                        $s = $(".dsecond"),
                        $m = $(".dminute"),
                        $h = $(".dhour");
                        $s.val(minUntil).trigger("change");
                        $m.val(hoursUntil).trigger("change");
                        $('.rem').text($h.val() +':' + $m.val() + ':' + $s.val());

                        break;

                    case 'asr':
                        hoursUntil = PH - currentHours;
                        minUntil = PM - currentMin;

                        s = $(".asecond"),
                        $m = $(".aminute"),
                        $h = $(".ahour");
                        $s.val(minUntil).trigger("change");
                        $m.val(hoursUntil).trigger("change");
                        $('.rem').text($h.val() +':' + $m.val() + ':' + $s.val());

                        break;

                    case 'maghrib':
                        hoursUntil = PH - currentHours;
                        minUntil = PM - currentMin;

                        s = $(".msecond"),
                        $m = $(".mminute"),
                        $h = $(".mhour");
                        $s.val(minUntil).trigger("change");
                        $m.val(hoursUntil).trigger("change");
                        $('.rem').text($h.val() +':' + $m.val() + ':' + $s.val());

                        break;

                    case 'isha':
                        hoursUntil = PH - currentHours;
                        minUntil = PM - currentMin;

                        s = $(".isecond"),
                        $m = $(".iminute"),
                        $h = $(".ihour");
                        $s.val(minUntil).trigger("change");
                        $m.val(hoursUntil).trigger("change");
                        $('.rem').text($h.val() +':' + $m.val() + ':' + $s.val());

                        break;
                }
            }




