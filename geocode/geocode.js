const request = require("request");

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);

  request(
    {
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    },
    (error, response, body) => {
      if (error) callback("Unable to connect to Google servers.");
      else if (body.status === "ZERO_RESULTS")
        callback("Unable to find that address.");
      else if (body.status === "OK") {
        with (body.results[0]) {
          callback(undefined, {
            Address: formatted_address,
            Latitude: geometry.location.lat,
            Longitud: geometry.location.lng
          });
        }
      }
    }
  );
};

module.exports = {
  geocodeAddress
};
