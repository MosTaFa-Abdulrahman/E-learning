import { useState } from "react";
import VideoModal from "../videoModal/VideoModal";

function CollapsibleSection({ section }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({
    videoUrl: "",
    title: "",
  });

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  const openModal = (videoUrl, title) => {
    setSelectedVideo({ videoUrl, title });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="collapsible-section">
      <div className="section-header" onClick={toggleSection}>
        <h2>{section.title}</h2>
        <span>{isOpen ? "-" : "+"}</span>
      </div>

      {isOpen && (
        <div className="section-content">
          {section?.videos && section?.videos.length > 0 ? (
            section?.videos?.map((video, index) => (
              <div
                key={video._id}
                className="video-title"
                onClick={() =>
                  openModal(video.videoUrl, video.title || `Video ${index + 1}`)
                }
              >
                {video.title || `Video ${index + 1}`}
              </div>
            ))
          ) : (
            <p>No videos available for this section.</p>
          )}
        </div>
      )}

      <VideoModal
        videoUrl={selectedVideo.videoUrl}
        title={selectedVideo.title}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

export default CollapsibleSection;
