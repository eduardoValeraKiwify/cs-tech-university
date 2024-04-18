async function fetchTeamDataFromAPIEndpoint() {
    const cards = await fetch('/api/fetchTeamNotion').then((res) => res.json().then((data) => data.results))

    document.querySelector("#ranking").innerHTML = cards.map((card, index) => `
    <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
      <div class="portfolio-content h-100">
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

    AOS.refreshHard()
    console.log('refresh')
}

fetchTeamDataFromAPIEndpoint()