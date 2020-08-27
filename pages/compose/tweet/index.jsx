import { useState } from 'react';
import AppLayout from '../../../components/AppLayout';
import Button from '../../../components/Button';
import useUser from '../../../hooks/useUser';
import { addDevit } from '../../../firebase/client';
import { useRouter } from 'next/router';
import Head from 'next/head';

const COMPOSE_STATES = {
    USER_NOT_KNOW: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: -1
}

const ComposeTweet = () => {
    const user = useUser();
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW);
    const router = useRouter();

    const handleChange = e => {
        const { value } = e.target;
        setMessage(value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setStatus(COMPOSE_STATES.LOADING);
        addDevit({
            avatar: user.avatar,
            content: message,
            userId: user.uid,
            userName: user.username
        }).then(()=> {
            router.push('/home');
        }).catch(err => {
            console.log(err);
            setStatus(COMPOSE_STATES.ERROR);
        });
    }

    const isButtonDisabled = !message.length || status ===  COMPOSE_STATES.LOADING;

    return (
        <>
            <AppLayout>
                <Head>
                    <title>Crear un Devit / Devter</title>
                </Head>
                <form onSubmit={handleSubmit}>
                    <textarea 
                        onChange={handleChange}
                        placeholder='¿Qué está pasando?'
                        value={message}
                        ></textarea>
                    <div>
                        <Button
                            disabled={isButtonDisabled}
                        >Devitear</Button>
                    </div>
                </form>
            </AppLayout>
            
            <style jsx>{`
                div{
                    padding: 15px;
                }
                textarea{
                    width: 100%;
                    min-height: 200px;
                    font-size: 21px;
                    border: 0;
                    outline: 0;
                    resize: none;
                    padding: 15px;
                }
            `}</style>
        </>
    )
}

export default ComposeTweet;
