export function ProductCard({ product }) {
  return (
    <div id={`product-${product.id}`} className="col-lg-4 col-sm-6">
      <div className="product-item">
        <div className="pi-pic">
          <img src={product.image} alt={product.title} />
          {product.isSale && <div className="sale pp-sale">Sale</div>}
          <div className="icon">
            <i className="icon_heart_alt" />
          </div>
          <ul>
            <li className="w-icon active">
              <a href="#">
                <i className="icon_bag_alt" />
              </a>
            </li>
            <li className="quick-view">
              <a href="#">+ Add Cart</a>
            </li>
            <li className="w-icon">
              <a href="#">
                <i className="fa fa-random" />
              </a>
            </li>
          </ul>
        </div>
        <div className="pi-text">
          <div className="catagory-name">{product.category}</div>
          <a href="#">
            <h5>{product.title}</h5>
          </a>
          <div className="product-price">{product.price}</div>
        </div>
      </div>
    </div>
  );
}
