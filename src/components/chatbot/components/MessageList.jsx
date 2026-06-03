import '../css/MessageList.css';

// Component MessageList hiển thị toàn bộ các tin nhắn và sản phẩm trong chatbot.
// Nó nhận dữ liệu messages từ component cha và xử lý hiển thị theo sender.
export function MessageList({ messages, isLoading, messagesEndRef, onProductClick }) {
  return (
    <div className="modern-chatbot-messages">
      {/* messages là mảng tin nhắn. Duyệt từng phần tử msg trong messages */}
      {messages.map((msg) => (
        <div key={msg.id} style={{ width: '100%' }}>
          {/* modern-message-row + msg.sender tạo ra class "modern-message-row bot" hoặc "modern-message-row user" */}
          <div className={"modern-message-row " + msg.sender}>
            {/* Nếu tin nhắn đến từ bot thì hiển thị avatar */}
            {msg.sender === 'bot' && (
              <div className="bot-msg-avatar">
                <i className="fa fa-user-circle-o"></i>
              </div>
            )}

            {/* Hiển thị nội dung text của tin nhắn */}
            <div className="modern-message-bubble">{msg.text}</div>
          </div>

          {/* Nếu tin nhắn bot có mảng products, hiển thị danh sách sản phẩm */}
          {msg.sender === 'bot' && msg.products && msg.products.length > 0 && (
            <div className="chatbot-products-carousel">
              {msg.products.map((product) => (
                <a
                  href={product.link}
                  key={product.id}
                  className="chatbot-product-card"
                  // Khi click sản phẩm, gọi callback từ component cha để xử lý cuộn trang
                  onClick={(e) => onProductClick(product, e)}
                >
                  <div className="product-card-img-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      // Nếu ảnh sản phẩm bị lỗi không tải, thay bằng ảnh mặc định
                      onError={(e) => { e.target.src = 'https://placehold.co/150x150?text=Fashion'; }}
                    />
                  </div>
                  <div className="product-card-info">
                    <span className="product-card-name">{product.name}</span>
                    <span className="product-card-price">{product.price}</span>
                    <span className="product-card-action">
                      Xem ngay <i className="fa fa-chevron-right"></i>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Nếu bot đang trả lời thì hiển thị thanh chờ loading */}
      {isLoading && (
        <div className="modern-message-row bot">
          <div className="bot-msg-avatar">
            <i className="fa fa-user-circle-o"></i>
          </div>
          <div className="modern-message-bubble loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}

      {/* Phần tử này dùng để cuộn xuống cuối khi có tin nhắn mới */}
      <div ref={messagesEndRef} />
    </div>
  );
}
