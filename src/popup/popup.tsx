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
/**
 * Closes the highest-level popup.
 * Can be safely used when triggered directly inside of popups, since popups are completely overlapping.
 * @returns
 */
function closeCurrentPopup() {
	activePopups.pop()
	renderPopups()
}

/**
 * Triggers a new popup at the highest level. May overlap, but each popup prevents interaction with previous popups.
 * @param content The JSX Content to be displayed
 * @param onClose Callback function triggered after the popup is closed. Only works when the  **x** button is pressed, not when `closeCurrentPopup()` is called.
 * @example
 *
 * ```
 * 	triggerPopup(
 * 		<div>
 * 			// some content
 * 			<button onClick={() => {closeCurrentPopup(); someHandleCloseFn()}}>Finish</button>
 * 		</div>
 * 	, someHandleCloseFn())
 * ```
 */
function triggerPopup(content: JSX.Element, onClose?: () => void) {
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
							forceClose()
						}}
					>
						✖
					</div>
					{content}
				</div>
			</div>
		) - 1
	renderPopups()

	function forceClose() {
		activePopups.splice(thisPopupIndex, 1)
		renderPopups()
		if (onClose) {
			onClose()
		}
	}
}
export { triggerPopup, closeCurrentPopup }
