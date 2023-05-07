import  ldap from "ldapjs";
import {promisify} from "node:util";

const {createClient} = ldap;

const initLdapClient = (ldapUrl = null) => {
	const client = createClient({
		//url: ['ldap://192.168.20.10:389'],
		url: ldapUrl ?? process.env.LDAP_URL
	});
	
	client.on("connect", ()=>{
	
		console.info("[INFO] Connection established.");
	
	});
	
	client.on("connectError", (err)=>{
	
		console.error("[LDAP-CON-001] connection error");
	
	});
	
	client.on("setupError", (err)=>{
	
		console.error("[LDAP-SET-001] Setup error");
	
	});
	
	client.on("error", (err)=>{
	
		console.error("[LDAP-UNKOWN] General Error");
	
	});
	
	client.on("connectRefused", (err)=>{
	
		console.error("[LDAP-CON-001] Connection refused by AD server.");
	
	});
	
	client.on("timeout", (err)=>{
	
		console.error(`[LDAP-CON-003] Timeout ${err}`);
	
	});

	return client;
}

const bindLDAPAsync = async (username, password, client)=>{
	const dn = `ad\\${username.value}`;
	const bindAsync = promisify(client.bind);
	console.info("[LDAP-INFO] Attempting bind...");
	
	return await bindAsync(dn, password.value.toString());
	
	const res = client.bind(dn, password.value.toString(), (err) => {
		if(err){
			console.error("[LDAP-AUTH-001] Failed to bind");
			console.error(`[ERROR] 	${err}`);
			client.unbind();
			return false;
		}
		console.info("[INFO] Bind success");
		return true;
	});
	return res;
};

const bindLDAP = (username, password, client)=>{
	const dn = `ad\\${username.value}`;
	console.info("[LDAP-INFO] Attempting bind...");
	const res = client.bind(dn, password.value.toString(), (err) => {
		if(err){
			console.error("[LDAP-AUTH-001] Failed to bind");
			console.error(`[ERROR] 	${err}`);
			client.unbind();
			return false;
		}
		console.info("[INFO] Bind success");
		return true;
	});
	return res;
}

const bindLdapAsync = promisify(bindLDAP);

export {
	initLdapClient,
	bindLDAP,
	bindLDAPAsync
}