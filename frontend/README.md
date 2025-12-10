# PDF Editor Frontend

A minimal, responsive React-based PDF editor for adding draggable fields to PDFs.

## Setup

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000`

## Features

- PDF upload and viewing
- Drag & drop field placement (Text, Signature, Date, Radio)
- Resizable fields
- Responsive design (desktop, tablet, mobile)
- Digital signing with email validation
- Real-time coordinate conversion
- Aspect ratio preservation for images

## Folder Structure

```
src/
├── api/
│   ├── client.js
│   ├── mutations/
│   └── queries/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── hooks/
├── pages/
├── store/
├── utils/
└── App.jsx
```

## Environment

Create `.env`:
```
VITE_API_BASE_URL=http://localhost:5000/api/v1
```
