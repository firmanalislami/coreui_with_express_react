import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import axios from 'axios';

class Tables extends Component {
constructor(props) {
  super(props);
  this.state = {
    order: [],
  };
}

async componentDidMount(){
  try {
    const responseAxios = await axios.get(`${process.env.REACT_APP_API_URL}/order`);
    const response = responseAxios.data;
    this.setState({ order: response.data});
  }catch (e) {
    console.log(e);
  }
}

handleSubmit = (e) => {
  e.preventDefault();
  axios.delete(`http://localhost:3001/v1/product/${this.state.id}`)
  .then(res => {
    console.log(res);
    console.log(res.data);
  })
}

  render() {
   // const { product } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" >
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Simple Table
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Product</th>
                    <th>Keterangan</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.order.map(order =>
              
                  <tr key={order.id}>
                    <td>{order.customer_name}</td>
                    <td>{ order.product.name  }</td>
                    <td>{order.keterangan}</td>
                    <td>
                    <li><span>
                    <a href={`http://localhost:3000/#/base/update/`+order.id}>Update</a>
                     </span> || <span>
                    <a onClick= {() => { axios.delete(`http://localhost:3001/v1/product/${order.id}`) 
                    window.location.reload(); }}>Delete</a>
                     </span></li>
                    </td>
                  </tr>
                  )}
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button"></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>

        
      
      </div>

    );
  }
}

export default Tables;
