"use client";

import { useState } from "react";
import { submitContactForm } from "./actions";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    const result = await submitContactForm(formData);

    if (result.success) {
      setSubmitted(true);
    } else {
      alert(result.error);
    }
  }

  if (submitted) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Terima Kasih!</h2>
        <p>Pesan Anda telah berhasil terkirim.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Hubungi Kami</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block" }}>Nama:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block" }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block" }}>Pesan:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "100%", padding: "8px", height: "100px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 15px", cursor: "pointer" }}>
          Kirim Pesan
        </button>
      </form>
    </div>
  );
}