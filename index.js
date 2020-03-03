var saml2 = require('saml2-js');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

 
// Create service provider
var sp_options = {
    entity_id: "https://ss-federated.herokuapp.com/metadata.xml",
    private_key: fs.readFileSync("./cert/key.pem").toString(),
    certificate: fs.readFileSync("./cert/xcert.crt").toString(),
    assert_endpoint: "https://ss-federated.herokuapp.com/assert",
    force_authn: true,
    sign_get_request: true,
    allow_unencrypted_assertion: false
}
var sp = new saml2.ServiceProvider(sp_options);
 
// Create identity provider
var idp_options = {
  sso_login_url: "https://wayf.ucol.mx/saml2/idp/SSOService.php",
  sso_logout_url: "https://wayf.ucol.mx/saml2/idp/SingleLogoutService.php",
  certificates: [fs.readFileSync("./cert/idp.crt").toString()]
};

var idp = new saml2.IdentityProvider(idp_options);
// ------ Define express endpoints ------
 
// Endpoint to retrieve metadata need middleware
app.get("/metadata.xml", function(req, res) {
  res.type('application/xml');
  res.send(sp.create_metadata());
});
 
// Starting point for login
app.get("/login", function(req, res) {
  console.log('ENtre a login', sp);
  try{
    sp.create_login_request_url(idp, {}, function(err, login_url, request_id) {
      if (err){
        console.log("Error:", err.message);
        return res.send(500);
      }
      res.redirect(login_url);
    });
  } catch(err){
    console.log("Error en el metodo")
  }
});
 
// Assert endpoint for when login completes
app.post("/assert", function(req, res) {
  var options = {request_body: req.body};
  sp.post_assert(idp, options, function(err, saml_response) {
    if (err != null)
      return res.send(500);
 
    // Save name_id and session_index for logout
    // Note:  In practice these should be saved in the user session, not globally.
    // name_id = saml_response.user.name_id;
    // session_index = saml_response.user.session_index;
    console.log(saml_response)
    res.send("Gracias!!");
  });
});
 
// Starting point for logout
app.get("/logout", function(req, res) {
  var options = {
    name_id: name_id,
    session_index: session_index
  };
 
  sp.create_logout_request_url(idp, options, function(err, logout_url) {
    if (err != null)
      return res.send(500);
    res.redirect(logout_url);
  });
});
 
app.listen(port, () => {
	console.log(`Server running port ${port}`);
});