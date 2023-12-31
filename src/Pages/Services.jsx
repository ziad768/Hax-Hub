import { useTranslation } from "react-i18next"
import ButtonContactUs from "../components/ButtonContactUs"
import CardandImgleft from "../components/CardandImgLeft"
import CardandImgRight from "../components/CardandImgRight"

const Services = () => {
    const [t , i18n] = useTranslation()
    return (
        <div className="overflow-hidden">
            <div className='w-75 mx-auto text-center mt-5'>
                <h2 style={{ textAlign: "center" }} className='infoAbout'>{t('services')}</h2>
                <p style={{ color: "#585858", marginTop: "10px" }}>{t('infoServices')}</p>

            </div>
            <CardandImgRight/>
            <CardandImgleft/>
            <div style={{backgroundColor:"rgba(0, 98, 255, 0.19)"}} className="w-100 p-5">
            <CardandImgRight/>
            <CardandImgleft/>
            </div>
            <CardandImgRight/>
            <CardandImgleft/>
            <ButtonContactUs/>
        </div>
    )
}

export default Services
