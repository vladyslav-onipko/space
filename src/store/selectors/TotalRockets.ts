import { selector } from 'recoil';

import rocketsState from '../atoms/RocketsState';

const totalRockets = selector({
    key: 'totalRockets',
    get: ({get}) => {
        const rockets = get(rocketsState);
        return rockets && rockets.length > 0;
    }
});

export default totalRockets;