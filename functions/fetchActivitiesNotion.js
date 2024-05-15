import { Client } from "@notionhq/client";

const { NOTION_KEY } = process.env;

// Initializing a client
const notion = new Client({
  auth: NOTION_KEY,
})

export const handler = async (event, context) => {
    
    const databaseId = 'c36b1cdd-b636-4cab-9105-ce5ea56ce947';
    try {
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
  