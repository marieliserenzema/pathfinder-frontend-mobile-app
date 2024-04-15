const mapDataToHikeModel = (data: any) => {
    return {
        id: data._id,
        hike_id: data.hike_id,
        coordinates: data.geometry.coordinates,
        name: data.properties.name,
        description: data.properties.description,
        distance: data.properties.distance,
        to: data.properties.to,
        from: data.properties.from,
        symbol: data.properties.symbol,
        osmcSymbol: data.properties['osmc-symbol'],
        website: data.properties.website,
        operator: data.properties.operator,
    };
};

export default mapDataToHikeModel;