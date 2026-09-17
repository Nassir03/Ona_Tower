def test_content_endpoints(client):
    amenities = client.get('/api/amenities')
    smart_features = client.get('/api/smart-features')
    location_points = client.get('/api/location-points')

    assert amenities.status_code == 200
    assert smart_features.status_code == 200
    assert location_points.status_code == 200

    assert isinstance(amenities.json(), list)
    assert isinstance(smart_features.json(), list)
    assert isinstance(location_points.json(), list)
