const apiUrl = 'https://api.nobelprize.org/2.1/nobelPrizes';

async function fetchNobelPrizes() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const container = document.querySelector('.container');
    if (!container) {
      throw new Error('.container element not found');
    }

    let row = document.createElement('div');
    row.classList.add('row');

    data.nobelPrizes.forEach(prize => {
      const { awardYear, category } = prize;
      prize.laureates.forEach(laureate => {
        const { orgName, knownName, motivation } = laureate;

        const name = knownName || orgName;

        const card = `
          <div class="col-lg-6">
            <div class="card">
              <div class="card-header">
                ${name.en}
              </div>
              
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><b>Award Year:</b> ${awardYear}</li>
                <li class="list-group-item"><b>Category:</b> ${category.en}</li>
                <li class="list-group-item"><b>Motivation:</b> ${motivation.en}</li>
              </ul>
            </div>
          </div>
        `;

        row.innerHTML += card;

        // Check if two cards have been added to the row
        if (row.children.length === 2) {
          container.appendChild(row);
          row = document.createElement('div');
          row.classList.add('row');
        }
      });
    });

    // Check if there is an additional card in the last row
    if (row.children.length > 0) {
      container.appendChild(row);
    }
  } catch (error) {
    console.log('Error fetching data:', error);
  }
}

fetchNobelPrizes();
