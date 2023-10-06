import axios from 'axios';


export default function getPrice(ticker) {
  const apiKey = process.env.FINNHUB_API_KEY;
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


