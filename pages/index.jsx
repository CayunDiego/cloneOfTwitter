import { useState, useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { colors } from '../styles/theme';
import Button from '../components/Button';
import GitHub from '../components/Icons/GitHub';
import { loginWithGitHub, onAuthStateChanged } from '../firebase/client';
import { useRouter } from 'next/router';

const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOW: undefined,
}

export default function Home() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOW);

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(setUser);
  },[]);

  useEffect(()=>{
    user && router.replace('/home');
  },[user]);

  const handleClick = () => {
    loginWithGitHub().catch(err => {
        console.log(err);
    })
  }

  return (
    <>
      <Head>
        <title>devter 😜😜</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <img src='/dev.svg' alt='logo'/>
          <h1>Devter</h1>
          <h2>Talk about development <br/> with developers 👩‍💻</h2>
          <div>
            {
              user === USER_STATES.NOT_LOGGED && <Button onClick={handleClick}>
                                <GitHub fill='#fff' width={24} height={24}/>
                                Login with GitHub
                              </Button>
                            
            }
            {
              user === USER_STATES.NOT_KNOW && <span>loading...</span>
            }
          </div>
        </section>
      </AppLayout>


      <style jsx>{`
        img{
          width: 180px;
        }

        section{
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        div{
          margin-top: 16px;
        }

        h1{
          color: ${colors.secondary};
          font-weight: 800;
          margin-bottom: 0px;
        }
        h2{
          color: ${colors.primary};
          font-size: 16px;
          margin: 0;
        }
      `}</style>
    </>
  )
}
