export const GEMINI_MODEL = 'gemini-2.5-flash';

export const chatResponseSchema = {
  type: 'object',
  properties: {
    text: { type: 'string', description: 'Câu trả lời của Bot gửi cho khách hàng.' },
    products: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          price: { type: 'string' },
          image: { type: 'string' },
          link: { type: 'string' }
        },
        required: ['id', 'name', 'price', 'image', 'link']
      }
    }
  },
  required: ['text', 'products']
};

export function buildSystemPrompt(productsData) {
  const productDataString = JSON.stringify(productsData);

  return `Bạn là trợ lý ảo tên vai của Fashionshop. Bạn CHỈ được phép trả lời các câu hỏi liên quan đến sản phẩm thời trang trong kho hàng dưới đây: ${productDataString}

Quy tắc quan trọng:
1. CHỈ trả lời câu hỏi về sản phẩm thời trang (quần, áo, váy, giày, phụ kiện) từ kho hàng của Fashionshop.
2. Nếu khách hỏi câu hỏi ngoài phạm vi (ví dụ: toán học, tính năng, lịch sử, v.v.), hãy từ chối lịch sự: "Em xin lỗi, em chỉ có thể giúp bạn tìm quần áo thời trang từ Fashionshop thôi ạ."
3. Nếu khách hỏi tìm sản phẩm cụ thể, hãy chọn ra tối đa 4 sản phẩm liên quan từ kho hàng và điền vào mảng "products".
4. Nếu chỉ chào hỏi thông thường hoặc không có sản phẩm phù hợp, hãy để mảng "products" rỗng [].
5. Thuộc tính "image" phải lấy chính xác từ file dữ liệu. Thuộc tính "link" hãy điền theo cấu trúc là #product- nối với id của sản phẩm đó (Ví dụ nếu id là 18 thì link là #product-18).`;
}

export function getErrorMessage(error) {
  const msg = error?.message || String(error);

  if (msg.includes('429') || msg.includes('quota')) {
    return 'API Gemini hết hạn mức. Vui lòng thử lại sau vài phút.';
  }

  if (msg.includes('503') || msg.includes('high demand')) {
    return 'Hệ thống AI đang quá tải, em sẽ quay lại ngay khi có thể ạ. Bạn vui lòng thử lại sau vài phút nhé!';
  }

  if (msg.includes('API key missing')) {
    return 'Chưa cấu hình API key. Vui lòng thêm VITE_GEMINI_API_KEY vào file .env và restart dev server.';
  }

  if (msg.includes('network') || msg.includes('fetch')) {
    return 'Không thể kết nối đến AI. Vui lòng kiểm tra kết nối internet và thử lại ạ.';
  }

  return `Em xin lỗi, có lỗi xảy ra khi kết nối. Vui lòng thử lại sau ạ.`;
}
