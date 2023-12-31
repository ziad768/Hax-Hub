import { useTranslation } from "react-i18next"

function Years() {
    const [t , i18n] = useTranslation()
  return (
    <section>
    <div className="container my-5">
        <div className="row  d-flex justify-content-between">
            <div className="col-lg-3 col-md-3 my-2 my-md-0  col-sm-12"><p className="h1 text-center">70+</p><p className="h2 text-center">{t('exp')}</p></div>
            <div className="col-lg-3 col-md-3 my-2 my-md-0  col-sm-12"><p className="h1 text-center">20+</p><p className="h2 text-center">{t('Egy')}</p></div>
            <div className="col-lg-3 col-md-3 my-2 my-md-0  col-sm-12"><p className="h1 text-center">300+</p><p className="h2 text-center">{t('Assignments')}</p></div>
        </div>
    </div>
</section>  )
}

export default Years
