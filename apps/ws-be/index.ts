//in node we had to use ws external library . this is how bun exposes ws (read about it)

import prisma from "db/client";

Bun.serve({
    port: 8081,
    fetch(req, server) {
      // upgrade the request to a WebSocket
      if (server.upgrade(req)) {
        return; // do not return a Response
      }
      return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
        async message(ws, message) {
            try {
                const user = await prisma.user.create({
                    data: {
                        username: Math.random().toString(),
                        password: Math.random().toString()
                    }
                });
                
                // Send back the created user data
                ws.send(JSON.stringify({
                    status: 'success',
                    user
                }));
            } catch (error) {
                console.error('Failed to create user:', error);
                ws.send(JSON.stringify({
                    status: 'error',
                    message: error instanceof Error ? error.message : 'Failed to create user'
                }));
            }
        },
    },
});
