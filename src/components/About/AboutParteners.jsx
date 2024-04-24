import { useTranslation } from 'react-i18next'
import img from '../../assets/skills-02.jpg'

const AboutParteners = () => {
    const [t , i18n] = useTranslation()
    return (
        <div>
            <h2 id="partener">{t('Partners')}</h2>
            <div className='d-flex justify-content-lg-between justify-content-center w-100 mt-5 align-items-center my-5 flex-wrap flex-column flex-xl-row gap-5 '>
            <div className='text-center  '>
            <div className="rounded-circle my-2 m-auto  divImageOneAndThree"><img alt='...' src={img} className='w-100 rounded-circle' /></div>
            <h2>ziad hamdi</h2>
            <p className='text-primary fs-5'>Front-End Devoloper</p>

            </div>
            <div className='text-center    '>
            <div className="rounded-circle my-2 m-auto   divImageTwo"><img alt='...' src={img} className='w-100 rounded-circle' /></div>
            <h2>ziad hamdi</h2>
            <p className='text-primary fs-5'>Front-End Devoloper</p>

            </div>
            <div className='text-center    '>
            <div className="rounded-circle my-2 m-auto  divImageOneAndThree"><img alt='...' src={img} className='w-100 rounded-circle' /></div>
            <h2>ziad hamdi</h2>
            <p className='text-primary fs-5'>Front-End Devoloper</p>

            </div>

            </div>
        </div>
    )
}

export default AboutParteners
