import "reflect-metadata"
import app from "./app";
import { AppDataSource } from "./db";

async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Database connected");
        app.listen(3001);
        console.log("Server is listen", 3001);
    } catch (error) {
        console.error(error)
    }
    
}

main()
