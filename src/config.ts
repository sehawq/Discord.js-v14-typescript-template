import dotenv from 'dotenv';
dotenv.config();

export const TOKEN = process.env.DISCORD_TOKEN || '';
export const CLIENT_ID = process.env.CLIENT_ID || '';
export const GUILD_ID = process.env.GUILD_ID || ''; // For testing guild, can be empty in production

if (!TOKEN) {
    console.error("DISCORD_TOKEN is not defined in the .env file!");
    process.exit(1);
}
if (!CLIENT_ID) {
    console.error("CLIENT_ID is not defined in the .env file!");
    process.exit(1);
}