import { readFileSync } from "node:fs";
import https from "node:https"
import { getPortAndPassword } from "./utils/getPortAndPassword.mjs";

const { lcuPort, lcuPassword } = await getPortAndPassword()

const options = {
  host: `127.0.0.1`,
  port: `${lcuPort}`,
  path: '/',
  method: 'GET',
  ca: readFileSync("riotgames.pem"),
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + Buffer(`riot:${lcuPassword}`).toString('base64')
  }
}

https.get({...options, path: '/lol-champions/v1/owned-champions-minimal'}, (res) => {
  console.log('statusCode:', res.statusCode);
  res.setEncoding('utf-8');

  let rawData = '';

  res.on('data', (chunk) => {
    rawData += chunk;
  });

  res.on('end', () => {
    try{
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    }
    catch (e) {
      console.error(e.message);
    }
  })
})
.on('error', (e) => {
  console.error(e);
});

