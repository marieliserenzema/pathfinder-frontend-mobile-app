interface HikeModel {
    _id: string;
    hikeId: string;
    coordinates: [number, number][];
    description: string;
    distance: string;
    to: string;
    from: string;
    name: string;
    symbol: string;
    osmcSymbol: string;
    website: string;
    operator: string;
}

export default HikeModel;