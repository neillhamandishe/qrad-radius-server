import {exit} from "node:process";
import * as dotenv from "dotenv";
import radius from 'isc-radius';
import {initLdapClient,bindLDAP} from "./ldap-client.js";

const {Server: RadiusServer} = radius;

try{
	dotenv.config();
}
catch{
	console.error("[ENV-CONF-001] Failed to load environment variables.");
	exit(1)
}

// const ldapClient = initLdapClient(process.env.LDAP_URL);

const authenticateRadius = (req, res)=>{
	const username = req.get("User-Name");
	const password = req.get("User-Password");
	authenticated = bindLDAP(username, password, ldapClient);
	res.code = authenticated? "Access-Accept" : "Access-Reject";
};

new RadiusServer()
.loadDictionary("dictionary.rfc2865")
.addClient("127.0.0.1", "secret")
.use({
	auth: authenticateRadius
})
.start();



