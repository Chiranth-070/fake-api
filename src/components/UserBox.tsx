export default function UserBox({ input }: { input: string }) {
  return (
    <div className="max-w-[75%] p-2 rounded-lg bg-white text-black shadow">
      <p>{input}</p>
    </div>
  );
}
