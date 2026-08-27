BASE_PAYLOAD = {
    "name": "Amina Hassan",
    "phone": "+255 777 123 456",
    "email": "amina@example.com",
    "residence_interest": "2-bedroom",
    "enquiry_type": "request_floor_plans",
    "message": "Please send me the plans.",
    "consent": True,
    "source": "website",
    "company_website": "",
}


def test_create_enquiry(client):
    response = client.post("/api/enquiries", json=BASE_PAYLOAD)
    assert response.status_code == 201
    body = response.json()
    assert body["success"] is True
    assert body["reference_number"].startswith("ONA-")


def test_reject_duplicate_enquiry(client):
    first = client.post("/api/enquiries", json=BASE_PAYLOAD)
    second = client.post("/api/enquiries", json=BASE_PAYLOAD)
    assert first.status_code == 201
    assert second.status_code == 409
    assert second.json()["error"]["code"] == "duplicate_enquiry"


def test_consent_required(client):
    payload = {**BASE_PAYLOAD, "consent": False}
    response = client.post("/api/enquiries", json=payload)
    assert response.status_code == 422


def test_honeypot_submission_not_persisted(client, repository):
    payload = {**BASE_PAYLOAD, "company_website": "https://spam.example"}
    response = client.post("/api/enquiries", json=payload)
    assert response.status_code == 201
    assert response.json()["reference_number"] == "RECEIVED"
    assert len(repository._enquiries) == 0
