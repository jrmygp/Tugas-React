import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter,
  CardText,
  Button,
} from "reactstrap";
import { FaRegThumbsUp } from "react-icons/fa";
import newyork from "./newyork.jpeg";

const ContentCard = (props) => {
  const likePost = (amount) => {
    props.numberOfLikes += 1;
    alert(`Liked post ${props.numberOfLikes}`);
  };

  return (
    <Card className="my-2">
      <CardBody>
        <CardTitle tag="h5" className="fw-bold">
          {props.username}
        </CardTitle>
        <CardSubtitle tag="h6" className="text-muted mb-4">
          {props.location}
        </CardSubtitle>

        <img
          style={{
            width: "100%",
          }}
          className="rounded"
          src={newyork}
          alt="user's content"
        />

        <CardText tag="h6" className="fw-bold mt-3">
          {props.numberOfLikes.toLocaleString()} likes
        </CardText>
        <CardText>
          <span className="fw-bold">{props.username}</span>{" "}
          {props.caption.length > 140
            ? props.caption.slice(0, 140) + "..."
            : props.caption}
        </CardText>

        <Button
          onClick={() => likePost(14)}
          color="danger"
          className="d-flex justify-content-center align-items-center"
        >
          Like &nbsp;&nbsp;
          <FaRegThumbsUp />
        </Button>
      </CardBody>
    </Card>
  );
};

export default ContentCard;
