// server/index.js (The new Express/MongoDB server)
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; 
const FRONTEND_URL = 'http://localhost:5173'; 

const studentResults = { 
    name: "Jerine Joshwa", // Used for profile
    id: "23becy018",      // Used for profile
    // ... semesters array ...
};

// --- Middleware Setup ---
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());

// --- 1. MongoDB Connection ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully.'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- 2. Define Mongoose Schema (Example: Results) ---
const ResultSchema = new mongoose.Schema({
    name: String,
    id: String,
    semesters: [{ semester: String, gpa: Number, subjects: Array }]
}, { collection: 'results' }); // Explicitly name the collection

const Result = mongoose.model('Result', ResultSchema);


// --- 3. API Routes (Real Data Fetch) ---

// Route for Results
app.get('/api/results', async (req, res) => {
    try {
        // Fetch the first document from the 'results' collection
        const data = await Result.findOne({}); 
        if (!data) {
            return res.status(404).json({ message: "Student data not found in DB." });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data.", error: error.message });
    }
});

// Route for Assignments (You'll add this structure for assignments, attendance, etc.)
app.get('/api/assignments', (req, res) => {
    // ⚠️ TODO: Implement Mongoose logic to fetch assignments here
    res.status(200).json([]); 
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`🚀 Backend server listening on port ${PORT}`);
});