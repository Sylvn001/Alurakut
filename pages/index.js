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
  const [communities, setCommunities] = React.useState([{
    id: 0,
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
  }]);
  const [followers, setFollowers] = React.useState([]);

  const favoritePeoples = ['danielhe4rt','peas', 'riccihenrique', 'ecsbjunior', 'rxngui', 'ing01']
  const githubUser = 'sylvn001'

  React.useEffect(function() {
    fetch('https://api.github.com/users/sylvn001/followers')
    .then(function (response) {
      return response.json();
    })
    .then(function(responseFormated) {
      setFollowers(responseFormated);
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
                id: new Date().toISOString(),
                title: formData.get('title'),
                image: formData.get('image'),
              }

              const updateCommunities = [...communities, comunity]
              setCommunities(updateCommunities)
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
