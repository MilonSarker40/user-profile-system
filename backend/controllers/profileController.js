import { Profile } from "../models/profile.js";

export const createProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.create({ ...req.body, userId });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProfile = async (req, res) => {
  const profile = await Profile.findOne({ where: { userId: req.params.userId } });
  profile ? res.json(profile) : res.status(404).json({ message: "Profile not found" });
};

export const updateProfile = async (req, res) => {
  const profile = await Profile.findOne({ where: { userId: req.params.userId } });
  if (!profile) return res.status(404).json({ message: "Profile not found" });
  await profile.update(req.body);
  res.json(profile);
};

export const deleteProfile = async (req, res) => {
  const profile = await Profile.findOne({ where: { userId: req.params.userId } });
  if (!profile) return res.status(404).json({ message: "Profile not found" });
  await profile.destroy();
  res.json({ message: "Profile deleted" });
};
