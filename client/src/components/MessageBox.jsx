export default function MessageBox({ message = "Message Box" }) {
  return (
    <div className="py-12 border-2 border-dashed border-black rounded-xl">
      <p className="text-center font-semibold text-2xl">{message}</p>
    </div>
  );
}
