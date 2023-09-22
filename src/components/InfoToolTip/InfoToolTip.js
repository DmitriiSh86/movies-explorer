import statusOk from "../../images/statusOk.png";
import statusNo from "../../images/statusNo.png";

function InfoTooltip({isInfoTooltipOpen, infoToolTipClose, isOk}) {
    
    return(
        <div className={`infoTooltip ${isInfoTooltipOpen ? 'infoTooltip__open' : ''}`}>
            <div className="infoTooltip__container">
                <div className='infoTooltip__group'>
                    <img src ={isOk.status ? statusOk : statusNo} alt="union" className="infoTooltip__image"/>
                    <h3 className="infoTooltip__title">
                        {isOk.message}
                    </h3>
                </div>
                <button 
                    type="button" 
                    className="infoTooltip__close"
                    onClick={infoToolTipClose}
                />
            </div>
        </div>
    )
}

export default InfoTooltip;