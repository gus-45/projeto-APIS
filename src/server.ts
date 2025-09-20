import express from "express";
import userRoutes from "./routes/UserRouter";
import postRoutes from "./routes/PostRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());

// Rotas
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
