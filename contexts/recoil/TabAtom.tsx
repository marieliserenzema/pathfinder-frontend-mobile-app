import { atom, type RecoilState } from 'recoil';

// @ts-ignore
const tabAtom : RecoilState<string>= atom({
    key: 'tab',
    default: 'map'
});

export default tabAtom;