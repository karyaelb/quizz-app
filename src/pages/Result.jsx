function Result({ result }) {
  return (
    <div className="max-w-4xl m-auto flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">Hasil Kuis</h1>
      <div className="space-y-1">
        <p className="text-lg">
          Nama: <strong>{result.name}</strong>
        </p>
        <p className="text-lg">Total Soal: {result.total}</p>
        <p className="text-lg">Benar: {result.correct}</p>
        <p className="text-lg">Salah: {result.wrong}</p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Ulangi Kuis
      </button>
    </div>
  );
}

export default Result;
