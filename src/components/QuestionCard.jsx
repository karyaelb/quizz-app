// src/components/QuestionCard.jsx
function QuestionCard({ question, options, onSelect }) {
  return (
    <div className="max-w-4xl m-auto mb-6">
      <p className="text-lg font-medium mb-4">{question}</p>
      <div className="flex flex-col gap-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(opt)}
            className="border px-4 py-2 rounded hover:bg-gray-200 "
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
