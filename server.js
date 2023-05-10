import {exit} from "node:process";
import * as dotenv from "dotenv";
import radius from 'isc-radius';
import {initLdapClient} from "./ldap-client.js";

const {Server: RadiusServer} = radius;

try{
	dotenv.config();
}
catch{
	console.error("[ENV-CONF-001] Failed to load environment variables.");
	exit(1)
}

const ldapClient = initLdapClient(process.env.LDAP_URL);

const authenticateRadius = async (req, res)=>{
	const username = req.get("User-Name");
	const password = req.get("User-Password");
	
	const dn = `${username.value}`;
	let authenticated = null;
	
	ldapClient.bind(dn, password.value.toString())
		.then(()=>{
			res.code = "Access-Accept";
			console.info("[INFO] Ldap Bind success");
		})
		.catch(err=>{
			res.code = "Access-Reject";
			console.error("[ERROR-LDAP] Bind failed");
			console.error(err);
		});
	
	setTimeout(()=>{
		if (authenticated == null){
			console.error("[ERROR] Auth Timeout");
			res.code = "Access-Reject";
		}
	}, 10000);
};

new RadiusServer()
.loadDictionary("dictionary.rfc2865")
.addClient("127.0.0.1", "secret")
.use({
	auth: authenticateRadius
})
.start();


