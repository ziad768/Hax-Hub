import { useTranslation } from 'react-i18next'
import img from '../assets/19983.png'
function CardandImgleft() {
  const [t , i18n] = useTranslation()
  return (
    <div className="container my-5 d-flex align-items-center flex-column-reverse flex-md-row  Nowrap">
    
<div className="col-12  col-md-5 col-xl-4 divImg ">
<img src={img} className='imgleft' alt=""  />
</div>
    <div className="card border-2 mr border-primary divCard col-12 col-md-8 " style={{borderRadius:'20px',fontFamily:'monospace',padding:'80px 50px'}}>
  <div className="card-body">
    <h2 className="card-title fs-1 ">{t('vision')}</h2>
    <p className="card-text h4">{t('infoVision')}</p>

  </div>
</div>
    </div>
  )
}

export default CardandImgleft