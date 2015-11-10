if (Meteor.isClient) {

Template.signup.events({
    'submit form': function(event) {
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;
        var username = event.target.username.value;
        Accounts.createUser({
            email: email,
            username: username,
            password: password
        }, function(error){
            if(error){
                alert(error.reason);
            }
        })
    }
});


Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;
        Meteor.loginWithPassword(email,password, function(error){
           if(error) {
            alert(error.reason);
           }

        });

    }
});

Template.logout.events({
    'click .logout': function(event){
      event.preventDefault();
      console.log('logged out');
    Meteor.logout();
    }

});

}
