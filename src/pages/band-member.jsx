import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

// 1. Dapetin params yang berisi band member ID v
// 2. Gunakan params untuk fetch data band member berdasarkan ID
// 3. Gunakan state untuk menyimpan data band member yang sudah di-fetch
// 4. Tampilkan

const BandMemberPage = () => {
  const { bandMemberId } = useParams();

  const [bandMemberData, setBandMemberData] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();

  const fetchBandMemberData = () => {
    axios
      .get(`http://localhost:2000/band_members/${bandMemberId}`)
      .then((res) => {
        setBandMemberData(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Terjadi kesalahan di server");
      });
  };

  useEffect(() => {
    fetchBandMemberData();
  }, []);

  return (
    <div>
      <button
        onClick={() => setSearchParams({ test: "testing123", name: "seto" })}
      >
        Set search
      </button>
      <h1>{bandMemberData.full_name}</h1>
      <ul>
        <li>Instrument: {bandMemberData.instrument}</li>
        <li>Date of Birth: {bandMemberData.date_of_birth}</li>
        <li>Hobby: {bandMemberData.hobby}</li>
      </ul>
    </div>
  );
};

export default BandMemberPage;
