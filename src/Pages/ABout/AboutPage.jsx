import ImgAbout from "../../assets/global-businessman-holding-glowing-sphere-futuristic-communication-concepts-generated-by-ai (1).png"
import AboutCorner from '../../components/About/AboutCorner'
import AboutVision from '../../components/About/AboutVision'
import AboutClient from '../../components/About/AboutClient'
import AboutParteners from '../../components/About/AboutParteners'
import ImgMission from "../../assets/Left Content Wrapper.png"
import ImageWraber from "../../assets/Image Wrapper.png"
import CardandImgRight from "../../components/CardandImgRight"
import CardandImgleft from "../../components/CardandImgLeft"
import { useTranslation } from 'react-i18next'
const AboutPage = () => {
    const [t , i18n] = useTranslation()
    return (
        <div>
            <div className='w-75 mx-auto text-center mt-5'>
                <h2 style={{ textAlign: "center" }} className='infoAbout'>{t('title')}</h2>
                <p style={{ color: "#585858", marginTop: "10px" }}>{t('info')}</p>
                <div className='mt-5'>
                    <img src={ImgAbout} alt="About Image" className='w-100' style={{ borderRadius: "20px" }} />
                </div>
            </div>
            <CardandImgRight/>
            <CardandImgleft/>
            <div className='container w-75' style={{marginTop:"150px"}}>
                <AboutClient />
            </div>
            <div className='container w-75' style={{marginTop:"150px"}}>
                <AboutParteners />
            </div>
        </div>
    )
}

export default AboutPage
