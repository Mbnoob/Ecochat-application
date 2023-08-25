    // App dependencies.................
    require('dotenv').config();
    const router = require('./router/Router');
    const express = require('express');
    const app = express();
    const path = require('path');
    const body_parser = require('body-parser');
    const session = require('express-session');
    const http = require('http').createServer(app)
    const io = require('socket.io')(http)
    const cors = require('cors');
    const registardSchema = require('./schemas/registardSchemas');
    const chats = require('./schemas/chatSchema');

    // All server middleware...............
    app.set('view engine', 'ejs');
    app.use(body_parser.urlencoded({extended:true}));
    app.use(body_parser.json());
    app.use(express.static(path.join(__dirname, "public")));
    app.use(cors());

    // Initialize session .................
    app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
    }));

    // All routers connection................
    app.use('/', router);

    // Socket.io middleware for custom socket ID creation..........
    io.use((socket, next)=>{
    let userId = socket.handshake.auth.token;
    let userName = socket.handshake.auth.userName;
    socket.id = userId;
    socket.username = userName;
    next();
    })

    // Socket.io connection stablish............
    io.on('connection', async(socket)=>{
    function generateToknes(senderid, reciver){
        let key = [senderid, reciver].sort().join('_');
        return key;
    }

    // Fetch messages function execute.............
    async function fetch_messahes(senderid, reciver) {
        let tokens = generateToknes(senderid, reciver);
        const findTokens = await chats.findOne({tokens: tokens}); 
        if (findTokens) {
            io.to(senderid).emit('get_user_messagesAll', findTokens.Allmessages);
        } else {
            let data = {
                tokens: tokens,
                Allmessages:[]
            }
            const saveTokns = new chats(data);
            const createTokens = await saveTokns.save();
            if (createTokens) {
                console.log('tokens are created');
            } else {
                console.log('Error occur');
            }
        };
    };

    // Store messages to database................
    async function savemessages_toDatabase(payload) {
        let tokens = generateToknes(payload.from, payload.to)
        let data = {
            senderId: payload.from,
            senderName: socket.username,
            reciverId: payload.to,
            Recivername: payload.name,
            messages: payload.messages,
            time: payload.time
        };

       let results =  await chats.updateOne({tokens: tokens}, {$push: { Allmessages: data }});
       console.log(results)
    }

    // is online or offline updates...........
    let new_socket_id = socket.id;
    await registardSchema.findByIdAndUpdate({ _id: new_socket_id }, {$set: { is_online: 1, socket_id: new_socket_id }});
    socket.broadcast.emit('userJoined', { user_id : new_socket_id });

    // send messages to target users...........
    socket.on('send-messages-toserver', (payload)=>{
     io.to(payload.to).emit('send_messages-toUsers', payload);
     savemessages_toDatabase(payload);
    });

    // Fetch messages when click...............
    socket.on('fetch-messages',({data})=>{
    fetch_messahes(socket.id, data);
    })


    // Socket.on('images', data=>{
    //     Socket.broadcast.emit('new-images', {data:data.result, name:user[Socket.id], time:data.time});
    // });

    // If disconnect any user..................
    socket.on('disconnect', async()=>{
    await registardSchema.findByIdAndUpdate({ _id: new_socket_id }, {$set: { is_online: 0 }})
        socket.broadcast.emit('userDdisconnected', {user_id : new_socket_id});
    })
    });

    // Server started..............
    http.listen(process.env.PORT, (err)=>{
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running on port: ${process.env.PORT}🤶`);      
    }
    });