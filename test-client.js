import pkg from 'isc-radius';
const {Client, AttributeList, Packet} = pkg;


pkg.Dictionary.load('dictionary.rfc2865');

let client = new Client({host: '127.0.0.1', secret: 'secret'});

let attrs = new AttributeList();

attrs.add('User-Name', 'Neill.Hamandishe');
attrs.add('User-Password', '#pass123');

client.request('Access-Request', attrs).then(function(p) {
	console.log('-- auth succeeded --');
	console.log(p);
}).catch(function(e) {
	if (e instanceof Packet) {
		console.log('-- auth failed --');
		console.log(e);
	} else {
		console.error(e);
	}
});
