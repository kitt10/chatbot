import { Fragment } from 'react'
import Script from 'next/script'
import { useDataContext } from '../../context/DataContext'
import { cfg } from '../../config/cfg'


const Scripts = () => {

    const { sc } = useDataContext()

    return (
        <Fragment>
            {cfg.sc.useSc && <Script
                id='scScript'
                src={cfg.sc.libSrc}
                strategy='afterInteractive'
                onLoad={() => sc.init()}
            />}
        </Fragment>
    )
}

export default Scripts
