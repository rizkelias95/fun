// Custom UI feature: Class-based API call with dynamic content rendering

class HoroscopeFetcher {
  constructor(sign) {
    this.sign = sign;
    this.apiKey = '85amry7vRDIRrR7ohvckeg==Chjn2dpdxzuorRrT'; // Your API Key
  }

  async fetchData() {
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/horoscope?zodiac=${this.sign}`, {
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
      console.log(data); // Same as your success function
      return data;
    } catch (error) {
      console.error('Error:', error); // Same as your error callback
      return { error: error.message };
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('zodiacSelect');
  const result = document.getElementById('result');

  select.addEventListener('change', async () => {
    const sign = select.value;
    if (!sign) return;

    result.innerHTML = '<p>Loading...</p>';
    const fetcher = new HoroscopeFetcher(sign);
    const data = await fetcher.fetchData();

    if (data.error) {
      result.innerHTML = `<p class="text-danger">Error: ${data.error}</p>`;
    } else {
      result.innerHTML = `
        <h4>${sign.toUpperCase()}</h4>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Horoscope:</strong> ${data.horoscope}</p>
      `;
    }
  });
});
