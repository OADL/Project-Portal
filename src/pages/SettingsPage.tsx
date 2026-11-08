import { useState } from 'react';
import { readCompactList, saveCompactList } from '../utils/preferences';

export default function SettingsPage() {
  const [compact, setCompact] = useState(readCompactList);

  function handleChange(checked: boolean) {
    setCompact(checked);
    saveCompactList(checked);
  }

  return (
    <>
      <h1>Settings</h1>
      <label>
        <input type="checkbox" checked={compact} onChange={(e) => handleChange(e.target.checked)} /> Compact list
      </label>
    </>
  );
}
