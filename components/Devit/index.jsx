import Avatar from '../Avatar';

const Devit = ({id, avatar, userName, content, userId, createdAt}) => {

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
                        <date>{createdAt}</date>
                    </header>
                    <p>{content}</p>
                </section>
            </article>

            <style jsx>{`
                article{
                    border-bottom: 1px solid #eee;
                    display: flex;
                    padding: 10px 15px;
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
