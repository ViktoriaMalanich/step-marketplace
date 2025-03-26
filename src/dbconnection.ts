import { DataSource } from "typeorm";
// import { User } from "./User";
// import { Equipment } from "./Equipment";
// import { Check } from "./Check";




export const DBconnection = new DataSource({
    type: "mysql",
    entities: [
        // User,
        // Equipment,
        // Check
    ],
    logging: true,
    synchronize: false,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

