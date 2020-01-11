import React from 'react';

import {primColors, secColors} from '../colors';

export const Logo = () => {
    return (
        <svg width="60" height="60" xmlns="http://www.w3.org/2000/svg" style={{padding: 5}}>
            <rect width="60" height="60" style={{fill: secColors.main}}></rect>
            <text x="22" y="16" fill="#fff" style={{transform: 'scale(1.5)', fontWeight: '700'}}>
                E
            </text>
            <polygon points="0,0 60,60 0,60" style={{fill: primColors.light}}></polygon>
            <text x="4" y="30" fill={secColors.main} style={{transform: 'scale(1.5)', fontWeight: '700'}}>
                S
            </text>
        </svg>
    );
};
