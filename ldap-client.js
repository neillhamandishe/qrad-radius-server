import  ldap from "ldapjs";
const {createClient} = ldap;



const client = createClient({
	url: ['ldap://127.0.0.1:1389', 'ldap://127.0.0.2:1389']
});

client.on("connectError", (err)=>{
	console.log("connection error");
});

const bindLDAP = (username, password)=>{
	var res = client.bind(`uid=${username}`, password, err => false);
	console.log(res);
	return true;
}

const res = bindLDAP("neill.hamandishe", "#pass123");
console.log(res);

export {
	bindLDAP
}
