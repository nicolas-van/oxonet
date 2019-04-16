
import io from 'socket.io-client';

let socket = null;

export function getSocket() {
  return socket;
};

export function ensureInited() {
  if (socket === null) {
    socket = io();
  }
}