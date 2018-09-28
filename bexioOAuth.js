//Resource: https://www.npmjs.com/package/simple-oauth2
//Install: npm install --save simple-oauth2

const bexioOAuth = (clientID, clientSecret) => {
    // Set the configuration settings
    const credentials = {
        client: {
          id: clientID,
          secret: clientSecret
        },
        auth: {
          tokenHost: 'https://office.bexio.com',
          tokenPath: '/oauth/access_token'
        }
      };
       
      // Initialize the OAuth2 Library
    const oauth2 = require('simple-oauth2').create(credentials);
     
    // Authorization oauth2 URI
    const authorizationUri = oauth2.authorizationCode.authorizeURL({
      redirect_uri: 'http://localhost:3000/callback',
      scope: 'article_show', // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
      state: '<state>'
    });
     
    // Redirect example using Express (see http://expressjs.com/api.html#res.redirect)
    res.redirect(authorizationUri);
     
    // Get the access token object (the authorization code is given from the previous step).
    const tokenConfig = {
      code: '<code>',
      redirect_uri: 'http://localhost:3000/callback',
      scope: '<scope>', // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
    };
     
    const accessToken = '';

    // Save the access token
    try {
      const result = await oauth2.authorizationCode.getToken(tokenConfig)
      accessToken = oauth2.accessToken.create(result);
    } catch (error) {
      console.log('Access Token Error', error.message);
    }

    return accessToken;
}