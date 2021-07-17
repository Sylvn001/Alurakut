import React from 'react';
import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'
function ProfileSidebar(props){
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius: '8px'}}/>
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/sylvn001`}>
          @{props.githubUser}
        </a>
      </p>

      <hr/>

      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {/* {seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'sylvn001'
  const favoritePeoples = ['danielhe4rt','peas', 'riccihenrique', 'ecsbjunior', 'rxngui', 'ing01']

  const [communities, setCommunities] = React.useState([{
    id: 0,
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    creatorlug: githubUser,
  }]);
  const [followers, setFollowers] = React.useState([]);


  React.useEffect(function() {
    fetch('https://api.github.com/users/sylvn001/followers')
    .then(function (response) {
      return response.json();
    })
    .then(function(responseFormated) {
      setFollowers(responseFormated);
    })

    //API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '4ebe0c1d63ce80bb54188f885f9b86',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          image
          creatorslug
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((fullResponse) => {
      const responseData = fullResponse.data.allCommunities;
      console.log(responseData)
      setCommunities(responseData)
    })

  }, [])

  return (
    <>
      <AlurakutMenu/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e){
              e.preventDefault();
              const formData = new FormData(e.target);
              console.log(formData.get('title'));
              console.log(formData.get('image'));

              const comunity = {
                title: formData.get('title'),
                image: formData.get('image'),
                creatorslug: githubUser,
              }

              fetch('/api/communities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunity)
              })
              .then(async (response) => {
                const data = await response.json();
                console.log("JSON RESPONSE: ", data.CommunityData);

                const comunity = data.CommunityData;
                const updateCommunities = [...communities, comunity]
                setCommunities(updateCommunities)
              })
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para o usuarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para o usuarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>

            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBox title="Seguidores" items={followers}/>
        <ProfileRelationsBoxWrapper>
          <ul>
            {communities.map((item) => {
              return (
                <li key={item.id}>
                  <a href={`/users/${item.title}`}  >
                    <img src={item.image} />
                    <span>{item.title}</span>
                  </a>
                </li>
              )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
            Pessoas da comunidade ({favoritePeoples.length})
            </h2>
            <ul>
              {favoritePeoples.map((favitem) => {
                return (
                  <li key={favitem}>
                    <a href={`/users/${favitem}`}>
                      <img src={`https://github.com/${favitem}.png`} />
                      <span>{favitem}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
