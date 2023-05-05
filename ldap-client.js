import  ldap from "ldapjs";

const {createClient} = ldap;

const client = createClient({
	url: ['ldap://192.168.20.10:389'],
});

client.on("connect", ()=>{

	console.info("[INFO] Connection established.");

});

client.on("connectError", (err)=>{

	console.log("[ERROR] connection error");

});

client.on("setupError", (err)=>{

	console.error("[ERROR] Setup error");

});

client.on("error", (err)=>{

	console.error("[ERROR] General Error");

});

client.on("connectRefused", (err)=>{

	console.error("[ERROR] Connection refused by AD server.");

});

client.on("timeout", (err)=>{

	console.error(`[ERROR] Timeout ${err}`);

});

const bindLDAP = (username, password)=>{
	const dn = `ad\\${username}`;
	
	console.info("[INFO] Attempting bind...");

	client.bind(dn, password, (err) => {
		console.info(`[INFO] ad\${username}`);
		if(err){

			console.error("[ERROR] Failed to bind");
			console.error(`[ERROR] 	${err}`);
			client.unbind();
			return;
		}

		console.info("[INFO] Bind success");

	// 	searchLDAP(client);

	});
}

bindLDAP("Neill.Hamandishe", "#pass123");

/*export {

	bindLDAP

}*/