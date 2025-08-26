export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Pago cancelado</h1>
      <p className="text-white">
        El pago fue cancelado. Puedes intentarlo de nuevo cuando quieras.
      </p>
    </div>
  );
}
