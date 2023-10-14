import React from 'react'
import ReactDOM from 'react-dom/client'
import './popup.scss'

const popupDomLocation = ReactDOM.createRoot(
	document.getElementById('popup-root') as Element
)
const activePopups: JSX.Element[] = []

function renderPopups() {
	const renderMe = <React.Fragment>{activePopups}</React.Fragment>
	popupDomLocation.render(renderMe)
}

function triggerPopup(content: JSX.Element) {
	const thisPopupIndex =
		activePopups.push(
			<div
				className='popup-background'
				style={{ zIndex: activePopups.length + 5 }}
			>
				<div className={`popup-container`}>
					<div
						className='popup-exit'
						onClick={() => {
							closeThisPopup()
						}}
					>
						✖
					</div>
					{content}
				</div>
			</div>
		) - 1
	renderPopups()

	function closeThisPopup() {
		activePopups.splice(thisPopupIndex, 1)
		renderPopups()
	}

	return
}
export { triggerPopup }
