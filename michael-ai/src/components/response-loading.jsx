import React from 'react'
import styled, { keyframes } from 'styled-components'

const load = keyframes`
    0%    {-webkit-mask-position: 0% 0%  ,50% 0%  ,100% 0%  }
    16.67%{-webkit-mask-position: 0% 100%,50% 0%  ,100% 0%  }
    33.33%{-webkit-mask-position: 0% 100%,50% 100%,100% 0%  }
    50%   {-webkit-mask-position: 0% 100%,50% 100%,100% 100%}
    66.67%{-webkit-mask-position: 0% 0%  ,50% 100%,100% 100%}
    83.33%{-webkit-mask-position: 0% 0%  ,50% 0%  ,100% 100%}
    100%  {-webkit-mask-position: 0% 0%  ,50% 0%  ,100% 0%  }
`

const back = keyframes`
    0%,
    100%{background-position: 0%   0%,0%   100%}
    25% {background-position: 100% 0%,0%   100%}
    50% {background-position: 100% 0%,100% 100%}
    75% {background-position: 0%   0%,100% 100%}
`

export const ResponseLoading = styled.div`
    /* the colors */
    --c1: #F77825;
    --c2: #D3CE3D;
    --c3: #60B99A;
    --c4: #554236;
    /**/

    width: 32px; /* control the size */
    aspect-ratio: 8/5;
    --_g: no-repeat radial-gradient(#000 68%,#0000 71%);
    -webkit-mask: var(--_g),var(--_g),var(--_g);
    -webkit-mask-size: 25% 40%;
    background: 
        conic-gradient(var(--c1) 50%,var(--c2) 0) no-repeat,
        conic-gradient(var(--c3) 50%,var(--c4) 0) no-repeat;
    background-size: 200% 50%;
    animation: 
        ${back} 2s infinite steps(1),
        ${load} 1s infinite;
`