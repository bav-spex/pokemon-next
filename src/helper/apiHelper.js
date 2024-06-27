import axios from "axios";

const apiHelper = async (endpoint, method, data, token) => {
  let url = "https://pokeapi.co/api/v2/" + endpoint;

  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export default apiHelper;
