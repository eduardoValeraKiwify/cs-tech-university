import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

async function fetchDataFromAPIEndpoint() {
    const cards = await fetch('/api/fetchNotion').then((res) => res.json().then((data) => data.results))

    document.querySelector("#app").innerHTML = cards.map((card) => `
        <article>
            <img class="logo" src="${card.properties.Imagem.rich_text[0].href}" alt="Imagem de perfil de ${card.properties.Name.title[0].plain_text}" />
            <h2>${card.properties.Name.title[0].plain_text} - ${card.properties.Email.rich_text[0].plain_text}</h2>
            <p>${card.properties.Descricao.rich_text[0].plain_text}</p>
        </article>
    `).join('')
}

fetchDataFromAPIEndpoint()