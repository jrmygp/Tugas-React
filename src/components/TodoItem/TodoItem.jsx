import { useState } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import moment from "moment";

const TodoItem = (props) => {
  // const renderButton = () => {
  //   if (props.status === "done") {
  //     return <Button color="success">Done</Button>;
  //   }

  //   return <Button color="danger">On Going</Button>;
  // };

  return (
    <Card className="my-2">
      <CardBody>
        <div className="d-flex justify-content-between">
          <div>
            <CardTitle tag="h5" className="fw-bold">
              {moment(props.date).format("DD MMMM YYYY")}
            </CardTitle>
            <CardText>{props.action}</CardText>
          </div>
          <div className="d-flex align-items-center">
            {props.isDone ? (
              <Button
                className="mx-2"
                onClick={props.toggleStatus}
                color="success"
              >
                Done
              </Button>
            ) : (
              <Button
                className="mx-2"
                onClick={props.toggleStatus}
                color="warning"
              >
                On Going
              </Button>
            )}
            <Button onClick={props.deleteItem} className="mx-2" color="danger">
              Delete
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TodoItem;
