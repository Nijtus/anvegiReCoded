const { Client, Attachment } = require('discord.js');
let request = require(`request`);
let fs = require(`fs`);

const client = new Client();

token = fs.readFileSync("dataBase/token.txt", 'utf8');
token = token.split('\n')

strings = fs.readFileSync("string.json", 'utf8');
strings = JSON.parse(strings)

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
		if (message.attachments.first() !== undefined){
			var type = message.attachments.first().filename;

			if(type == "jpg"){imageNom=message.author.id+spl[0][1]+".jpg";}
			else if (type == "png"){imageNom=message.author.id+spl[0][1]+".png";}
			else if (type == "jpeg"){imageNom=message.author.id+spl[0][1]+".jpeg";}
			console.log(imageNom);
			if(imageNom != "none"){download(message.attachments.first().url,imageNom);}
			else {message.channel.send(strings["error"]["fomatInvalide"])}

		}
    result = {
      nom : spl[0][1],
      description : message.content.replace(spl[0][0]+" "+spl[0][1],""),
      image : imageNom
    }

		let donnees = JSON.stringify(result)
		fs.writeFile('dataBase/OC/'+message.author.id+'.json', donnees, function(erreur) {
    	if (erreur) {
        console.log(erreur)
			}else{
				message.channel.send(strings["enregistrementROC"])
			}
		});
  }
});


function download(url,nom){
		console.log(url);
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream("dataBase/OC/"+nom));
}



client.login(token[0]);
