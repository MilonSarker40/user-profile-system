"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function ProfilesPage() {
  const { token, logout } = useStore();
  const [profiles, setProfiles] = useState([]);
  const [form, setForm] = useState({ bio: "", avatarUrl: "", coverUrl: "", thumbnailUrl: "" });
  const [editingId, setEditingId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push("/login");
    else loadProfiles();
  }, [token, router]);

  const loadProfiles = async () => {
    try {
      const res = await api.get("/profiles", { headers: { Authorization: `Bearer ${token}` } });
      setProfiles(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) router.push("/login");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/profiles/${editingId}`, form, { headers: { Authorization: `Bearer ${token}` } });
        setEditingId(null);
      } else {
        await api.post("/profiles", form, { headers: { Authorization: `Bearer ${token}` } });
      }
      setForm({ bio: "", avatarUrl: "", coverUrl: "", thumbnailUrl: "" });
      loadProfiles();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (profile) => { 
    setForm(profile);
    setEditingId(profile.userId); 
  };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/profiles/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      loadProfiles();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Profiles Management</h1>
        <button onClick={() => { logout(); router.push("/login"); }} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Profile" : "Create Profile"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" className="border p-2 rounded"/>
          <input type="text" name="avatarUrl" value={form.avatarUrl} onChange={handleChange} placeholder="Avatar URL" className="border p-2 rounded"/>
          <input type="text" name="coverUrl" value={form.coverUrl} onChange={handleChange} placeholder="Cover URL" className="border p-2 rounded"/>
          <input type="text" name="thumbnailUrl" value={form.thumbnailUrl} onChange={handleChange} placeholder="Thumbnail URL" className="border p-2 rounded"/>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">{editingId ? "Update Profile" : "Create Profile"}</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {profiles.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-4 shadow relative">
            <img src={item.coverUrl} alt="" className="w-full h-24 object-cover rounded mb-2" />
            <img src={item.avatarUrl} alt="" className="rounded-full w-20 h-20 mx-auto -mt-10 border-2 border-white" />
            <h2 className="text-center font-bold mt-2">{item.bio}</h2>
            <p className="text-center text-sm text-gray-500">User ID: {item.userId}</p>
            <div className="flex justify-center mt-4 space-x-2">
              <button onClick={() => handleEdit(item)} className="bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(item.userId)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
