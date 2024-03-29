const { io } = require('../server');
const { TicketControl} = require('../classes/ticket-control');

const ticketControl = new TicketControl()

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });

    client.emit('estadoActual',  {
        actual: ticketControl.gertUltimoTicket(),
        ultimos4: ticketControl.gertUltimosCuatro(),
    });

    client.on('atenderTicket', (data, callback) => {
        if(!data.escritorio){
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario',
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        client.broadcast.emit('ultimos4', {ultimos4: ticketControl.gertUltimosCuatro()} );

    });

   

});