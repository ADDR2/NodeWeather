const request = require("request");

const getWeather = ({ Latitude, Longitud }, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/081fa797a05f45eb541fdc030d86969b/${Latitude},${Longitud}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200)
        callback(undefined, {
          Temperature: body.currently.temperature
        });
      else callback("Unable to fetch weather.");
    }
  );
};

module.exports = {
  getWeather
};
