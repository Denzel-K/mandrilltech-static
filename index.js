// Function to get the suffix for the day
function getDaySuffix(day) {
  if (day > 3 && day < 21) return 'th'; 
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

// Function to format the date
function formatDateWithSuffix(dateStr) {
  const date = new Date(dateStr);
  
  // Extract month, day, and year separately
  const options = { month: 'long' };
  const month = new Intl.DateTimeFormat('en-US', options).format(date);
  const day = date.getDate();
  const year = date.getFullYear();
  
  // Construct the final formatted date
  return `${month} ${day}${getDaySuffix(day)}, ${year}`;
}

const fetchData = async () => {
  const response = await fetch('data/projects.json');
  const results = await response.json();
  
  return results;
}

fetchData()
  .then(results => {
    console.log("Promise resolved:", results)

    // Sort the results array by date in descending order
    results.sort((a, b) => new Date(b.publishDate.$date) - new Date(a.publishDate.$date));

    //Render stats dynamically
    let fmOutput = '';
    let webOutput = '';
    let mobileOutput = '';

    for(let i = 0; i < results.length; i++){
      // Format the publishDate using the custom function
      const formattedDate = formatDateWithSuffix(results[i].publishDate.$date);
      
      if (results[i].category === "Frontend Mentor"){
        fmOutput += /*html*/ `
          <div class="p-item">
            <div class="p-image">
              <img src="images/thumbnails/${results[i].thumbnail}" alt="fm">
            </div>

            <div class="p-desc">
              <div class="p_head">
                <span>${formattedDate}</span>

                <div class="p-links">
                  <a href="${results[i].repo}" target="_blank">
                    <img src="images/github.svg" alt="github">
                  </a>
                  <a href="${results[i].liveSite}" target="_blank">
                    <img src="images/link-to.svg" alt="link-to">
                  </a>
                </div>
              </div>

              <h3>${results[i].title}</h3>
            </div>
          </div>
        `;
      }

      else if(results[i].category === "web"){
        webOutput += /*html*/ `
          <div class="p-item">
            <div class="p-image">
              <img src="images/thumbnails/${results[i].thumbnail}" alt="fm">
            </div>

            <div class="p-desc">
              <div class="p_head">
                <span>${formattedDate}</span>

                <div class="p-links">
                  <a href="${results[i].repo}" target="_blank">
                    <img src="images/github.svg" alt="github">
                  </a>
                  <a href="${results[i].liveSite}" target="_blank">
                    <img src="images/link-to.svg" alt="link-to">
                  </a>
                </div>
              </div>

              <h3>${results[i].title}</h3>
            </div>
          </div>
        `;
      }

      else if(results[i].category === "mobile"){
        mobileOutput += /*html*/ `
          <div class="p-item">
            <div class="p-image">
              <img src="images/thumbnails/${results[i].thumbnail}" alt="fm">
            </div>

            <div class="p-desc">
              <div class="p_head">
                <span>${formattedDate}</span>

                <div class="p-links">
                  <a href="${results[i].repo}" target="_blank">
                    <img src="images/github.svg" alt="github">
                  </a>
                  <a href="${results[i].liveSite}" target="_blank">
                    <img src="images/download.svg" alt="link-to">
                  </a>
                </div>
              </div>

              <h3>${results[i].title}</h3>
            </div>
          </div>
        `;
      }
    }

    document.querySelector('#fm').innerHTML = fmOutput;
    document.querySelector('#web').innerHTML = webOutput;
    document.querySelector('#mobile').innerHTML = mobileOutput;
  })
  .catch(err => console.log("Promise rejected: ", err));

window.addEventListener('load', () => {
  //fetch projects
  fetchData();

  //observe screen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        entry.target.classList.add('show')
      }
      else{
        entry.target.calassList.remove('show');
      }
    })
  })

  const hiddenElements = document.querySelectorAll(".hiddenElement");
  hiddenElements.forEach(el => observer.observe(el));
})

//Header behaviour on scroll
document.addEventListener('scroll', () => {
  const header_item = document.querySelector("header");
  
  if (window.scrollY > 0){
    header_item.classList.add('scrolled');
  }
  else{
    header_item.classList.remove('scrolled');
  }
})


//Open menu
const open_menu = document.querySelector('.open-menu');
const close_menu = document.querySelector('.close-menu');
const nav = document.querySelector('nav');

open_menu.addEventListener('click', () => {
  close_menu.classList.remove('hidden');
  open_menu.classList.add('hidden');

  nav.classList.add('nav-active');
})

close_menu.addEventListener('click', () => { 
  close_menu.classList.add('hidden');
  open_menu.classList.remove('hidden');

  nav.classList.remove('nav-active');
})


//Cartegory sidebar
const openSidebar = document.querySelector('.arrow-open');
const sidebar = document.querySelector('.cartegory-sidebar');

openSidebar.onclick = () => {
  sidebar.classList.toggle('openSidebar');
}

//projects in working progress
const fm_li = document.querySelector('.fm_projects');
const web_li = document.querySelector('.web_projects');
const mobile_li = document.querySelector('.mobile_projects');
const desktop_li = document.querySelector('.desktop_projects');
const coming_up = document.querySelector('.coming-up');
const p_grid = document.querySelector('.p-grid');
const project_title = document.querySelector('.project_title');
const full_archive_link = document.querySelector('.full_archive');

function pending(){
  coming_up.classList.remove('hidden');
  full_archive_link.classList.add('hidden');
}
function available(){
  coming_up.classList.add('hidden');
  full_archive_link.classList.add('hidden');
}

fm_li.onclick = () => {
  project_title.textContent = "Frontend Mentor";
  fm_li.style = "background-color: rgb(30, 23, 79)";
  web_li.style = "background: transparent";
  mobile_li.style = "background: transparent";
  desktop_li.style = "background: transparent";
  
  document.querySelector('#mobile').classList.add('hidden');
  document.querySelector('#fm').classList.remove('hidden');
  document.querySelector('#web').classList.add('hidden');
  coming_up.classList.add('hidden');
  full_archive_link.classList.remove('hidden');
}

web_li.onclick = () => {
  project_title.textContent = "Web Projects";
  web_li.style = "background-color: rgb(30, 23, 79)";
  mobile_li.style = "background: transparent";
  desktop_li.style = "background: transparent";
  fm_li.style = "background: transparent";

  document.querySelector('#mobile').classList.add('hidden');
  document.querySelector('#web').classList.remove('hidden');
  document.querySelector('#fm').classList.add('hidden');
  available();
}

mobile_li.onclick = () => {
  project_title.textContent = "Mobile Projects";
  mobile_li.style = "background-color: rgb(30, 23, 79)";
  web_li.style = "background: transparent";
  desktop_li.style = "background: transparent";
  fm_li.style = "background: transparent";

  document.querySelector('#mobile').classList.remove('hidden');
  document.querySelector('#fm').classList.add('hidden');
  document.querySelector('#web').classList.add('hidden');
  available();
}

desktop_li.onclick = () => {
  project_title.textContent = "Desktop Projects";
  desktop_li.style = "background-color: rgb(30, 23, 79)";
  web_li.style = "background: transparent";
  mobile_li.style = "background: transparent";
  fm_li.style = "background: transparent";

  document.querySelector('#mobile').classList.add('hidden');
  document.querySelector('#fm').classList.add('hidden');
  document.querySelector('#web').classList.add('hidden');
  pending();
}