console.log('hello world');
// var init
var loggedin = JSON.parse (localStorage.getItem("loggedin"));
var channeldata;
var lbls;
var temps;
  // Let's put a sequence number aside so we can use it in the event callbacks
  var seq = 0,
    delays = 80,
    durations = 500;
// objects init
var lbl_username = document.getElementById("lbl_username");
var lbl_channelID = document.getElementById("lbl_channelID");
var chart = document.getElementById("chart_js");
var btn_logout = document.getElementById("btn_logout");
// fcn
btn_logout_click = function(){
    localStorage.removeItem('loggedin');
    window.location.assign('index.html');
}




 
var chart_created=function() {
    seq = 0;
  }

  var chart_draw =function(data) {
    seq++;
  
    if(data.type === 'line') {
      // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
      data.element.animate({
        opacity: {
          // The delay when we like to start the animation
          begin: seq * delays + 1000,
          // Duration of the animation
          dur: durations,
          // The value where the animation should start
          from: 0,
          // The value where it should end
          to: 1
        }
      });
    } else if(data.type === 'label' && data.axis === 'x') {
      data.element.animate({
        y: {
          begin: seq * delays,
          dur: durations,
          from: data.y + 100,
          to: data.y,
          // We can specify an easing function from Chartist.Svg.Easing
          easing: 'easeOutQuart'
        }
      });
    } else if(data.type === 'label' && data.axis === 'y') {
      data.element.animate({
        x: {
          begin: seq * delays,
          dur: durations,
          from: data.x - 100,
          to: data.x,
          easing: 'easeOutQuart'
        }
      });
    } else if(data.type === 'point') {
      data.element.animate({
        x1: {
          begin: seq * delays,
          dur: durations,
          from: data.x - 10,
          to: data.x,
          easing: 'easeOutQuart'
        },
        x2: {
          begin: seq * delays,
          dur: durations,
          from: data.x - 10,
          to: data.x,
          easing: 'easeOutQuart'
        },
        opacity: {
          begin: seq * delays,
          dur: durations,
          from: 0,
          to: 1,
          easing: 'easeOutQuart'
        }
      });
    } else if(data.type === 'grid') {
      // Using data.axis we get x or y which we can use to construct our animation definition objects
      var pos1Animation = {
        begin: seq * delays,
        dur: durations,
        from: data[data.axis.units.pos + '1'] - 30,
        to: data[data.axis.units.pos + '1'],
        easing: 'easeOutQuart'
      };
  
      var pos2Animation = {
        begin: seq * delays,
        dur: durations,
        from: data[data.axis.units.pos + '2'] - 100,
        to: data[data.axis.units.pos + '2'],
        easing: 'easeOutQuart'
      };
  
      var animations = {};
      animations[data.axis.units.pos + '1'] = pos1Animation;
      animations[data.axis.units.pos + '2'] = pos2Animation;
      animations['opacity'] = {
        begin: seq * delays,
        dur: durations,
        from: 0,
        to: 1,
        easing: 'easeOutQuart'
      };
  
      data.element.animate(animations);
    }
  }
  
//code
lbl_username.innerText = "Hi "+loggedin.username+"!";
lbl_channelID.innerText = loggedin.channelID;
//chart.src="https://thingspeak.com/channels/"+ loggedin.channelID+"/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15" ;
btn_logout.onclick = btn_logout_click;
//496626

$.get("https://thingspeak.com/channels/"+ loggedin.channelID+"/feed.json", function(data, status){
    console.log("Data: " + data + "\nStatus: " + status);
    channeldata= data;
    temps = channeldata["feeds"].map(p=> p.field1);
    lbls = channeldata["feeds"].map(p=> p.created_at);

    var chart = new Chartist.Line('.ct-chart', {
        labels: lbls,
        series:[temps]
      }, {
        low: 0
      });


       // Once the chart is fully created we reset the sequence
     chart.on('created', chart_created);
  // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
  chart.on('draw',chart_draw );
    });
