const axios = require("axios");

const instance = axios.create({
  baseURL: "https://api.github.com/graphql",
});

const setHeaders = (headers) => {
  instance.defaults.headers = headers;
};

module.exports = { instance, setHeaders };
