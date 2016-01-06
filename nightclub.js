
Clubbers = new Mongo.Collection('clubbers');

if (Meteor.isClient) {
  // counter starts at 0
  //Session.setDefault('counter', 0);
var bar = [], latitude = 0, longitude = 0;
var barDep = new Tracker.Dependency();
navigator.geolocation.getCurrentPosition(function(position) {
location = "Latitude: " +  position.coords.latitude  + "<br> Longitude: " + position.coords.longitude;
latitude = position.coords.latitude;
longitude = position.coords.longitude;
});

  Template.night.helpers({
    bars: function () {
    barDep.depend();

    return bar;
    }
  });

  Template.night.events({
    'click .addClub': function (event) {
       var index = event.currentTarget.id;
       var user = Meteor.user();
       //console.log(bar[index].id);
       if(user){
         if(bar[index].clubber){
           if(bar[index].clubber.indexOf(user.username) > -1){
             bar[index].clubber.splice(bar[index].clubber.indexOf(user.username), 1);
              }else{
              bar[index].clubber.push(user.username);
              }
            }else{
              bar[index].clubber.push(user.username);
            }
            Clubbers.update({_id: bar[index].id},
                      {$set: {clubber: bar[index].clubber}},
                    { upsert: true });
          barDep.changed();
          //update mongo for club's yelp id and twitter names of clubbers and date
      } else{
        alert("sign up or log in");
      }
    }
  });


  Template.welcome.events({
    'click .getLocation': function (event) {

      var location = $('[name=location]').val();

    Meteor.call('yelpSearch',latitude, longitude, location,  function(error, result){
      if(error) {
        console.log(error);
      }else{
          bar = [];
          var patrons = [];
          for(var i in result.businesses){
            //check mongo database for clubbers

          if(Clubbers.findOne({_id: result.businesses[i].id})){

             patrons = Clubbers.findOne({_id: result.businesses[i].id});
          }else{
            patrons.clubber = [];
            //  console.log(patrons.clubber)
          }

            bar.push(
              {club: result.businesses[i].name,
              description: result.businesses[i].snippet_text,
              rating: result.businesses[i].rating_img_url_large,
              address: result.businesses[i].location.address[0],
              city: result.businesses[i].location.city,
              picture: result.businesses[i].image_url,
              id: result.businesses[i].id,
              clubber: patrons.clubber}
            );
              //console.log(patrons.clubber);
          }
    }
    });

      barDep.changed();
    }

});
Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.methods({
    yelpSearch: function(longitude, latitude, location) {

      this.unblock();

      //place auth here
      var auth = {
      };


      var params = _.extend(auth),
      url = 'http://api.yelp.com/v2/search';
      params.term = 'Bars';
      if(location){
          params.location = location.split(' ').join('+');
        } else{

          params.ll = longitude + ',' + latitude;
      }
      params.limit = 20;

      var config = {
      	consumerKey: auth.oauth_consumer_key,
      	secret: auth.oauth_consumer_secret
      };
      var urls = {
      	requestToken: url,
      	accessToken: auth.oauth_token
      };

      var oauthBinding = new OAuth1Binding(config, urls);
      oauthBinding.accessTokenSecret = auth.accessTokenSecret;
      var headers = oauthBinding._buildHeader();
      return oauthBinding._call('GET', url, headers, params).data;

    }
});
  });
}
