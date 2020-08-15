import Avatar from '../Avatar';

const Devit = ({avatar, username, message, id}) => {
    return (
        <>
            <article>
                <div>
                    <Avatar src={avatar} alt={username}/>
                </div>
                
                <section>
                    <strong>{username}</strong>
                    <p>{message}</p>
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
            `}</style>
        </>
    )
}

export default Devit;
