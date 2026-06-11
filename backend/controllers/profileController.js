const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/profile.json');

const getProfile = (req, res) => {
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const profile = JSON.parse(raw);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read profile data.' });
  }
};

const updateProfile = (req, res) => {
  try {
    const updated = req.body;
    const requiredFields = ['name', 'title', 'description', 'phone', 'email', 'location'];
    for (const field of requiredFields) {
      if (!updated[field] || updated[field].trim() === '') {
        return res.status(400).json({ error: `Field "${field}" is required.` });
      }
    }
    const existing = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const merged = { ...existing, ...updated };
    fs.writeFileSync(dataPath, JSON.stringify(merged, null, 2), 'utf-8');
    res.json({ message: 'Profile updated successfully.', profile: merged });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile data.' });
  }
};

module.exports = { getProfile, updateProfile };
