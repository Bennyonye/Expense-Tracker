import styled, { keyframes } from "styled-components";
import { useWindowSize } from "../../utils/useWindowSize";

function Orb() {
  const { width, height } = useWindowSize();
  console.log(width, height);

  return <OrbStyled width={width} height={height} />;
}

// Move the animation outside the component
const moveOrb = (width: number, height: number) => keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(${width}px, ${height / 2}px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

// Move the styled component outside the function
const OrbStyled = styled.div<{ width: number; height: number }>`
  width: 70vh;
  height: 70vh;
  position: absolute;
  border-radius: 50%;
  margin-left: -37vh;
  margin-top: -37vh;
  background: linear-gradient(180deg, #ff4081 0%, #ffea00 100%);  filter: blur(350px);
  animation: ${(props) => moveOrb(props.width, props.height)} 15s alternate linear infinite;
`;

export default Orb;
