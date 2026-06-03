# Chatbot Feature

This document describes the chatbot feature in the `src/components/chatbot` folder. It explains the feature purpose, how it works, setup requirements, and where to change behavior.

## Mục đích

Chatbot là một trợ lý ảo bán hàng cho Fashionshop. Nó cho phép người dùng gõ câu hỏi, nhận câu trả lời bằng AI và xem sản phẩm liên quan trong kho hàng hiện tại.

## Cấu trúc chính

- `Chatbot.jsx`
  - Component chính quản lý trạng thái, danh sách tin nhắn, loading và mở/đóng chatbot.
  - Kết nối UI với service xử lý API.
- `chatbotPrompt.js`
  - Chứa hệ thống prompt và schema trả về cho mô hình AI.
  - Cung cấp hàm `getErrorMessage` để hiển thị thông báo lỗi thân thiện.
- `chatbotService.js`
  - Chứa logic gọi API Gemini từ Google Generative AI.
  - Chuẩn hóa dữ liệu phản hồi và đảm bảo `link` sản phẩm đúng định dạng `#product-<id>`.
- `components/ChatInput.jsx`
  - Hiển thị trường nhập và nút gửi.
- `components/MessageList.jsx`
  - Hiển thị tin nhắn và danh sách sản phẩm trả về từ bot.
- `components/ChatHeader.jsx`
  - Hiển thị tiêu đề chatbot và nút đóng.

## Dữ liệu sản phẩm

- `productsData` được import từ `src/data/productsData.js`.
- Bot sử dụng dữ liệu này để trả về sản phẩm phù hợp theo yêu cầu của người dùng.

## Cài đặt môi trường

Để chatbot hoạt động, cần cấu hình biến môi trường:

```env
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Với Vite, biến phải được đặt trong file `.env` ở thư mục gốc.

## Hành vi chính

- Người dùng gõ câu hỏi vào ô nhập và nhấn gửi.
- `Chatbot.jsx` gửi tin nhắn người dùng vào `sendChatbotMessage`.
- `chatbotService.js` gọi model Gemini với prompt từ `chatbotPrompt.js`.
- Bot phải trả về JSON gồm:
  - `text`: câu trả lời
  - `products`: mảng sản phẩm liên quan
- `MessageList` hiển thị câu trả lời và hiển thị sản phẩm dưới dạng card.
- Click vào sản phẩm sẽ cuộn trang đến phần tử có id tương ứng nếu tồn tại.

## Mở rộng và chỉnh sửa

- Để sửa quy tắc trả lời, cập nhật `buildSystemPrompt` trong `chatbotPrompt.js`.
- Để thay đổi schema đầu ra, sửa `chatResponseSchema` trong `chatbotPrompt.js`.
- Để thêm xử lý lỗi mới, mở rộng `getErrorMessage` trong `chatbotPrompt.js`.
- Để chuyển sang mô hình AI khác, cập nhật `chatbotService.js` và `GEMINI_MODEL` tương ứng.

## Lưu ý

- Tính năng hiện tại chỉ hỗ trợ trả về sản phẩm liên quan trong kho hàng của Fashionshop.
- Nếu người dùng hỏi ngoài phạm vi, bot sẽ trả lời từ chối nhẹ nhàng theo prompt quy định.
- API key cần đúng và còn hạn để gọi được Gemini.
