module.exports = async(SENTENCE) => {

  const axios = require(`axios`);
  const BASE_URL = `http://www.google.com/transliterate`;
  
  const options = {
      params: {
        langpair: 'ja-Hira|ja',
        text: SENTENCE
      },
      method: "GET",
      url: BASE_URL,
      headers: {
        'Content-Type': `application/json`,
      }
  };

  try {
    const res = await axios(options);
    return res.data[0][1];
  } catch (e) {
    if (e.response) {
      const {response: {data, status, headers}} = e;
      console.log(data, status, headers);
    } else if (e.request) {
      console.log(e.request);
    } else {
      console.log('Error', e.message);
    }
  }
}