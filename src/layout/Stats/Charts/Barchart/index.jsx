import * as d3 from "d3";
import { useMemo, useRef, useEffect, useCallback } from "react";
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
    let drawGrid = ({ svg, data: dta, yAxis, yScale, xAxis, xScale, dim: dimen }) => {
        // Gridline
        let ygrid = yAxis
            .ticks(dta?.length)
            .tickFormat("")
            .tickSize(-dimen.w + dimen.margin.top + dimen.margin.bottom)
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
            .transition(d3.easeElastic).duration((v, i) => i * 700)
            .style("stroke-dashoffset", 0)
            .attr("stroke-width", 1)
            .attr("stroke", 'slategray')
            .attr("opacity", 0.3)
            .style("z-index", 0);

        let xgrid = xAxis
            .ticks(dta?.length)
            .tickFormat("")
            .tickSize(dimen.h - dimen.margin.left - dimen.margin.right)
            .scale(xScale);

        svg.append("g")
            .attr("class", "xgrid")
            .transition(d3.easeElastic).duration((v, i) => i * 400)
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
     *
     * create actual chart
     * @param {*} currentRef
     * @returns
     */
    let createChart = useCallback((currentRef) => {
        if (!currentRef) return;
        // parent width & height for svg viewbox
        let w = d3.select(currentRef).node().getBoundingClientRect().width;
        let h = d3.select(currentRef).node().getBoundingClientRect().height;
        // xaxis & yaxis values
        let dataV1 = v => Object.values(v)?.[0];
        let dataV2 = v => Object.values(v)?.[1];


        // init svg
        let svg = d3.select(currentRef)
            .attr('width', dim.w + dim.margin.left + dim.margin.right)
            .attr('height', dim.h + dim.margin.top + dim.margin.bottom)
            .attr('viewbox', `0 0 ${h} ${w}`)
            .style('overflow', 'visible')
            .append("g")
            .attr('transform', `translate(${dim.margin.left + dim.margin.right}, ${dim.margin.top})`)
            .style('overflow', `hidden`);

        // pass svg to gradient hook to get created
        if (!barColor) setSvgEl(svg);

        // if there still don't have legend, then return till it be created through the gradient hook
        // to prevent flickering effect of whipeing through unmount
        if (!barColor && !lgd) return;


        // xscaleband
        let xScale = d3.scaleBand()
            .domain(data?.map(v => dataV1(v)))
            .range([0, dim.w - dim.margin.left - dim.margin.right])
            .padding(0.3);

        // linear yscale
        let yScale = d3.scaleLinear()
            .domain([0, Math.max(...data?.map(v => dataV2(v)))])
            .range([dim.h - dim.margin.top - dim.margin.bottom, 0]);

        // calc xaxis
        let xAxis = d3.axisBottom(xScale)
            .ticks(data?.length);

        // calc yaxis
        let yAxis = d3.axisLeft(yScale)
            .ticks(data?.length)
            .tickFormat(v => shortenYnumber && formatCurrency().format(v).replace(/^[\w$]{1}/i, '') || v);
        // .ticks(Math.max(...data?.map(v => dataV2(v))));

        // append & draw xaxis
        svg.append('g').call(xAxis)
            .style("opacity", 0)
            .attr('transform', `translate(0, 300)`)
            .transition(d3.easeElastic).duration(1000)
            .style("opacity", 1)
            .style("fill", "slategray")
            .attr('transform', `translate(0, ${dim.h - dim.margin.top - dim.margin.bottom})`)
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

        // draw grid lines
        drawGrid({ svg, data, yAxis, yScale, xAxis, xScale, dim });

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
            .data(data)
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
            .attr('y', v => dim.h - dim.margin.top - dim.margin.bottom)
            .attr('width', xScale.bandwidth())
            .attr('height', 10)
            .style("fill", `none`)
            .style("stroke-dasharray", 2000)
            .style("stroke-dashoffset", 0)
            .style("stroke", `black`)
            .style("stroke-width", 1)
            .transition(d3.easeElastic).duration((v, i) => i * 300).delay(300)
            .style("stroke-dashoffset", 2000)
            .attr('height', (v, i) => dim.h - yScale(dataV2(v)) - dim.margin.top - dim.margin.bottom)
            .attr('y', v => yScale(dataV2(v)))
            .style('opacity', 1)
            // if bargradient passed do gradient, else set barcolor
            .style("fill", barColor || barGradient && `${lgd}` || '#2e2f7e');

        // add top tips text
        bar.append("text")
            .attr("x", v => xScale(dataV1(v)))
            .attr("y", v => yScale(dataV2(v)))
            .attr("text-anchor", "center")
            .attr("dy", "-.35em")
            .text(v => shortenYnumber && formatCurrency().format(dataV2(v)).replace(/^[\w$]{1}/i, '') || dataV2(v))
            .style('font-size', '5.5em')
            .style('opacity', 0)
            .transition(d3.easeElastic).duration((v, i) => i * 400).delay(500)
            .style('opacity', 1)
            .style('font-size', '1.01em')
            .style('fill', 'crimson')
            .style('font-weight', 'bold');

        // draw x label
        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .transition(d3.easeElastic)
            .attr("dx", dim.w - dim.margin.left + dim.margin.right)
            .attr("y", dim.h - dim.margin.top - dim.margin.bottom + 6)
            .text(`${xLabel}`);

        // draw y label
        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .transition(d3.easeElastic)
            .attr("dx", "1.15em")
            .attr("dy", "-1.15em")
            .text(`${yLabel}`);

        // draw title
        svg.append("text")
            .attr("class", "chart-title")
            .attr("text-anchor", "center")
            .style('font-size', '5em')
            .transition(d3.easeElastic).delay(1000)
            .attr("dx", dim.w / 2 - dim.margin.left - dim.margin.right)
            .attr("dy", -dim.margin.top)
            .style('font-size', '1.5em')
            .style('fill', 'darkslateblue')
            .style('font-weight', 'bolder')
            .text(`${header}`);

        // draw legends
        svg.append("circle")
            .attr("class", "c_legend")
            .attr("text-anchor", "end")
            .transition(d3.easeElastic).delay(500)
            .attr("cx", dim.w - dim.margin.right - dim.margin.left + 15)
            .attr("cy", dim.margin.top)
            .attr("fill", `${barColor || lgd}`)
            .attr("r", 7);

        svg.append("text")
            .attr("class", "c_legend_text")
            .attr("text-anchor", "start")
            .style('font-size', '1.7em')
            .transition(d3.easeElastic).delay(500)
            .attr("x", dim.w - dim.margin.right - dim.margin.left + 30)
            .attr("y", dim.margin.top + 3)
            .style('font-size', '.7em')
            .style('font-weight', 'bold')
            .attr("fill", `${barColor || lgd}`)
            .text(`${header}`);


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
    }, [props, lgd]);


    return (
        <div className="px-14 py-16 w-full h-full flex place-content-center bg-gradient-to-t">
            <svg ref={svgRef} className={'shadow-md'} ></svg>
        </div>
    )
}

export default BarChart;