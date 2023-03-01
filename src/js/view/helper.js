// **********************************************************
//           Fetching and getting JSON data                 *
//                                                          *
// **********************************************************

import { timeoutSeconds } from "../config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const fetchpromise = fetch(url);
    const response = await Promise.race([
      fetchpromise,
      timeout(timeoutSeconds),
    ]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
