import "dotenv/config";
import { DataSource } from "typeorm";
import { Category } from "./entities/Category";
import { User } from "./entities/User";
import { Market } from "./entities/Market";
import { Product } from "./entities/Product";
import { Specification } from "./entities/Specification";
import { CategorySpecificationUniqValue } from "./entities/CategorySpecificationUniqValue";
import { ProductSpecificationValue } from "./entities/ProductSpecificationValue";

export const DBconnection = new DataSource({
    type: "mysql",
    entities: [
        Category,
        User,
        Market,
        Product,
        Specification,
        CategorySpecificationUniqValue,
        ProductSpecificationValue
    ],
    logging: true,
    synchronize: false,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrations: ["dist/migrations/*.js"]
});

