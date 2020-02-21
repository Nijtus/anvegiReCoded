const { Client, Attachment } = require('discord.js');
let request = require(`request`);
let fs = require(`fs`);

const client = new Client();

token = fs.readFileSync("dataBase/token.txt", 'utf8');
token = token.split('\n')

strings = fs.readFileSync("string.json", 'utf8');
strings = JSON.parse(strings);

oc = fs.readFileSync("dataBase/oc.json", 'utf8');
oc = JSON.parse(oc);

jeu = fs.readFileSync("jeu.json", 'utf8');
jeu = JSON.parse(jeu);

client.on('ready',function (){
	console.log(strings["prete"]);
});

client.on('message',function(message){
  lignes = message.content.split("\n")
  spl = []
  for (var x in lignes) {
    spl.push(lignes[x].split(' '))
  }

  if(spl[0][0]=="!oc"){
		var imageNom = "none"
		if (spl.length == 1) {

			if (oc[spl[0][1]] !== undefined){
				message.channel.send(oc[spl[0][1]]["description"])

			}else{
				message.channel.send(strings["error"]["nullOC"])

			}

		}else if (oc[spl[0][1]] !== undefined && message.author.id != oc[spl[0][1]]["proprietaire"]) {
			message.channel.send(strings["error"]["accesDenied"])
		}else {
			if (message.attachments.first() !== undefined){
				var type = message.attachments.first().filename;

				if(type == "jpg"){imageNom=message.author.id+spl[0][1]+".jpg";}
				else if (type == "png"){imageNom=message.author.id+spl[0][1]+".png";}
				else if (type == "jpeg"){imageNom=message.author.id+spl[0][1]+".jpeg";}
				console.log(imageNom);
				if(imageNom != "none"){download(message.attachments.first().url,imageNom);}
				else {message.channel.send(strings["error"]["fomatInvalide"])}

			}

			var description = "";
			for (var x in spl) {
				if (x!=0) {
					description += spl[x] + "\n"
				}
			}

	    result = {
	      nom : spl[0][1],
				proprietaire : message.author.id,
	      description : description,
	      image : imageNom
	    }

			oc[spl[0][1]]= result
			saveOC();
			message.channel.send(strings["enregistrementROC"])
			console.log(oc);

		}
  }

	if(spl[0][0]=="!jeu"){
		result = strings["jeu"].replace("${0}",jeu["contrainte"][getRandomInt(jeu["contrainte"].length)]).replace("${1}",jeu["objet"][getRandomInt(jeu["objet"].length)])

		message.channel.send(result)
	}
});

client.on("guildMemberAdd", (member) => {
  member.send(strings["arrivee"].replace("${0}",member.name))
});


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function download(url,nom){
		console.log(url);
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream("dataBase/OC/"+nom));
}

function saveOC(){
	let donnees = JSON.stringify(oc)
	fs.writeFile('dataBase/oc.json', donnees, function(erreur) {
		if (erreur) {
	    console.log(erreur)
		}
	});
}



client.login(token[0]);
