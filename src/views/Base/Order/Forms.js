import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import axios from 'axios';


class Forms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      product: [],
      data: {
        customer_name: '',
        product_id: '',
        keterangan: '',
      },
      errors: {},
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }
  handleChange = (e) => {
    const name = e.target.name; // name default dari dom html
    const value = e.target.value;

    this.setState((state) => ({
      data: { ...state.data, [name]: value },
    }));
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

    this.setState({ errors: {} }, async () => {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/order`, this.state.data);
       // window.location.reload();
      } catch (e) {
        if (e.response.status === 400) {
          this.setState({ errors: e.response.data.errors });
        } else {
          this.setState({ errors: { global: e.response.data.message } });
        }
      }
    });
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    const { data,errors } = this.state;
    //const { gambar } = data;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Horizontal</strong> Form
              </CardHeader>
              <CardBody>
                <Form method="post" className="form-horizontal" autoComplete="off">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="hf-email">Nama</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="hf-email" name="customer_name" placeholder="Enter Nama..." onChange={this.handleChange} autoComplete="nama" />
                      {errors.customer_name && <div className="form-error">{errors.customer_name}</div>}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="hf-tanggal">product</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <select class="form-control" id="" name="product_id" onChange={this.handleChange} value={data.product_id}>
                      {this.state.product.map(product =>
                      <option value = {product.id}>{product.name}</option>
                      )}
                      </select>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="hf-tanggal">keterangan</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="hf-email" name="keterangan" onChange={this.handleChange} />
                      <FormText className="help-block">Please enter your email</FormText>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
              {errors.global && <div className="form-error">{errors.global}</div>}
                <Button type="submit" size="sm" onClick={this.handleSubmit} color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
           
        
          </Col>
        </Row>
       
      </div>
    );
  }
}

export default Forms;
