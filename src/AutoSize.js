import React, { Component, PropTypes } from 'react';
import { findDOMNode } from "react-dom";

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
    const { width } = this.props;
    const elementWidth = ele.offsetWidth,
          scaleFactor = elementWidth / width;

    this.setState({scaleFactor: scaleFactor});
  };

  render() {
    const { scaleFactor } = this.state;
    const { width } = this.props;
    const scale = `scale(${scaleFactor})`;
    const scaledWidth = width * scaleFactor;
    const scaledHeight = scaledWidth / 0.766;
    return (
        <div style={{width: "auto"}}>
          <div style={{width: scaledWidth, height: scaledHeight }}>
            <div style={{transform:scale,webkitTransform:scale,transformOrigin: "0 0",webkitTransformOrigin:"0 0"}}>
              {this.props.children}
            </div>
          </div>
        </div>
    );

  }

}

