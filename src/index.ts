import { Client, Events, GatewayIntentBits, Collection } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { TOKEN } from './config'; // Get the token from config.ts

// Define Command interface (TypeScript specific)
interface Command {
    data: any; // Could be more specific for SlashCommandBuilder
    execute: (interaction: any) => Promise<void>; // Could be more specific for CommandInteraction
}

// Create a new Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Create a Collection to store commands
(client as any).commands = new Collection<string, Command>();

// Load command files
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    // Use dynamic import as in deploy-commands.ts
    import(filePath)
        .then(command => {
            if ('data' in command && 'execute' in command) {
                (client as any).commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command file at ${filePath} is missing a "data" or "execute" property.`);
            }
        })
        .catch(error => {
            console.error(`Error loading command file ${filePath}:`, error);
        });
}


// Event listener for when the client is ready
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Event listener for slash command interactions
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = (client as any).commands.get(interaction.commandName) as Command | undefined;

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

// Log in to Discord with your client's token
client.login(TOKEN);