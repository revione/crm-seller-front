import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo'
import OrderState from '../context/orders/OrderState'
import Initialization from '../components/Initialization'
import '../styles/main.css'

const MyApp = ({Component, pageProps}) => {
  return (
    <ApolloProvider client={client}>
      <OrderState>
        <Initialization>
          <Component {...pageProps} />
        </Initialization>        
      </OrderState>
    </ApolloProvider>
  )
}

export default MyApp