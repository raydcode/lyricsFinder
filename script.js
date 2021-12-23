const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const image = document.getElementById('img');
const error = document.getElementById('error');
const API_URL = 'https://api.lyrics.ovh/';

const dispalyLyrics = async (artist, songTitle) => {
  const response = await fetch(`${API_URL}/v1/${artist}/${songTitle}`);
  const data = await response.json();
  console.log(data);
  const lyrics = data.lyrics.replace(/(\r\n|\r\n)/g, '<br/>');

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>
    `;
};

search.addEventListener('input', (event) => {
  error.innerHTML = '';
});

const displayResults = (response) => {
  const { data } = response;

  result.innerHTML = `
     
  <ul class="songs">
${data
  .map(
    (song) => `<li>
    
    <div>
    
    <strong>${song.artist.name}</strong> - ${song.title}
    
    </div>
    <span data-artist="${song.artist.name}" data-title="${song.title}">Get Lyrics</span>
    
    </li>`
  )
  .join('')}
    
  
  
  
  </ul>
  
  
  `;
};

const getSongLyrics = async (searchValue) => {
  try {
    const searchResult = await fetch(`${API_URL}/suggest/${searchValue}`);

    const response = await searchResult.json();

    displayResults(response);
  } catch (error) {
    alert(error);
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let searchValue = search.value.trim();

  if (!searchValue) {
    error.innerHTML = 'Nothing to search';
  } else {
    getSongLyrics(searchValue);
  }
});

result.addEventListener('click', (e) => {
  const targetElement = e.target;

  if (targetElement.tagName === 'SPAN') {
    const artist = targetElement.getAttribute('data-artist');
    const songTitle = targetElement.getAttribute('data-title');

    dispalyLyrics(artist, songTitle);
  }
});
