import { useEffect, useState } from 'react';
const apiUrl = import.meta.env.VITE_API_HEALTH;

export default function BackendStatus() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch(`${apiUrl}`);
        setIsOnline(res.ok);
      } catch (err) {
        setIsOnline(false);
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-2 left-2 text-xs text-gray-500 bg-white/70 px-2 py-1 rounded shadow">
      <div
        className={`w-3 h-3 rounded-full ${
          isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500 animate-pulse'
        }`}
      ></div>
    </div>
  );
}
