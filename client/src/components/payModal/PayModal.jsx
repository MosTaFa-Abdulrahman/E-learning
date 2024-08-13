import "./payModal.scss";

function PayModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2> 😎 برجاء الدفع علي الرقم التالي</h2>
        <p>01018984929</p>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PayModal;
