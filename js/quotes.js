class QuoteFetcher {
  constructor() {
    this.apiKey = '85amry7vRDIRrR7ohvckeg==Chjn2dpdxzuorRrT';
  }

  async fetchQuote() {
    try {
      const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
        method: 'GET',
        headers: {
          'X-Api-Key': this.apiKey,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data[0]; // Get the first quote from the array
    } catch (error) {
      console.error('Error:', error);
      return { error: error.message };
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('loadQuote');
  const result = document.getElementById('quoteResult');

  button.addEventListener('click', async () => {
    result.innerHTML = '<p>Loading...</p>';
    const fetcher = new QuoteFetcher();
    const data = await fetcher.fetchQuote();

    if (data.error) {
      result.innerHTML = `<p class="text-danger">Error: ${data.error}</p>`;
    } else {
      result.innerHTML = `
        <blockquote class="blockquote">
          <p>"${data.quote}"</p>
          <footer class="blockquote-footer">${data.author}</footer>
        </blockquote>
      `;
    }
  });
});
