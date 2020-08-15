import AppLayout from '../../components/AppLayout';
import { useState, useEffect } from 'react';
import Devit from '../../components/Devit';

const HomePage = () => {
    const [timeline, setTimeline] = useState([]);

    useEffect(()=>{
        fetch('/api/statuses/home_timeline')
            .then(res => res.json())
            .then(setTimeline);
    },[]);

    return (
        <>
            <AppLayout>
                <header>
                    <h2>Inicio</h2>
                </header>
                <section>
                    {
                        timeline.map((devit) => (
                                <Devit
                                    key={devit.id}
                                    username={devit.username}
                                    avatar={devit.avatar}
                                    message={devit.message}
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
