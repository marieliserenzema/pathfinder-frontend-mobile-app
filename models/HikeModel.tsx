interface HikeModel {
  _id: string;
  type: string;
  hike_id: string;
  geometry: {
    type: string;
    coordinates: [number, number][];
  };
  properties: {
    name: string;
    description: string;
    distance: string;
    to: string;
    from: string;
    symbol: string;
    "osmc-symbol": string;
    website: string;
    operator: string;
  };
  bbox: [number, number, number, number];
  stars: number;
}

export default HikeModel;
