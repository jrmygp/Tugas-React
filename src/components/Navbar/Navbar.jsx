import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="link-wrapper">
        <Link to="/" style={{ textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/band">Band</Link>
        <Link to="/tour">Tour</Link>
        <Link to="/products">Products</Link>
        <Link to="/users">Users</Link>
        <a href="contact.html">Contact</a>
      </div>
      <div className="search-wrapper">
        <i className="bi bi-search" />
      </div>
    </nav>
  );
};

export default Navbar;
