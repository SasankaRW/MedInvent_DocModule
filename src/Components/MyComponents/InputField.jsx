import "./InputField.css";

export default function InputField({ placeholder, label }) {
  return (
    <div className="input-container">
      <input type="text" className="input-field" placeholder={placeholder} />
    </div>
  );
}
