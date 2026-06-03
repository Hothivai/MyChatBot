import { useState, useEffect } from 'react';
import { productsData } from '../../../data/productsData';
import { ProductCard } from './ProductCard';

export function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; 
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsData.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productsData.length / productsPerPage);

  useEffect(() => {
    const updatePageFromHash = () => {
      const hash = window.location.hash || '';
      const match = hash.match(/^#product-(\d+)$/);
      if (!match) return;
      const requestedId = match[1];
      const productIndex = productsData.findIndex((product) => String(product.id) === requestedId);
      if (productIndex === -1) return;
      const requestedPage = Math.floor(productIndex / productsPerPage) + 1;
      if (requestedPage !== currentPage) {
        setCurrentPage(requestedPage);
      }
    };

    updatePageFromHash();
    window.addEventListener('hashchange', updatePageFromHash);
    return () => window.removeEventListener('hashchange', updatePageFromHash);
  }, [currentPage, productsPerPage]);

  useEffect(() => {
    const hash = window.location.hash || '';
    if (!hash.startsWith('#product-')) return;

    const targetId = hash.replace(/^#/, '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentPage]);

  // Tạo mảng danh sách số trang [1, 2, 3,...] để map ra các nút bấm
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="product-shop spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 order-1 order-lg-2">
            <div className="product-list">
              {/* --- VÙNG HIỂN THỊ SẢN PHẨM --- */}
              <div className="row">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* --- VÙNG ĐIỀU HƯỚNG PHÂN TRANG (PAGINATION) --- */}
              {totalPages > 1 && (
                <div className="loading-more mt-4">
                  <ul className="pagination justify-content-center">
                    {/* Nút lùi về trang trước (Nút góc trái «) */}
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                      >
                        «
                      </button>
                    </li>

                    {/* Danh sách các nút số trang cụ thể */}
                    {pageNumbers.map((number) => (
                      <li 
                        key={number} 
                        className={`page-item ${currentPage === number ? 'active' : ''}`}
                      >
                        <button 
                          className="page-link" 
                          onClick={() => setCurrentPage(number)}
                        >
                          {number}
                        </button>
                      </li>
                    ))}

                    {/* Nút tiến tới trang sau (Nút góc phải ») */}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                      >
                        »
                      </button>
                    </li>
                  </ul>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}