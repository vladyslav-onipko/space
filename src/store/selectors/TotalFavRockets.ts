import { selector } from 'recoil';

import favRocketsState from '../atoms/FavRocketsState';

const totalFavRockets = selector({
    key: 'totalFavRockets',
    get: ({get}) => {
        const rockets = get(favRocketsState);
        return rockets && rockets.length > 0;
    }
});

export default totalFavRockets;