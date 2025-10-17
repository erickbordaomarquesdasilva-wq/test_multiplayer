const WebSocket = require('ws');

// Criar servidor WebSocket na porta 8080
const server = new WebSocket.Server({ port: 8080 });

let players = []; // Lista de jogadores conectados (até 6)

// Quando um jogador se conecta
server.on('connection', (socket) => {
    if (players.length >= 6) {
        socket.send(JSON.stringify({ type: "full", message: "Sala cheia!" }));
        socket.close();
        return;
    }

    players.push(socket);
    console.log("Jogador conectado! Total:", players.length);

    // Receber mensagens do jogador
    socket.on('message', (msg) => {
        console.log("Mensagem recebida:", msg.toString());

        // Enviar para todos os outros jogadores
        players.forEach(player => {
            if (player !== socket) {
                player.send(msg.toString());
            }
        });
    });

    // Quando o jogador desconectar
    socket.on('close', () => {
        players = players.filter(p => p !== socket);
        console.log("Jogador desconectado! Total:", players.length);
    });
});

console.log("Servidor WebSocket rodando na porta 8080...");
