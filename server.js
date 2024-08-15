const express = require('express');
const ping = require('ping');
const app = express();
const port = 3000;

let servidores = [
 //servidores
 { nome: 'Google', ip: 'google.com.br' },
 { nome: 'G1.com', ip: 'G1.com' },
 { nome: 'UCDB.BR', ip: 'ucdb.br' }
];

app.use(express.static('public'));

app.get('/status', async (req, res) => {
    for (let servidor of servidores) {
        const resPing = await ping.promise.probe(servidor.ip);
        servidor.online = resPing.alive;
        servidor.tempoResposta = resPing.time;
    }

    servidores.sort((a, b) => a.online === b.online ? 0 : a.online ? 1 : -1);

    res.json(servidores);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
