FROM python:3.13-slim

WORKDIR /workspace

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/workspace/backend

COPY backend/requirements.txt /workspace/backend/requirements.txt
RUN python -m pip install --no-cache-dir -r /workspace/backend/requirements.txt

COPY backend /workspace/backend

EXPOSE 8400

CMD ["python", "-m", "uvicorn", "app.main:app", "--app-dir", "backend", "--host", "0.0.0.0", "--port", "8400"]
