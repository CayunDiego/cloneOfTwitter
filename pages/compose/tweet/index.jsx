import { useState, useEffect } from 'react';
import AppLayout from '../../../components/AppLayout';
import Button from '../../../components/Button';
import Avatar from '../../../components/Avatar';
import useUser from '../../../hooks/useUser';
import { addDevit, uploadImage } from '../../../firebase/client';
import { useRouter } from 'next/router';
import Head from 'next/head';

const COMPOSE_STATES = {
    USER_NOT_KNOW: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: -1
}

const DRAG_IMAGE_STATES= {
    ERROR: -1,
    NONE: 0,
    DRAG_OVER: 1,
    UPLOADING: 2,
    COMPLETE: 3
}

const ComposeTweet = () => {
    const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
    const [task, setTask] = useState(null);
    const [imgURL, setImgURL] = useState(null);

    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW);

    const user = useUser();
    const router = useRouter();

    useEffect(() => {
        if(task){
            let onProgress = () => {};
            let onError = () => {};
            let onComplete = () => {
                console.log('onComplete');
                task.snapshot.ref.getDownloadURL().then(setImgURL);
            };

            task.on('state_changed',
            onProgress,
            onError,
            onComplete
            )
        }
    }, [task])

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
            userName: user.username,
            img: imgURL
        }).then(()=> {
            router.push('/home');
        }).catch(err => {
            console.log(err);
            setStatus(COMPOSE_STATES.ERROR);
        });
    }

    const handleDragEnter = e => {
        e.preventDefault();
        setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
    }

    const handleDragLeave = e => {
        e.preventDefault();
        setDrag(DRAG_IMAGE_STATES.NONE);
    }

    const handleDrop = e => {
        e.preventDefault();
        setDrag(DRAG_IMAGE_STATES.NONE);
        console.log(e.dataTransfer.files[0]);
        const file = e.dataTransfer.files[0];
        const task = uploadImage(file);
        setTask(task);
    }

    const isButtonDisabled = !message.length || status ===  COMPOSE_STATES.LOADING;

    return (
        <>
            <AppLayout>
                <Head>
                    <title>Crear un Devit / Devter</title>
                </Head>
                <section className='form-container'>
                    {user &&
                        <section className='avatar-container'>
                            <Avatar src={user.avatar}/>
                        </section>
                    }
                    <form onSubmit={handleSubmit}>
                        <textarea 
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onChange={handleChange}
                            placeholder='¿Qué está pasando?'
                            value={message}
                            ></textarea>
                        {imgURL && <section className='remove-img'>
                                        <button onClick={() => setImgURL(null)}>x</button>
                                        <img src={imgURL} alt="imgURL"/>
                                </section> }
                        <div>
                            <Button
                                disabled={isButtonDisabled}
                            >Devitear</Button>
                        </div>
                    </form>
                </section>
                
            </AppLayout>
            
            <style jsx>{`
                div{
                    padding: 15px;
                }
                .form-container{
                    display: flex;
                    align-items: flex-start;
                }
                .avatar-container{
                    padding-top: 20px;
                    padding-left: 10px;
                }
                .remove-img {
                    position: relative;
                    
                }
                button {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: rgba(0, 0, 0, 0.3);
                    color: #fff;
                    font-size: 24px;
                    border: 0;
                    border-radius: 999px;
                    width: 32px;
                    height: 32px;
                }
                form {
                    padding: 10px;
                }
                img {
                    border-radius: 10px;
                    height: auto;
                    width: 100%;
                }
                textarea{
                    width: 100%;
                    min-height: 200px;
                    font-size: 21px;
                    border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER ? '3px dashed #09f' : '3px solid transparent'};
                    border-radius: 10px;
                    outline: 0;
                    resize: none;
                    padding: 15px;
                }
            `}</style>
        </>
    )
}

export default ComposeTweet;
