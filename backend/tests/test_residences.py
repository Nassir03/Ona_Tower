def test_list_residences(client):
    response = client.get("/api/residences")
    assert response.status_code == 200
    data = response.json()
    assert [item["slug"] for item in data] == ["2-bedroom", "3-bedroom", "penthouse-3bed", "penthouse-4bed"]


def test_get_residence(client):
    response = client.get("/api/residences/2-bedroom")
    assert response.status_code == 200
    assert response.json()["bedrooms"] == 2


def test_residence_not_found(client):
    response = client.get("/api/residences/unknown")
    assert response.status_code == 404
    assert response.json()["error"]["code"] == "not_found"
