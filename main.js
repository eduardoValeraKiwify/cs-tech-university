import './style.css'

async function fetchTeamDataFromAPIEndpoint() {
    const cards = await fetch('/api/fetchTeamNotion').then((res) => res.json().then((data) => data.results))

    document.querySelector("#equipe-tech").innerHTML = cards.map((card) => `
      <div class="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
        <div class="box-member">
          <div class="info-member" style="background-image: url(${card.properties.Imagem.rich_text.length > 0 ? card.properties.Imagem.rich_text[0].plain_text : '/assets/img/kiwify-logo.jpg'}); background-repeat: no-repeat; background-size: cover;">
          
          </div>
        </div>
      </div><!-- End Team Member -->
    `).join('')
}

function defineranking(index) {
  if(index <= 2)
    return 'filter-top-3 filter-top-10'
  if (index <= 9)
    return 'filter-top-10'
  return ''

}

async function fetchRankingDataFromAPIEndpoint() {
  const participants = await fetch('/api/fetchRankingNotion').then((res) => res.json().then((data) => data.results))

  document.querySelector("#ranking").innerHTML = participants.map((participant, index) => `
    <div class="col-lg-12 col-md-6 portfolio-item isotope-item ${defineranking(index)}">
      <div class="portfolio-content box-participant box-participant-${index}">
        <div class="info-participant">
          <div class="info-participant-thumb">
            <img src="${participant.properties['Foto de Perfil'].rich_text.length > 0 ? participant.properties['Foto de Perfil'].rich_text[0].plain_text : '/assets/img/kiwify-logo.jpg'}" class="img-fluid" alt="">
          </div>
          <div class="info-participant-name">
            <h5>${participant.properties.Nome.title[0].plain_text}</h5>
            <span>${participant.properties.Cargo.select.name}</span>
          </div>
          <div class="info-participant-score">
            <h5>Pontuação</h5>
            <span>${participant.properties['Nota Final Total'].formula.number}</span>
          </div>
          
        </div>
        <div class="box-participant-shine"></div>
      </div>
    </div><!-- End Portfolio Item -->
    `).join('')
}

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

fetchTeamDataFromAPIEndpoint()