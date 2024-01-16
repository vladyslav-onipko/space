import { styled } from 'styled-components';

import { ErrorBlock as Error } from "../models/ErrorBlock";

const ErrorContainer = styled.div`
    border: 1px solid var(--color-2--2);
    margin: 0 auto;
    padding: 10px;
    text-align: center;
    width: 50%;
`;

const ErrorTitle = styled.h2`
    font-size: 4.2rem;
    margin-bottom: 15px;
`;

const ErrorMessage = styled.p`
    font-size: 2.8rem;
`;

const ErrorBlock: React.FC<Error> = ({ title, message}) => {
    return (
        <ErrorContainer>
            <ErrorTitle>{title}</ErrorTitle>
            <ErrorMessage>{message || 'Failed to fetch Rockets. Please, try again later.'}</ErrorMessage>
        </ErrorContainer>
    );
};

export default ErrorBlock;