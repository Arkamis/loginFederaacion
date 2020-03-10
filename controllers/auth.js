const saml2 = require('saml2-js');
const fs = require('fs');
// Create service provider
const sp_options = {
    entity_id: "https://ss-federated.herokuapp.com/metadata.xml",
    private_key: fs.readFileSync("./cert/key.pem").toString(),
    certificate: fs.readFileSync("./cert/xcert.crt").toString(),
    assert_endpoint: "https://ss-federated.herokuapp.com/assert",
    force_authn: true,
    sign_get_request: true,
    allow_unencrypted_assertion: false
  }
const sp = new saml2.ServiceProvider(sp_options);
//
// Create identity provider
const idp_options = {
    sso_login_url: "https://wayf.ucol.mx/saml2/idp/SSOService.php",
    sso_logout_url: "https://wayf.ucol.mx/saml2/idp/SingleLogoutService.php",
    certificates: [fs.readFileSync("./cert/idp.crt").toString()]
};

var idp = new saml2.IdentityProvider(idp_options);
// ------ Define express endpoints ------

const getMetaData = (req, res) => {
    res.type('application/xml');
    res.send(sp.create_metadata());
}

const signIn = (req, res) => {
    try{
        sp.create_login_request_url(idp, {}, function(err, login_url, request_id) {
        if (err){
            console.log("Error:", err.message);
            return res.send(500);
        }
        res.redirect(login_url);
        });
    } catch(err){
        console.log("Error en el metodo");
    }
}

const assert = (req, res) => {
    const options = {request_body: req.body};
    
    sp.post_assert(idp, options, function(err, saml_response) {
        if (err){
            return res.send('Error');
        }
        // Save name_id and session_index for logout
        // Note:  In practice these should be saved in the user session, not globally.
        let name_id = saml_response.user.name_id;
        let session_index = saml_response.user.session_index;

        const user = {
            name: saml_response.user.attributes.uNombre,
            email: saml_response.user.attributes.uCorreo,
            nAccount: saml_response.user.attributes.uCuenta,
            rol: saml_response.user.attributes.uTipo,
            dependency: saml_response.user.attributes.uDependencia
        }
        req.session.regenerate(function(err) {
            // will have a new session here
            if(err){
                return res.status(500).send('error', err.message);
            }
            req.session.user = {name_id, session_index};
            req.session.user.data = user;
            res.render('dashboard', {area: 'perfil', user});
        });
        // res.statuCode(500).send('Error', error.message)
    
    });
}

const signOut = (req, res) => {
    var options = {
      name_id: req.session.user.name_id,
      session_index: req.session.user.session_index
    };
    if(!req.session.user.data.nAccount){
        try {
            req.session.destroy();
            console.log('Borre cookie');
            return res.redirect('/login');            
        } catch (error) {
            console.log(error.message);
            return res.status('500').send('error', error.message);
        }
        // req.session.destroy(function(err) {
        //     // cannot access session here
        //     if(err){
        //         res.status('500').send('error', err.message);
        //     }
        //     console.log('Ya me desconecte!');
        //     return res.redirect('/login');
        // })
    }
    console.log('Estas son las opciones del signOut', options);
    sp.create_logout_request_url(idp, {options}, function(err, logout_url) {
        if (err){
            return res.send(500);
        }
        req.session.destroy(function(err) {
            // cannot access session here
            if(err){
                res.status('500').send('error', err.message);
            }
            console.log('Ya me desconecte!');
            res.redirect(logout_url);
        })
    });
}




module.exports = {getMetaData, assert, signIn, signOut};