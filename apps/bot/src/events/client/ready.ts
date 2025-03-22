import { type Client, defineEvent } from "../../app/client.js";
import { LogLevel } from "../../app/client.js";

export default defineEvent({
  name: "ready",
  once: true,
  async execute(client: Client) {
    client.logger(LogLevel.INFO, "Client", `Logged in as ${client.user?.tag}!`);
  },
});
