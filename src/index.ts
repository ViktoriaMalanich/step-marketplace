import 'dotenv/config';
import { app } from "./server";
import { DBconnection } from "./dbconnection";

const PORT = Number(process.env.PORT);

const run = async () => {
    try {
        await DBconnection.initialize();
        app.listen(PORT, () => {
            console.log(`Server works on http://localhost:${PORT}`);
        });        
    } catch (error) {
        console.error(error);
    }
}

run();
