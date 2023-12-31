import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

function ButtonContactUs() {
  const [t , i18n] = useTranslation()
  return (
<section className="buttonContact">
    <div className="content d-flex justify-content-between align-items-center gap-2 flex-wrap">
        <div className="info">
            {t('s')} <br/>
            {t('b')}
        </div>
        <div className="button">
            <Link to={'/contact'} className="btn btn-primary rounded-4 fs-2 mt-3 ">{t('contactUS')}</Link>
        </div>
    </div>
</section>
  )
}

export default ButtonContactUs