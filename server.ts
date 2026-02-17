import app from "./src/app.ts";
import { config } from "./src/config/config.ts";
import connectDB from "./src/config/db.ts";

const startServer = async () => {
    await connectDB();
    const port =  5000;

    app.listen(port, () => {
        console.log(`server running on port ${port}`);
    })

};

startServer();