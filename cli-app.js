const axios = require('axios');
const cheerio = require('cheerio');
const process = require('process');

// Get command-line arguments
const url = process.argv[2];
const selector = process.argv[3];

// Check if the URL and selector are provided
if (!url || !selector) {
  console.log('Please provide both a URL and a CSS selector.');
  process.exit(1);
}

// Fetch the HTML content of the URL
axios.get(url)
  .then(response => {
    const html = response.data;

    // Load the HTML content into Cheerio
    const $ = cheerio.load(html);

    // Find the element matching the CSS selector
    const selectedElement = $(selector);

    // Check if an element was found
    if (selectedElement.length > 0) {
      // Print the text content of the selected element
      console.log(selectedElement.text());
    } else {
      console.log('No element found matching the provided selector.');
    }
  })
  .catch(error => {
    console.log('Error:', error.message);
  });