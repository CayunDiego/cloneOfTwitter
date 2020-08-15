import {useState} from 'react';
import AppLayout from '../../../components/AppLayout';
import Button from '../../../components/Button';

const ComposeTweet = () => {
    const [user, setUser] = useState();

    return (
        <>
            <AppLayout>
                <form>
                    <textarea placeholder='¿Qué está pasando?'></textarea>
                    <div>
                        <Button>Devitear</Button>
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
