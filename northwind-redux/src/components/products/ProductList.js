import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge, Table } from "reactstrap";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";

class ProductList extends Component {
  componentDidMount() {
    this.props.actions.getProducts();
  }
  render() {
    return (
      <div>
        <Badge color="warning">Products</Badge>
        <Badge color="success">{this.props.currentCategory.categoryName}</Badge>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>unit Price</th>
              <th>Quantity Per Unit</th>
              <th>Units İn Stock</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.productName}</td>
                <td>{product.unitPrice}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitsInStock}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
function mapStateProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
    },
  };
}

export default connect(mapStateProps, mapDispatchToProps)(ProductList);
