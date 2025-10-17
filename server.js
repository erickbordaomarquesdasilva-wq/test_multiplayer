// server.js
import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 8080; // Render vai mapear internamente
const wss = new WebSocketServer({ port: PORT });

wss.on('connection', ws => {
    console.log("👤 Jogador conectado");

    ws.on('message', msg => console.log("📩 Mensagem:", msg.toString()));
});

