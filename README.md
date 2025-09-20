# My Slash Bot (TypeScript - English)

This is a basic Discord slash command bot foundation built with TypeScript.

## Features

- Slash command support with Discord.js v14
- Developed with TypeScript
- Environment variable management with `dotenv`
- Easily extensible command structure
- GitHub-friendly `.gitignore` configuration

## Setup

### 1. Clone the Repository

```bash
git clone [https://github.com/sehawq/Discord.js-v14-typescript-template.git](https://github.com/sehawq/Discord.js-v14-typescript-template.git)
cd my-slash-bot-ts-en
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root directory and add your Discord bot's token, client ID, and (optionally) the ID of your test guild:

```env
DISCORD_TOKEN=YOUR_BOT_TOKEN_HERE
CLIENT_ID=YOUR_BOT_CLIENT_ID_HERE
GUILD_ID=YOUR_TEST_GUILD_ID_HERE # For test guilds only
```

  - **`YOUR_BOT_TOKEN_HERE`**: Your bot token from the Discord Developer Portal.
  - **`YOUR_BOT_CLIENT_ID_HERE`**: The general ID of your application.
  - **`YOUR_TEST_GUILD_ID_HERE`**: The ID of the server where you will test commands. You can get this by enabling developer mode and right-clicking the server.

### 4. Add the Bot to Your Discord Server

You can use the following URL to add your bot to your Discord server (replace `YOUR_BOT_CLIENT_ID_HERE` with your bot's actual ID):

`https://discord.com/oauth2/authorize?client_id=YOUR_BOT_CLIENT_ID_HERE&scope=applications.commands%20bot&permissions=8`

### 5. Register Slash Commands

Before running the bot for the first time or after adding new commands, you need to register them with Discord:

```bash
npm run deploy
```

This command will run `src/deploy-commands.ts` and register the defined commands with the Discord API. If `GUILD_ID` is defined, commands will be registered only to that guild; otherwise, they will be registered globally (global registration may take some time to propagate).

## Running the Bot

### In Development Mode (with nodemon)

```bash
npm run dev
```

This command runs `src/index.ts` with `ts-node` and automatically restarts the bot when any changes are detected in the `src` folder.

### In Production Mode

First, compile the TypeScript files:

```bash
npm run build
```

Then, run the compiled JavaScript code:

```bash
npm run start
```

## Adding New Commands

To add a new slash command:

1.  Create a new `.ts` file in the `src/commands` folder (e.g., `hello.ts`).
2.  Import `SlashCommandBuilder` and `CommandInteraction` from `discord.js`.
3.  Define the command data using `SlashCommandBuilder` (`name`, `description`, `options`, etc.).
4.  Create an `async` function named `execute` and place the command logic inside it.
5.  Export `data` and `execute`.

**Example (`src/commands/hello.ts`):**

```typescript
import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Says hello to the bot.');

export async function execute(interaction: CommandInteraction) {
    await interaction.reply('Hello!');
}
```

Don't forget to run `npm run deploy` after adding a new command!

-----

**License**


Distributed under the ISC License.
