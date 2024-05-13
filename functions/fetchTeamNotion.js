import { Client } from "@notionhq/client";

const { NOTION_KEY } = process.env;

// Initializing a client
const notion = new Client({
  auth: NOTION_KEY,
})

export const handler = async (event, context) => {
    
    const databaseId = '83aa83f3b6f145f3a00e676d75608f38';
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
                    property: "Name",
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
  