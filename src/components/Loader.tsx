export function Loader({ label = 'Loading...' }: { label?: string }) {
  return <p role="status">{label}</p>;
}
