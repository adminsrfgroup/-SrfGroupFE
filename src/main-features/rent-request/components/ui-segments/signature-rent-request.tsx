import * as React from 'react'
import SignatureCanvas from 'react-signature-canvas'

function SignatureRentRequest() {

    const [openModel, setOpenModal] = React.useState(false)
    const sigCanvas: any = React.useRef()
    const [penColor, setPenColor] = React.useState('black')
    const [imageURL, setImageURL] = React.useState('')

    const colors = ['black', 'green', 'red']

    const create = () => {
        const URL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png')
        setImageURL(URL)
        setOpenModal(false)
    }

    const download = () => {
        const dlink = document.createElement("a")
        dlink.setAttribute("href", imageURL)
        dlink.setAttribute("download", "signature.png")
        dlink.click()
    }

    return (
        <div className='app-signature'>

            <div className='sigPad__penColors'>
                <p>Pen Color:</p>
                {colors.map((color) => (
                    <span
                        key={color}
                        style={{
                            backgroundColor: color,
                            border: `${color===penColor ? `2px solid ${color}` : '' }`}}
                        onClick={() => setPenColor(color)}>
                            </span>
                ))}
            </div>
            <div className='sigPadContainer'>
                <SignatureCanvas penColor={penColor}
                                 canvasProps={{className: 'sigCanvas'}}
                                 ref={sigCanvas} />
                <hr/>
                <button onClick={() => sigCanvas.current.clear()}>Clear</button>
            </div>
            <div className='modal__bottom'>
                <button onClick={() => setOpenModal(false)}>Cancel</button>
                <button
                    className='create'
                    onClick={create}>
                    Create
                </button>
            </div>

            {imageURL &&
            <>
                <img
                    src={imageURL}
                    alt='signature'
                    className='signature'
                />
                <br />
                <button
                    onClick={download}
                    style={{padding: '5px', marginTop: '5px'}}
                >Download</button>
            </>
            }







            {/*<button onClick={() => setOpenModal(true)}>Create Signature</button>*/}
            {/*<br />*/}
            {/*{imageURL &&*/}
            {/*<>*/}
            {/*    <img*/}
            {/*        src={imageURL}*/}
            {/*        alt='signature'*/}
            {/*        className='signature'*/}
            {/*    />*/}
            {/*    <br />*/}
            {/*    <button*/}
            {/*        onClick={download}*/}
            {/*        style={{padding: '5px', marginTop: '5px'}}*/}
            {/*    >Download</button>*/}
            {/*</>*/}
            {/*}*/}
            {/*{openModel &&*/}
            {/*<div className='modalContainer'>*/}
            {/*    <div className='modal'>*/}
            {/*        <div className='sigPad__penColors'>*/}
            {/*            <p>Pen Color:</p>*/}
            {/*            {colors.map((color) => (*/}
            {/*                <span*/}
            {/*                    key={color}*/}
            {/*                    style={{*/}
            {/*                        backgroundColor: color,*/}
            {/*                        border: `${color===penColor ? `2px solid ${color}` : '' }`}}*/}
            {/*                    onClick={() => setPenColor(color)}>*/}
            {/*    </span>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*        <div className='sigPadContainer'>*/}
            {/*            <SignatureCanvas penColor={penColor}*/}
            {/*                             canvasProps={{className: 'sigCanvas'}}*/}
            {/*                             ref={sigCanvas} />*/}
            {/*            <hr/>*/}
            {/*            <button onClick={() => sigCanvas.current.clear()}>Clear</button>*/}
            {/*        </div>*/}

            {/*        <div className='modal__bottom'>*/}
            {/*            <button onClick={() => setOpenModal(false)}>Cancel</button>*/}
            {/*            <button*/}
            {/*                className='create'*/}
            {/*                onClick={create}>*/}
            {/*                Create*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*}*/}
        </div>
    )
}

export default SignatureRentRequest
