import './style.css'

async function fetchTeamDataFromAPIEndpoint() {
    const cards = await fetch('/api/fetchTeamNotion').then((res) => res.json().then((data) => data.results))

    document.querySelector("#equipe-tech").innerHTML = cards.map((card) => `
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

async function fetchRankingDataFromAPIEndpoint() {
  const participants = await fetch('/api/fetchRankingNotion').then((res) => res.json().then((data) => data.results))

  document.querySelector("#ranking").innerHTML = participants.map((participant) => `
    <div class="col-lg-3 col-md-6 portfolio-item isotope-item filter-app">
      <div class="portfolio-content h-100 content-participant">
        <img src="${ participant.properties["Foto de Perfil"].rich_text.length !== 0 ? participant.properties["Foto de Perfil"].rich_text[0].href: 'https://yt3.googleusercontent.com/xHTafD9jEMW-QIHYaVN7ANlPEnWXFa3W5Sfsck76GjFRdxixaWWMSJnFftlEA-oQTzHzVSff=s900-c-k-c0x00ffffff-no-rj'}" class="img-fluid" alt="">
        <div class="portfolio-info">
          <h4>Pontuação: ${participant.properties["Nota Final Total"].formula.number}</h4>
          <p>${participant.properties.Nome.title[0].plain_text}</p>
        </div>
      </div>
    </div><!-- End Portfolio Item -->
    `).join('')
}

fetchTeamDataFromAPIEndpoint()

fetchRankingDataFromAPIEndpoint().then(() => {

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