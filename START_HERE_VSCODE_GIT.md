# START HERE — VS CODE + CODEX + GIT

This package is intentionally ready to open directly in VS Code.

## 1. Extract the ZIP

Extract the final ZIP to a normal development folder, for example:

`Documents/Projects/ONA-Towers`

## 2. Open it in VS Code

In VS Code:

`File → Open Folder`

Choose the extracted `ONA_Towers_VSCode_Ready` folder.

You should see:

- `src/`
- `public/ona-assets/`
- `package.json`
- `CODEX_FINAL_PROMPT.md`
- `IMAGE_PLACEMENT_MAP.md`

## 3. Install dependencies

Open VS Code Terminal and run:

```bash
npm install
```

Then run:

```bash
npm run dev
```

The Vite project is configured for port 3000.

## 4. Give Codex the final task

Open VS Code Chat / Codex.

Paste the full contents of:

`CODEX_FINAL_PROMPT.md`

Tell it to work directly in the current workspace.

All final ONA assets are already available in:

`public/ona-assets/`

so Codex does not need you to upload images one-by-one.

## 5. Review before Git push

When Codex finishes, run:

```bash
npm run lint
npm run build
npm run dev
```

Open the site and check it visually.

Do not push until you are happy with the result.

---

# IF YOU ARE CREATING A NEW GITHUB REPOSITORY

After reviewing:

```bash
git init
git add .
git commit -m "Finalize ONA Towers website with verified content and official assets"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the real GitHub URL.

---

# IF A GITHUB REPOSITORY ALREADY EXISTS

The safest workflow is usually to clone the real repository first and copy/merge this project into the correct branch rather than inventing a remote.

If this extracted project itself should become a branch in an existing remote, after confirming the remote URL:

```bash
git init
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git fetch origin
git checkout -b ona-final-site
```

Then stage/commit only after you confirm the project is in the intended repository structure:

```bash
git add .
git commit -m "Finalize ONA Towers website with verified content and official assets"
git push -u origin ona-final-site
```

If the existing repository already has files/branches you must preserve, do NOT force-push. Merge carefully.

---

# RECOMMENDED WORKFLOW

1. Open project in VS Code.
2. `npm install`
3. `npm run dev`
4. Paste `CODEX_FINAL_PROMPT.md` into Codex.
5. Let Codex replace stock images and perform the truth audit.
6. Review visually.
7. `npm run lint`
8. `npm run build`
9. Commit.
10. Push only after review.
