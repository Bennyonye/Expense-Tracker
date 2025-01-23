import styled from 'styled-components';

interface ButtonProps {
    name: string; // Text for the button
    icon?: React.ReactNode; // Icon or any JSX element
    onClick?: () => void; // Optional click handler
    bg?: string; // Background color
    bPad?: string; // Padding
    color?: string; // Text color
    bRad?: string; // Border radius
}

const Button: React.FC<ButtonProps> = ({ name, icon, onClick, bg, bPad, color, bRad }) => {
    return (
        <ButtonStyled
            style={{
                background: bg,
                padding: bPad,
                borderRadius: bRad,
                color: color,
            }}
            onClick={onClick}
        >
            {icon}
            {name}
        </ButtonStyled>
    );
};

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
`;

export default Button;
