import './style.css'

async function fetchActivitiesDataFromAPIEndpoint() {
  const activities = await fetch('/api/fetchActivitiesNotion').then((res) => res.json().then((data) => data.results))

  if(activities.length > 0) {
    document.querySelector("#atividades-botoes").innerHTML = activities.map((activity, index) => `
      <button ${!activity.properties.Liberado.checkbox ? 'disabled': ''} class="atv-btn" onclick="menuToggle(${index + 1})">${activity.properties.Name.title.length > 0 ? activity.properties.Name.title[0].plain_text : 'Atividade'}</button>
    `).join('')

    document.querySelector("#overlay-atv-ref").insertAdjacentHTML("afterend", activities.map((activity, index) => `
    ${!activity.properties.Liberado.checkbox? `
      <div id="overlay-atv${index + 1}" style="background-image: url('') background-size: cover; background-position: center;">
        <div id="toggleIcon1" onclick="">
          <div class="close-btn bi bi-x-square"></div>
        </div>
        <div class="container-atividade">
          <div class="row">
          <div class="img-title col-sm">
              <img src="" alt="">
              <h3>Texto</h3>
          </div>
          <div class="descricao-atividade col-sm">
              <p>Texto</p>
          </div>
          <div class="prazos col-sm">
              <h3>Período da atividade</h3>
              <p>Inicio: 00/00</p>
              <p>Final: 00/00</p>
              <a href="#">Clique aqui para começar a missão</a>
          </div>
          </div>
        </div>
      </div>
    ` : `
      <div id="overlay-atv${index + 1}" style="background-image: url('${activity.properties.Imagem.rich_text.length > 0 ? activity.properties.Imagem.rich_text[0].plain_text : ''}') background-size: cover; background-position: center;">
        <div id="toggleIcon1" onclick="menuToggle(${index + 1})">
          <div class="close-btn bi bi-x-square"></div>
        </div>
        <div class="container-atividade">
          <div class="row">
          <div class="img-title col-sm">
              <img src="${activity.properties.Imagem.rich_text.length > 0 ? activity.properties.Imagem.rich_text[0].plain_text : ''}" alt="">
              <h3>${activity.properties.Titulo.rich_text.length > 0 ? activity.properties.Titulo.rich_text[0].plain_text : 'Texto'}</h3>
          </div>
          <div class="descricao-atividade col-sm">
              <p>${activity.properties.Texto.rich_text.length > 0 ? activity.properties.Texto.rich_text[0].plain_text.replace(/\n/g, '</p><p>') : 'Texto'}</p>
          </div>
          <div class="prazos col-sm">
              <h3>Período da atividade</h3>
              <p>Inicio: ${activity.properties['Data de início'].rich_text.length > 0 ? activity.properties['Data de início'].rich_text[0].plain_text : '00/00'}</p>
              <p>Final: ${activity.properties['Data de fim'].rich_text.length > 0 ? activity.properties['Data de fim'].rich_text[0].plain_text : '00/00'}</p>
              <a href="${activity.properties.Link.url !== null ? activity.properties.Link.url : '#'}">Clique aqui para começar a missão</a>
          </div>
          </div>
        </div>
      </div>
    `}
    `).join(''))
  }
}

// async function fetchActivityDataFromAPIEndpoint(activity_id) {
//   const activity = await fetch('/api/fetchActivityNotion', 
//     { 
//       method: 'POST', 
//       body: JSON.stringify({ id: activity_id })
//   })
// }

function defineranking(index) {
  if(index <= 2)
    return 'filter-top-3 filter-top-10'
  if (index <= 9)
    return 'filter-top-10'
  return ''

}

async function fetchRankingDataFromAPIEndpoint() {
  const participants = await fetch('/api/fetchRankingNotion').then((res) => res.json().then((data) => data.results))

  if (participants.length > 0) {

    document.querySelector("#ranking").innerHTML = participants.map((participant, index) => `
      <div class="col-lg-12 col-md-6 portfolio-item isotope-item ${defineranking(index)}">
        <div class="portfolio-content box-participant box-participant-${index}">
          <div class="info-participant">
            <div class="info-participant-thumb">
              <img src="${participant.properties['Foto de Perfil'].rich_text.length > 0 ? participant.properties['Foto de Perfil'].rich_text[0].plain_text : '/assets/img/kiwify-logo.jpg'}" class="img-fluid" alt="">
            </div>
            <div class="info-participant-name">
              <h5>${participant.properties.Nome.title.length > 0 ? participant.properties.Nome.title[0].plain_text: 'Partipante'}</h5>
              <span>${participant.properties.Cargo.select !== null ? participant.properties.Cargo.select.name : 'CS'}</span>
            </div>
            <div class="info-participant-score">
              <h5>Pontuação</h5>
              <span>${participant.properties['Nota Final Total'].formula.number}</span>
            </div>
            <div class="info-participant-achievements">
              <h5>Conquistas desbloqueadas</h5>
              <div class="achievements">
                <span class="achievement achievement-1 ${!participant.properties.Achievement1.checkbox ? 'achievement-disabled' : ''}"></span>
                <span class="achievement achievement-2 ${!participant.properties.Achievement2.checkbox ? 'achievement-disabled' : ''}"></span>
                <span class="achievement achievement-3 ${!participant.properties.Achievement3.checkbox ? 'achievement-disabled' : ''}"></span>
                <span class="achievement achievement-4 ${!participant.properties.Achievement4.checkbox ? 'achievement-disabled' : ''}"></span>
              </div>
            </div>
          </div>
          <div class="box-participant-shine"></div>
        </div>
      </div><!-- End Portfolio Item -->
    `).join('')

  }
}

async function fetchTeamDataFromAPIEndpoint() {
  const cards = await fetch('/api/fetchTeamNotion').then((res) => res.json().then((data) => data.results))

  document.querySelector("#equipe-tech").innerHTML = cards.map((card) => `
    <div class="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
      <div class="box-member">
        <div class="info-member" style="background-image: url(${card.properties.Imagem.rich_text.length > 0 ? card.properties.Imagem.rich_text[0].plain_text : '/assets/img/kiwify-logo.jpg'}); background-repeat: no-repeat; background-size: cover;">
          <div class="info-member-name">
            <h5>${card.properties.Name.title[0].plain_text}</h5>
          </div>
        </div>
      </div>
    </div><!-- End Team Member -->
  `).join('')
}

fetchActivitiesDataFromAPIEndpoint()

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