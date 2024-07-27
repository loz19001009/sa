const {
    Client,
    GatewayIntentBits,
    REST,
    Routes,
    EmbedBuilder,
} = require("discord.js");
const axios = require("axios");

const token = process.env.DISCORD_TOKEN; // Replace with your bot's token
const clientId = "1240969989800988722"; // Replace with your bot's client id
const botstatus = "😎";
const advertise = true; // Set to true if you want to send a server invite after the command is run
const serverinvite = "https://discord.gg/yourinvite"; // Replace with your server invite link
const madeby = "Legend_august";
const API_KEY = "E99l9NOctud3vmu6bPne"; // API key

const fluxusEndpoint = `https://stickx.top/api-fluxus/?hwid={hwid}&api_key=${API_KEY}`;
const deltaEndpoint = `https://stickx.top/api-delta/?hwid={hwid}&api_key=${API_KEY}`;
const linkvertiseEndpoint = `https://stickx.top/api-linkvertise/?link={link}&api_key=${API_KEY}`;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const commands = [
    {
        name: "delta",
        description: "Gets Delta Key",
        options: [
            {
                name: "link",
                type: 3,
                description: "The Delta link",
                required: true,
            },
        ],
    },
    {
        name: "fluxus",
        description: "Gets Fluxus Key",
        options: [
            {
                name: "link",
                type: 3,
                description: "The Fluxus link",
                required: true,
            },
        ],
    },
    {
        name: "bypass",
        description: "Bypass a Linkvertise link",
        options: [
            {
                name: "link",
                type: 3,
                description: "The Linkvertise link to bypass",
                required: true,
            },
        ],
    },
];

client.once("ready", async () => {
    console.log(`Successfully Logged In As ${client.user.username}`);
    client.user.setPresence({
        activities: [{ name: botstatus, type: "LISTENING" }],
        status: "dnd",
    });

    const rest = new REST({ version: "10" }).setToken(token);

    try {
        console.log("Started refreshing global application (/) commands.");
        await rest.put(Routes.applicationCommands(clientId), {
            body: commands,
        });
        console.log("Successfully reloaded global application (/) commands.");
    } catch (error) {
        console.error(error);
    }
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === "delta") {
        await handleDelta(interaction);
    } else if (commandName === "fluxus") {
        await handleFluxus(interaction);
    } else if (commandName === "bypass") {
        await handleLinkvertiseBypass(interaction);
    }
});

async function handleDelta(interaction) {
    const link = interaction.options.getString("link");

    const initialEmbed = new EmbedBuilder()
        .setTitle("Processing Delta Key Request")
        .setDescription("Please wait while we retrieve the Delta Key.")
        .setColor("#000000");

    await interaction.reply({ embeds: [initialEmbed] });

    if (link.startsWith("https://gateway.platoboost.com/a/8?id=")) {
        const urlParams = new URLSearchParams(new URL(link).search);
        const hwid = urlParams.get("id");
        const apiUrl = deltaEndpoint.replace("{hwid}", hwid);

        try {
            const response = await axios.get(apiUrl);
            const embed = new EmbedBuilder()
                .setThumbnail(
                    "https://media.discordapp.net/attachments/1160520088181542925/1199162006993895484/deltax.png",
                )
                .setColor("#000000");

            if (response.data.key) {
                embed
                    .setTitle("Delta Key Retrieved")
                    .setDescription(`\`\`\`${response.data.key}\`\`\``);
                await interaction.editReply({ embeds: [embed] });
            } else {
                embed
                    .setTitle("Error")
                    .setDescription("Error getting Delta key")
                    .setColor("#FF0000");
                await interaction.editReply({ embeds: [embed] });
            }
        } catch (error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription(
                    "An error occurred while processing the request.",
                )
                .setColor("#FF0000")
                .setThumbnail(
                    "https://media.discordapp.net/attachments/1160520088181542925/1199162006993895484/deltax.png",
                );

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    } else {
        await interaction.editReply({
            content: "Invalid Delta Link",
        });
    }

    if (advertise) {
        await interaction.followUp({
            content: serverinvite,
            ephemeral: true,
        });
    }
}

async function handleFluxus(interaction) {
    const link = interaction.options.getString("link");

    const initialEmbed = new EmbedBuilder()
        .setTitle("Processing Fluxus Key Request")
        .setDescription("Please wait while we retrieve the Fluxus Key.")
        .setColor("#FFFFFF");

    await interaction.reply({ embeds: [initialEmbed] });

    if (link.startsWith("https://flux.li/android/external/start.php?HWID=")) {
        const urlParams = new URLSearchParams(new URL(link).search);
        const hwid = urlParams.get("HWID");
        const apiUrl = fluxusEndpoint.replace("{hwid}", hwid);

        try {
            const response = await axios.get(apiUrl);
            const embed = new EmbedBuilder()
                .setThumbnail(
                    "https://play-lh.googleusercontent.com/4BnKk8iK35DaOKhbIvCCTOE3Fl7uokNAvoZNl1HjgFUpvsvcMWNI2HKYaMXMbcryNw",
                )
                .setImage("https://giffiles.alphacoders.com/220/220277.gif")
                .setColor("#FFFFFF");

            if (response.data.key) {
                embed
                    .setTitle("Fluxus Key Retrieved")
                    .setDescription(`\`\`\`${response.data.key}\`\`\``);
                await interaction.editReply({ embeds: [embed] });
            } else {
                embed
                    .setTitle("Error")
                    .setDescription("Error getting Fluxus key")
                    .setColor("#FF0000");
                await interaction.editReply({ embeds: [embed] });
            }
        } catch (error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription(
                    "An error occurred while processing the request.",
                )
                .setColor("#FF0000")
                .setThumbnail(
                    "https://play-lh.googleusercontent.com/4BnKk8iK35DaOKhbIvCCTOE3Fl7uokNAvoZNl1HjgFUpvsvcMWNI2HKYaMXMbcryNw",
                )
                .setImage("https://giffiles.alphacoders.com/220/220277.gif");

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    } else {
        await interaction.editReply({
            content: "Invalid Fluxus Link",
        });
    }

    if (advertise) {
        await interaction.followUp({
            content: serverinvite,
            ephemeral: true,
        });
    }
}

async function handleLinkvertiseBypass(interaction) {
    const link = interaction.options.getString("link");
    const apiUrl = linkvertiseEndpoint.replace(
        "{link}",
        encodeURIComponent(link),
    );

    try {
        await interaction.deferReply(); // Send a temporary response

        const response = await axios.get(apiUrl);

        const embed = new EmbedBuilder()
            .setThumbnail(
                "https://www.stepstone.de/upload_de/logo/E/logoLinkvertise-Inh-Marc-Winter-255864DE-2101131647.gif",
            )
            .setImage(
                "https://i.pinimg.com/originals/9a/56/e2/9a56e28fb37e6179943c9fd3974e0745.gif",
            );

        if (response.data.key) {
            embed
                .setTitle("Linkvertise Bypass Successful")
                .setDescription(`\`\`\`${response.data.key}\`\`\``)
                .setColor("#fcac18");
            await interaction.editReply({ embeds: [embed] });
        } else {
            embed
                .setTitle("Error")
                .setDescription(`Error: ${response.data.message}`)
                .setColor("#FF0000");
            await interaction.editReply({ embeds: [embed] });
        }
    } catch (error) {
        console.error(error);
        const errorEmbed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription("An error occurred while processing the request.")
            .setColor("#FF0000")
            .setThumbnail(
                "https://www.stepstone.de/upload_de/logo/E/logoLinkvertise-Inh-Marc-Winter-255864DE-2101131647.gif",
            )
            .setImage(
                "https://i.pinimg.com/originals/9a/56/e2/9a56e28fb37e6179943c9fd3974e0745.gif",
            );

        await interaction.editReply({ embeds: [errorEmbed] });
    }

    if (advertise) {
        await interaction.followUp({
            content: serverinvite,
            ephemeral: true,
        });
    }
}

client.login(token);
