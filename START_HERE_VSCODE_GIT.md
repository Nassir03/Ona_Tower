# Start Here in VS Code

## Open the project

Open this folder as your VS Code workspace.

## Backend terminal

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8400
```

Windows PowerShell uses:

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8400
```

## Frontend terminal

```bash
npm install
npm run dev
```

The frontend is fixed to **3020** and the backend to **8400**.

Open `http://127.0.0.1:3020` in your browser.
