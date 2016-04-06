import React, {Component, PropTypes} from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

export default class CardContainer extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    width: PropTypes.number
  };

  render(): any {
    const { subtitle, title, width } = this.props;
    return (
        <Card style={{
          paddingLeft: "0.8em",
          paddingRight: "0.5em",
          paddingTop: "0.5em",
          paddingBottom: "0.5em",
          margin: "1em",
          width: width
        }}>
          <CardHeader
            title={title}
            subtitle={subtitle}
            avatar={<div></div>}
            style={{marginBottom: "-2em", paddingBottom: "-1em" }}
          />
          <CardText>
            {this.props.children}
         </CardText>
       </Card>
    );
  }

}
