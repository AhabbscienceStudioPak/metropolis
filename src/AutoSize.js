import MarchingSquaresJS from "./MarchingSquares.js";
import {assoc} from "ramda";
import metropolisHastings from "./metropolis.js";
import drawPath from "./drawPath.js";
import Rosenbrock from "./Rosenbrock.js";
import DrawMetroPath from "./DrawMetroPath.js";
import drawCircle from "./drawCircle.js";
import NumberEditor from "react-number-editor";
import MetroPath from "./MetroPath.js";
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import CardContainer from "./CardContainer.js";
import { findDOMNode } from "react-dom";
import "./interpolate";

export default class AutoSize extends Component {
  constructor () {
    super();
    this.getWidth = this.getWidth.bind(this);
    this.onResize = this.onResize.bind(this);
    this.state = {scaleFactor: 1, translateX: 0};
  }

  static propTypes = {
    width: PropTypes.number.isRequired
  };

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    this.getWidth(findDOMNode(this));
  }

  onResize() {
    this.getWidth(findDOMNode(this));
    this.forceUpdate();
  }

  getWidth(ele)  {
    console.log(ele);
    const targetWidth = this.props.width;
    const elementWidth = ele.offsetWidth;
    const elementHeight = ele.offsetHeight;
    const scaleFactor = elementWidth / targetWidth;
    const translateX = (elementWidth - targetWidth)/2;
    const paddingY = ((elementHeight * scaleFactor) - elementHeight) / 2
    this.setState({scaleFactor: scaleFactor, translateX: translateX, paddingY: paddingY });
  };

  render() {
    const { scaleFactor, translateX, paddingY } = this.state;
    console.log(paddingY,"padfoot");
    const scale= `scale(${scaleFactor})`;
    return (
        <div style={{width: "auto"}}>
          <div style={{
              position: "absolute",
              display: [
                          '-webkit-box',
                          '-webkit-flex',
                          '-ms-flexbox',
                          'flex'
                        ],
              paddingLeft: translateX,
              paddingTop: paddingY
            }}>
          <div style={{
              position: "absolute",
              display: [
                          '-webkit-box',
                          '-webkit-flex',
                          '-ms-flexbox',
                          'flex'
                        ],
              transform: scale, 
              WebkitTransform: scale
            }}>
            {translateX}
            {this.props.children}
          </div>
          </div>
        </div>
    );

  }

}

