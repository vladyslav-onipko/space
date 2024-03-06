import { styled } from 'styled-components';

import { RocketItem as  RocketItemModel } from '../../models/Rockets';
import Button from '../../ui/Button';

const RocketContainer = styled.article`
    border: 1px solid var(--color-1--1);
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const RocketPicture = styled.picture`
    display: block;
    flex-shrink: 0;
`;

const RokectImage = styled.img`
    display: block;
    height: 296px;
`;

const RocketWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 32px 32px 24px;
`;

const RocketContent = styled.div`
    font-size: 2.4rem;
    text-align: center;
`;

const RocketTitle = styled.h3`
    color: var(--color-gray-secondary);
    font-size: inherit;
    font-weight: 700;
    margin-bottom: 16px;
    text-transform: uppercase;
`;

const RocketTeaser = styled.p`
    color: var(--color-3--3);
    font-size: inherit;
    font-family: var(--typo-2);
    font-weight: 300;
    line-height: 1.2;
    margin-bottom: 65px;
`;

const RocketActions = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: auto;
`;

const ActionButton = styled(Button)`
    flex-grow: 1;
    max-width: 280px;
`;


const RocketItem: React.FC<RocketItemModel> = (props) => {
    return (
        <RocketContainer>
            <RocketPicture>
                <RokectImage src={props.img.path} alt={props.img.alt}></RokectImage>
            </RocketPicture>
            <RocketWrapper>
                <RocketContent>
                    <RocketTitle>{props.name}</RocketTitle>
                    <RocketTeaser>{props.description}</RocketTeaser>
                </RocketContent>
                <RocketActions>
                    <ActionButton>Buy</ActionButton>
                    {props.action}
                </RocketActions>
            </RocketWrapper>
        </RocketContainer>

    );
};

export default RocketItem;