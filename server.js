import {exit} from "node:process";
import * as dotenv from "dotenv";
import radius from 'isc-radius';
import {bindLDAP} from "./ldap-client.js";

const {Server: RadiusServer} = radius;

try{
	dotenv.config();
}
catch{
	console.error("[ENV-CONF-001] Failed to load environment variables.");
	exit(1)
}

// const ldapClient = initLdapClient(process.env.LDAP_URL);

const authenticateRadius = async (req, res)=>{
	const username = req.get("User-Name");
	const password = req.get("User-Password");
	// await bindLDAPAsync(username, password, ldapClient).then(_=>{
	// 	console.info("[INFO] Bind successful");
	// 	res.code = "Access-Accept";
	// }).catch(err=>{
	// 	console.error("[ERROR] Bind failed");
	// 	console.error(err);
	// 	res.code = "Access-Reject";
	// });
	const authenticated = bindLDAP(username, password);
	authenticated ? res.code = "Access-Accept": res.code = "Access-Reject";
};

new RadiusServer()
.loadDictionary("dictionary.rfc2865")
.addClient("127.0.0.1", "secret")
.use({
	auth: authenticateRadius
})
.start();



