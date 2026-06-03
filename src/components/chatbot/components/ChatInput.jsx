import '../css/ChatInput.css';

// Component ChatInput hiển thị ô nhập và nút gửi phía dưới chatbot
// Nó không giữ trạng thái riêng, mà nhận dữ liệu và callback từ component cha.
export function ChatInput({ inputValue, onInputChange, onSubmit, isLoading }) {
  return (
    <form className="modern-chatbot-input-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="modern-chatbot-input"
        placeholder={isLoading ? 'Đang quét kho hàng...' : 'Nhắn tìm áo khoác, giày, đầm...'}
        value={inputValue}
        // Khi người dùng gõ, gọi onInputChange để component cha cập nhật state
        onChange={(e) => onInputChange(e.target.value)}
        // Nếu bot đang trả lời, không cho nhập tiếp
        disabled={isLoading}
      />
      {/* Nút gửi tin nhắn. Nếu đang load hoặc input trống thì không cho click */}
      <button type="submit" className="modern-chatbot-send-btn" disabled={isLoading || !inputValue.trim()}>
        <i className="fa fa-paper-plane" aria-hidden="true"></i>
      </button>
    </form>
  );
}
