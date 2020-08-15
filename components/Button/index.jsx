import { colors } from "../../styles/theme";

const Button = ({children, onClick}) => {
    return (
        <>
            <button onClick={onClick}>
                {children}
            </button>

            <style jsx>{`
                button{
                    display: flex;
                    align-items: center;
                    background: ${colors.black};
                    border: 0;
                    color: #fff;
                    cursor: pointer;
                    border-radius: 9999px;
                    font-size: 16px;
                    font-weight: 700;
                    padding: 10px 24px;
                    transition: opacity .3s ease;
                }

                button > :global(svg){
                    margin-right: 8px;
                }

                button:hover{
                    opacity: .7;
                }
            `}</style>
        </>
    )
}

export default Button;
