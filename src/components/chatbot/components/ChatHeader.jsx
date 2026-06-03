import '../css/ChatHeader.css';

// Component ChatHeader chỉ hiển thị phần đầu của cửa sổ chatbot
// Nó nhận prop onClose từ component cha để đóng chatbot khi click nút x.
export function ChatHeader({ onClose }) {
  return (
    <div className="modern-chatbot-header">
      <div className="header-info">
        <div className="avatar-wrapper">
          {/* Icon logo hoặc avatar của trợ lý */}
          <i className="icon_bag_alt"></i>
          {/* Dấu chấm online hiển thị trạng thái bot đang trực tuyến */}
          <span className="online-badge"></span>
        </div>
        <div className="title-text">
          {/* Tên bot */}
          <span className="name">TRỢ LÝ FASHIONSHOP</span>
          {/* Hiển thị trạng thái online */}
          <span className="status">Trực tuyến</span>
        </div>
      </div>
      {/* Nút đóng chatbot, gọi onClose khi bấm */}
      <button className="modern-chatbot-close-btn" onClick={onClose} aria-label="Close chatbot">
        <i className="icon_close"></i>
      </button>
    </div>
  );
}
