# PDF Document Editor & Signing System

A full-stack application for uploading PDFs, adding signature fields, and generating digitally signed documents with complete audit trails.

## 🚀 Live Deployment

**Frontend:** https://assignment-bolo-forms-jxex.vercel.app/

**Backend API:** https://assignmentboloforms-4.onrender.com


1. **Clone the repository**
```bash
git clone https://github.com/Aryankashyap3999/AssignmentBoloForms.git
cd Assignment3
```

2. **Setup Backend**
```bash
cd backend
npm install
```

Create `.env` file with:
```
PORT=5000
DB_URL=your_mongodb_connection_string
AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_BUCKET_NAME=your_bucket_name
NODE_ENV=development
```

Start backend:
```bash
npm run dev
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install
```

Create `.env` file with:
```
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Start frontend:
```bash
npm run dev
```

4. **Access Application**
- Open http://localhost:5173 in your browser
