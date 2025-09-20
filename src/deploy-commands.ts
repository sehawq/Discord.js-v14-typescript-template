import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { TOKEN, CLIENT_ID, GUILD_ID } from './config'; // Import from config.ts

// Array to hold all commands
const commands: any[] = [];
// Read all .ts files in the commands folder
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    // Use dynamic import instead of require()
    // because we are using CommonJS module in TypeScript but need to behave like ES modules
    import(filePath)
        .then(command => {
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
            } else {
                console.log(`[WARNING] The command file at ${filePath} is missing a "data" or "execute" property.`);
            }
        })
        .catch(error => {
            console.error(`Error loading command file ${filePath}:`, error);
        });
}

// Register commands with the Discord API
const rest = new REST().setToken(TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // For global commands (valid on all servers)
        // await rest.put(
        //     Routes.applicationCommands(CLIENT_ID),
        //     { body: commands },
        // );

        // For commands specific to a single guild (faster for testing)
        const data: any = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();