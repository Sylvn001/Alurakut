import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'
function ProfileSidebar(props){
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius: '8px'}}/>
    </Box>
  )
}

export default function Home() {
  const githubUser = 'sylvn001'
  const favoritePeoples = ['danielhe4rt','peas', 'riccihenrique', 'ecsbjunior', 'rxngui', 'ing01']
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
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritePeoples.length})
            </h2>
            <ul>
              {favoritePeoples.map((item) => {
                return (
                  <li>
                    <a href={`/users/${item}`} key={item}>
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
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
