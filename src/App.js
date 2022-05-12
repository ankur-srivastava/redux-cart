import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData } from './store';

function App() {
  const showCart = useSelector(state => state.showCart)
  const items = useSelector(state => state.items)
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(()=>{
    if(firstLoad) {
      console.log(firstLoad)
      setFirstLoad(false)
      return
    }
    dispatch(sendCartData(items))
  }, [items, dispatch])

  return (
    <Fragment>
      {notification && <Notification 
          status={notification.status} 
          title={notification.title}
          description={notification.description}
          />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
