import * as express from 'express';
import * as socketIo from 'socket.io';
import { Event } from './constants';
import * as path from "path";
import { createServer, Server } from 'http';
import { DiceInput, DiceOutput, DiceResult } from "./types";

var cors = require('cors');

export class ParadiceServer {
  public static readonly PORT: number = 8080;
  private _app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;
  private connectedUsers: {
    [id: string]: {
      [id: string] : {
        username: string;
        diceTexture: string;
      };
    }
  } = {};

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
      const gameId = socket.handshake.query.game;
      const diceTexture = socket.handshake.query.diceTexture;

      if(!this.connectedUsers[gameId]) {
        this.connectedUsers[gameId] = {};
      }
      this.connectedUsers[gameId][socket.id] = {
        username: username,
        diceTexture: diceTexture,
      }

      console.log(username, gameId);
      socket.join(gameId);

      this.io.in(gameId).emit(Event.USERS_LIST, this.connectedUsers[gameId]);

      socket.on(Event.ROLL, (diceInput: DiceInput) => {
        console.log(diceInput)
        console.log('ROLL: %s', this.connectedUsers[gameId][socket.id]);

        const diceOutput: DiceOutput = {
          dice: [],
          texture: diceInput.texture,
          fontColor: diceInput.fontColor,
          modifier: diceInput.modifier,
          wipe: diceInput.wipe,
          sound: diceInput.sound,
          result: 0
        }

        diceInput.dice.forEach((dice) => {
          const values = Array.from({length: dice.qty}, () => 1 + Math.floor(Math.random() * dice.range))
          const diceResult: DiceResult = {
            ...dice,
            result: values
          };
          diceOutput.dice.push(diceResult);
          diceOutput.result = diceOutput.result + values.map((v) => (dice.factor * v) % dice.mod).reduce((a, b) => a + b, 0);

        });

        if (diceInput.modifier) {
          console.log(11111, diceInput.modifier, parseInt(diceInput.modifier))
          diceOutput.result = diceOutput.result + parseInt(diceInput.modifier);
        }
        console.log(diceOutput);

        this.io.in(gameId).emit(Event.ROLL, socket.id, diceOutput);
      });

      socket.on(Event.DISCONNECT, () => {
        console.log('Client disconnected');
        delete(this.connectedUsers[gameId][socket.id]);
        this.io.in(gameId).emit(Event.USERS_LIST, this.connectedUsers[gameId]);
      });
    });
  }

  get app (): express.Application {
    return this._app;
  }
}