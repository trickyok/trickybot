var cheerio = require("cheerio");
var request = require("request");

const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { help } = require('./commands.json');
const client = new Discord.Client();
const currentDate = new Date();
const MIN_INTERVAL = 500;
let i = 0;

/* class autoRoleHelper {
    constructor(status = false, statusStr = "Disabled", role = null, roleStr = null) {
        this.status = status;
        this.statusStr = statusStr;
        this.role = role;
        this.roleStr = roleStr;
    }

    getStatus() {
        return this.statusStr;
    }

    toggleStatus() {
        if (this.status) {
            this.status = false;
            this.statusStr = "Disabled";
        }
        else {
            this.status = true;
            this.statusStr = "Enabled";
        }
    }

    getRole() {
        return this.roleStr;
    }

    getRoleID() {
        return this.role;
    }

    setRole(roleStr) {
        try {
            this.role = message.guild.roles.find(role => role.name === roleStr);
            this.roleStr = roleStr;
            return true;
        }
        catch {
            return false;
        }
    }
}
*/

// let autoRole = new autoRoleHelper(true, "enabled", 553266791187742740, "Pleb")

client.once('ready', () => {
	console.log('Ready!');
});

client.on('guildMemberAdd', member => {

    console.log(`${member.user.username} has joined the club! All hail Weezer!!!`)
    console.log(member)

    var role = member.guild.roles.find('name', 'Pleb');
    member.addRole(role)

    member.guild.channels.get('278675225540034561').send(`${member.user.username} has joined the club! All hail Weezer!!!`)

});

client.on('message', message => {

	if (message.author.id == '181471158741237760') {
		message.react('556530583640211476');
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

// Args demo command
	if (command === 'args-info') {
		if (!args.length) {
			return message.channel.send(`You didn"'"t provide any arguments, ${message.author}!`);
		}
		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}

	else if (command === 'ping') {
		message.channel.send('Pong');
	}

/* AutoRole
    else if (command === 'autorole') {
        if (message.member.permissions.has('ADMINISTRATOR')) {
            var msg = "```This server " + message.guild.name + " has Autorole " + autoRole.getStatus() + ",\nand is set to assign members the " + autoRole.getRole() + " role.\n\nChoose an option to modify\n\n[1] # Toggle Autorole\n[2] # Change default role```";
            message.channel.send(msg);
            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
            console.log(collector)
            collector.on('collect', message => {
                if (message.content == "1") {
                    autoRole.toggleStatus;
                    return message.channel.send(`Autorole has been ${autoRole.getStatus()}.`);
                }
                else if (message.content == "2") {
                    changeRoleHelper(message, autoRole);
                }
            });
        }
        else { return message.channel.send(`You do not have access to this command.`); }
    }
*/

// Server info command
	else if (command === 'server') {
		if (args[0] == 'name') {
			return message.channel.send(`Server Name: ${message.guild.name}`);
		}
		else if (args[0] == 'members') {
			return message.channel.send(`Total Members: ${message.guild.memberCount}`);
		}
		message.channel.send(`Server Name: ${message.guild.name}\nTotal Members: ${message.guild.memberCount}`);
	}

// Flip a coin
    else if (command === 'coin') {
        if (!args[0]) {
            coin = Math.round(Math.random());
            if (coin) {
                return message.channel.send("Heads!")
            }
            return message.channel.send("Tails!")
        }
        else {
            headCount = 0;
            tailCount = 0;
            i = 0
            while (i < args[0]) {
                coin = Math.round(Math.random());
                if (coin) { headCount += 1; }
                else { tailCount += 1; }
                i++;
            }
            return message.channel.send(`Heads: ${headCount}\nTails: ${tailCount}`)
        }
    }

// User info command
	else if (command === 'myinfo') {
		if (args[0] == 'name') {
			return message.channel.send(`Username: ${message.author.username}`);
		}
		else if (args[0] == 'id') {
			return message.channel.send(`ID: ${message.author.id}`);
		}
//		else if (args[0] == 'joined') {
//			return message.channel.send(`Joined On: ${message.author.}`)
//		}
		message.channel.send(`Username: ${message.author.username}\nID: ${message.author.id}`);
	}

	else if (message.content === `${prefix}help`) {
		message.channel.send(`${help}`);
	}

// Args demo command
	else if (command === 'ban') {
		if (!args.length) {
			return message.channel.send(`You didn"'"t provide any arguments, ${message.author}!`);
		}
		for (i in args) {
			message.channel.send(`${args[i]} is banned. Gottem.`);
		}
	}

// picture command
	else if (command === 'picture') {
	    if (!args.length) {
	        return message.channel.send(`You didn"'"t provide any arguments, ${message.author}!`)
	    }
        image(message, args)
	}

	console.log(message.content);
});

setInterval(function() {
	if(currentDate.getSeconds() == 0) {
		client.channels.get('280064791479844866').send('!disboard bump');
	}
}, MIN_INTERVAL);


/* function changeRoleHelper(message, autoRole) {

    var msg = "What role would you like to make default?";
    i = 0;
    reroles = message.guild.roles.fetch();
    while (i < roles.cache.size) {
        msg += roles => console.log[i];
        i++;
    }
    message.channel.send(msg)

    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
    console.log(collector)
    collector.on('collect', message => {
        if (!autoRole.setRole(message.content)) {
            return message.channel.send(`This is not a valid role. Try again dumbass.`);
        }
        else { return message.channel.send(`The default role has been changed to ${autoRole.getRole()}`) }
    });
} */


function image(message, parts) {

    /* extract search query from message */

    var search = parts.slice(0).join(" "); // Slices of the command part of the array ["!image", "cute", "dog"] ---> ["cute", "dog"] ---> "cute dog"

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + search,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
    request(options, function(error, response, responseBody) {
        if (error) {
            // handle error
            return message.channel.send(`Uhhhhh... Try something different, ${message.author}.`);
        }

        /* Extract image URLs from responseBody using cheerio */

        $ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)

        // In this search engine they use ".image a.link" as their css selector for image links
        var links = $(".image a.link");

        // We want to fetch the URLs not the DOM nodes, we do this with jQuery's .attr() function
        // this line might be hard to understand but it goes thru all the links (DOM) and stores each url in an array called urls
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        console.log(urls);
        if (!urls.length) {
            // Handle no results
            return message.channel.send(options[0]);
        }

        // Send result
        message.channel.send( urls[0] );
    });
}

client.login(token);