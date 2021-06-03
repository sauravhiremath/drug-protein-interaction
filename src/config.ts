import mysql from 'serverless-mysql';
import consola from 'consola';
import path from 'path';

export const DOCKER_HOST_IP = `route -n | awk '/UG[ \t]/{print $2}'`;

export const conn = mysql({
  config: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bioDB',
    multipleStatements: true,
  },
  onConnect: () => consola.success('MySQL connected'),
  onConnectError: () => consola.error('error connecting...'),
  onClose: () => consola.warn('MySQL connection closed'),
});

export const __getDirectory = (...args: Array<string>) => path.resolve(process.cwd(), ...args);
