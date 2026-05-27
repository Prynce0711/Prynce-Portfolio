/* ── Shared style tokens ─────────────────────────────────────── */
const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "9px 13px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "#e2e8f0",
  fontSize: "13.5px",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  fontFamily: "inherit",
};

const focusStyle = {
  borderColor: "rgba(6,182,212,0.55)",
  boxShadow: "0 0 0 3px rgba(6,182,212,0.10)",
};

const blurStyle = {
  borderColor: "rgba(255,255,255,0.08)",
  boxShadow: "none",
};

const labelStyle = {
  display: "block",
  fontSize: "10.5px",
  fontWeight: 700,
  letterSpacing: "0.13em",
  textTransform: "uppercase",
  color: "#475569",
  marginBottom: "6px",
};

const hintStyle = {
  display: "block",
  fontSize: "11.5px",
  color: "#334155",
  marginTop: "5px",
};

/* ── FieldBlock ────────────────────────────────────────────────── */
export const FieldBlock = ({ label, hint, children }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <span style={labelStyle}>{label}</span>
    {children}
    {hint ? <span style={hintStyle}>{hint}</span> : null}
  </div>
);

/* ── InputField ────────────────────────────────────────────────── */
export const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  hint,
}) => (
  <FieldBlock label={label} hint={hint}>
    <input
      type={type}
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={inputStyle}
      onFocus={(e) => Object.assign(e.target.style, focusStyle)}
      onBlur={(e) => Object.assign(e.target.style, blurStyle)}
    />
  </FieldBlock>
);

/* ── TextAreaField ─────────────────────────────────────────────── */
export const TextAreaField = ({
  label,
  value,
  onChange,
  rows = 4,
  placeholder = "",
  hint,
}) => (
  <FieldBlock label={label} hint={hint}>
    <textarea
      value={value ?? ""}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
      onFocus={(e) => Object.assign(e.target.style, focusStyle)}
      onBlur={(e) => Object.assign(e.target.style, blurStyle)}
    />
  </FieldBlock>
);

/* ── SelectField ───────────────────────────────────────────────── */
export const SelectField = ({
  label,
  value,
  onChange,
  options,
  hint,
  placeholder = "Select an option",
}) => (
  <FieldBlock label={label} hint={hint}>
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      style={{
        ...inputStyle,
        cursor: "pointer",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        paddingRight: "36px",
      }}
      onFocus={(e) => Object.assign(e.target.style, focusStyle)}
      onBlur={(e) => Object.assign(e.target.style, blurStyle)}
    >
      <option value="" style={{ background: "#0f172a" }}>{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} style={{ background: "#0f172a" }}>
          {opt.label}
        </option>
      ))}
    </select>
  </FieldBlock>
);

/* ── RemoveButton ──────────────────────────────────────────────── */
export const RemoveButton = ({ label = "Remove", onClick }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
      padding: "6px 12px",
      borderRadius: "8px",
      border: "1px solid rgba(239,68,68,0.28)",
      background: "rgba(239,68,68,0.08)",
      color: "#fca5a5",
      fontSize: "11.5px",
      fontWeight: 700,
      letterSpacing: "0.07em",
      textTransform: "uppercase",
      cursor: "pointer",
      transition: "background 0.2s, border-color 0.2s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "rgba(239,68,68,0.15)";
      e.currentTarget.style.borderColor = "rgba(239,68,68,0.45)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "rgba(239,68,68,0.08)";
      e.currentTarget.style.borderColor = "rgba(239,68,68,0.28)";
    }}
  >
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
    {label}
  </button>
);

/* ── AddButton ─────────────────────────────────────────────────── */
export const AddButton = ({ label = "Add", onClick }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
      padding: "6px 14px",
      borderRadius: "8px",
      border: "1px solid rgba(6,182,212,0.28)",
      background: "rgba(6,182,212,0.08)",
      color: "#67e8f9",
      fontSize: "11.5px",
      fontWeight: 700,
      letterSpacing: "0.07em",
      textTransform: "uppercase",
      cursor: "pointer",
      transition: "background 0.2s, border-color 0.2s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "rgba(6,182,212,0.15)";
      e.currentTarget.style.borderColor = "rgba(6,182,212,0.45)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "rgba(6,182,212,0.08)";
      e.currentTarget.style.borderColor = "rgba(6,182,212,0.28)";
    }}
  >
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
    {label}
  </button>
);
