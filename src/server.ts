import express from "express";
import cors from "cors";
import userRoutes from "./routes/UserRouter";
import postRoutes from "./routes/PostRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});

export default app;