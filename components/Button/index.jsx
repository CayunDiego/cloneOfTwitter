import { colors } from "../../styles/theme";

const Button = ({children, onClick, disabled}) => {
    return (
        <>
            <button onClick={onClick} disabled={disabled}>
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
                    user-select: none;
                }

                button > :global(svg){
                    margin-right: 8px;
                }

                button:hover{
                    opacity: .7;
                }

                button[disabled] {
                    opacity: .2;
                    pointer-events: none;
                }
            `}</style>
        </>
    )
}

export default Button;
