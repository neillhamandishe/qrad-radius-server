import ldap from "ldapjs-promise";

const {createClient} = ldap;

const initLdapClient = (ldapUrl = null)=>{
	const client = createClient({
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
};

export{
	initLdapClient
}