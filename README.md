

developed locally on window 7  computer
meteor add twbs:bootstrap
meteor add accounts-ui
meteor add accounts-password
meteor add oauth1
meteor add accounts-twitter
background provided by http://uigradients.com/#BetweenNightandDay

Accounts.loginServiceConfiguration.remove({service: "yelp"});
Accounts.loginServiceConfiguration.insert({
  service: "yelp",
  consumerKey: "YOUR_KEY_HERE",
  consumerSecret: "YOUR_SECRET_HERE",
  accessToken: "YOUR_TOKEN_HERE",
  accessTokenSecret: "YOUR_TOKEN_SECRET"
});

Meteor documentation can be found at http://docs.meteor.com/



meteor add twitter

echo # nightclub >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:bmonsueir/nightclub.git
git push -u origin master
