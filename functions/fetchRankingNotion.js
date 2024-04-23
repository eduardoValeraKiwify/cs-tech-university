import { Client } from "@notionhq/client";

const { NOTION_KEY } = process.env;

// Initializing a client
const notion = new Client({
  auth: NOTION_KEY,
})

export const handler = async (event, context) => {
    
    const databaseId = 'aaba5216e5a54359a6dff3bcb103fbb8';
    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            sorts: [
              {
                property: "Nota Final Total",
                direction: "descending"
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
  