def _headers(client):
    response = client.post(
        "/api/admin/login",
        json={"email": "admin@onatowers.dev", "password": "ona-admin-local"},
    )
    return {"Authorization": f"Bearer {response.json()['token']}"}


def test_public_page_visits_feed_admin_charts(client):
    for path in ["/", "/residences", "/residences", "/enquire"]:
        response = client.post(
            "/api/analytics/visit",
            json={"session_id": "visitor-session-001", "page_path": path},
        )
        assert response.status_code == 201

    # Admin routes are intentionally ignored by public analytics.
    assert client.post(
        "/api/analytics/visit",
        json={"session_id": "visitor-session-001", "page_path": "/admin"},
    ).status_code == 201

    overview = client.get("/api/admin/overview", headers=_headers(client))
    assert overview.status_code == 200
    analytics = overview.json()["analytics"]
    assert analytics["total_visits_30_days"] >= 4
    assert analytics["unique_sessions_30_days"] >= 1
    assert len(analytics["daily"]) == 14
    assert len(analytics["monthly"]) == 12
    assert analytics["top_pages"][0]["path"] == "/residences"
