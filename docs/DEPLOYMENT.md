# Deployment

## Frontend: Vercel

1. Push the repository to GitHub.
2. Create a Vercel project from the repo.
3. Set frontend environment variables:
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_API_BASE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Build command: `npm run build`
5. Output: Next.js default.

## Backend: Render

1. Create a Render Web Service.
2. Root directory: `backend`
3. Build command:

```bash
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

4. Start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

5. Set backend environment variables from `backend/.env.example`.

## Database: Supabase

1. Create a Supabase project.
2. Open SQL editor.
3. Run `supabase/schema.sql`.
4. Copy the project URL and anon key into Vercel.
5. Copy the service-role key into Render only.

Never expose the Supabase service-role key in the frontend.
