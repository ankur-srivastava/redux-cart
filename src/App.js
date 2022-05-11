import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { cartActions } from './store';
import Notification from './components/UI/Notification';

function App() {
  const showCart = useSelector(state => state.showCart)
  const items = useSelector(state => state.items)
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  useEffect(()=>{
    const sendData = async() => {
      dispatch(cartActions.showNotification(
        {
          status: 'pending', 
          title: 'Sending ...', 
          decsription: 'sending cart data'
        }))

      const resp = await fetch('https://test-react-2fd9a-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(items)
      })
      if(!resp || !resp.ok) {
        throw new Error('Failed')
      }
      dispatch(cartActions.showNotification(
        {
          status: 'success', 
          title: 'Success ...', 
          decsription: 'Data Sent'
        }))
    }
    sendData().catch((e) => {
      dispatch(cartActions.showNotification(
        {
          status: 'error', 
          title: 'Error', 
          decsription: 'Error while sending cart data'
        }))
    })
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
