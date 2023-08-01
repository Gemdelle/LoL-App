import { readFile } from "node:fs/promises";

export const getPortAndPassword = async () => {
  const lockFile = await readFile('../../../../../../Riot Games/League of Legends/lockfile', { encoding: 'utf8' })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
  const splitted = lockFile.split(':');
  const lcuPort = splitted[2];
  const lcuPassword = splitted[3];

  return { lcuPort, lcuPassword }
}
