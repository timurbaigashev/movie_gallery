import { useState } from "react";
import styles from "./search.module.css";

export default function Search({ onSearch, loading }) {
  const [value, setValue] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value.trim());
  }

  return (
    <form className={styles.search} onSubmit={submitHandler}>
      <input
        className={styles.input}
        placeholder="Search movie..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button className={styles.button} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}