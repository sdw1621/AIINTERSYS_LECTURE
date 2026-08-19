"use client";

import { useState } from "react";
import { experienceLabel } from "@/lib/design-course";
import type { DesignApplication } from "@/lib/design-store";

/* Claude Design 특강 사이트 전용 접수 현황 화면.
   메인 사이트 /admin 과 별도의 데이터·비밀번호를 사용합니다. */

export default function DesignAdminPage() {
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<DesignApplication[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/design/applications", {
        headers: { "x-admin-password": password },
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message ?? "조회에 실패했습니다.");
        return;
      }
      setItems(data.items as DesignApplication[]);
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  if (!items) {
    return (
      <main>
        <section className="dc-section">
          <div className="dc-wrap" style={{ maxWidth: 420 }}>
            <p className="dc-kicker">Admin</p>
            <h2>접수 현황</h2>
            <form className="dc-form" onSubmit={load}>
              {error && <div className="dc-alert error">{error}</div>}
              <div className="dc-field">
                <label htmlFor="pw">관리자 비밀번호</label>
                <input
                  id="pw"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <button className="dc-btn block" type="submit" disabled={loading}>
                {loading ? "조회 중…" : "조회하기"}
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="dc-section">
        <div className="dc-wrap">
          <p className="dc-kicker">Admin</p>
          <h2>접수 현황 · 총 {items.length}건</h2>
          {items.length === 0 ? (
            <div className="dc-empty">아직 접수된 신청이 없습니다.</div>
          ) : (
            <div className="dc-table-wrap">
              <table className="dc-table">
                <thead>
                  <tr>
                    <th>접수번호</th>
                    <th>이름</th>
                    <th>연락처</th>
                    <th>이메일</th>
                    <th>소속</th>
                    <th>디자인 경험</th>
                    <th>만들고 싶은 것</th>
                    <th>접수일시</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((a) => (
                    <tr key={a.id}>
                      <td>{a.id}</td>
                      <td>{a.name}</td>
                      <td>{a.phone}</td>
                      <td>{a.email}</td>
                      <td>{a.organization || "-"}</td>
                      <td>{experienceLabel(a.experience)}</td>
                      <td>
                        <div className="goal">{a.goal || "-"}</div>
                      </td>
                      <td>{new Date(a.createdAt).toLocaleString("ko-KR")}</td>
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
