import { gql } from '@apollo/client'

const AUTHENTICATE_USER = gql`
  mutation authenticateUser($input: AuthenticateInput) {
    authenticateUser(input: $input){
      token
    }
  }
`

const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
      lastname
    }
  }
`

const NEW_CLIENT = gql`
  mutation newClient($input: ClientInput) {
    newClient(input: $input) {
      id
      name
      lastname
      company
      email
      tel
    }
  }
`

const NEW_USER = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      id
      name
      lastname
      email
    }
  }
`


const GET_CLIENTS_USER = gql`
  query getClientsSeller {
    getClientsSeller {
      id
      name
      lastname
      company
      email
      tel
      seller
    }
  }
`

const GET_CLIENT = gql`
  query getClient($id: ID!) {
    getClient(id: $id) {
      name
      lastname
      company
      email
      tel
      seller
    }
  }
`

const UPDATE_CLIENT = gql`
  mutation updateClient($id: ID!, $input: ClientInput) {
    updateClient(id: $id, input: $input) {
      name
      email
    }
}
`

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id)
  }
`

const NEW_PRODUCT = gql`
  mutation newProduct($input: ProductInput) {
    newProduct(input: $input) {
      id
      name
      existence
      price
      created
    }
  }
`

const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      price
      existence
      created
    }
  }
`

const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      existence
      price
      created
    }
  }
`

const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $input: ProductInput) {
    updateProduct(id: $id, input: $input) {
      id
      name
      existence
      price
      created
    }
  }
`

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`

const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput) {
    newOrder(input: $input) {
      id
    }
  }
`

const GET_ORDER_SELLER = gql`
  query getOrdersSeller {
    getOrdersSeller {
      id
      order {
        id
        cantidad
        name
      }
      client {
        id
        name
        lastname
        email
        tel
      }
      seller
      total
      state
    }
  }
`
const GET_ORDERS_SELLER_ID = gql`
  query getOrdersSeller {
    getOrdersSeller {
      id
    }
  }
`

const UPDATE_ORDER = gql`
  mutation updateOrder($id: ID!, $input: OrderInput) {
    updateOrder(id: $id, input: $input) {
      state
    }
  }
`

const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`

const BEST_SELLERS = gql`
  query bestSellers {
    bestSellers {
      seller {
        name
        email
      }
      total
    }
  }
`

const BEST_CLIENTS = gql`
  query bestClients {
    bestClients {
      client {
        name
        company
      }
      total
    }
  }
`

export {
  AUTHENTICATE_USER,
  GET_USER,
  NEW_CLIENT,
  NEW_USER,
  GET_CLIENTS_USER,
  GET_CLIENT,
  UPDATE_CLIENT,
  DELETE_CLIENT,
  NEW_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  NEW_ORDER,
  GET_ORDER_SELLER,
  GET_ORDERS_SELLER_ID,
  UPDATE_ORDER,
  DELETE_ORDER,
  BEST_SELLERS,
  BEST_CLIENTS
}