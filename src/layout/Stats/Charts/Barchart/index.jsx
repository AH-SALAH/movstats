import * as d3 from "d3";
import { useMemo, useRef, useEffect, useCallback, useState } from "react";
import { formatCurrency } from '@/utils/formatCurrency';
import useGradient from "../useGradient";


//TODO: extract to hooks or chunks, to make it smaller
/**
 * dynamic bar chart
 *
 * @param {*} props
 * @returns
 */
const BarChart = (props) => {
    let { data = [], shortenYnumber = false, xLabel, yLabel, barColor = null, barGradient = ['#00d8fb', '#2e2f7e'], header = '' } = props;
    let svgRef = useRef(null);
    let [lgd, setSvgEl] = useGradient({ svg: svgRef.current, stop1: barGradient[0], stop2: barGradient[1] });
    let [rewindAnime, setRewindAnime] = useState(false);
    // memoized dimensions
    let dim = useMemo(() => {
        return {
            w: 800,
            h: 400,
            margin: { top: 40, right: 40, bottom: 100, left: 100 }
        }
    }, []);

    /**
     * draw grid behind bars
     *
     * @param {*} { svg, data: dta, yAxis, yScale, xAxis, xScale, dim: dimen }
     */
    let drawGrid = ({ svg, data: dta, yAxis, yScale, xAxis, xScale, dim: dimen, w, h }) => {
        // Gridline
        let ygrid = yAxis
            .ticks(dta?.length)
            .tickFormat("")
            .tickSize(-w + dimen.margin.top + dimen.margin.bottom)
            .scale(yScale);

        svg.append("g")
            .attr("class", "ygrid")
            .transition(d3.easeElastic).duration((v, i) => i * 400)
            .call(ygrid)
            .attr("stroke-width", 0);

        svg.select('.ygrid')
            .selectAll('line')
            .style("stroke-dasharray", 2000)
            .style("stroke-dashoffset", 2000)
            .style("stroke-width", 1)
            .attr("opacity", 1)
            .transition(d3.easeElastic).duration((v, i) => i * 700).delay(1000)
            .style("stroke-dashoffset", 0)
            .attr("stroke-width", 1)
            .attr("stroke", 'slategray')
            .attr("opacity", 0.3)
            .style("z-index", 0);

        let xgrid = xAxis
            .ticks(dta?.length)
            .tickFormat("")
            .tickSize(h - dimen.margin.left - dimen.margin.right)
            .scale(xScale);

        svg.append("g")
            .attr("class", "xgrid")
            .transition(d3.easeElastic).duration((v, i) => i * 400).delay(1000)
            .call(xgrid)
            .attr("stroke-width", 0);

        svg.select('.xgrid')
            .selectAll('line')
            .style("stroke-dasharray", 2000)
            .style("stroke-dashoffset", 2000)
            .style("stroke-width", 1)
            .attr("opacity", 1)
            .transition(d3.easeElastic).duration((v, i) => i * 700)
            .style("stroke-dashoffset", 0)
            .attr("stroke-width", 1)
            .attr("stroke", 'slategray')
            .attr("opacity", 0.3)
            .style("z-index", 0);
    };

    /**
     * create bars
     *
     * @param {*} { data: dta, svg, dataV1, dataV2, dim: dimen, isSmScr: smScr, h, xScale, yScale }
     */
    let createBars = ({ data: dta, svg, dataV1, dataV2, dim: dimen, isSmScr: smScr, h, xScale, yScale }) => {

        // adding title like tooltip
        let parent = svg.node().parentElement.parentElement;
        let tooltip = d3.select(parent).select('.tt_ph');
        // check if tooltip already exist
        if (tooltip.empty()) {
            tooltip = d3.select(parent)
                .append('div')
                .attr('class', 'tt_ph')
                .style('position', 'absolute')
                .style("opacity", 0)
                .style("border-radius", '4px')
                .style("background", 'gold')
                .style("font-size", '0.8em')
                .style("padding", '2px 9px');
        }

        // handle tooltip mousemove
        let mousemove = (event, v) => {
            let tt = d3.select(parent).select('.tt_ph')
                .text(`${dataV1(v)} | ${dataV2(v)}`)
                .style("opacity", 1);

            tt
                .transition(d3.easeElasticIn)
                .style('left', `${event.pageX + 20}px`)
                .style('top', `${event.pageY + 20}px`);
        };

        // hide tooltip on mouseleave
        let mouseleave = (event, v) => {
            tooltip.style("opacity", 0);
        };

        // create bars & append mouse listeners
        let bar = svg.selectAll('.bar')
            .data(dta)
            .enter()
            .append("g")
            .on('mousemove', mousemove)
            .on('mouseleave', mouseleave);

        // draw bars with stagger animations
        bar.append('rect')
            .attr("class", "bar")
            .attr("data-title", v => dataV1(v))
            .attr("data-value", v => dataV2(v))
            .style('opacity', 0)
            .attr("rx", 4)
            .attr('x', v => xScale(dataV1(v)))
            .attr('y', v => h - dimen.margin.top - dimen.margin.bottom)
            .attr('width', xScale.bandwidth())
            .attr('height', 10)
            .style("fill", `none`)
            .style("stroke-dasharray", 2000)
            .style("stroke-dashoffset", 0)
            .style("stroke", `#000`)
            .style("stroke-width", 1)
            .transition(d3.easeElastic).duration((v, i) => i * 400).delay(3000)
            .style("stroke-dashoffset", 2000)
            .attr('height', (v, i) => h - yScale(dataV2(v)) - dimen.margin.top - dimen.margin.bottom)
            .attr('y', v => yScale(dataV2(v)))
            .style('opacity', 1)
            // if bargradient passed do gradient, else set barcolor
            .style("fill", barColor || barGradient && `${lgd}` || '#2e2f7e');

        // add top tips text
        bar.append("text")
            .attr("x", v => xScale(dataV1(v)))
            .attr("y", v => yScale(dataV2(v)))
            .attr("text-anchor", "center")
            .attr("dy", "-0.35em")
            .text(v => shortenYnumber && formatCurrency().format(dataV2(v)).replace(/^[\w$]{1}/i, '') || dataV2(v))
            .style('font-size', '5.5em')
            .style('opacity', 0)
            .transition(d3.easeElastic).duration((v, i) => i * 400).delay(500)
            .style('opacity', 1)
            .style('font-size', smScr && '0.7rem' || '1.01em')
            .style('fill', 'crimson')
            .style('font-weight', 'bold');
    };

    /**
     * draw x,y Axis
     *
     * @param {*} { svg, xAxis, yAxis, dim: dimen, h }
     */
    let drawAxis = ({ svg, xAxis, yAxis, dim: dimen, h }) => {
        // append & draw xaxis
        svg.append('g').call(xAxis)
            .style("opacity", 0)
            .attr('transform', `translate(0, 300)`)
            .transition(d3.easeElastic).duration(1000)
            .style("opacity", 1)
            .style("fill", "slategray")
            .attr('transform', `translate(0, ${h - dimen.margin.top - dimen.margin.bottom})`)
            .selectAll('text')
            .attr("font-size", "0em")
            .style("text-anchor", "end")
            .style("opacity", 0)
            .transition(d3.easeElastic).duration((v, i) => i * 100).delay(400)
            .style("opacity", 1)
            .attr("dx", "-0.8em")
            .attr("dy", "0.15em")
            .attr("font-size", "1.5em")
            .attr('transform', `rotate(-45)`);

        // append g with yaxis
        svg.append('g').call(yAxis)
            .attr('transform', `translate(-50,0)`)
            .style("opacity", 0)
            .style("x", -50)
            .transition(d3.easeElastic).duration(1000)
            .style("opacity", 1)
            .style("x", 0)
            .attr('transform', `translate(0,0)`)
            .style("fill", "slategray")
            .attr("font-size", "0.4em")
            .transition(d3.easeElastic)
            .attr("font-size", "1.1em");
    };

    /**
     * draw labels
     *
     * @param {*} { svg, w, h, dim: dimen, isSmScr: smScr, xLabel: xlbl, yLabel: ylbl }
     */
    let drawLabels = ({ svg, w, h, dim: dimen, isSmScr: smScr, xLabel: xlbl, yLabel: ylbl }) => {
        // draw x label
        svg.append("text")
            .attr("class", "x-label")
            .attr("text-anchor", "end")
            .style("font-size", '1em')
            .style("opacity", 0)
            .attr("dx", 0)
            .attr("dy", h - dimen.margin.top - dimen.margin.bottom + 6)
            .transition(d3.easeElastic).duration(500)
            .style("opacity", 1)
            .style("font-size", smScr && '0.7em' || '1em')
            .attr("dx", w - dimen.margin.left + dimen.margin.right - (smScr && 20 || 0))
            .attr("dy", h - dimen.margin.top - dimen.margin.bottom + 6)
            .text(`${xlbl}`);

        // draw y label
        svg.append("text")
            .attr("class", "y-label")
            .attr("text-anchor", "end")
            .attr("dx", "0.2em")
            .attr("dy", h - dimen.margin.top - dimen.margin.bottom + 6)
            .style("font-size", '1em')
            .style("opacity", 0)
            .transition(d3.easeElastic).duration(1000)
            .style("opacity", 1)
            .attr("dx", smScr && "-1em" || "0.2em")
            .attr("dy", smScr && "1.15em" || "-1.15em")
            .style("font-size", smScr && '0.7em' || '1em')
            .attr('transform', smScr && 'rotate(90)' || '')
            .text(`${ylbl}`);
    };

    /**
     * draw chart title
     *
     * @param {*} { svg, w, dim: dimen, isSmScr: smScr, header: hdr }
     */
    let drawTitle = ({ svg, w, dim: dimen, isSmScr: smScr, header: hdr }) => {
        // draw title
        svg.append("text")
            .attr("class", "chart-title")
            .attr("text-anchor", "center")
            .style('font-size', '5em')
            .transition(d3.easeElastic).duration(500).delay(1200)
            .attr("dx", w / 2 - dimen.margin.left - dimen.margin.right)
            .attr("dy", -dimen.margin.top)
            .style('font-size', smScr && "1em" || '1.5em')
            .style('fill', 'darkslateblue')
            .style('font-weight', 'bolder')
            .text(`${hdr}`);
    };

    /**
     * draw legends
     *
     * @param {*} { svg, w, dim: dimen, isSmScr: smScr, header: hdr, fillColor }
     */
    let drawLegends = ({ svg, w, dim: dimen, isSmScr: smScr, header: hdr, fillColor }) => {
        // hide on sm screen
        if (window !== undefined && !smScr) {
            // draw legends
            svg.append("circle")
                .attr("class", "c_legend")
                .attr("text-anchor", "end")
                .transition(d3.easeElastic).delay(500)
                .attr("cx", w - dimen.margin.right - dimen.margin.left + 15)
                .attr("cy", dimen.margin.top)
                .attr("fill", `${fillColor}`)
                .attr("r", 7);

            svg.append("text")
                .attr("class", "c_legend_text")
                .attr("text-anchor", "start")
                .style('font-size', '1.7em')
                .transition(d3.easeElastic).delay(500)
                .attr("x", w - dimen.margin.right - dimen.margin.left + 30)
                .attr("y", dimen.margin.top + 3)
                .style('font-size', '.7em')
                .style('font-weight', 'bold')
                .attr("fill", `${barColor || lgd}`)
                .text(`${hdr}`);
        }
    };

    let initSvg = ({ currentRef, svgW, w, h, margin, dim: dimen, isSmScr: smScr }) => {
        // init svg
        return d3.select(currentRef)
            .attr('width', svgW)
            .attr('height', '80%')
            .attr('viewbox', `0 0 ${w - margin.left - margin.right} ${h - margin.top - margin.bottom}`)
            .style('overflow', 'visible')
            .append("g")
            .attr('width', `${w - margin.left - margin.right}`)
            .attr('height', `${h - margin.top - margin.bottom}`)
            .attr('transform', `translate(${dimen.margin.left + (smScr && 7 || -20)}, ${dimen.margin.top})`)
            .style('overflow', 'auto')
            .style('margin', '0 auto');
    };

    /**
     *
     * create actual chart
     * @param {*} currentRef
     * @returns
     */
    let createChart = useCallback((currentRef) => {
        if (!currentRef) return;

        let isSmScr = window !== undefined && window?.innerWidth < 768; // chk small screen
        let svgW = isSmScr && 400 || '80%'; // on small screens to not to be too tiny, fix width at 400

        // parent width & height for svg responsivness
        let svgParent = d3.select(currentRef)?.node()?.getBoundingClientRect();
        let w = svgParent?.width;
        let h = svgParent?.height;
        let margin = { top: svgParent?.top, bottom: svgParent?.bottom, left: svgParent?.left, right: svgParent?.right };
        // get xaxis & yaxis values from data object passed
        let dataV1 = v => Object.values(v)?.[0];
        let dataV2 = v => Object.values(v)?.[1];

        let svg = initSvg({ currentRef, svgW, w, h, margin, dim, isSmScr });

        // pass svg to gradient hook to get created fi there is no bar color has been passed
        if (!barColor) setSvgEl(svg);

        // if there still don't have legend, then return till it be created through the gradient hook
        // to prevent flickering effect of whipeing through unmount
        if (!barColor && !lgd) return;

        // xscaleband
        let xScale = d3.scaleBand()
            .domain(data?.map(v => dataV1(v)))
            .range([0, w - dim.margin.left - dim.margin.right])
            .padding(0.3);

        // linear yscale
        let yScale = d3.scaleLinear()
            .domain([0, Math.max(...data?.map(v => dataV2(v)))])
            .range([h - dim.margin.top - dim.margin.bottom, 0]);

        // calc xaxis
        let xAxis = d3.axisBottom(xScale)
            .ticks(data?.length);

        // calc yaxis
        let yAxis = d3.axisLeft(yScale)
            .ticks(data?.length)
            .tickFormat(v => shortenYnumber && formatCurrency().format(v).replace(/^[\w$]{1}/i, '') || v);
        // .ticks(Math.max(...data?.map(v => dataV2(v))));

        //  draw x,y axis
        drawAxis({ svg, xAxis, yAxis, dim, h });

        // draw grid lines
        drawGrid({ svg, data, yAxis, yScale, xAxis, xScale, dim, w, h });

        // create bars
        createBars({ data, svg, dataV1, dataV2, dim, isSmScr, h, xScale, yScale });

        // draw labels
        drawLabels({ svg, w, h, dim, isSmScr, xLabel, yLabel });

        // draw title
        drawTitle({ svg, w, dim, isSmScr, header });

        // draw legends
        drawLegends({ svg, w, dim, isSmScr, header, fillColor: barColor || lgd });

        // eslint-disable-next-line
    }, [props, lgd]);

    useEffect(() => {
        let currentRef = svgRef.current;
        // if there are no barcolor then it'll create
        // the gradient & come with lgd value so stop creation till the hook create
        // the lgd value, to prevent flickering effect
        if (!data.length) return;
        createChart(currentRef);

        return () => {
            if (currentRef) d3.select(currentRef).selectChildren('*').remove();
        }
        // eslint-disable-next-line
    }, [props, lgd, rewindAnime]);


    return (
        <div className="my-10 py-10 overflow-x-visible overflow-y-hidden shadow-md w-11/12 lg:w-4/5 h-[600px] m-auto text-center flex place-items-center place-content-center flex-wrap">
            <button type="button" className="flex ml-auto my-3 mr-2 rounded-2xl bg-amber-500 text-white px-2 py-1 shadow-md hover:bg-amber-700 active:bg-green-500" onClick={() => setRewindAnime(!rewindAnime)}>Animate</button>
            <div className="w-full h-full px-6 py-6 md:px-8 md:py-8 overflow-x-auto text-center flex place-items-center place-content-center">
                <svg ref={svgRef} className={'text-center m-auto flex place-content-center'} ></svg>
            </div>
        </div>
    )
}

export default BarChart;