if (Meteor.isClient) {
  // counter starts at 0
  //Session.setDefault('counter', 0);

  Template.night.helpers({
    bars: function () {
      var bar = [
        {club: 'The Simpsons',
        description: 'Yummy goodness',
        cost: '$$',
        rating: '**',
        username: ['Bubba will be attending at 10PM'],
        picture: 'batman.jpg'
        },
        {club: 'The Family Guy',
        description: 'Pedestrian crap',
        cost: '$',
        rating: '*',
        username: ['Buddy will be attending at 10PM','Sparky will be attending at 11PM', 'Meow will be attending at 12PM'],
        picture: 'day.jpg'
        }
        ]

      return bar;
    }
  });

  Template.night.events({
    'click button': function () {
      // increment the counter when button is clicked
      //Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
