import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 1,
    title: 'P1',
    price: 10,
    description: 'Desc 1'
  },
  {
    id: 2,
    title: 'P2',
    price: 15,
    description: 'Desc 2'
  }
]
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((prod) => (
          <ProductItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            price={prod.price}
            description={prod.description}
        />
        ))}
      </ul>
    </section>
  );
};

export default Products;
