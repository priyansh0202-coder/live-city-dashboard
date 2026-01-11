export const createSocketConnection = (
    onMessage,
    onStatusChange
) => {
    let socket;
    let interval;

    const connect = () => {
        socket = new WebSocket("wss://ws.ifelse.io");

        socket.onopen = () => {
            onStatusChange("connected");
            interval = setInterval(() => {
                const event = {
                    type: "CITY_EVENT",
                    message: "Weather updated for your city",
                    time: new Date().toLocaleTimeString(),
                };

                socket.send(JSON.stringify(event));
            }, 5000);
        };

        socket.onmessage = (event) => {
            onMessage(event.data);
        };

        socket.onclose = () => {
            onStatusChange("disconnected");
            clearInterval(interval);
            setTimeout(connect, 2000); 
        };

        socket.onerror = () => socket.close();
    };

    connect();

    return () => {
        clearInterval(interval);
        socket && socket.close();
    };
};
