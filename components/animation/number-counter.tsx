import { isVisible } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import CountUp from "react-countup";
import ReactVisibilitySensor from "react-visibility-sensor";

function Counter({end}:{end:number}) {
    
    const [viewPortEntered, setViewPortEntered] = useState(false);

    return (
        
            <CountUp  start={viewPortEntered ? null : 0} end={end} duration={3}>
                {({ countUpRef }) => {
                    return (
                        <ReactVisibilitySensor
                            active={!viewPortEntered}
                              onChange={(isVisible) => {
                                if (isVisible) {
                                  setViewPortEntered(true);
                                }
                              }}
                            delayedCall
                        >
                            <span className="number" ref={countUpRef} />
                        </ReactVisibilitySensor>
                    );
                }}
            </CountUp>
       
    );
}

export default Counter;
