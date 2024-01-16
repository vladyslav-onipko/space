import { styled } from 'styled-components';

export const Section = styled.section`
    margin-bottom: 100px;
    position: relative;

    @media (max-width: 1279px) {
        margin-bottom: 80px;
    }

    @media (max-width: 767px) {
        margin-bottom: 60px;
    }
`;