import './style.css'

async function fetchTeamDataFromAPIEndpoint() {
    const cards = await fetch('/api/fetchTeamNotion').then((res) => res.json().then((data) => data.results))

    document.querySelector("#ranking").innerHTML = cards.map((card, index) => `
    <div class="col-lg-12 col-md-6 portfolio-item isotope-item filter-app">
      <div class="portfolio-content h-100 content-participant">
        <img src="${card.properties.Imagem.rich_text[0].plain_text}" class="img-fluid" alt="">
        <div class="portfolio-info">
          <h4>${card.properties.Name.title[0].plain_text}</h4>
          <p>${card.properties.Descricao.rich_text[0].plain_text}</p>
          <a href="/assets/img/portfolio/app-1.jpg" title="App 1" data-gallery="portfolio-gallery-app" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
          <a href="portfolio-details.html" title="More Details" class="details-link"><i class="bi bi-link-45deg"></i></a>
        </div>
      </div>
    </div><!-- End Portfolio Item -->
    `).join('')

    document.querySelector("#equipe-tech").innerHTML = cards.map((card, index) => `
    <div class="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div class="member">
                <img src="${card.properties.Imagem.rich_text[0].plain_text}" class="img-fluid" alt="">
                <div class="member-info">
                  <div class="member-info-content">
                    <h4>${card.properties.Name.title[0].plain_text}</h4>
                    <span>${card.properties.Descricao.rich_text[0].plain_text}</span>
                  </div>
                  <div class="social">
                    <a href=""><i class="bi bi-twitter"></i></a>
                    <a href=""><i class="bi bi-facebook"></i></a>
                    <a href=""><i class="bi bi-instagram"></i></a>
                    <a href=""><i class="bi bi-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div><!-- End Team Member -->
    `).join('')
}

fetchTeamDataFromAPIEndpoint().then(() => {

  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})