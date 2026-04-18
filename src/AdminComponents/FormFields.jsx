const sharedInputClassName =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200";

const labelClassName =
  "text-xs font-semibold uppercase tracking-[0.12em] text-slate-500";

export const FieldBlock = ({ label, hint, children }) => {
  return (
    <label className="flex flex-col gap-2">
      <span className={labelClassName}>{label}</span>
      {children}
      {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
};

export const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  hint,
}) => {
  return (
    <FieldBlock label={label} hint={hint}>
      <input
        type={type}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={sharedInputClassName}
      />
    </FieldBlock>
  );
};

export const TextAreaField = ({
  label,
  value,
  onChange,
  rows = 4,
  placeholder = "",
  hint,
}) => {
  return (
    <FieldBlock label={label} hint={hint}>
      <textarea
        value={value ?? ""}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`${sharedInputClassName} resize-y`}
      />
    </FieldBlock>
  );
};

export const SelectField = ({
  label,
  value,
  onChange,
  options,
  hint,
  placeholder = "Select an option",
}) => {
  return (
    <FieldBlock label={label} hint={hint}>
      <select
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        className={sharedInputClassName}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldBlock>
  );
};

export const RemoveButton = ({ label = "Remove", onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-lg border border-rose-200 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-rose-600 transition hover:bg-rose-50"
    >
      {label}
    </button>
  );
};

export const AddButton = ({ label = "Add", onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-cyan-700 transition hover:bg-cyan-100"
    >
      {label}
    </button>
  );
};
