import Avatar from '../Avatar';
import useTimeAgo from '../../hooks/useTimeAgo';

const Devit = ({id, img, avatar, userName, content, userId, createdAt}) => {
    const timeago = useTimeAgo(createdAt);

    return (
        <>
            <article>
                <div>
                    <Avatar src={avatar} alt={userName}/>
                </div>
                
                <section>
                    <header>
                        <strong>{userName}</strong>
                        <span> · </span>
                        <date>{timeago}</date>
                    </header>
                    <p>{content}</p>
                    {img && <img src={img} alt={img}/> }
                </section>
            </article>

            <style jsx>{`
                article{
                    border-bottom: 1px solid #eee;
                    display: flex;
                    padding: 10px 15px;
                }
                img{
                    height: auto;
                    width: 100%;
                    border-radius: 10px;
                    margin-top: 10px;
                }
                div{
                    margin-right: 10px;
                }
                p{
                    line-height: 1.3125;
                    margin: 0;
                }
                date{
                    color: #555;
                    font-size: 14px;
                }
            `}</style>
        </>
    )
}

export default Devit;
