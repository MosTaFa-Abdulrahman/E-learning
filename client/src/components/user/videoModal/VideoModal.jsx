function VideoModal({ videoUrl, title, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <video
          src={videoUrl}
          title={title}
          className="modal-video"
          controls
          controlsList="nodownload" // Prevents download button
          onContextMenu={(e) => e.preventDefault()} // Prevent right-click
        ></video>

        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}

export default VideoModal;
