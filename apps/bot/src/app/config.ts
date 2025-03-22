import { config as dotenvConfig } from "dotenv";
dotenvConfig();

export interface ClientConfig {
  DISCORD_TOKEN: string;
  DISCORD_CLIENT_ID: string;
  DISCORD_ROLE_MEMBER_ID: string;
  [key: string]: string;
}

const clientConfig: ClientConfig = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN || "",
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID || "",
  DISCORD_ROLE_MEMBER_ID: process.env.DISCORD_ROLE_MEMBER_ID || "",
};

Object.keys(clientConfig).forEach((key) => {
  if (!clientConfig[key])
    throw new Error(`${key} is not defined in the .env file`);
});

export default clientConfig;
