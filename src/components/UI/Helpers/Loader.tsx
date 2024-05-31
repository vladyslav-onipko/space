import { styled } from 'styled-components';

const LoaderEl = styled.div`
  animation: animloaderBack 1s linear infinite alternate;
  background-color: #676f9d;
  background-image: radial-gradient(ellipse at center, #676f9d 34%, #2d3250 35%, #2d3250 54%, #676f9d 55%),
    linear-gradient(#2d3250 10px, transparent 0);
  background-size: 28px 28px;
  background-position: center 20px, center 2px;
  background-repeat: no-repeat;
  border-radius: 50% 50% 0 0;
  border-bottom: 10px solid #2d3250;
  box-sizing: border-box;
  display: block;
  height: 90px;
  margin: 20px auto;
  position: relative;
  width: 32px;

  &::before {
    border-radius: 50%;
    box-shadow: 0px 15px #2d3250 inset;
    box-sizing: border-box;
    content: '';
    height: 44px;
    left: 50%;
    position: absolute;
    top: 67px;
    transform: translateX(-50%);
    width: 64px;
  }

  &::after {
    animation: animloader 1s linear infinite alternate;
    background: radial-gradient(ellipse at center, #ffdf00 8%, rgba(249, 62, 0, 0.6) 24%, rgba(0, 0, 0, 0) 100%);
    background-repeat: no-repeat;
    background-position: -44px -44px;
    background-size: 100px 100px;
    border-radius: 50% 50% 0;
    box-shadow: 4px 4px 12px 0px rgba(255, 61, 0, 0.5);
    box-sizing: border-box;
    content: '';
    height: 34px;
    left: 50%;
    position: absolute;
    top: 112%;
    transform: translateX(-50%) rotate(45deg);
    width: 34px;
  }

  @keyframes animloaderBack {
    0%,
    30%,
    70% {
      transform: translateY(0px);
    }
    20%,
    40%,
    100% {
      transform: translateY(-5px);
    }
  }

  @keyframes animloader {
    0% {
      background-position: -44px -44px;
      background-size: 100px 100px;
      box-shadow: 4px 4px 12px 2px rgba(255, 61, 0, 0.75);
      height: 34px;
      width: 34px;
    }
    100% {
      background-position: -36px -36px;
      background-size: 80px 80px;
      box-shadow: 2px 2px 8px 0px rgba(255, 61, 0, 0.5);
      height: 28px;
      width: 30px;
    }
  }
`;

const Loader: React.FC = () => {
  return <LoaderEl />;
};

export default Loader;
