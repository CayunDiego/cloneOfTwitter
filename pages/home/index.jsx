import AppLayout from '../../components/AppLayout';
import { useState, useEffect } from 'react';
import Devit from '../../components/Devit';
import useUser from '../../hooks/useUser';
import { fetchLatestDevit } from '../../firebase/client';
import Link from "next/link";
import Head from "next/head";
import Create from '../../components/Icons/Create';
import Home from '../../components/Icons/Home';
import Search from '../../components/Icons/Search';
import { colors } from '../../styles/theme';

const HomePage = () => {
    const [timeline, setTimeline] = useState([]);
    const user = useUser();

    useEffect(()=>{
        user && fetchLatestDevit().then(setTimeline);
        // fetch('/api/statuses/home_timeline')
        //     .then(res => res.json())
        //     .then(setTimeline);
    },[user]);

    return (
        <>
            <AppLayout>
                <Head>
                    <title>Inicio / Devter</title>
                </Head>
                <header>
                    <h2>Inicio</h2>
                </header>
                <section>
                    {
                        timeline.map(({id, userName, avatar, content, userId, createdAt}) => (
                                <Devit
                                    key={id}
                                    id={id}
                                    userName={userName}
                                    avatar={avatar}
                                    content={content}
                                    userId={userId}
                                    createdAt={createdAt}
                                />
                            )
                        )
                    }
                </section>
                <nav>
                    <Link href="/home">
                        <a>
                            <Home width={32} height={32} stroke="#09f" />
                        </a>
                    </Link>
                    <Link href="/search">
                        <a>
                            <Search width={32} height={32} stroke="#09f" />
                        </a>
                    </Link>
                    <Link href="/compose/tweet">
                        <a>
                            <Create width={32} height={32} stroke="#09f" />
                        </a>
                    </Link>
                </nav>
            </AppLayout>

            <style jsx>{`
                h2{
                    font-size: 24px;
                    font-weight: 700;
                    padding-left: 15px;
                }
                header{
                    background: #ffffffaa;
                    backdrop-filter: blur(5px);
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #eee; 
                    height: 49px;
                    position: sticky;
                    top: 0;
                    width: 100%;
                }
               
                nav{
                    background: #fff;
                    bottom: 0;
                    height: 49px;
                    border-top: 1px solid #eee; 
                    position: sticky;
                    width: 100%;
                    display: flex;
                }
                nav a{
                    height: 100%;
                    display: flex;
                    flex: 1 1 auto;
                    align-items: center;
                    justify-content: center;
                }
                nav a:hover{
                    background: radial-gradient(#0099ff22 15%, transparent 16%);
                    background-size: 180px 180px;
                    background-position: center;
                }
                nav a:hover > :global(svg){
                    stroke: ${colors.primary};
                }
                section{
                    flex: 1;
                    {/* padding-top: 49px; */}
                }
            `}</style>
        </>
    )
}

export default HomePage;
