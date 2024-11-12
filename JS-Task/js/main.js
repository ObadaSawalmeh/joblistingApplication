const jsonFilePath = 'data.json';
const filterContainer = document.querySelector('.filters');
const filterItems = document.querySelector('.filtersContainer');

function renderData(data) {
  const container = document.querySelector('.container');
  container.innerHTML = '';

  data.forEach(jobListing => {
    const featuredHtml = jobListing.featured ? `<div class="details--featured">Featured</div>` : '';
    const newHtml = jobListing.new ? `<div class="details--new">New!</div>` : '';
    
    const listing = document.createElement('div');
    listing.classList.add('job--listing');
    const highlightHtml = jobListing.featured ?     listing.classList.add('featured'): '';

    listing.innerHTML = `
      <div class="job--listing__logo">
        <img src=".${jobListing.logo}" alt="logo">
      </div>
      <div class="job--listing__details">
        <div class="row">
          <div class="details--company">
            ${jobListing.company}
          </div>
          ${newHtml}
          ${featuredHtml}
        </div>
        <div class="row">
          <div class="details--position">
            ${jobListing.position}
          </div>
        </div>
        <div class="row">
          <p class="details--description">
            ${jobListing.postedAt} <span>•</span>
            ${jobListing.contract} <span>•</span>
            ${jobListing.location}
          </p>
        </div>
      </div>
      <div class="job--listing__tags">
      <button class="job--tag" onclick="showFilters('role', '${jobListing.role}')">${jobListing.role}</button>
      <button class="job--tag" onclick="showFilters('level', '${jobListing.level}')">${jobListing.level}</button>
      ${jobListing.languages.map(lang => `<button class="job--tag" onclick="showFilters('languages', '${lang}')">${lang}</button>`).join('')}
      ${jobListing.tools.map(tool => `<button class="job--tag" onclick="showFilters('tools', '${tool}')">${tool}</button>`).join('')}
      </div>
      `;
    container.appendChild(listing);
  });
}

function showFilters(filterType, filterValue) {
  filterContainer.style.display = 'flex';

  if (!selectedFilters[filterType].includes(filterValue)) {
    selectedFilters[filterType].push(filterValue);
    const item = document.createElement('div');
    item.classList.add('filters--container__filter');
    item.innerHTML = `
        <div class="filter--name">
          ${filterValue}
        </div>
        <div class="filter--remove">
          <img src="./images/icon-remove.svg" alt="removeFilter">
        </div>
    `;

    const removeButton = item.querySelector('.filter--remove');
    removeButton.addEventListener('click', () => {
      item.remove();
      selectedFilters[filterType] = selectedFilters[filterType].filter(value => value !== filterValue);
      renderFilteredData();
      if (Object.values(selectedFilters).every(filters => filters.length === 0)) {
        hideFilters()
      }
    });

    filterItems.append(item);
    renderFilteredData();
  }
}




function renderFilteredData() {
  fetch(jsonFilePath)
    .then(response => response.json())
    .then(data => {
      const filteredData = data.filter(jobListing => {
        let matchesRole = selectedFilters.role.length === 0 || selectedFilters.role.includes(jobListing.role);
        let matchesLevel = selectedFilters.level.length === 0 || selectedFilters.level.includes(jobListing.level);
        let matchesLanguage = selectedFilters.languages.length === 0 || jobListing.languages.some(lang => selectedFilters.languages.includes(lang));
        let matchesTool = selectedFilters.tools.length === 0 || jobListing.tools.some(tool => selectedFilters.tools.includes(tool));

        return matchesRole && matchesLevel && matchesLanguage && matchesTool;
      });

      renderData(filteredData);
    })
    .catch(error => console.error('Error fetching JSON File :3', error));
}

function hideFilters() {
  filterContainer.style.display = 'none';

  filterItems.innerHTML = '';

  selectedFilters = {
    role: [],
    level: [],
    languages: [],
    tools: []
  };

  fetch(jsonFilePath)
    .then(response => response.json())
    .then(data => {
      renderData(data);
    })
    .catch(error => console.error('Error fetching JSON File :3', error));
}

fetch(jsonFilePath)
  .then(response => response.json())
  .then(data => {
    renderData(data);
  })
  .catch(error => console.error('Error fetching JSON File :3', error));

let selectedFilters = {
  role: [],
  level: [],
  languages: [],
  tools: []
};
