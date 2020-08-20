import AppLayout from '../../components/AppLayout';
import { useState, useEffect } from 'react';
import Devit from '../../components/Devit';
import useUser from '../../hooks/useUser';
import { fetchLatestDevit } from '../../firebase/client';

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
                }
                section{
                    {/* padding-top: 49px; */}
                }
            `}</style>
        </>
    )
}

export default HomePage;
