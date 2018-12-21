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
  //  console.log(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      data: {
        name: '',
        gambar: '',
        tanggal: '',
      },
      errors: {},
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState((state) => ({
      data: { ...state.data, [name]: value },
    }));
  }
  handleChangeFile = (event) => {
    const f = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (() => {
      return (e) => {
        const binaryData = e.target.result;

        const base64String = `data:image/png;base64,${window.btoa(binaryData)}`;

        this.setState((state) => ({
          data: { ...state.data, gambar: base64String },
        }))
      };
    })(f);

    reader.readAsBinaryString(f);
  }

  handleSubmit = (e) => {
    e.preventDefault();
   // const productId=
    this.setState({ errors: {} }, async () => {
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/product/`+this.props.match.params.id, this.state.data); //this.state.data ->ini body
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


  async componentDidMount(){
    const productId = this.props.match.params.id;
    try {
      const responseAxios = await axios.get(`${process.env.REACT_APP_API_URL}/product/`+productId);
      const response = responseAxios.data;
      this.setState({ data: response.data});
    }catch (e) {
      console.log(e);
    }
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    const { data, errors } = this.state;
    const { gambar } = data;
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
                      <Input type="text" id="hf-email" name="name" placeholder="Enter Nama..." onChange={this.handleChange} autoComplete="nama" value = {data.name} />
                      {errors.name && <div className="form-error">{errors.name}</div>}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="hf-email">Gambar</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="hf-email" name="gambar" onChange={this.handleChangeFile} placeholder="Enter Email..." />
                    </Col>
                    {errors.gambar && <div className="form-error">{errors.gambar}</div>}          
                    {gambar && (
                      <div>
                        <img className="form-image" src={gambar} alt="Product" />
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="hf-tanggal">Tanggal</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date" id="hf-email" name="tanggal" value = {data.tanggal} onChange={this.handleChange} />
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
