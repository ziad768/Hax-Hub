import { useTranslation } from 'react-i18next'
import img from '../assets/33098.png'
function CardandImgRight() {
  const [t , i18n] = useTranslation()
  return (
    <div className="container my-5 d-block d-md-flex align-items-center">
    <div className="card border-2 border-primary divCard col-12 col-md-8 " style={{borderRadius:'20px',fontFamily:'monospace',padding:'80px 20px'}}>
  <div className="card-body">
    <h2 className="card-title fs-1 ">{t('mission')}</h2>
    <p className="card-text h4">{t('infoMission')} </p>

  </div>
</div>
<div className="col-12  col-md-5 col-xl-4 divImg ">
<img src={img} className='imgRight mr' alt=""  />
</div>
    </div>
  )
}

export default CardandImgRight