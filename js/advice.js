class AdviceFetcher {
  constructor() {
    this.apiKey = '85amry7vRDIRrR7ohvckeg==Chjn2dpdxzuorRrT'; // 🔑 Replace with your real API Ninjas key
  }

  async fetchAdvice() {
    try {
      const response = await fetch('https://api.api-ninjas.com/v1/advice', {
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
      return data; // { advice: "Some advice." }
    } catch (error) {
      console.error('Error:', error);
      return { error: error.message };
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('loadAdvice');
  const result = document.getElementById('adviceResult');

  button.addEventListener('click', async () => {
    result.innerHTML = '<p>Loading...</p>';
    const fetcher = new AdviceFetcher();
    const data = await fetcher.fetchAdvice();

    if (data.error) {
      result.innerHTML = `<p class="text-danger">Error: ${data.error}</p>`;
    } else {
      result.innerHTML = `
        <blockquote class="blockquote">
          <p>"${data.advice}"</p>
        </blockquote>
      `;
    }
  });
});
