import { async } from "regenerator-runtime";
import {timeoutSec} from "./config.js"


const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX= async function (url) {
  try {
    const resposne = await Promise.race([fetch(url), timeout(timeoutSec)]);
    const data = await resposne.json();
    if (!resposne.ok) throw new Error (`${data.message} (${res.status})`);
    return data;
  } catch(err) {
    throw err;
  }   
};