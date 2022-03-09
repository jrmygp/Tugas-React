import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BandMemberCard from "../BandMemberCard/BandMemberCard";

const BandSection = () => {
  const [bandMembers, setBandMembers] = useState([]);

  const fetchBandMembers = () => {
    axios
      .get(`http://localhost:2000/band_members`)
      .then((res) => {
        setBandMembers(res.data);
      })
      .catch((err) => {
        alert("Terjadi kesalahan di server");
        console.log(err);
      });
  };

  const renderBandMembers = () => {
    return bandMembers.map((val) => {
      return (
        <Link
          to={`/band-member/${val.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <BandMemberCard fullName={val.full_name} />
        </Link>
      );
    });
  };

  useEffect(() => {
    fetchBandMembers();
  }, []);

  return (
    <section id="band" className="container py-5">
      <div className="band-info">
        <h2>THE BAND</h2>
        <em className="text-muted mt-3">We love dangdut</em>
        <p className="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
          consectetur, accusamus perferendis delectus qui quam explicabo
          corporis, necessitatibus tenetur fugiat est, provident laborum
          cupiditate doloremque dolores id iure voluptatem sit. Quas tenetur
          eius, consectetur, odit vero quae pariatur necessitatibus excepturi
          quia iure ullam eos molestiae. Non, animi? Hic adipisci quibusdam
          corrupti exercitationem sapiente alias quia, nostrum repudiandae
          quidem neque impedit explicabo architecto voluptatibus necessitatibus
          perspiciatis sit molestias veniam at eos!
        </p>
      </div>
      <div className="band-photos">{renderBandMembers()}</div>
    </section>
  );
};

export default BandSection;
