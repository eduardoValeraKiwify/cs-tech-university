import { Client } from "@notionhq/client"; //Importando a biblioteca de conexão com a API do Notion

const { NOTION_KEY } = process.env; // Variável de ambiente que contém a API Key para estabelecer comunicação com a API

// Inicialização a conexão com a API do Notion
const notion = new Client({
  auth: NOTION_KEY,
})

export const handler = async (event, context) => {
    
    // ID do board de atividades no Notion
    const databaseId = 'c36b1cdd-b636-4cab-9105-ce5ea56ce947';
    try {
        // Requisição para buscar informações do board filtrando por status Ativo ordenando pela data mais recente
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "Status",
                select: {
                    equals: "Ativo"
                }
            },
            sorts: [
                {
                    property: "Date",
                    direction: "ascending"
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
  