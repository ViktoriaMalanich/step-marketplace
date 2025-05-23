import 'dotenv/config';
import { app } from "./server";
import { DBconnection } from "./dbconnection";
// import apiDoc from "./swagger.json";
import apiDoc from "./swagger";

const apiGenerator = async () => {
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV == "prod") return;
    const swaggerUi = await import("swagger-ui-express");
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDoc));
}

const PORT = Number(process.env.PORT);

const run = async () => {
    try {
        await apiGenerator();
        await DBconnection.initialize();
        app.listen(PORT, () => {
            console.log(`Server works on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
}

run();
