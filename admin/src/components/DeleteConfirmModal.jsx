import { useState } from "react";

export default function DeleteConfirmModal({ onConfirm, onCancel }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    if (!code.trim()) {
      setError("Please enter the delete code.");
      return;
    }
    setDeleting(true);
    setError("");
    try {
      await onConfirm(code);
    } catch (err) {
      setError(err.response?.data?.message || "Incorrect code. Product not deleted.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Confirm Deletion</h2>
        <p className="text-sm text-gray-600">
          Enter the delete code to permanently remove this product.
        </p>
        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          className="w-full border rounded-md px-3 py-2 text-sm"
          autoFocus
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="px-4 py-2 text-sm border rounded-md"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={deleting}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-md disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}