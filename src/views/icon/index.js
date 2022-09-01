import React, { Component } from "react";
import * as Mui from "@mui/material";
import * as Svg from "src/components/svg";

class Icon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listIcon: [],
    };
  }
  componentDidMount() {
    for (const [iconComponentName, IconComponent] of Object.entries(Svg)) {
      this.setState((prevState) => ({
        listIcon: [
          ...prevState.listIcon,
          { iconName: iconComponentName, iconComp: IconComponent },
        ],
      }));
    }
  }

  render() {
    return (
      <Mui.Container maxWidth="md">
        <Mui.Typography
          component="h1"
          variant="h1"
          className="mt-5 mb-5 font-weight-semi-bold text-center"
        >
          Icons Used In This Project ({this.state.listIcon.length})
        </Mui.Typography>

        <Mui.Grid container spacing={4}>
          {this.state.listIcon.map((item, index) => {
            return (
              <Mui.Grid key={index} item xs={12} md={2} className="mb-5">
                <figure className="svg-size-compact text-center">
                  {React.createElement(item.iconComp, {})}
                </figure>
                <Mui.Typography
                  className="font-weight-semi-bold text-center"
                  component="h6"
                  variant="h6"
                >
                  {item.iconName}
                </Mui.Typography>
              </Mui.Grid>
            );
          })}
        </Mui.Grid>
      </Mui.Container>
    );
  }
}
export default Icon;
