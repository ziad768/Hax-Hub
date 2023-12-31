
function CardOurServices({number}) {
  return (
    <div className="card py-3 position-relative col-12 col-md-5  cardServices ">
  <div className="card-body " style={{zIndex:3}}>
    <h3 className="card-title">Card title</h3>
    <p className="card-text fs-5">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
    <a href="#" className="card-link text-primary">Learn More</a>
    </div>
    <h2 className="numberServices">{number<10 ? `0${number}`:number}</h2>
</div>  )
}

export default CardOurServices