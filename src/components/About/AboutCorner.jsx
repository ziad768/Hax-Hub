import ImgMission from "../../assets/Left Content Wrapper.png"
const AboutCorner = ({title , info , img}) => {
    return (
        <div>
            <div className='row align-items-center'>
                <div className='col-lg-8 col-md-6 col-sm-12' style={{border:"2px dashed #0062FF" ,padding:"120px" , borderRadius:"20px"}}>
                    <h3 style={{color:"#1B152B" , fontFamily:"Philosopher"}}>{title}</h3>
                    <p style={{fontFamily:"Philosopher" , fontWeight:"400" , color:"#585858"}} className='pInfo'>{info}</p>
                </div>
                <div className='col-lg-4 col-md-6 col-sm-12'>
                    <img src={ImgMission} alt="leftCorner"  className='imgLeftCorner'/>
                </div>
            </div>
        </div>
    )
}

export default AboutCorner
