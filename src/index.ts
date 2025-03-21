import { app } from "./server";
import 'dotenv/config';

const PORT = process.env.PORT;

const run = async () => {
    app.listen(PORT, () => {
        console.log(`Server works on http://localhost:${PORT}`);
    });
}

run();
