import { Client } from "@notionhq/client"; //Importando a biblioteca de conexão com a API do Notion

const { NOTION_KEY } = process.env; // Variável de ambiente que contém a API Key para estabelecer comunicação com a API

// Inicialização a conexão com a API do Notion
const notion = new Client({
  auth: NOTION_KEY,
})

export const handler = async (event, context) => {
    
    // ID do board de atividades no Notion
    const databaseId = 'aaba5216e5a54359a6dff3bcb103fbb8';
    try {
        // Requisição para buscar informações do board filtrando ordenando pela Nota Final Total
        const response = await notion.databases.query({
            database_id: databaseId,
            sorts: [
              {
                property: "Nota Final Total",
                direction: "descending"
            }
          ]
        })
    
        // Recebendo e retornando as informações do board
        return {
          body: JSON.stringify(response),
          statusCode: 200
        };
    } catch(e) {
        console.error(e)
        return {
            statusCode: 500,
            body: e.toString()
        }
    }
  };
  