import {
  SlashCommandBuilder,
  type AutocompleteInteraction,
  type ChatInputCommandInteraction,
} from "discord.js";

import { type Client, defineCommand } from "../../app/client.js";

export default defineCommand({
  data: new SlashCommandBuilder()
    .setName("langue")
    .setDescription("Permet de changer la langue du bot")
    .addStringOption((option) =>
      option
        .setName("langue")
        .setDescription("La langue à utiliser")
        .setRequired(true)
        .setAutocomplete(true),
    ),
  async execute(client: Client, interaction: ChatInputCommandInteraction) {
    const langue = interaction.options.getString("langue");
    await interaction.reply(`La langue a été changée pour ${langue}`);
  },
  async autocomplete(client: Client, interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused();
    const choices = ["Français", "English", "Español", "Deutsch", "Italiano"];

    const filtered = choices.filter((choice) =>
      choice.toLowerCase().includes(focusedValue.toLowerCase()),
    );
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice })),
    );
  },
});
