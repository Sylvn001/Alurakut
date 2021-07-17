import { SiteClient } from 'datocms-client';

export default async function storeAndShowCommunity(request, response) {
    if(request.method === 'POST') {
      const TOKEN = 'ae83dcc75235717b24f46bcc881a71';
      const client = new SiteClient(TOKEN);

      // Validar os dados, antes de sair cadastrando
      const CommunityData = await client.items.create({
          itemType: "968760", // ID do Model de "Communities" criado pelo Dato
          ...request.body,
      })

      console.log(CommunityData);
      response.json({
        CommunityData: CommunityData,
      })
      return
    }

    response.status(404).json({
        message: 'This URL only accepts POST requests!'
    })
 }