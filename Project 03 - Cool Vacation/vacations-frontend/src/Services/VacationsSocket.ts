import { io, Socket } from 'socket.io-client'; // npm i socket.io-client
import config from './Config';

class VacationsSocket {

    public socket: Socket;

    public connect(): void {
        // Working 100%
        // this.socket = io("http://localhost:3001");
        if (!this.socket || !this.socket.connected) {
            this.socket = io(config.baseUrl);
            // sessionStorage.setItem('socket', JSON.stringify(this.socket));
        }
    }

    public disconnect(): void {
        // Working 100%
        if (!this.socket || this.socket.disconnected) return;
        // sessionStorage.removeItem('socket');
        this.socket.disconnect();
    }

}

export default VacationsSocket;