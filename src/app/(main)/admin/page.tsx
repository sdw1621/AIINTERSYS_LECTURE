"use client";

import { useState } from "react";

type Application = {
  id: string;
  courseTitle: string;
  name: string;
  phone: string;
  email: string;
  organization: string;
  motivation: string;
  createdAt: string;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(
    d.getHours()
  )}:${p(d.getMinutes())}`;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<Application[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load(pw: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/applications", {
        headers: { "x-admin-password": pw },
        cache: "no-store",
      });
      if (res.status === 401) {
        setError("비밀번호가 올바르지 않습니다.");
        setAuthed(false);
        return;
      }
      const data = await res.json();
      setItems(data.items ?? []);
      setAuthed(true);
    } catch {
      setError("데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    load(password);
  }

  function downloadCsv() {
    const header = [
      "접수번호",
      "과정",
      "이름",
      "연락처",
      "이메일",
      "소속",
      "지원동기",
      "접수일시",
    ];
    const rows = items.map((a) => [
      a.id,
      a.courseTitle,
      a.name,
      a.phone,
      a.email,
      a.organization,
      (a.motivation ?? "").replace(/\n/g, " "),
      formatDate(a.createdAt),
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "applications.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!authed) {
    return (
      <main>
        <div className="container admin-login">
          <div className="form-card">
            <h2 style={{ marginTop: 0 }}>관리자 로그인</h2>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>
              접수 현황을 확인하려면 관리자 비밀번호를 입력하세요.
            </p>
            <form onSubmit={handleLogin}>
              {error && <div className="alert error">{error}</div>}
              <div className="field">
                <label htmlFor="pw">비밀번호</label>
                <input
                  id="pw"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
              </div>
              <button className="btn" type="submit" disabled={loading}>
                {loading ? "확인 중…" : "로그인"}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <div>
              <h2 style={{ margin: 0 }}>접수 현황</h2>
              <p style={{ color: "var(--muted)", margin: "4px 0 0" }}>
                총 {items.length}건 접수됨
              </p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="btn secondary"
                onClick={() => load(password)}
                disabled={loading}
              >
                새로고침
              </button>
              <button
                className="btn secondary"
                onClick={downloadCsv}
                disabled={items.length === 0}
              >
                CSV 다운로드
              </button>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="table-wrap">
              <div className="empty">아직 접수된 신청이 없습니다.</div>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>접수번호</th>
                    <th>과정</th>
                    <th>이름</th>
                    <th>연락처</th>
                    <th>이메일</th>
                    <th>소속</th>
                    <th>지원 동기</th>
                    <th>접수일시</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((a) => (
                    <tr key={a.id}>
                      <td>{a.id}</td>
                      <td>{a.courseTitle}</td>
                      <td>{a.name}</td>
                      <td>{a.phone}</td>
                      <td>{a.email}</td>
                      <td>{a.organization || "-"}</td>
                      <td className="motiv">{a.motivation || "-"}</td>
                      <td>{formatDate(a.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
