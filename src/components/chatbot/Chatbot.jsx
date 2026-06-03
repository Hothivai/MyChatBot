import { useState, useEffect, useRef } from 'react';
import './css/Chatbot.css';
import { productsData } from '../../data/productsData';
import { ChatHeader } from './components/ChatHeader';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { sendChatbotMessage } from './chatbotService';
import { getErrorMessage } from './chatbotPrompt';

export default function Chatbot() {
  // isOpen: chatbot hiện đang mở hay đóng
  const [isOpen, setIsOpen] = useState(false);

  // messages: mảng các tin nhắn hiện tại, bao gồm sender, text và products
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Dạ chào anh/chị! 👋 vai, trợ lý ảo của Fashionshop đã sẵn sàng. Bạn cần tìm quần, áo, váy hay giày để em kiểm tra kho hàng ngay nhé?',
      sender: 'bot',
      products: []
    },
  ]);

  // inputValue: giá trị văn bản mà người dùng đang gõ
  const [inputValue, setInputValue] = useState('');

  // isLoading: trạng thái chờ bot trả lời
  const [isLoading, setIsLoading] = useState(false);

  // messagesEndRef dùng để tự động cuộn xuống cuối danh sách tin nhắn
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    // Nếu ref tồn tại, cuộn đến phần tử này
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Xử lý click vào sản phẩm trên phần chat
  const handleProductClick = (product, event) => {
    event.preventDefault();
    const targetId = `product-${product.id}`;
    const targetElement = document.getElementById(targetId);

    // Nếu sản phẩm đã tồn tại trong danh sách sản phẩm của trang,
    // cuộn tới vị trí của sản phẩm đó và cập nhật URL hash
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.history.replaceState({}, '', `#${targetId}`);
      return;
    }

    // Nếu không tìm thấy phần tử, chỉ đổi hash URL dựa trên link sản phẩm
    const fallbackHash = product.link?.replace(/^\/?#?/, '');
    if (fallbackHash) {
      window.location.hash = fallbackHash;
    }
  };

  // Mỗi khi messages, isLoading hoặc isOpen thay đổi, cuộn xuống cuối danh sách
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isOpen]);

  // Xử lý gửi tin nhắn khi người dùng nhấn Enter hoặc bấm nút gửi
  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Nếu input rỗng hoặc đang chờ bot trả lời thì không làm gì
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;

    // Tạo object tin nhắn của người dùng và thêm vào mảng messages
    const userMessage = { id: Date.now(), text: userText, sender: 'user', products: [] };
    setMessages((prev) => [...prev, userMessage]);

    // Xóa input sau khi gửi và bật trạng thái loading
    setInputValue('');
    setIsLoading(true);

    try {
      const botData = await sendChatbotMessage(userText, productsData);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: botData.text,
          sender: 'bot',
          products: botData.products,
        }
      ]);
    } catch (error) {
      // Nếu xảy ra lỗi, hiển thị tin nhắn lỗi từ bot
      console.error('Chatbot API error:', error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 2, text: getErrorMessage(error), sender: 'bot', products: [] },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Nút mở chatbot hiển thị khi chatbot đang đóng */}
      {!isOpen && (
        <button className="modern-chatbot-toggle" onClick={() => setIsOpen(true)}>
          <div className="toggle-pulse"></div>
          <i className="fa fa-comments" aria-hidden="true"></i>
        </button>
      )}

      {isOpen && (
        <div className="modern-chatbot-container">
          {/* Header chatbot gồm tên và nút đóng */}
          <ChatHeader onClose={() => setIsOpen(false)} />

          {/* MessageList nhận dữ liệu tin nhắn và cả callback xử lý click sản phẩm */}
          <MessageList
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
            onProductClick={handleProductClick}
          />

          {/* ChatInput nhận giá trị input và callback gửi tin nhắn */}
          <ChatInput
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSubmit={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      )}
    </>
  );
}
