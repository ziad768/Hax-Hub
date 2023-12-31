import img from "../../assets/33098.png";
function CardHome() {
  return (
    <div className="container my-5 d-block d-md-flex align-items-center ">
      <div
        className="card border-2 border-primary divCard col-12 col-md-8"
        style={{
          borderRadius: "20px",
          fontFamily: "monospace",
          padding: "80px 20px",
        }}
      >
        <div className="card-body">
          <h2 className="card-title fs-1 ">Card title</h2>
          <p className="card-text h4">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
      <div className="col-12  col-md-5 col-xl-4 divImg ">
        <img src={img} className="imgRight mr" alt="" />
      </div>
    </div>
  );
}

export default CardHome;
