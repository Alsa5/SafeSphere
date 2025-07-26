import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapPin, Shield, CheckCircle, Map, MoreVertical, Trash2, Share2, Search, PlusCircle } from "lucide-react";

const CrimeReportFeed = () => {
  const [reports, setReports] = useState([]);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  // **Get User Location Automatically**
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({
            latitude: latitude.toFixed(4),
            longitude: longitude.toFixed(4),
          });
        },
        () => {
          setUserLocation({ error: "Location access denied" });
        }
      );
    } else {
      setUserLocation({ error: "Geolocation not supported" });
    }
  }, []);

  // **Handle File Selection**
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // **Handle Upload**
  const handleUpload = async () => {
    if (!file || !caption) {
      alert("Please upload an image and enter a caption.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    formData.append("location", location || `${userLocation?.latitude}, ${userLocation?.longitude}`);

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Server Response:", response.data);

      const newReport = {
        id: reports.length + 1,
        username: "Anonymous",
        location: location || `Lat: ${userLocation?.latitude}, Lng: ${userLocation?.longitude}`,
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
        time: "Just now",
        content: caption,
        image: URL.createObjectURL(file),
        likes: 0,
        comments: 0,
        verified: false,
        legalInfo: response.data.legal_info || null,
      };

      setReports([...reports, newReport]);

      // Reset inputs
      setFile(null);
      setCaption("");
      setLocation("");
      setShowForm(false);
    } catch (error) {
      console.error("Error uploading report:", error);
      alert("Error submitting the report. Please try again.");
    }

    setLoading(false);
  };

  // **Handle Share Report**
  const handleShare = (report) => {
    const shareLink = `https://crime-report-app.com/report/${report.id}`;
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  };

  // **Filter Reports Based on Search Query**
  const filteredReports = reports.filter((report) =>
    report.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    
    <div className="max-w-xl mx-auto text-black">
      {/* Search Bar */}
      <div className="flex items-center mb-4 p-3 bg-white shadow-md rounded-lg">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search crime reports..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ml-2 w-full p-2 outline-none"
        />
      </div>

      {/* Toggle Report Form Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full flex items-center justify-center bg-pink-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        <PlusCircle size={20} className="mr-2" />
        {showForm ? "Close Form" : "Report a Crime"}
      </button>

      {/* Upload Form (Hidden Until Clicked) */}
      {showForm && (
        <div className="mb-6 p-4 border rounded-lg bg-white shadow-md">
          <h2 className="text-lg font-semibold mb-3">Report a Crime</h2>

          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full mb-3 text-black" />

          <input
            type="text"
            placeholder="Enter crime details..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-2 border rounded text-black"
          />

          <input
            type="text"
            placeholder="Enter location (or leave blank for auto)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full mt-2 p-2 border rounded text-black"
          />

          <button
            onClick={handleUpload}
            className="mt-3 w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Report Incident"}
          </button>
        </div>
      )}

      {/* Crime Reports */}
      {filteredReports.map((report) => (
        <div key={report.id} className="mb-6 rounded-lg overflow-hidden bg-white shadow-lg relative">
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <MapPin size={16} className="text-gray-500" />
              <span className="ml-1 text-gray-500">{report.location}</span>
            </div>
            <span className="text-sm text-gray-500">{report.time}</span>

            {/* 3-Dot Menu */}
            <div className="relative">
              <button onClick={() => setMenuOpen(menuOpen === report.id ? null : report.id)}>
                <MoreVertical size={20} className="text-gray-600" />
              </button>
              {menuOpen === report.id && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                  <button onClick={() => handleShare(report)} className="w-full flex items-center px-4 py-2 hover:bg-gray-200">
                    <Share2 size={16} className="mr-2" /> Share
                  </button>
                  <button onClick={() => handleDelete(report.id)} className="w-full flex items-center px-4 py-2 hover:bg-gray-200 text-red-500">
                    <Trash2 size={16} className="mr-2" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <img src={report.image} alt="Crime scene" className="w-full h-64 object-cover" />

          {/* Google Maps Button */}
          {report.latitude && report.longitude && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${report.latitude},${report.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-blue-500 hover:underline flex items-center"
            >
              <Map size={16} className="mr-1 " />
              See in Google Maps
            </a>
          )}

          {/* Legal AI Assistance */}
          {report.legalInfo && (
            <div className="rounded-lg p-3 bg-gray-100 mt-3">
              <div className="flex items-center">
                <Shield size={16} className="text-blue-500" />
                
                {/* Legal AI Assistance */}
{report.legalInfo && (
  <div className="rounded-lg p-5 bg-gray-50 border border-gray-300 shadow-md mt-4">
    {/* Header */}
    <div className="flex items-center gap-3 border-b pb-3 mb-3">
      <Shield size={20} className="text-blue-600" />
      <h3 className="font-semibold text-lg text-gray-800">Legal AI Assistance</h3>
    </div>

    {/* IPC Code & Emergency Alert */}
    <div className="flex justify-between items-center bg-red-50 p-3 rounded-md border-l-4 border-red-600">
      <p className="text-lg font-semibold text-red-700">
        IPC Code: <span className="font-bold">{report.legalInfo?.ipc_code}</span>
      </p>
      <p className="text-sm font-medium text-red-700 flex items-center">
        ⚠️ Report immediately: Call 100 or visit the nearest police station.
      </p>
    </div>

    {/* IPC Code List with Descriptions */}
    {report.legalInfo?.ipc_codes?.length > 0 && (
      <div className="mt-4">
        <h4 className="text-gray-700 font-semibold text-md mb-2">Related Legal Sections:</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          {report.legalInfo?.ipc_codes.map((law, index) => (
            <li key={index} className="bg-blue-50 p-3 rounded-md border border-blue-300 shadow-sm">
              <span className="font-semibold text-blue-700">📌 {law.code}:</span> {law.description}
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Punishment & Next Steps */}
    <div className="mt-4 grid grid-cols-2 gap-4">
      <div className="p-3 bg-gray-100 rounded-md border border-gray-300">
        <h4 className="text-sm font-semibold text-gray-700">Punishment:</h4>
        <p className="text-sm text-gray-800">{report.legalInfo?.punishment}</p>
      </div>
      <div className="p-3 bg-gray-100 rounded-md border border-gray-300">
        <h4 className="text-sm font-semibold text-gray-700">Next Steps:</h4>
        <p className="text-sm text-gray-800">{report.legalInfo?.next_steps}</p>
      </div>
    </div>
  </div>
)}

              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CrimeReportFeed;
 