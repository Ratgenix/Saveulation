import React from 'react'
import '../css/footer.css'
import { SiKofi } from "react-icons/si";

function Footer() {
    return (    
        <div className = "footer">

        <div className="copyright-info">
                        {/* <hr/> */}
                        <div className='icons'>
                            <SiKofi id='kofi' className='kofi' title='Ko-fi'/>
                        </div>
                        <hr/>
                        <p className="col-sm">
                            &copy;{new Date().getFullYear()} All rights reserved <span className='poop'>||</span> Provided by fartmonger
                        </p>
                        </div>
    
    </div>
        )
    }

export default Footer
