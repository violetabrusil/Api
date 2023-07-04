import { DataSource } from "typeorm";
import { Client } from "./Entities/Client";
import { Factura } from "./Entities/Factura";

export const AppDataSource = new DataSource ({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "postgres",
    entities: [Client, Factura],
    synchronize: true,
    logging: true,
    subscribers: [],
    migrations: [],
})