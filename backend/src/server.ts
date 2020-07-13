import * as express from 'express';
import * as socketIo from 'socket.io';
import { Event } from './constants';
import * as path from "path";
import { createServer, Server } from 'http';
var cors = require('cors');

export class ParadiceServer {
  public static readonly PORT: number = 8080;
  private _app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;
  private connectedUsers: { [id: string] : string; } = {};

  constructor () {
    this._app = express();
    this.port = process.env.PORT || ParadiceServer.PORT;
    this._app.use(cors());
    this._app.options('*', cors());
    this.server = createServer(this._app);
    this.initSocket();
    this.listen();
  }

  private initSocket (): void {
    this.io = socketIo(this.server);
  }

  private listen (): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

    this._app.get("/", (req: any, res: any) => {
      res.sendFile(path.resolve("./client/public/index.html"));
    });

    this._app.get("/*", (req: any, res: any) => {
        res.sendFile(path.resolve("./client/public" + req.url));
      });

    this.io.on(Event.CONNECT, (socket: any) => {
      console.log('Connected client %s on port %s.', socket.id, this.port);
      const username = socket.handshake.query.username;
      this.connectedUsers[socket.id] = username;
      this.io.emit(Event.USERS_LIST, this.connectedUsers);

      socket.on(Event.ROLL, () => {
        console.log('ROLL: %s', this.connectedUsers[socket.id]);
        this.io.emit(Event.ROLL, socket.id, Math.floor(Math.random() * 20) + 1);
      });

      socket.on(Event.DISCONNECT, () => {
        console.log('Client disconnected');
        delete(this.connectedUsers[socket.id]);
        this.io.emit(Event.USERS_LIST, this.connectedUsers);
      });
    });
  }

  get app (): express.Application {
    return this._app;
  }
}