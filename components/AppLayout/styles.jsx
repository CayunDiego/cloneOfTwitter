import css from 'styled-jsx/css';
import { breakpoints, colors, fonts } from '../../styles/theme';
import { addOpacityToColor } from '../../styles/utils';

const backgroundColor = addOpacityToColor(colors.primary, 0.3);

export const globalStyles = css.global`
    html,
    body {
        background-image:
            radial-gradient(${backgroundColor} 1.5px, transparent 1px),
            radial-gradient(${backgroundColor} 1.5px, transparent 1px);
        background-position: 0 0, 25px 25px;
        background-size: 50px 50px;
        padding: 0;
        margin: 0;
        overflow: hidden;
        font-family: ${fonts.base};
    }
    * {
        box-sizing: border-box;
    }

    textarea, input {
        font-family: ${fonts.base};
    }
`

export default css`
    div{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
    main{
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,.1);
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        position: relative;
        overflow-y: auto;
    }

    @media (min-width: ${breakpoints.mobile}){
        main{
            height: 90vh;
            width: ${breakpoints.mobile};
        }
    }
`