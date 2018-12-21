import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import axios from 'axios';

class Tables extends Component {
constructor(props) {
  super(props);
  this.state = {
    product: [],
  };
}

async componentDidMount(){
  try {
    const responseAxios = await axios.get(`${process.env.REACT_APP_API_URL}/product`);
    const response = responseAxios.data;
    this.setState({ product: response.data});
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
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.product.map(product =>
              
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td><img src={product.gambar}  width="60px" height="40px" /></td>
                    <td>{product.tanggal}</td>
                    <td>
                    <li><span>
                    <a href={`http://localhost:3000/#/base/update/`+product.id}>Update</a>
                     </span> || <span>
                    <a onClick= {() => { axios.delete(`http://localhost:3001/v1/product/${product.id}`) 
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
