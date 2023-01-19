import md5 from 'md5';
// Toma los valores de la clave pública y privada desde el archivo .env
import { publicKey, privateKey } from '@env';

const ts = 1;
// Generamos el hash que nos pide la API pasandole como parámetro 
// a la función md5 un string que concatene el ts + privateKey + publicKey
const hash = md5(`${ts}${privateKey}${publicKey}`);
//console.log(hash);
// Exportamos un objeto con los datos necesarios para usar la API
// para que luego podamos importarlo desde cualquier componente
const apiParams = {
  ts,
  apikey: publicKey,
  hash,
	baseURL: 'https://gateway.marvel.com:443'
};

export default apiParams;