import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {
  Card, CardHeader, CardActions,
  CardMedia, CardTitle, CardText,
  FlatButton, TextField,
  List, ListItem
} from 'material-ui';


export default class extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <Card className="hoykeys-tooltip">

        <CardHeader
          title="Instructions"
          actAsExpander={true}
          showExpandableButton={true}
        />

        <CardText expandable={true}>
          <List>
            <ListItem primaryText={"Add nodes with Shift + Click"} />
            <ListItem primaryText={"Add edges with Shift + Drag"} />
            <ListItem primaryText={"Delete nodes or edges by selecting and pressing Delete"} />
            <ListItem primaryText={"Click and drag nodes to change their position"} />
          </List>
        </CardText>
      </Card>
    )


  }
}
