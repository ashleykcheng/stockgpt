import axios from 'axios';

export default function getPrice(ticker) {
  const apiKey = 'ck8gh1pr01qmbnh43psgck8gh1pr01qmbnh43pt0';
  const apiUrl = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`;

  const options = {
    method: 'GET',
    url: apiUrl,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.request(options);
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}



