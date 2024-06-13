import generateWords from './generate-words';

interface Image {
  path: string;
  sourceTablet: string;
  sourceMobile: string;
  sourceMobileSm: string;
  alt: string;
}

const images: Image[] = [];

for (let i = 0; i < 5; i++) {
  const image = {
    path: `${process.env.REACT_APP_IMAGE_SERVICE_URL}/1920/740?random=${i}`,
    sourceTablet: `${process.env.REACT_APP_IMAGE_SERVICE_URL}/1279/500?random=${i}`,
    sourceMobile: `${process.env.REACT_APP_IMAGE_SERVICE_URL}/767/360?random=${i}`,
    sourceMobileSm: `${process.env.REACT_APP_IMAGE_SERVICE_URL}/479/360?random=${i}`,
    alt: generateWords(3),
  };
  images.push(image);
}

export default images;
