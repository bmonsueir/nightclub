
// from http://markleeis.me/blog/2013/05/22/meteor-dot-js-and-yelp-oauth-search/
yelpQuery: function(search, isCategory, longitude, latitude) {
  console.log('Yelp search for userId: ' + this.userId + '(search, isCategory, lng, lat) with vals (', search, isCategory, longitude, latitude, ')');

  // Query OAUTH credentials (these are set manually)
  var auth = Accounts.loginServiceConfiguration.findOne({service: 'yelp'});

  // Add auth signature manually
  auth['serviceProvider'] = { signatureMethod: "HMAC-SHA1" };

  var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
  },
  parameters = {};

  // Search term or categories query
  if(isCategory)
    parameters.category_filter = search;
  else
    parameters.term = search;

  // Set lat, lon location, if available (SF is default location)
  if(longitude && latitude)
    parameters.ll = latitude + ',' + longitude;
  else
    parameters.location = 'San+Francisco';

  // Results limited to 5
  parameters.limit = 5;

  // Configure OAUTH parameters for REST call
  parameters.oauth_consumer_key = auth.consumerKey;
  parameters.oauth_consumer_secret = auth.consumerSecret;
  parameters.oauth_token = auth.accessToken;
  parameters.oauth_signature_method = auth.serviceProvider.signatureMethod;

  // Create OAUTH1 headers to make request to Yelp API
  var oauthBinding = new OAuth1Binding(auth.consumerKey, auth.consumerSecret, 'http://api.yelp.com/v2/search');
  oauthBinding.accessTokenSecret = auth.accessTokenSecret;
  var headers = oauthBinding._buildHeader();

  // Return data results only
  return oauthBinding._call('GET', 'http://api.yelp.com/v2/search', headers, parameters).data;
}


// or from https://gist.github.com/matt-oconnell/a35569cb51d5e82b4159

var auth = {
	oauth_consumer_key: "*",
	oauth_consumer_secret: "*",
	oauth_token: "*",
	accessTokenSecret: "*",
	oauth_signature_method: "HMAC-SHA1"
};

var params = _.extend(auth),
url = 'http://api.yelp.com/v2/search' + type;
params.term = search;
params.location = location.split(' ').join('+');
params.limit = 5;

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

return oauthBinding._call('GET', url, headers, params);
