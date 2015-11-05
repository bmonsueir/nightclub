if (Meteor.isClient) {
  // counter starts at 0
  //Session.setDefault('counter', 0);
var bar =[];
var x = 0;
var y = 0;
navigator.geolocation.getCurrentPosition(function(position) {
location = "Latitude: " +  position.coords.latitude  + "<br> Longitude: " + position.coords.longitude;
x = position.coords.latitude;
y = position.coords.longitude;

});
var clubber = [
['Bubba', 'El Diablo', 'The Muffin Man', 'Billy the Kid', 'Beevis', 'Butthead'],['Buddy', 'Sparky','Meow'],['Larry', 'Moe','Curly'],['Robin', 'Batgirl','Catwoman'] ];
var barDep = new Tracker.Dependency();
  Template.night.helpers({
    bars: function () {


      barDep.depend();
       bar = [
        {club: 'Club Pretentious',
        description: 'Yummy goodness',
        rating: '**',
        address: '101 Main Street',
        city: 'Mayberry',
        clubber: clubber[0],
        picture: '1322580608_rdv_kursaal_fahrenheit_bar.jpg'
        },
        {club: 'The Snot and Wistle',
        description: 'British food, crooked teeth, nuff said',
        rating: '*',
        address: '202 Main Street',
        city: 'Mayberry',
        clubber: clubber[1],
        picture: 'M-Resort-32-Degrees-Draft-Bar-2.jpg'
      },
      {club: 'Stooges Stages',
      description: 'nwuh nwuh nwuh',
      rating: '**',
      address: '1150 Market Boulevard',
      city: 'Mayberry',
      clubber: clubber[2],
      picture: 'day.jpg'
      },
      {club: 'The Cave',
      description: 'This club looks like Batman',
      rating: '****',
      address: '355 First Avenue',
      city: 'Mayberry',
      clubber: clubber[3],
      picture: 'batman.jpg'
      }
        ]

      return bar;
    }
  });

  Template.night.events({
    'click .addClub': function (event) {
       var index = event.currentTarget.id;
       var user = Meteor.user();

       if(bar[index].clubber.indexOf(user.username) > -1){
       //bar[index].clubber.pop();
       bar[index].clubber.splice(bar[index].clubber.indexOf(user.username), 1);
     }else{

        bar[index].clubber.push(user.username);
      }
        barDep.changed();
        //update mongo for club's yelp id and twitter names of clubbers and date
      console.log(bar[index].clubber)
    }
  });


  Template.nightclub.events({
    'click .getLocation': function (event) {
      if($('[name=location]').val()){
        console.log($('[name=location]').val());
      }else{
      console.log(x,y);
    }
      barDep.changed();
    }

});



}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
