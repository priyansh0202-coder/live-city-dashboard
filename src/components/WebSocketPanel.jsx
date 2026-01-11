import { useEffect, useState } from "react";
import { createSocketConnection } from "../sockets/socket";

export default function WebSocketPanel() {
    const [status, setStatus] = useState("disconnected");
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const cleanup = createSocketConnection(
            (rawMsg) => {
                try {
                    const data = JSON.parse(rawMsg);
                    setNotifications(prev => [data, ...prev]);
                } catch {
                    
                }
            },
            setStatus
        );

        return cleanup;
    }, []);

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">
                    🔔 Live Notifications
                </h3>

                <span
                    className={`px-3 py-1 rounded-full text-sm ${status === "connected"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                >
                    {status}
                </span>
            </div>

            {/* Notification list */}
            <div className="space-y-3 max-h-48 overflow-y-auto">
                {notifications.length === 0 && (
                    <p className="text-gray-400 text-sm">
                        Waiting for live updates...
                    </p>
                )}

                {notifications.map((n, i) => (
                    <div
                        key={i}
                        className="bg-gray-100 p-3 rounded-lg text-sm"
                    >
                        <p className="font-medium">{n.message}</p>
                        <p className="text-xs text-gray-500">{n.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
