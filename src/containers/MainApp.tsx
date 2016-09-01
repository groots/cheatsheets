import * as React from "react";
import * as Immutable from "immutable";

export class MainApp extends React.Component<{}, {}> {
  render() {
    const list = Immutable.List.of(1, 2, 3);
    const comp = list.map(x => <li>{x * 2}</li>);
    return <p><br/><br/><h1>{comp}</h1></p>;
  }
}
