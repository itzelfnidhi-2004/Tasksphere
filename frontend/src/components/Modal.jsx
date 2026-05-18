function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          {title}
        </h2>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}

export default Modal;