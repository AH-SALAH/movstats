import { useState, useEffect, useCallback } from 'react';

const useGradient = ({ svg, stop1, stop2 }) => {
    let [lgd, setLg] = useState(null);
    let [svgEl, setSvgEl] = useState(svg);

    let createGradient = useCallback(
        () => {
            setSvgEl(svgEl);
            // create gradient defs
            let defs = svgEl.append('defs');

            let lg = defs.append('linearGradient')
                .attr('id', 'l_Gradient1')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', 0)
                .attr('y2', 0.5);

            lg.append('stop')
                .attr('offset', '0%')
                .attr('stop-color', stop1);

            lg.append('stop')
                .attr('offset', '100%')
                .attr('stop-color', stop2);

            setLg(`url(#l_Gradient1)`);
        },
        [stop1, stop2, svgEl]);


    useEffect(() => {

        if (!svgEl || svgEl?.empty()) return;
        
        createGradient();

    }, [createGradient, svgEl]);


    return [lgd, setSvgEl, svgEl];
};

export default useGradient;