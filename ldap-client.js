import  ldap from "ldapjs";


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
	
		console.log("[LDAP-CON-001] connection error");
	
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

const bindLDAP = (username, password, client)=>{
	const dn = `ad\\${username}`;
	console.info("[INFO] Attempting bind...");
	const res = client.bind(dn, password, (err) => {
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

export {
	initLdapClient,
	bindLDAP
}