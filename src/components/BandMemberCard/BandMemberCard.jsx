import member from "./member.jpeg";

const BandMemberCard = (props) => {
  return (
    <div className="band-member-card">
      <p>{props.fullName}</p>
      <img src={member} alt="" />
    </div>
  );
};

export default BandMemberCard;
