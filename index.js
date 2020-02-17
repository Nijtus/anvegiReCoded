const { Client, Attachment } = require('discord.js');
let request = require(`request`);
let fs = require(`fs`);

const client = new Client();

token = fs.readFileSync("token.txt", 'utf8');
token = token.split('\n')

client.on('ready',function (){
	console.log('Ready!');
});

client.on('message',function(message){
  lignes = message.content.split("\n")
  spl = []
  for (var x in lignes) {
    spl.push(lignes[x].split(' '))
  }
  if(spl[0][0]=="!oc"){
    if(msg.attachments.first().filename === `png`){//Download only png (customize this)
            download(msg.attachments.first().url);//Function I will show later
    }
    result = {
      proprietaire : message.author.id,
      nom : spl[0][1],
      description : message.content.replace(spl[0][0]+" "+spl[0][1],""),
      image : "null"
    }
    console.log(result);
    console.log(spl[0][0]+spl[0][1]);
    message.channel.send(result.description)
  }
});


function download(url,nom){
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(nom));
}



client.login(token[0]);
