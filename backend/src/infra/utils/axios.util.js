const axios = require("axios");

async function fetchAllDataInParallel(baseUrl) {
  const firstPage = await axios.get(baseUrl);
  const totalPages = Math.ceil(
    firstPage.data.count / firstPage.data.results.length
  );

  // Create an array of promises for all pages
  const requests = Array.from({ length: totalPages }, (_, i) =>
    axios.get(`${baseUrl}?page=${i + 1}`)
  );

  // Resolve all promises and flatten the results
  const responses = await Promise.all(requests);
  return responses.flatMap((response) => response.data.results);
}

async function fetchAllInParallel(arr) {
  const requests = arr.map((url) => axios.get(url));
  const responses = await Promise.all(requests);
  return responses.map((response) => response.data);
}

module.exports = { fetchAllDataInParallel, fetchAllInParallel };
