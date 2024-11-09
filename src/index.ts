import express, {Application,Request, Response } from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import { testConnection } from './utils/testConnection';
import cors from 'cors';
import './models/relations';
import { router } from './routes/index.routes';

dotenv.config();

const app:Application = express();
const PORT = process.env.PORT_INDEX || 3000;

app.use(cors())
app.use(express.json());

router(app);

app.get("/", (req: Request, res: Response) => {
  res.send("¡Welcomeeeee to bloomme");
});


const startServer = async () => {
  try {
    await testConnection();
    console.log("Database connected");

    await sequelize.sync();
    console.log("Database synchronized successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();