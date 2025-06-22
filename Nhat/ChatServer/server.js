const WebSocket = require("ws");
const server = new WebSocket.Server({port:4444});

let userList = [
    {
        username: "user1",
        password: "user1*",
        status: "offline",
        socket: null
    },
    {
        username: "user2",
        password: "user2*",
        status: "offline",
        socket: null
    }
];

let messages = [];

server.on('listening', () => {
    console.log('[Server] WebSocket server running on ws://localhost:4444');
});

server.on('connection', socket => {

    socket.on('message', message => {

        const data = JSON.parse(message);

        console.log("[Server] The client sent: " + JSON.stringify(data));

        if(data.type === "login")
        {
            let userMatched = userList.find(
                user => user.username === data.username && user.password === data.password
            );
            if(userMatched)
            {
                userMatched.socket = socket;
                userMatched.status = "online";
                socket.send(JSON.stringify(
                    {
                        type: "info",
                        status: "success"
                    }
                ));
                console.log(`[Server] Sending to the client ${userMatched.username}: ` + JSON.stringify({
                        type: "info",
                        status: "success"
                    }));
            }
            else
            {
                socket.send(JSON.stringify(
                    {
                        type: "info",
                        status: "login fail"
                    }
                ));
                console.log("[Server] Sending to client: " + JSON.stringify({
                        type: "info",
                        status: "login fail"
                    }));
            }
        }
        else if(data.type === "message")
        {
            let fromUserId = data.userId;
            let toUserId = data.recieverId;

            let recieverUser = userList.find(
                user => user.username === data.recieverId
            );

            if(recieverUser)
            {
                messages.push(data);
                console.log("[Server] Sending: " + JSON.stringify({
                        type: "message",
                        userId: data.userId,
                        recieverId: (data.userId.indexOf("1") == -1 ? data.userId.replace("2", "1") : data.userId.replace("1", "2")),
                        content: data.content,
                        time: data.time
                    }));
                recieverUser.socket.send(JSON.stringify(
                    {
                        type: "message",
                        userId: data.userId,
                        recieverId: (data.userId.indexOf("1") == -1 ? data.userId.replace("2", "1") : data.userId.replace("1", "2")),
                        content: data.content,
                        time: data.time
                    }
                ));   
            }
        }
    });
});