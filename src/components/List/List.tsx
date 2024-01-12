import Card from "../Card/Card";
import "./List.css";

function List() {
  return (
    <div className="container">
      <div>
        <h2>Title</h2>
      </div>
      <div className="cards">
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default List;
