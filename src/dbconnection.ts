import "dotenv/config";
import { DataSource } from "typeorm";

export const DBconnection = new DataSource({
    type: "mysql",
    entities: [],
    logging: true,
    synchronize: false,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrations: ["dist/migrations/*.js"]
});

