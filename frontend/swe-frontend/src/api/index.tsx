const socket = new WebSocket("ws://localhost:3000/ws");

const Connect = () => {
  console.log("Attempting Connection...");

  socket.onopen = () => {
    console.log("Successfully Connected");
  };    

  socket.onmessage = (msg: MessageEvent) => {
    console.log(msg.data);
  };

  socket.onclose = (event: CloseEvent) => {
    console.log(`Socket Closed Connection: ${event}`);
  };

  socket.onerror = (error: Event) => {
    console.log(`Socket Error: ${error}`);
  };
};

const SendMessage = (msg: string) => {
  console.log(`Sending msg: ${msg}`);
  socket.send(msg);
};

export { Connect, SendMessage }