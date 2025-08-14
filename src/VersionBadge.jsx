export default function VersionBadge() {
  return (
    <div className="fixed bottom-2 right-2 text-xs text-gray-500 bg-white/70 px-2 py-1 rounded shadow">
      v{__APP_VERSION__}
    </div>
  );
}
