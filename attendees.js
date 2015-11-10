if (Meteor.isClient) {
  // counter starts at 0
  //Session.setDefault('counter', 0);

  Template.night.helpers({
    clubgoer: function () {


      return clubber;
    }
  });

  Template.night.events({
    'click button': function (event) {

    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
