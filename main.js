
async function fetchTeamDataFromAPIEndpoint() {
    const cards = await fetch('/api/fetchTeamNotion').then((res) => res.json().then((data) => data.results))

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

fetchTeamDataFromAPIEndpoint()